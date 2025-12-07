"""
데이터베이스 모델 정의

이 모듈은 SQLAlchemy를 사용하여 데이터베이스 테이블을 정의합니다.
각 클래스는 하나의 데이터베이스 테이블을 나타내며,
클래스의 속성은 테이블의 컬럼을 나타냅니다.
"""
from flask_sqlalchemy import SQLAlchemy

# SQLAlchemy 인스턴스 생성
# 이 객체를 사용하여 데이터베이스 작업을 수행합니다
db = SQLAlchemy()


class User(db.Model):
    """
    사용자 모델
    
    사용자의 기본 정보를 저장하는 테이블입니다.
    이름, 학과, 레벨, 캐릭터, 포인트 등의 정보를 포함합니다.
    """
    __tablename__ = 'users'  # 데이터베이스 테이블 이름

    # 컬럼 정의
    id = db.Column(db.Integer, primary_key=True)  # 기본키, 자동 증가
    name = db.Column(db.String(50), nullable=False)  # 사용자 이름 (최대 50자, 필수)
    department = db.Column(db.String(100), nullable=False)  # 학과 (최대 100자, 필수)
    level = db.Column(db.Integer, default=1)  # 사용자 레벨 (기본값: 1)
    character = db.Column(db.String(50), default='나무')  # 캐릭터 이름 (기본값: '나무')
    points = db.Column(db.Integer, default=0)  # 보유 포인트 (기본값: 0)

    def to_dict(self):
        """
        모델 인스턴스를 딕셔너리로 변환
        
        API 응답으로 JSON을 반환할 때 사용합니다.
        
        Returns:
            dict: 사용자 정보를 담은 딕셔너리
        """
        return {
            'id': self.id,
            'name': self.name,
            'department': self.department,
            'level': self.level,
            'character': self.character,
            'points': self.points,
        }


class Device(db.Model):
    """
    IoT 디바이스 모델
    
    강의실 내 IoT 기기(조명, 난방, 냉방 등)의 정보를 저장합니다.
    전력 사용량, 온도, 상태 등을 관리합니다.
    """
    __tablename__ = 'devices'

    id = db.Column(db.Integer, primary_key=True)  # 기본키
    name = db.Column(db.String(100), nullable=False)  # 디바이스 이름 (예: "조명 1")
    status = db.Column(db.String(10), default='off')  # 상태: 'on' 또는 'off' (기본값: 'off')
    icon = db.Column(db.String(50), nullable=False)  # 아이콘 이름 (프론트엔드에서 사용)
    power_usage = db.Column(db.Float, nullable=True)  # 전력 사용량 (와트, 선택적)
    temperature = db.Column(db.Float, nullable=True)  # 온도 (섭씨, 선택적)
    type = db.Column(db.String(20), nullable=False)  # 디바이스 타입: 'light', 'heating', 'cooling'

    def to_dict(self):
        """
        디바이스 정보를 딕셔너리로 변환
        
        Returns:
            dict: 디바이스 정보 (카멜케이스로 변환된 키 사용)
        """
        return {
            'id': str(self.id),
            'name': self.name,
            'status': self.status,
            'icon': self.icon,
            'powerUsage': self.power_usage,  # 카멜케이스로 변환
            'temperature': self.temperature,
            'type': self.type,
        }


class LocationStat(db.Model):
    __tablename__ = 'location_stats'

    id = db.Column(db.Integer, primary_key=True)
    current_location = db.Column(db.String(100), nullable=False)
    total_power_usage = db.Column(db.Float, default=0.0)

    def to_dict(self):
        return {
            'currentLocation': self.current_location,
            'totalPowerUsage': self.total_power_usage,
        }


class SavingsStat(db.Model):
    __tablename__ = 'savings_stats'

    id = db.Column(db.Integer, primary_key=True)
    today_savings = db.Column(db.Float, default=0.0)
    participated_missions = db.Column(db.Integer, default=0)
    acquired_points = db.Column(db.Integer, default=0)
    department_average = db.Column(db.Integer, default=0)

    def to_dict(self):
        return {
            'todaySavings': self.today_savings,
            'participatedMissions': self.participated_missions,
            'acquiredPoints': self.acquired_points,
            'departmentAverage': self.department_average,
        }


