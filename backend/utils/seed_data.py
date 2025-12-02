"""초기 데이터 시딩을 위한 목업 데이터 및 시딩 함수"""
from models import (
    db,
    User,
    Device,
    LocationStat,
    SavingsStat,
    CharacterProgressModel,
    StatusCardModel,
    StreakModel,
    RankProgressModel,
    CampusStatModel,
    Mission,
    PointSummary,
    WeeklyActivityModel,
    RecentActivityModel,
    ExchangeItemModel,
    DonateCategoryModel,
    UserStatModel,
    UserActivityModel,
    RankingEntryModel,
    RoomModel,
)

# ========== Mock Data ==========

# 사용자 정보
USER_DATA = {
    'id': '1',
    'name': '나환경',
    'department': '사무행정과',
    'level': 2,
    'character': '나무',
    'characterEmoji': '🌳',
}

# 디바이스 목록
DEVICES = [
    {
        'id': '1',
        'name': '냉난방기',
        'status': 'off',
        'icon': 'snow',
        'temperature': 23.5,
        'type': 'cooling',
    },
    {
        'id': '2',
        'name': '전등',
        'status': 'off',
        'icon': 'bulb',
        'powerUsage': 1.2,
        'type': 'light',
    },
]

# 위치 정보
LOCATION_DATA = {
    'currentLocation': 'pc22실',
    'totalPowerUsage': 1.2,
}

# 절약 데이터
SAVINGS_DATA = {
    'todaySavings': 0.7,
    'participatedMissions': 2,
    'acquiredPoints': 120,
    'departmentAverage': 12,
}

# 캐릭터 진행률
CHARACTER_PROGRESS = {
    'currentLevel': 2,
    'nextLevel': 3,
    'progress': 35,
    'missionsToNextLevel': 13,
    'characterName': '나무',
    'characterEmoji': '🌳',
}

# 상태 카드
STATUS_CARDS = [
    {'icon': '✅', 'label': '미션 완료', 'value': '2개'},
    {'icon': '🌱', 'label': '오늘 성장', 'value': '+4% 증가'},
    {'icon': '💰', 'label': '포인트', 'value': '+120P'},
]

# 연속 미션 일수
STREAK_DATA = {
    'days': 3,
    'completedDays': [1, 2, 3],
    'message': '3일 연속 미션 완료했어요!',
}

# 랭크 진행률
RANK_PROGRESS = {
    'currentRank': '새싹 등급',
    'nextRank': '잎새 등급',
    'currentPoints': 350,
    'pointsToNextRank': 650,
    'progress': 35,
}

# 캠퍼스 통계
CAMPUS_STATS = {
    'todaySavings': 1204,
    'studentParticipation': 3450,
    'wasteRooms': 3,
}

# 미션 목록
MISSIONS = [
    {
        'id': '1',
        'title': '친환경 스토리',
        'emoji': '📖',
        'category': 'content',
        'points': 10,
        'progress': 25,
        'totalSteps': 4,
        'currentStep': 1,
        'status': 'in-progress',
    },
    {
        'id': '2',
        'title': '텀블러 사용 인증',
        'emoji': '☕',
        'category': 'recycle',
        'points': 10,
        'progress': 50,
        'totalSteps': 4,
        'currentStep': 2,
        'status': 'in-progress',
    },
    {
        'id': '3',
        'title': '분리수거 챌린지',
        'emoji': '♻️',
        'category': 'recycle',
        'points': 10,
        'progress': 25,
        'totalSteps': 4,
        'currentStep': 1,
        'status': 'in-progress',
    },
    {
        'id': '4',
        'title': '에코 마일리지',
        'emoji': '🚌',
        'category': 'content',
        'points': 10,
        'progress': 0,
        'totalSteps': 4,
        'currentStep': 0,
        'status': 'available',
    },
    {
        'id': '5',
        'title': '10분 절전 미션',
        'emoji': '⚡',
        'category': 'contest',
        'points': 50,
        'progress': 0,
        'totalSteps': 1,
        'currentStep': 0,
        'status': 'available',
    },
]

