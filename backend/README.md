# EcoCampus Backend API

Flask 기반 백엔드 서버입니다.

## 설치 방법

1. Python 가상환경 생성 및 활성화:
```bash
python3.11 -m venv venv  # Python 3.11 사용
source venv/bin/activate  # macOS/Linux
# 또는
venv\Scripts\activate  # Windows
```

2. 의존성 설치:
```bash
pip install -r requirements.txt
```

**참고**: 시스템에 Python 3.11이 설치되어 있어야 합니다. 다른 버전을 사용하는 경우 `python3.11` 대신 해당 버전을 사용하세요.

## 실행 방법

```bash
python app.py
```

서버가 사용 가능한 포트(기본값: 5001~5100)에서 자동으로 실행됩니다.

**참고**: 
- macOS에서 포트 5000은 AirPlay Receiver가 사용할 수 있습니다.
- 포트가 사용 중이면 자동으로 다음 사용 가능한 포트를 찾아 실행합니다.
- 실행 시 콘솔에 실제 사용 중인 포트 번호가 표시됩니다.

## API 엔드포인트

- `GET /` - 서버 상태 확인
- `GET /api/health` - 헬스 체크

