"""
Flask 애플리케이션 메인 파일

이 파일은 EcoCampus 백엔드 서버의 진입점입니다.
Flask 애플리케이션을 초기화하고, 데이터베이스를 설정하며,
모든 API 라우트를 등록합니다.
"""
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

# Flask 애플리케이션 인스턴스 생성
app = Flask(__name__)

# 설정 클래스에서 애플리케이션 설정 로드
# Config 클래스는 데이터베이스 연결 정보 등을 포함합니다
app.config.from_object(Config)

# CORS(Cross-Origin Resource Sharing) 활성화
# 프론트엔드에서 다른 도메인으로 요청을 보낼 수 있도록 허용
CORS(app)

# SQLAlchemy 데이터베이스 인스턴스를 Flask 앱에 연결
# 이렇게 하면 db 객체를 사용하여 데이터베이스 작업을 수행할 수 있습니다
db.init_app(app)

# Blueprint 등록
# 각 기능별로 분리된 라우트를 애플리케이션에 등록합니다
# Blueprint를 사용하면 코드를 모듈화하여 관리하기 쉽습니다
app.register_blueprint(home_bp)      # 홈 화면 관련 API
app.register_blueprint(rooms_bp)     # 강의실 관련 API
app.register_blueprint(character_bp) # 캐릭터 관련 API
app.register_blueprint(mission_bp)  # 미션 관련 API
app.register_blueprint(points_bp)   # 포인트 관련 API
app.register_blueprint(user_bp)     # 사용자 관련 API
app.register_blueprint(ranking_bp)  # 랭킹 관련 API


@app.route('/')
def index():
    """
    루트 엔드포인트
    
    서버가 정상적으로 실행 중인지 확인하는 기본 엔드포인트입니다.
    
    Returns:
        JSON: 서버 상태 메시지
    """
    return jsonify({
        'message': 'EcoCampus API Server',
        'status': 'running'
    })


@app.route('/api/health', methods=['GET'])
def health_check():
    """
    헬스 체크 엔드포인트
    
    서버의 건강 상태를 확인하는 엔드포인트입니다.
    모니터링 시스템이나 로드 밸런서에서 사용할 수 있습니다.
    
    Returns:
        JSON: 서버 건강 상태 정보
    """
    return jsonify({
        'status': 'healthy',
        'message': 'Server is running'
    })


if __name__ == '__main__':
    """
    스크립트가 직접 실행될 때만 실행되는 부분
    (다른 파일에서 import될 때는 실행되지 않음)
    """
    import os
    import socket
    
    def find_free_port(start_port=5001, max_port=5100):
        """
        사용 가능한 포트를 찾는 함수
        
        macOS에서 포트 5000은 AirPlay Receiver가 사용할 수 있으므로,
        5001부터 시작하여 사용 가능한 포트를 찾습니다.
        
        Args:
            start_port (int): 검색을 시작할 포트 번호 (기본값: 5001)
            max_port (int): 검색을 종료할 포트 번호 (기본값: 5100)
        
        Returns:
            int: 사용 가능한 포트 번호
        
        Raises:
            RuntimeError: 사용 가능한 포트를 찾을 수 없을 때
        """
        for port in range(start_port, max_port):
            try:
                # 소켓을 생성하여 해당 포트가 사용 가능한지 확인
                with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                    s.bind(('', port))
                    return port
            except OSError:
                # 포트가 사용 중이면 다음 포트로 계속 검색
                continue
        raise RuntimeError("사용 가능한 포트를 찾을 수 없습니다.")
    
    # 애플리케이션 컨텍스트 내에서 데이터베이스 초기화
    # app_context()는 Flask의 애플리케이션 컨텍스트를 생성합니다
    with app.app_context():
        # 데이터베이스에 모든 테이블 생성
        # models.py에 정의된 모든 모델의 테이블이 생성됩니다
        db.create_all()
        
        # 초기 데이터 삽입 (시드 데이터)
        # 테스트나 개발을 위한 기본 데이터를 데이터베이스에 추가합니다
        seed_data()

    # 환경변수에서 포트 번호를 가져오거나, 없으면 사용 가능한 포트를 찾음
    port = int(os.environ.get('PORT', find_free_port()))
    
    # 개발 모드인지 확인 (FLASK_ENV 환경변수가 'development'이면 True)
    debug = os.environ.get('FLASK_ENV') == 'development'
    
    # 서버 시작 정보 출력
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
    
    # Flask 개발 서버 실행
    # host='0.0.0.0': 모든 네트워크 인터페이스에서 접근 가능
    # port: 위에서 결정한 포트 번호
    # debug: 개발 모드 활성화 여부 (True면 코드 변경 시 자동 재시작)
    app.run(host='0.0.0.0', port=port, debug=debug)