# 포인트 데이터
POINTS_DATA = {
    'currentPoints': 850,
    'weeklyIncrease': 240,
    'usedPoints': 300,
    'totalDonated': 300,
}

# 주간 활동
WEEKLY_ACTIVITIES = [
    {'day': '월', 'points': 15},
    {'day': '화', 'points': 30},
    {'day': '수', 'points': 45},
    {'day': '목', 'points': 60},
    {'day': '금', 'points': 75},
]

# 최근 활동 내역
RECENT_ACTIVITIES = [
    {
        'id': '1',
        'emoji': '🍽️',
        'title': '절전 미션 성공!',
        'date': '2025.11.10 09:43',
        'points': 50,
    },
    {
        'id': '2',
        'emoji': '🌍',
        'title': '공모전 미션 성공!',
        'date': '2025.11.09 14:22',
        'points': 100,
    },
    {
        'id': '3',
        'emoji': '⏰',
        'title': '콘센트 사용 미션 성공!',
        'date': '2025.11.08 11:15',
        'points': 20,
    },
    {
        'id': '4',
        'emoji': '♻️',
        'title': '재활용 미션 성공!',
        'date': '2025.11.07 16:30',
        'points': 20,
    },
]

# 교환 아이템
EXCHANGE_ITEMS = {
    'voucher': [
        {
            'id': '1',
            'icon': '🍽️',
            'title': '교내 식당 할인권',
            'discount': '10% 할인',
            'points': 1500,
            'category': 'voucher',
        },
        {
            'id': '2',
            'icon': '☕',
            'title': '교내 카페 할인권',
            'discount': '15% 할인',
            'points': 1500,
            'category': 'voucher',
        },
        {
            'id': '3',
            'icon': '🏪',
            'title': '교내 편의점 할인권',
            'discount': '10% 할인',
            'points': 1500,
            'category': 'voucher',
        },
        {
            'id': '4',
            'icon': '🎁',
            'title': '교내 마일리지',
            'discount': '10% 할인',
            'points': 1500,
            'category': 'voucher',
        },
        {
            'id': '5',
            'icon': '📚',
            'title': '책 물려받기',
            'discount': '10% 할인',
            'points': 2000,
            'category': 'voucher',
        },
        {
            'id': '6',
            'icon': '🛠️',
            'title': '커스텀 재료 구매',
            'discount': '10% 할인',
            'points': 1000,
            'category': 'voucher',
        },
    ],
    'gifticon': [
        {
            'id': '7',
            'icon': '☕',
            'title': '스타벅스 아메리카노',
            'discount': '무료',
            'points': 2000,
            'category': 'gifticon',
        },
        {
            'id': '8',
            'icon': '🍔',
            'title': '맥도날드 햄버거 세트',
            'discount': '무료',
            'points': 3000,
            'category': 'gifticon',
        },
    ],
}

# 기부 카테고리
DONATE_CATEGORIES = [
    {
        'id': '1',
        'icon': '📚',
        'title': '책 물려받기',
        'points': 700,
    },
    {
        'id': '2',
        'icon': '🎓',
        'title': '장학금 포인트 기부',
        'points': 3000,
    },
    {
        'id': '3',
        'icon': '⏰',
        'title': '봉사시간 전환',
        'points': 2500,
    },
]

USER_STATS = {
    'points': 1250,
    'completedMissions': 42,
    'ranking': 12,
}

USER_ACTIVITIES = [
    {
        'id': '1',
        'icon': '⚡',
        'title': '절전 미션 성공',
        'timeAgo': '2시간 전',
        'points': 50,
        'type': 'earn',
    },
    {
        'id': '2',
        'icon': '⚡',
        'title': '절전 미션 성공',
        'timeAgo': '5시간 전',
        'points': 30,
        'type': 'earn',
    },
    {
        'id': '3',
        'icon': '🎁',
        'title': '포인트 기부',
        'timeAgo': '1일 전',
        'points': 300,
        'type': 'spend',
    },
]

