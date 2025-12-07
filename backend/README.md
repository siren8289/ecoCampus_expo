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

## 데이터베이스 설정

이 프로젝트는 PostgreSQL을 사용합니다.

### PostgreSQL 설치 및 데이터베이스 생성

1. PostgreSQL이 설치되어 있는지 확인:
```bash
psql --version
```

2. PostgreSQL 데이터베이스 생성:
```bash
# PostgreSQL에 접속
psql -U postgres

# 데이터베이스 생성
CREATE DATABASE ecocampus;

# 종료
\q
```

### 환경변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 중 하나의 방법으로 설정:

**방법 1: DATABASE_URL 사용 (권장)**
```env
DATABASE_URL=postgresql+psycopg2://username:password@localhost:5432/ecocampus
```

**방법 2: 개별 환경변수 사용**
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ecocampus
DB_USER=postgres
DB_PASSWORD=your_password
```

**참고**: `.env` 파일은 `.gitignore`에 포함되어 있어 Git에 커밋되지 않습니다.

## 데이터베이스 확인 방법

### 방법 1: Python 스크립트 사용 (권장)

**⚠️ 중요: 가상환경을 먼저 활성화해야 합니다!**

```bash
# 1. 가상환경 활성화 (아직 안 했다면)
source venv/bin/activate  # macOS/Linux
# 또는
venv\Scripts\activate  # Windows

# 2. 스크립트 실행
cd backend
python utils/db_inspect.py list
```

프로젝트에 포함된 `db_inspect.py` 유틸리티를 사용하여 데이터베이스를 확인할 수 있습니다:

```bash
# 모든 테이블 목록 보기
python utils/db_inspect.py list

# 모든 테이블 정보 요약
python utils/db_inspect.py info

# 특정 테이블 구조 확인
python utils/db_inspect.py structure users

# 특정 테이블 데이터 확인 (기본 10개)
python utils/db_inspect.py data missions

# 더 많은 데이터 확인 (20개)
python utils/db_inspect.py data missions 20

# 직접 SQL 쿼리 실행
python utils/db_inspect.py query "SELECT * FROM users LIMIT 5"
```

### 방법 2: psql 명령어 사용

PostgreSQL의 `psql` 명령어를 직접 사용할 수도 있습니다:

```bash
# 데이터베이스에 접속
psql -U postgres -d ecocampus

# 또는 환경변수에서 정보 가져오기
psql $DATABASE_URL
```

psql 내에서 사용할 수 있는 명령어:
```sql
-- 모든 테이블 목록
\dt

-- 특정 테이블 구조 확인
\d users

-- 테이블 데이터 확인
SELECT * FROM users LIMIT 10;

-- 테이블 행 수 확인
SELECT COUNT(*) FROM users;

-- 종료
\q
```

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

