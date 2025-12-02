"""사용자 관련 API 라우트"""
from flask import Blueprint, jsonify
from models import db, User, UserStatModel, UserActivityModel

user_bp = Blueprint('user', __name__)


@user_bp.route('/api/user/profile', methods=['GET'])
def get_user_profile():
    """사용자 프로필"""
    user = User.query.first()
    if not user:
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




