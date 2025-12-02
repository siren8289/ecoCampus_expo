"""강의실 관련 API 라우트"""
from flask import Blueprint, jsonify
from models import db, RoomModel, LocationStat, Device

rooms_bp = Blueprint('rooms', __name__)


@rooms_bp.route('/api/rooms', methods=['GET'])
def get_rooms():
    """강의실 목록 조회"""
    rooms = RoomModel.query.order_by(RoomModel.name.asc()).all()
    return jsonify([r.to_dict() for r in rooms])


@rooms_bp.route('/api/rooms/<room_id>/select', methods=['PUT'])
def select_room(room_id):
    """강의실 선택"""
    try:
        int_id = int(room_id)
    except ValueError:
        return jsonify({'error': 'Invalid room id'}), 400

    # 모든 강의실의 선택 상태 해제
    RoomModel.query.update({RoomModel.is_selected: False})
    
    # 선택한 강의실 찾기
    room = RoomModel.query.get(int_id)
    if not room:
        return jsonify({'error': 'Room not found'}), 404
    
    # 선택 상태로 변경
    room.is_selected = True
    
    # LocationStat 업데이트
    stat = LocationStat.query.first()
    if not stat:
        total_power = sum((d.power_usage or 0) for d in Device.query.all())
        stat = LocationStat(current_location=room.name, total_power_usage=total_power)
        db.session.add(stat)
    else:
        stat.current_location = room.name
    
    db.session.commit()
    
    return jsonify({
        'message': 'Room selected',
        'room': room.to_dict(),
        'location': stat.to_dict(),
    })




