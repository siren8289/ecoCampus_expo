"""캐릭터 관련 API 라우트"""
from flask import Blueprint, jsonify
from models import db, CharacterProgressModel, StatusCardModel, StreakModel

character_bp = Blueprint('character', __name__)


@character_bp.route('/api/character/progress', methods=['GET'])
def get_character_progress():
    """캐릭터 진행률"""
    cp = CharacterProgressModel.query.first()
    if not cp:
        cp = CharacterProgressModel()
        db.session.add(cp)
        db.session.commit()
    return jsonify(cp.to_dict())


@character_bp.route('/api/character/status', methods=['GET'])
def get_character_status():
    """캐릭터 상태 카드"""
    cards = StatusCardModel.query.all()
    return jsonify([c.to_dict() for c in cards])


@character_bp.route('/api/character/streak', methods=['GET'])
def get_character_streak():
    """연속 미션 일수"""
    streak = StreakModel.query.first()
    if not streak:
        streak = StreakModel()
        db.session.add(streak)
        db.session.commit()
    return jsonify(streak.to_dict())




