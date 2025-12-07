"""
랭킹 관련 API 라우트

사용자 랭킹 목록을 제공하는 API 엔드포인트를 정의합니다.
"""
from flask import Blueprint, jsonify, request
from models import User, PointSummary, UserStatModel, RankingEntryModel

# Blueprint 생성
ranking_bp = Blueprint('ranking', __name__)


@ranking_bp.route('/api/ranking', methods=['GET'])
def get_ranking():
    """
    랭킹 목록 조회
    
    사용자 랭킹 목록과 현재 사용자의 랭킹 정보를 반환합니다.
    
    Query Parameters:
        type (str, optional): 랭킹 타입 ('individual' 또는 'department'), 기본값: 'individual'
        period (str, optional): 기간 ('daily', 'weekly', 'monthly'), 기본값: 'daily'
    
    Returns:
        JSON: 랭킹 정보
            {
                'rankingType': 'individual',
                'timePeriod': 'daily',
                'myRank': {
                    'myRank': 12,
                    'myPoints': 1500,
                    'myName': '홍길동',
                    'myDepartment': '컴퓨터공학과'
                },
                'rankingList': [ ... ]
            }
    """
    ranking_type = request.args.get('type', 'individual')  # individual or department
    time_period = request.args.get('period', 'daily')  # daily, weekly, monthly
    
    # 현재 사용자 정보 추가
    user = User.query.first()
    ps = PointSummary.query.first()
    my_rank_value = 12
    my_points_value = ps.current_points if ps else 0
    if user:
        stat = UserStatModel.query.first()
        if stat:
            my_rank_value = stat.ranking
    my_rank_info = {
        'myRank': my_rank_value,
        'myPoints': my_points_value,
        'myName': user.name if user else '',
        'myDepartment': user.department if user else '',
    }
    
    entries = RankingEntryModel.query.order_by(RankingEntryModel.rank.asc()).all()

    return jsonify({
        'rankingType': ranking_type,
        'timePeriod': time_period,
        'myRank': my_rank_info,
        'rankingList': [e.to_dict() for e in entries],
    })




