"""데이터베이스 모델 정의"""
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    department = db.Column(db.String(100), nullable=False)
    level = db.Column(db.Integer, default=1)
    character = db.Column(db.String(50), default='나무')
    points = db.Column(db.Integer, default=0)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'department': self.department,
            'level': self.level,
            'character': self.character,
            'points': self.points,
        }


class Device(db.Model):
    __tablename__ = 'devices'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(10), default='off')  # on/off
    icon = db.Column(db.String(50), nullable=False)
    power_usage = db.Column(db.Float, nullable=True)
    temperature = db.Column(db.Float, nullable=True)
    type = db.Column(db.String(20), nullable=False)  # light/heating/cooling

    def to_dict(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'status': self.status,
            'icon': self.icon,
            'powerUsage': self.power_usage,
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
    __tablename__ = 'missions'

    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(50), unique=True, nullable=True)
    title = db.Column(db.String(200), nullable=False)
    emoji = db.Column(db.String(10), nullable=True)
    category = db.Column(db.String(20), nullable=False)  # all/recycle/quiz/content/contest
    points = db.Column(db.Integer, default=0)
    progress = db.Column(db.Float, default=0.0)
    total_steps = db.Column(db.Integer, default=1)
    current_step = db.Column(db.Integer, default=0)
    status = db.Column(db.String(20), default='available')  # available/in-progress/completed

    def to_dict(self):
        return {
            'id': str(self.id),
            'title': self.title,
            'emoji': self.emoji,
            'category': self.category,
            'points': self.points,
            'progress': self.progress,
            'totalSteps': self.total_steps,
            'currentStep': self.current_step,
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




