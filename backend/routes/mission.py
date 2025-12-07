"""
미션 관련 API 라우트

에코 미션과 관련된 API 엔드포인트를 정의합니다.
미션 목록 조회, 미션 시작/완료, 랭크 진행률, 캠퍼스 통계 등을 제공합니다.
"""
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

# Blueprint 생성
mission_bp = Blueprint('mission', __name__)


@mission_bp.route('/api/missions', methods=['GET'])
def get_missions():
    """
    미션 목록 조회
    
    카테고리별로 미션 목록을 필터링하여 반환합니다.
    
    Query Parameters:
        category (str, optional): 미션 카테고리 ('all', 'recycle', 'quiz', 'content', 'contest')
                                 기본값: 'all' (모든 카테고리)
    
    Returns:
        JSON: 미션 목록 배열
            [
                {
                    'id': '1',
                    'title': '불필요한 조명 끄기',
                    'emoji': '💡',
                    'category': 'recycle',
                    'points': 100,
                    'progress': 0.0,
                    'totalSteps': 1,
                    'currentStep': 0,
                    'status': 'available'
                },
                ...
            ]
    """
    # 쿼리 파라미터에서 카테고리 가져오기 (없으면 'all')
    category = request.args.get('category', 'all')
    
    # 기본 쿼리 생성
    query = Mission.query
    
    # 카테고리가 'all'이 아니면 해당 카테고리로 필터링
    if category != 'all':
        query = query.filter_by(category=category)
    
    # 필터링된 미션 목록 조회
    missions = query.all()
    
    # 각 미션을 딕셔너리로 변환하여 JSON 배열로 반환
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
    """
    미션 완료 처리
    
    미션을 완료 상태로 변경하고, 포인트, 절약 통계, 캐릭터 진행률 등을 업데이트합니다.
    
    Args:
        mission_id (str): 미션 ID (URL 파라미터)
    
    Returns:
        JSON: 완료 메시지와 업데이트된 미션 정보
            {
                'message': 'Mission completed',
                'mission': { ... }
            }
    
    Errors:
        400: 잘못된 미션 ID 형식
        404: 미션을 찾을 수 없음
    """
    # 미션 ID를 정수로 변환
    try:
        int_id = int(mission_id)
    except ValueError:
        return jsonify({'error': 'Invalid mission id'}), 400

    # 미션 조회
    mission = Mission.query.get(int_id)
    if not mission:
        return jsonify({'error': 'Mission not found'}), 404
    
    # 미션 상태를 완료로 변경
    mission.status = 'completed'
    mission.progress = 100  # 진행률 100%로 설정
    
    # 포인트 추가
    summary = PointSummary.query.first()
    if not summary:
        summary = PointSummary()
        db.session.add(summary)
    # 현재 포인트와 주간 증가 포인트에 미션 포인트 추가
    summary.current_points += mission.points
    summary.weekly_increase += mission.points
    
    # 절약 데이터 업데이트
    savings = SavingsStat.query.first()
    if not savings:
        savings = SavingsStat()
        db.session.add(savings)
    # 참여한 미션 수와 획득 포인트 증가
    savings.participated_missions += 1
    savings.acquired_points += mission.points
    
    # 캐릭터 진행률 업데이트
    cp = CharacterProgressModel.query.first()
    if not cp:
        cp = CharacterProgressModel()
        db.session.add(cp)
    # 진행률 증가 (최대 100%)
    cp.progress = min(100, cp.progress + 2)
    # 다음 레벨까지 남은 미션 수 감소 (최소 0)
    cp.missions_to_next_level = max(0, cp.missions_to_next_level - 1)

    # 모든 변경사항을 데이터베이스에 저장
    db.session.commit()

    # 완료 메시지와 업데이트된 미션 정보 반환
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




