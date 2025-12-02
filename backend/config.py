"""Flask 애플리케이션 설정"""
import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    """기본 설정"""
    SQLALCHEMY_DATABASE_URI = os.getenv(
        'DATABASE_URL', 'sqlite:///ecocampus.db'
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False




