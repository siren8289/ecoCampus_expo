"""
Flask 애플리케이션 설정

이 모듈은 애플리케이션의 설정을 관리합니다.
환경변수에서 데이터베이스 연결 정보를 읽어와서
SQLAlchemy가 사용할 수 있는 형태로 구성합니다.
"""
import os
from dotenv import load_dotenv

# .env 파일에서 환경변수 로드
# .env 파일은 프로젝트 루트에 위치하며, 민감한 정보를 저장합니다
load_dotenv()


class Config:
    """
    Flask 애플리케이션 설정 클래스
    
    이 클래스는 Flask 앱의 모든 설정을 포함합니다.
    주로 데이터베이스 연결 설정을 다룹니다.
    """
    
    # PostgreSQL 데이터베이스 개별 설정
    # 환경변수에서 값을 읽어오고, 없으면 기본값을 사용합니다
    DB_HOST = os.getenv('DB_HOST', 'localhost')      # 데이터베이스 호스트 (기본값: localhost)
    DB_PORT = os.getenv('DB_PORT', '5432')           # 데이터베이스 포트 (기본값: 5432, PostgreSQL 기본 포트)
    DB_NAME = os.getenv('DB_NAME', 'ecocampus')      # 데이터베이스 이름 (기본값: ecocampus)
    DB_USER = os.getenv('DB_USER', 'postgres')        # 데이터베이스 사용자명 (기본값: postgres)
    DB_PASSWORD = os.getenv('DB_PASSWORD', '')       # 데이터베이스 비밀번호 (기본값: 빈 문자열)
    
    # DATABASE_URL 환경변수 확인
    # DATABASE_URL이 설정되어 있으면 우선적으로 사용합니다
    # 이는 Heroku, Railway 등 클라우드 플랫폼에서 자주 사용하는 방식입니다
    DATABASE_URL = os.getenv('DATABASE_URL')
    
    if DATABASE_URL:
        # DATABASE_URL이 있으면 그대로 사용
        # 형식: postgresql+psycopg2://user:password@host:port/database
        SQLALCHEMY_DATABASE_URI = DATABASE_URL
    else:
        # DATABASE_URL이 없으면 개별 환경변수로부터 연결 문자열 생성
        # psycopg2는 PostgreSQL용 Python 어댑터입니다
        SQLALCHEMY_DATABASE_URI = f'postgresql+psycopg2://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}'
    
    # SQLAlchemy 설정
    # False로 설정하면 객체 변경 추적을 비활성화하여 성능을 향상시킵니다
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # SQLAlchemy 엔진 옵션
    SQLALCHEMY_ENGINE_OPTIONS = {
        'pool_pre_ping': True,   # 연결이 살아있는지 확인 후 사용 (연결 끊김 방지)
        'pool_recycle': 300,     # 300초(5분) 후 연결을 재사용하지 않고 새로 생성
    }




