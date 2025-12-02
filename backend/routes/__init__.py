# Routes package
from routes.home import home_bp
from routes.rooms import rooms_bp
from routes.character import character_bp
from routes.mission import mission_bp
from routes.points import points_bp
from routes.user import user_bp
from routes.ranking import ranking_bp

__all__ = [
    'home_bp',
    'rooms_bp',
    'character_bp',
    'mission_bp',
    'points_bp',
    'user_bp',
    'ranking_bp',
]
