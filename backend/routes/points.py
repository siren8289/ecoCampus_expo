"""
포인트 관련 API 라우트

포인트 조회, 교환, 기부 등의 기능을 제공하는 API 엔드포인트를 정의합니다.
"""
from flask import Blueprint, jsonify, request
from models import (
    db,
    PointSummary,
    RecentActivityModel,
    WeeklyActivityModel,
    ExchangeItemModel,
    DonateCategoryModel,
)

# Blueprint 생성
points_bp = Blueprint('points', __name__)


@points_bp.route('/api/points', methods=['GET'])
def get_points():
    """
    현재 포인트 정보 조회
    
    사용자의 현재 포인트, 주간 증가량, 사용한 포인트, 기부한 포인트 등을 반환합니다.
    
    Returns:
        JSON: 포인트 요약 정보
            {
                'currentPoints': 1500,
                'weeklyIncrease': 200,
                'usedPoints': 500,
                'totalDonated': 300
            }
    """
    ps = PointSummary.query.first()
    if not ps:
        # 포인트 요약 데이터가 없으면 새로 생성
        ps = PointSummary()
        db.session.add(ps)
        db.session.commit()
    return jsonify(ps.to_dict())


@points_bp.route('/api/points/activities', methods=['GET'])
def get_point_activities():
    """포인트 활동 내역"""
    acts = RecentActivityModel.query.order_by(RecentActivityModel.id.desc()).all()
    return jsonify([a.to_dict() for a in acts])


@points_bp.route('/api/points/weekly', methods=['GET'])
def get_weekly_activities():
    """주간 활동 데이터"""
    items = WeeklyActivityModel.query.all()
    return jsonify([w.to_dict() for w in items])


@points_bp.route('/api/points/exchange', methods=['GET'])
def get_exchange_items():
    """교환 아이템 목록"""
    category = request.args.get('category', 'voucher')
    items = ExchangeItemModel.query.filter_by(category=category).all()
    return jsonify([i.to_dict() for i in items])


@points_bp.route('/api/points/exchange', methods=['POST'])
def exchange_points():
    """
    포인트 교환 처리
    
    포인트를 사용하여 상품(바우처, 기프티콘 등)을 교환합니다.
    
    Request Body:
        JSON: {
            'itemId': '1',           # 교환할 아이템 ID
            'category': 'voucher'    # 아이템 카테고리 ('voucher' 또는 'gifticon')
        }
    
    Returns:
        JSON: 교환 성공 메시지와 남은 포인트
            {
                'message': 'Exchange successful',
                'item': { ... },
                'remainingPoints': 1400
            }
    
    Errors:
        400: 잘못된 아이템 ID 또는 포인트 부족
        404: 아이템을 찾을 수 없음
    """
    data = request.json
    item_id = data.get('itemId')
    category = data.get('category', 'voucher')
    
    # 아이템 ID를 정수로 변환
    try:
        int_id = int(item_id)
    except (TypeError, ValueError):
        return jsonify({'error': 'Invalid item id'}), 400

    # 교환할 아이템 조회
    item = ExchangeItemModel.query.filter_by(id=int_id, category=category).first()
    if not item:
        return jsonify({'error': 'Item not found'}), 404
    
    # 포인트 요약 데이터 조회 또는 생성
    ps = PointSummary.query.first()
    if not ps:
        ps = PointSummary()
        db.session.add(ps)
        db.session.commit()

    # 포인트가 충분한지 확인
    if ps.current_points < item.points:
        return jsonify({'error': 'Insufficient points'}), 400
    
    # 포인트 차감 및 사용 포인트 증가
    ps.current_points -= item.points
    ps.used_points += item.points
    db.session.commit()
    
    # 교환 성공 응답 반환
    return jsonify({
        'message': 'Exchange successful',
        'item': item.to_dict(),
        'remainingPoints': ps.current_points,
    })


@points_bp.route('/api/points/donate/categories', methods=['GET'])
def get_donate_categories():
    """기부 카테고리 목록"""
    cats = DonateCategoryModel.query.all()
    return jsonify([c.to_dict() for c in cats])


@points_bp.route('/api/points/donate', methods=['POST'])
def donate_points():
    """포인트 기부"""
    data = request.json
    category_id = data.get('categoryId')
    amount = data.get('amount', 0)
    
    try:
        int_id = int(category_id) if category_id is not None else None
    except ValueError:
        return jsonify({'error': 'Invalid category id'}), 400

    category = (
        DonateCategoryModel.query.get(int_id) if int_id is not None else None
    )
    
    # 고정 금액 기부
    if amount == 0 and category:
        amount = category.points
    
    ps = PointSummary.query.first()
    if not ps:
        ps = PointSummary()
        db.session.add(ps)
        db.session.commit()

    if ps.current_points < amount:
        return jsonify({'error': 'Insufficient points'}), 400
    
    # 포인트 차감
    ps.current_points -= amount
    ps.total_donated += amount
    db.session.commit()
    
    return jsonify({
        'message': 'Donation successful',
        'category': category.to_dict() if category else None,
        'amount': amount,
        'remainingPoints': ps.current_points,
        'totalDonated': ps.total_donated,
    })




