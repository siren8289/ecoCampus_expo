"""Flask 애플리케이션 메인 파일"""
from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from models import db
from utils.seed_data import seed_data
from routes import (
    home_bp,
    rooms_bp,
    character_bp,
    mission_bp,
    points_bp,
    user_bp,
    ranking_bp,
)

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)

# 데이터베이스 초기화
db.init_app(app)

# Blueprint 등록
app.register_blueprint(home_bp)
app.register_blueprint(rooms_bp)
app.register_blueprint(character_bp)
app.register_blueprint(mission_bp)
app.register_blueprint(points_bp)
app.register_blueprint(user_bp)
app.register_blueprint(ranking_bp)


@app.route('/')
def index():
    return jsonify({
        'message': 'EcoCampus API Server',
        'status': 'running'
    })


@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'message': 'Server is running'
    })


if __name__ == '__main__':
    import os
    import socket
    
    def find_free_port(start_port=5001, max_port=5100):
        """사용 가능한 포트를 찾는 함수"""
        for port in range(start_port, max_port):
            try:
                with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                    s.bind(('', port))
                    return port
            except OSError:
                continue
        raise RuntimeError("사용 가능한 포트를 찾을 수 없습니다.")
    
    with app.app_context():
        db.create_all()
        seed_data()

    port = int(os.environ.get('PORT', find_free_port()))
    debug = os.environ.get('FLASK_ENV') == 'development'
    print(f"서버가 포트 {port}에서 실행됩니다: http://localhost:{port}")
    print(f"API 엔드포인트 목록:")
    print(f"  - GET  /api/health")
    print(f"  - GET  /api/home/devices")
    print(f"  - GET  /api/home/location")
    print(f"  - GET  /api/home/savings")
    print(f"  - GET  /api/home/character")
    print(f"  - PUT  /api/devices/<id>/toggle")
    print(f"  - GET  /api/character/progress")
    print(f"  - GET  /api/character/status")
    print(f"  - GET  /api/character/streak")
    print(f"  - GET  /api/missions")
    print(f"  - GET  /api/missions/<id>")
    print(f"  - POST /api/missions/<id>/start")
    print(f"  - POST /api/missions/<id>/complete")
    print(f"  - GET  /api/rank/progress")
    print(f"  - GET  /api/campus/stats")
    print(f"  - GET  /api/points")
    print(f"  - GET  /api/points/activities")
    print(f"  - GET  /api/points/weekly")
    print(f"  - GET  /api/points/exchange")
    print(f"  - POST /api/points/exchange")
    print(f"  - GET  /api/points/donate/categories")
    print(f"  - POST /api/points/donate")
    print(f"  - GET  /api/user/profile")
    print(f"  - GET  /api/user/stats")
    print(f"  - GET  /api/user/activities")
    print(f"  - GET  /api/ranking")
    print(f"  - GET  /api/rooms")
    print(f"  - PUT  /api/rooms/<id>/select")
    app.run(host='0.0.0.0', port=port, debug=debug)
