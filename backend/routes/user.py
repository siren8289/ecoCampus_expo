"""
사용자 관련 API 라우트

사용자 프로필, 통계, 활동 내역 등을 제공하는 API 엔드포인트를 정의합니다.
"""
from flask import Blueprint, jsonify
from models import db, User, UserStatModel, UserActivityModel

# Blueprint 생성
user_bp = Blueprint('user', __name__)


@user_bp.route('/api/user/profile', methods=['GET'])
def get_user_profile():
    """
    사용자 프로필 조회
    
    현재 사용자의 기본 정보(이름, 학과, 레벨, 캐릭터 등)를 반환합니다.
    
    Returns:
        JSON: 사용자 프로필 정보
            {
                'id': 1,
                'name': '홍길동',
                'department': '컴퓨터공학과',
                'level': 5,
                'character': '나무',
                'points': 1500
            }
    """
    user = User.query.first()
    if not user:
        # 사용자가 없으면 기본값 반환
        return jsonify({'id': None, 'name': '', 'department': '', 'level': 1, 'character': '나무'})
    return jsonify(user.to_dict())


@user_bp.route('/api/user/stats', methods=['GET'])
def get_user_stats():
    """사용자 통계"""
    stat = UserStatModel.query.first()
    if not stat:
        stat = UserStatModel(user_id=User.query.first().id if User.query.first() else 1)
        db.session.add(stat)
        db.session.commit()
    return jsonify(stat.to_dict())


@user_bp.route('/api/user/activities', methods=['GET'])
def get_user_activities():
    """사용자 활동 내역"""
    acts = UserActivityModel.query.order_by(UserActivityModel.id.desc()).all()
    return jsonify([a.to_dict() for a in acts])




