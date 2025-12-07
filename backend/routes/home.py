"""
홈 관련 API 라우트

홈 화면에서 필요한 데이터를 제공하는 API 엔드포인트들을 정의합니다.
디바이스 목록, 위치 정보, 절약 통계, 캐릭터 정보 등을 반환합니다.
"""
from flask import Blueprint, jsonify
from models import (
    db,
    Device,
    LocationStat,
    SavingsStat,
    User,
    CharacterProgressModel,
    RoomModel,
    PointSummary,
)

# Blueprint 생성
# 'home'이라는 이름으로 Blueprint를 생성하여 홈 관련 라우트를 그룹화합니다
home_bp = Blueprint('home', __name__)


@home_bp.route('/api/home/devices', methods=['GET'])
def get_devices():
    """
    홈 화면 디바이스 목록 조회
    
    강의실 내 모든 IoT 디바이스의 목록을 반환합니다.
    
    Returns:
        JSON: 디바이스 목록 배열
            [
                {
                    'id': '1',
                    'name': '조명 1',
                    'status': 'on',
                    'icon': 'light',
                    'powerUsage': 10.5,
                    'temperature': null,
                    'type': 'light'
                },
                ...
            ]
    """
    # 데이터베이스에서 모든 디바이스 조회
    devices = Device.query.all()
    # 각 디바이스를 딕셔너리로 변환하여 JSON 배열로 반환
    return jsonify([d.to_dict() for d in devices])


@home_bp.route('/api/home/location', methods=['GET'])
def get_location():
    """
    홈 화면 위치 정보 조회
    
    현재 선택된 강의실과 해당 강의실의 총 전력 사용량을 반환합니다.
    
    Returns:
        JSON: 위치 정보
            {
                'currentLocation': '정보문화관 PC34실',
                'totalPowerUsage': 150.5
            }
    """
    # 현재 선택된 강의실 찾기
    selected_room = RoomModel.query.filter_by(is_selected=True).first()
    
    # 선택된 강의실이 없으면 기본값으로 첫 번째 강의실 선택
    if not selected_room:
        selected_room = RoomModel.query.first()
        if selected_room:
            selected_room.is_selected = True
            db.session.commit()
    
    # 위치 통계 데이터 조회
    stat = LocationStat.query.first()
    
    if not stat:
        # 통계 데이터가 없으면 새로 생성
        # 모든 디바이스의 전력 사용량을 합산하여 총 전력 계산
        total_power = sum((d.power_usage or 0) for d in Device.query.all())
        stat = LocationStat(
            current_location=selected_room.name if selected_room else '정보문화관 PC34실',
            total_power_usage=total_power
        )
        db.session.add(stat)
        db.session.commit()
    else:
        # 통계 데이터가 있으면 선택된 강의실 이름으로 업데이트
        if selected_room:
            stat.current_location = selected_room.name
            db.session.commit()
    
    return jsonify(stat.to_dict())


@home_bp.route('/api/home/savings', methods=['GET'])
def get_savings():
    """홈 화면 절약 데이터"""
    stat = SavingsStat.query.first()
    if not stat:
        stat = SavingsStat()
        db.session.add(stat)
        db.session.commit()
    return jsonify(stat.to_dict())


@home_bp.route('/api/home/character', methods=['GET'])
def get_character():
    """홈 화면 캐릭터 데이터"""
    user = User.query.first()
    if not user:
        return jsonify({'level': 1, 'growthRate': 0})
    # growthRate는 간단히 진행률 기반으로 계산
    cp = CharacterProgressModel.query.first()
    growth_rate = int(cp.progress) if cp else 0
    return jsonify({'level': user.level, 'growthRate': growth_rate})


@home_bp.route('/api/devices/<device_id>/toggle', methods=['PUT'])
def toggle_device(device_id):
    """
    디바이스 상태 토글 (켜기/끄기)
    
    디바이스의 상태를 on/off로 전환하고,
    전력 사용량, 절약량, 포인트 등을 업데이트합니다.
    
    Args:
        device_id (str): 디바이스 ID (URL 파라미터)
    
    Returns:
        JSON: 업데이트된 디바이스 정보
    
    Errors:
        400: 잘못된 디바이스 ID 형식
        404: 디바이스를 찾을 수 없음
    """
    # 디바이스 ID를 정수로 변환
    try:
        int_id = int(device_id)
    except ValueError:
        return jsonify({'error': 'Invalid device id'}), 400

    # 디바이스 조회
    device = Device.query.get(int_id)
    if not device:
        return jsonify({'error': 'Device not found'}), 404
    
    # 상태 변경: 현재 상태가 'off'면 'on'으로, 그 외에는 'off'로
    device.status = 'on' if device.status == 'off' else 'off'
    
    # 전력 사용량 업데이트
    if device.status == 'on' and device.power_usage is not None:
        # 켜면 전력 사용량 증가
        device.power_usage = (device.power_usage or 0) + 0.5
    elif device.status == 'off' and device.power_usage is not None:
        # 끄면 전력 사용량 감소 (0 이하로 내려가지 않음)
        device.power_usage = max(0, (device.power_usage or 0) - 0.3)
    
    # 절약량 및 포인트 통계 업데이트
    savings = SavingsStat.query.first()
    summary = PointSummary.query.first()
    
    # 통계 데이터가 없으면 생성
    if not savings:
        savings = SavingsStat()
        db.session.add(savings)
    if not summary:
        summary = PointSummary()
        db.session.add(summary)

    # 디바이스를 끄면 절약 포인트 획득
    if device.status == 'off':
        savings.today_savings += 0.1  # 절약량 증가
        savings.acquired_points += 10  # 획득 포인트 증가
        summary.current_points += 10  # 현재 포인트 증가
    
    # 모든 디바이스의 총 전력 사용량 재계산
    total_power = sum((d.power_usage or 0) for d in Device.query.all())
    stat = LocationStat.query.first()
    
    if not stat:
        # 위치 통계가 없으면 생성
        stat = LocationStat(current_location='pc22실', total_power_usage=total_power)
        db.session.add(stat)
    else:
        # 위치 통계가 있으면 총 전력 사용량 업데이트
        stat.total_power_usage = total_power

    # 모든 변경사항을 데이터베이스에 저장
    db.session.commit()
    
    # 업데이트된 디바이스 정보 반환
    return jsonify(device.to_dict())