RANKING_LIST = [
    {'id': '1', 'rank': 1, 'name': '김환경', 'department': '빅데이터과', 'points': 3450},
    {'id': '2', 'rank': 2, 'name': '이환경', 'department': '치위생과', 'points': 3333},
    {'id': '3', 'rank': 3, 'name': '최환경', 'department': '아동보육과', 'points': 3000},
    {'id': '4', 'rank': 4, 'name': '윤환경', 'department': '산업디자인과', 'points': 2876},
    {'id': '5', 'rank': 5, 'name': '박환경', 'department': '항공과', 'points': 2777},
    {'id': '6', 'rank': 6, 'name': '정환경', 'department': '시각미디어과', 'points': 2456},
    {'id': '7', 'rank': 7, 'name': '강환경', 'department': '세무회계과', 'points': 2345},
    {'id': '8', 'rank': 8, 'name': '조환경', 'department': '간호과', 'points': 2234},
    {'id': '9', 'rank': 9, 'name': '신환경', 'department': '물리치료과', 'points': 2123},
    {'id': '10', 'rank': 10, 'name': '오환경', 'department': '사무행정과', 'points': 2012},
]


def seed_data():
    """초기 목업 데이터를 DB에 한 번만 밀어 넣는 함수"""
    if User.query.first():
        # 이미 시드된 것으로 간주
        return

    # 사용자
    user = User(
        name=USER_DATA['name'],
        department=USER_DATA['department'],
        level=USER_DATA['level'],
        character=USER_DATA['character'],
        points=POINTS_DATA['currentPoints'],
    )
    db.session.add(user)
    db.session.flush()

    # 위치
    location = LocationStat(
        current_location=LOCATION_DATA['currentLocation'],
        total_power_usage=LOCATION_DATA['totalPowerUsage'],
    )
    db.session.add(location)

    # 디바이스
    for d in DEVICES:
        device = Device(
            name=d['name'],
            status=d['status'],
            icon=d['icon'],
            power_usage=d.get('powerUsage'),
            temperature=d.get('temperature'),
            type=d['type'],
        )
        db.session.add(device)

    # 절약
    savings = SavingsStat(
        today_savings=SAVINGS_DATA['todaySavings'],
        participated_missions=SAVINGS_DATA['participatedMissions'],
        acquired_points=SAVINGS_DATA['acquiredPoints'],
        department_average=SAVINGS_DATA['departmentAverage'],
    )
    db.session.add(savings)

    # 캐릭터 진행
    cp = CharacterProgressModel(
        current_level=CHARACTER_PROGRESS['currentLevel'],
        next_level=CHARACTER_PROGRESS['nextLevel'],
        progress=CHARACTER_PROGRESS['progress'],
        missions_to_next_level=CHARACTER_PROGRESS['missionsToNextLevel'],
        character_name=CHARACTER_PROGRESS['characterName'],
        character_emoji=CHARACTER_PROGRESS['characterEmoji'],
    )
    db.session.add(cp)

    # 상태 카드
    for sc in STATUS_CARDS:
        db.session.add(
            StatusCardModel(icon=sc['icon'], label=sc['label'], value=sc['value'])
        )

    # 스트릭
    streak = StreakModel(
        days=STREAK_DATA['days'],
        completed_days=','.join(str(d) for d in STREAK_DATA['completedDays']),
        message=STREAK_DATA['message'],
    )
    db.session.add(streak)

    # 랭크 진행
    rp = RankProgressModel(
        current_rank=RANK_PROGRESS['currentRank'],
        next_rank=RANK_PROGRESS['nextRank'],
        current_points=RANK_PROGRESS['currentPoints'],
        points_to_next_rank=RANK_PROGRESS['pointsToNextRank'],
        progress=RANK_PROGRESS['progress'],
    )
    db.session.add(rp)

    # 캠퍼스 통계
    cs = CampusStatModel(
        today_savings=CAMPUS_STATS['todaySavings'],
        student_participation=CAMPUS_STATS['studentParticipation'],
        waste_rooms=CAMPUS_STATS['wasteRooms'],
    )
    db.session.add(cs)

    # 미션
    for m in MISSIONS:
        mission = Mission(
            title=m['title'],
            emoji=m['emoji'],
            category=m['category'],
            points=m['points'],
            progress=m['progress'],
            total_steps=m['totalSteps'],
            current_step=m['currentStep'],
            status=m['status'],
        )
        db.session.add(mission)

    # 포인트 요약
    ps = PointSummary(
        current_points=POINTS_DATA['currentPoints'],
        weekly_increase=POINTS_DATA['weeklyIncrease'],
        used_points=POINTS_DATA['usedPoints'],
        total_donated=POINTS_DATA['totalDonated'],
    )
    db.session.add(ps)

    # 주간 활동
    for w in WEEKLY_ACTIVITIES:
        db.session.add(WeeklyActivityModel(day=w['day'], points=w['points']))

    # 최근 활동
    for a in RECENT_ACTIVITIES:
        db.session.add(
            RecentActivityModel(
                emoji=a['emoji'],
                title=a['title'],
                date=a['date'],
                points=a['points'],
            )
        )

    # 교환 아이템
    for category, items in EXCHANGE_ITEMS.items():
        for e in items:
            db.session.add(
                ExchangeItemModel(
                    icon=e['icon'],
                    title=e['title'],
                    discount=e.get('discount', ''),
                    points=e['points'],
                    category=category,
                )
            )

    # 기부 카테고리
    for c in DONATE_CATEGORIES:
        db.session.add(
            DonateCategoryModel(
                icon=c['icon'],
                title=c['title'],
                points=c['points'],
            )
        )

    # 사용자 통계
    us = UserStatModel(
        user_id=user.id,
        points=USER_STATS['points'],
        completed_missions=USER_STATS['completedMissions'],
        ranking=USER_STATS['ranking'],
    )
    db.session.add(us)

    # 사용자 활동
    for ua in USER_ACTIVITIES:
        db.session.add(
            UserActivityModel(
                user_id=user.id,
                icon=ua['icon'],
                title=ua['title'],
                time_ago=ua['timeAgo'],
                points=ua['points'],
                type=ua['type'],
            )
        )

    # 강의실 목록
    rooms_data = [
        {'name': '정보문화관 PC34실', 'signal_strength': 'B', 'signal_quality': 'strong', 'people_count': 25, 'congestion': '보통', 'is_selected': True},
        {'name': '정보문화관 PC33실', 'signal_strength': 'A', 'signal_quality': 'strong', 'people_count': 3, 'congestion': '여유', 'is_selected': False},
        {'name': '정보문화관 PC35실', 'signal_strength': 'C', 'signal_quality': 'medium', 'people_count': 30, 'congestion': '혼잡', 'is_selected': False},
        {'name': '정보문화관 PC32실', 'signal_strength': 'B', 'signal_quality': 'strong', 'people_count': 15, 'congestion': '여유', 'is_selected': False},
        {'name': '정보문화관 PC36실', 'signal_strength': 'D', 'signal_quality': 'weak', 'people_count': 20, 'congestion': '보통', 'is_selected': False},
    ]
    for r in rooms_data:
        room = RoomModel(
            name=r['name'],
            signal_strength=r['signal_strength'],
            signal_quality=r['signal_quality'],
            people_count=r['people_count'],
            congestion=r['congestion'],
            is_selected=r['is_selected'],
        )
        db.session.add(room)

    # 랭킹
    for r in RANKING_LIST:
        db.session.add(
            RankingEntryModel(
                rank=r['rank'],
                name=r['name'],
                department=r['department'],
                points=r['points'],
            )
        )

    db.session.commit()