class CharacterProgressModel(db.Model):
    __tablename__ = 'character_progress'

    id = db.Column(db.Integer, primary_key=True)
    current_level = db.Column(db.Integer, default=1)
    next_level = db.Column(db.Integer, default=2)
    progress = db.Column(db.Float, default=0.0)
    missions_to_next_level = db.Column(db.Integer, default=0)
    character_name = db.Column(db.String(50), default='나무')
    character_emoji = db.Column(db.String(10), default='🌳')

    def to_dict(self):
        return {
            'currentLevel': self.current_level,
            'nextLevel': self.next_level,
            'progress': self.progress,
            'missionsToNextLevel': self.missions_to_next_level,
            'characterName': self.character_name,
            'characterEmoji': self.character_emoji,
        }


class StatusCardModel(db.Model):
    __tablename__ = 'status_cards'

    id = db.Column(db.Integer, primary_key=True)
    icon = db.Column(db.String(10), nullable=False)
    label = db.Column(db.String(50), nullable=False)
    value = db.Column(db.String(50), nullable=False)

    def to_dict(self):
        return {
            'icon': self.icon,
            'label': self.label,
            'value': self.value,
        }


class StreakModel(db.Model):
    __tablename__ = 'streaks'

    id = db.Column(db.Integer, primary_key=True)
    days = db.Column(db.Integer, default=0)
    completed_days = db.Column(db.String(100), default='')  # "1,2,3"
    message = db.Column(db.String(100), default='')

    def to_dict(self):
        completed = (
            [int(x) for x in self.completed_days.split(',') if x.strip()]
            if self.completed_days
            else []
        )
        return {
            'days': self.days,
            'completedDays': completed,
            'message': self.message,
        }


class RankProgressModel(db.Model):
    __tablename__ = 'rank_progress'

    id = db.Column(db.Integer, primary_key=True)
    current_rank = db.Column(db.String(50), nullable=False)
    next_rank = db.Column(db.String(50), nullable=False)
    current_points = db.Column(db.Integer, default=0)
    points_to_next_rank = db.Column(db.Integer, default=0)
    progress = db.Column(db.Float, default=0.0)

    def to_dict(self):
        return {
            'currentRank': self.current_rank,
            'nextRank': self.next_rank,
            'currentPoints': self.current_points,
            'pointsToNextRank': self.points_to_next_rank,
            'progress': self.progress,
        }


class CampusStatModel(db.Model):
    __tablename__ = 'campus_stats'

    id = db.Column(db.Integer, primary_key=True)
    today_savings = db.Column(db.Integer, default=0)
    student_participation = db.Column(db.Integer, default=0)
    waste_rooms = db.Column(db.Integer, default=0)

    def to_dict(self):
        return {
            'todaySavings': self.today_savings,
            'studentParticipation': self.student_participation,
            'wasteRooms': self.waste_rooms,
        }


class Mission(db.Model):
    """
    미션 모델
    
    사용자가 수행할 수 있는 에코 미션 정보를 저장합니다.
    미션의 진행 상태, 포인트, 카테고리 등을 관리합니다.
    """
    __tablename__ = 'missions'

    id = db.Column(db.Integer, primary_key=True)  # 기본키
    code = db.Column(db.String(50), unique=True, nullable=True)  # 미션 고유 코드 (선택적, 유니크)
    title = db.Column(db.String(200), nullable=False)  # 미션 제목 (필수)
    emoji = db.Column(db.String(10), nullable=True)  # 미션 이모지 (선택적)
    # 카테고리: 'all', 'recycle', 'quiz', 'content', 'contest'
    category = db.Column(db.String(20), nullable=False)
    points = db.Column(db.Integer, default=0)  # 미션 완료 시 획득 포인트 (기본값: 0)
    progress = db.Column(db.Float, default=0.0)  # 진행률 (0.0 ~ 100.0, 기본값: 0.0)
    total_steps = db.Column(db.Integer, default=1)  # 전체 단계 수 (기본값: 1)
    current_step = db.Column(db.Integer, default=0)  # 현재 진행 단계 (기본값: 0)
    # 상태: 'available' (사용 가능), 'in-progress' (진행 중), 'completed' (완료)
    status = db.Column(db.String(20), default='available')

    def to_dict(self):
        """
        미션 정보를 딕셔너리로 변환
        
        Returns:
            dict: 미션 정보 (카멜케이스로 변환된 키 사용)
        """
        return {
            'id': str(self.id),
            'title': self.title,
            'emoji': self.emoji,
            'category': self.category,
            'points': self.points,
            'progress': self.progress,
            'totalSteps': self.total_steps,  # 카멜케이스로 변환
            'currentStep': self.current_step,  # 카멜케이스로 변환
            'status': self.status,
        }


