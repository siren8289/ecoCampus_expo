"""미션 관련 API 라우트"""
from flask import Blueprint, jsonify, request
from models import (
    db,
    Mission,
    Device,
    PointSummary,
    SavingsStat,
    CharacterProgressModel,
    RankProgressModel,
    CampusStatModel,
)
from utils.seed_data import CAMPUS_STATS

mission_bp = Blueprint('mission', __name__)


@mission_bp.route('/api/missions', methods=['GET'])
def get_missions():
    """미션 목록"""
    category = request.args.get('category', 'all')
    
    query = Mission.query
    if category != 'all':
        query = query.filter_by(category=category)
    missions = query.all()
    return jsonify([m.to_dict() for m in missions])


@mission_bp.route('/api/missions/<mission_id>', methods=['GET'])
def get_mission_detail(mission_id):
    """미션 상세 정보"""
    try:
        int_id = int(mission_id)
    except ValueError:
        return jsonify({'error': 'Invalid mission id'}), 400

    mission = Mission.query.get(int_id)
    if not mission:
        return jsonify({'error': 'Mission not found'}), 404
    
    # 미션 상세에 필요한 추가 정보
    mission_detail = mission.to_dict()
    mission_detail.update(
        {
            'roomName': '정보문화관 PC34실',
            'devices': [d.to_dict() for d in Device.query.all()],
            'timer': 600,  # 10분 = 600초
            'nearbyRoom': {
                'name': '정보문화관 PC33실',
                'peopleCount': 3,
                'status': '여유',
            },
        }
    )

    return jsonify(mission_detail)


@mission_bp.route('/api/missions/<mission_id>/start', methods=['POST'])
def start_mission(mission_id):
    """미션 시작"""
    try:
        int_id = int(mission_id)
    except ValueError:
        return jsonify({'error': 'Invalid mission id'}), 400

    mission = Mission.query.get(int_id)
    if not mission:
        return jsonify({'error': 'Mission not found'}), 404
    
    mission.status = 'in-progress'
    db.session.commit()
    return jsonify({'message': 'Mission started', 'mission': mission.to_dict()})


@mission_bp.route('/api/missions/<mission_id>/complete', methods=['POST'])
def complete_mission(mission_id):
    """미션 완료"""
    try:
        int_id = int(mission_id)
    except ValueError:
        return jsonify({'error': 'Invalid mission id'}), 400

    mission = Mission.query.get(int_id)
    if not mission:
        return jsonify({'error': 'Mission not found'}), 404
    
    mission.status = 'completed'
    mission.progress = 100
    
    # 포인트 추가
    summary = PointSummary.query.first()
    if not summary:
        summary = PointSummary()
        db.session.add(summary)
    summary.current_points += mission.points
    summary.weekly_increase += mission.points
    
    # 절약 데이터 업데이트
    savings = SavingsStat.query.first()
    if not savings:
        savings = SavingsStat()
        db.session.add(savings)
    savings.participated_missions += 1
    savings.acquired_points += mission.points
    
    # 캐릭터 진행률 업데이트
    cp = CharacterProgressModel.query.first()
    if not cp:
        cp = CharacterProgressModel()
        db.session.add(cp)
    cp.progress = min(100, cp.progress + 2)
    cp.missions_to_next_level = max(0, cp.missions_to_next_level - 1)

    db.session.commit()

    return jsonify({'message': 'Mission completed', 'mission': mission.to_dict()})


@mission_bp.route('/api/rank/progress', methods=['GET'])
def get_rank_progress():
    """랭크 진행률"""
    rp = RankProgressModel.query.first()
    if not rp:
        rp = RankProgressModel(
            current_rank='새싹 등급',
            next_rank='잎새 등급',
            current_points=0,
            points_to_next_rank=1000,
            progress=0,
        )
        db.session.add(rp)
        db.session.commit()
    return jsonify(rp.to_dict())


@mission_bp.route('/api/campus/stats', methods=['GET'])
def get_campus_stats():
    """캠퍼스 통계"""
    cs = CampusStatModel.query.first()
    if not cs:
        cs = CampusStatModel(
            today_savings=CAMPUS_STATS['todaySavings'],
            student_participation=CAMPUS_STATS['studentParticipation'],
            waste_rooms=CAMPUS_STATS['wasteRooms'],
        )
        db.session.add(cs)
        db.session.commit()
    return jsonify(cs.to_dict())




