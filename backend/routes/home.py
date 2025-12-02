"""홈 관련 API 라우트"""
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

home_bp = Blueprint('home', __name__)


@home_bp.route('/api/home/devices', methods=['GET'])
def get_devices():
    """홈 화면 디바이스 목록"""
    devices = Device.query.all()
    return jsonify([d.to_dict() for d in devices])


@home_bp.route('/api/home/location', methods=['GET'])
def get_location():
    """홈 화면 위치 정보"""
    # 현재 선택된 강의실 찾기
    selected_room = RoomModel.query.filter_by(is_selected=True).first()
    if not selected_room:
        # 기본값으로 첫 번째 강의실 선택
        selected_room = RoomModel.query.first()
        if selected_room:
            selected_room.is_selected = True
            db.session.commit()
    
    stat = LocationStat.query.first()
    if not stat:
        # 없으면 디바이스로부터 총 전력 계산
        total_power = sum((d.power_usage or 0) for d in Device.query.all())
        stat = LocationStat(
            current_location=selected_room.name if selected_room else '정보문화관 PC34실',
            total_power_usage=total_power
        )
        db.session.add(stat)
        db.session.commit()
    else:
        # 선택된 강의실 이름으로 업데이트
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
    """디바이스 토글"""
    try:
        int_id = int(device_id)
    except ValueError:
        return jsonify({'error': 'Invalid device id'}), 400

    device = Device.query.get(int_id)
    if not device:
        return jsonify({'error': 'Device not found'}), 404
    
    # 상태 변경
    device.status = 'on' if device.status == 'off' else 'off'
    
    # 전력 사용량 업데이트
    if device.status == 'on' and device.power_usage is not None:
        device.power_usage = (device.power_usage or 0) + 0.5
    elif device.status == 'off' and device.power_usage is not None:
        device.power_usage = max(0, (device.power_usage or 0) - 0.3)
    
    # 절약량 업데이트
    savings = SavingsStat.query.first()
    summary = PointSummary.query.first()
    if not savings:
        savings = SavingsStat()
        db.session.add(savings)
    if not summary:
        summary = PointSummary()
        db.session.add(summary)

    if device.status == 'off':
        savings.today_savings += 0.1
        savings.acquired_points += 10
        summary.current_points += 10
    
    # 총 전력 사용량 업데이트
    total_power = sum((d.power_usage or 0) for d in Device.query.all())
    stat = LocationStat.query.first()
    if not stat:
        stat = LocationStat(current_location='pc22실', total_power_usage=total_power)
        db.session.add(stat)
    else:
        stat.total_power_usage = total_power

    db.session.commit()
    
    return jsonify(device.to_dict())