class PointSummary(db.Model):
    __tablename__ = 'point_summaries'

    id = db.Column(db.Integer, primary_key=True)
    current_points = db.Column(db.Integer, default=0)
    weekly_increase = db.Column(db.Integer, default=0)
    used_points = db.Column(db.Integer, default=0)
    total_donated = db.Column(db.Integer, default=0)

    def to_dict(self):
        return {
            'currentPoints': self.current_points,
            'weeklyIncrease': self.weekly_increase,
            'usedPoints': self.used_points,
            'totalDonated': self.total_donated,
        }


class WeeklyActivityModel(db.Model):
    __tablename__ = 'weekly_activities'

    id = db.Column(db.Integer, primary_key=True)
    day = db.Column(db.String(10), nullable=False)
    points = db.Column(db.Integer, default=0)

    def to_dict(self):
        return {
            'day': self.day,
            'points': self.points,
        }


class RecentActivityModel(db.Model):
    __tablename__ = 'recent_activities'

    id = db.Column(db.Integer, primary_key=True)
    emoji = db.Column(db.String(10), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    date = db.Column(db.String(50), nullable=False)
    points = db.Column(db.Integer, default=0)

    def to_dict(self):
        return {
            'id': str(self.id),
            'emoji': self.emoji,
            'title': self.title,
            'date': self.date,
            'points': self.points,
        }


class ExchangeItemModel(db.Model):
    __tablename__ = 'exchange_items'

    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(50), unique=True, nullable=True)
    icon = db.Column(db.String(10), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    discount = db.Column(db.String(50), nullable=True)
    points = db.Column(db.Integer, default=0)
    category = db.Column(db.String(20), nullable=False)  # voucher/gifticon

    def to_dict(self):
        return {
            'id': str(self.id),
            'icon': self.icon,
            'title': self.title,
            'discount': self.discount or '',
            'points': self.points,
            'category': self.category,
        }


class DonateCategoryModel(db.Model):
    __tablename__ = 'donate_categories'

    id = db.Column(db.Integer, primary_key=True)
    icon = db.Column(db.String(10), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    points = db.Column(db.Integer, default=0)

    def to_dict(self):
        return {
            'id': str(self.id),
            'icon': self.icon,
            'title': self.title,
            'points': self.points,
        }


class UserStatModel(db.Model):
    __tablename__ = 'user_stats'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    points = db.Column(db.Integer, default=0)
    completed_missions = db.Column(db.Integer, default=0)
    ranking = db.Column(db.Integer, default=0)

    def to_dict(self):
        return {
            'points': self.points,
            'completedMissions': self.completed_missions,
            'ranking': self.ranking,
        }


class UserActivityModel(db.Model):
    __tablename__ = 'user_activities'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    icon = db.Column(db.String(10), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    time_ago = db.Column(db.String(50), nullable=False)
    points = db.Column(db.Integer, default=0)
    type = db.Column(db.String(10), nullable=False)  # earn/spend

    def to_dict(self):
        return {
            'id': str(self.id),
            'icon': self.icon,
            'title': self.title,
            'timeAgo': self.time_ago,
            'points': self.points,
            'type': self.type,
        }


class RankingEntryModel(db.Model):
    __tablename__ = 'ranking_entries'

    id = db.Column(db.Integer, primary_key=True)
    rank = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(50), nullable=False)
    department = db.Column(db.String(100), nullable=False)
    points = db.Column(db.Integer, default=0)

    def to_dict(self):
        return {
            'id': str(self.id),
            'rank': self.rank,
            'name': self.name,
            'department': self.department,
            'points': self.points,
        }


class RoomModel(db.Model):
    __tablename__ = 'rooms'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    signal_strength = db.Column(db.String(10), nullable=False)  # A, B, C, D
    signal_quality = db.Column(db.String(20), nullable=False)  # strong, medium, weak
    people_count = db.Column(db.Integer, default=0)
    congestion = db.Column(db.String(20), nullable=False)  # 여유, 보통, 혼잡
    is_selected = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'signalStrength': self.signal_strength,
            'signal': self.signal_quality,
            'peopleCount': self.people_count,
            'congestion': self.congestion,
        }




