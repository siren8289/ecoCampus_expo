"""
강의실 관련 API 라우트

강의실 목록 조회 및 선택 기능을 제공하는 API 엔드포인트를 정의합니다.
"""
from flask import Blueprint, jsonify
from models import db, RoomModel, LocationStat, Device

# Blueprint 생성
rooms_bp = Blueprint('rooms', __name__)


@rooms_bp.route('/api/rooms', methods=['GET'])
def get_rooms():
    """
    강의실 목록 조회
    
    모든 강의실의 목록을 이름 순으로 정렬하여 반환합니다.
    
    Returns:
        JSON: 강의실 목록 배열
            [
                {
                    'id': '1',
                    'name': '정보문화관 PC34실',
                    'signalStrength': 'A',
                    'signal': 'strong',
                    'peopleCount': 5,
                    'congestion': '여유'
                },
                ...
            ]
    """
    # 강의실 목록을 이름 순으로 정렬하여 조회
    rooms = RoomModel.query.order_by(RoomModel.name.asc()).all()
    return jsonify([r.to_dict() for r in rooms])


@rooms_bp.route('/api/rooms/<room_id>/select', methods=['PUT'])
def select_room(room_id):
    """
    강의실 선택 처리
    
    특정 강의실을 선택하고, 위치 통계를 업데이트합니다.
    한 번에 하나의 강의실만 선택할 수 있습니다.
    
    Args:
        room_id (str): 강의실 ID (URL 파라미터)
    
    Returns:
        JSON: 선택된 강의실 정보와 위치 정보
            {
                'message': 'Room selected',
                'room': { ... },
                'location': { ... }
            }
    
    Errors:
        400: 잘못된 강의실 ID 형식
        404: 강의실을 찾을 수 없음
    """
    # 강의실 ID를 정수로 변환
    try:
        int_id = int(room_id)
    except ValueError:
        return jsonify({'error': 'Invalid room id'}), 400

    # 모든 강의실의 선택 상태를 해제 (한 번에 하나만 선택 가능)
    RoomModel.query.update({RoomModel.is_selected: False})
    
    # 선택할 강의실 조회
    room = RoomModel.query.get(int_id)
    if not room:
        return jsonify({'error': 'Room not found'}), 404
    
    # 선택한 강의실을 선택 상태로 변경
    room.is_selected = True
    
    # 위치 통계 업데이트
    stat = LocationStat.query.first()
    if not stat:
        # 위치 통계가 없으면 새로 생성
        # 모든 디바이스의 전력 사용량을 합산
        total_power = sum((d.power_usage or 0) for d in Device.query.all())
        stat = LocationStat(current_location=room.name, total_power_usage=total_power)
        db.session.add(stat)
    else:
        # 위치 통계가 있으면 현재 위치만 업데이트
        stat.current_location = room.name
    
    # 모든 변경사항을 데이터베이스에 저장
    db.session.commit()
    
    # 선택 성공 응답 반환
    return jsonify({
        'message': 'Room selected',
        'room': room.to_dict(),
        'location': stat.to_dict(),
    })




