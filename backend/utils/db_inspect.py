"""데이터베이스 테이블 확인 유틸리티"""
import sys
import os

# 가상환경 체크
def check_venv():
    """가상환경이 활성화되어 있는지 확인"""
    if not hasattr(sys, 'real_prefix') and not (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix):
        print("⚠️  경고: 가상환경이 활성화되지 않았습니다.")
        print("다음 명령어로 가상환경을 활성화해주세요:")
        print("  source venv/bin/activate  # macOS/Linux")
        print("  또는")
        print("  venv\\Scripts\\activate  # Windows")
        print("\n가상환경이 없다면 먼저 생성하세요:")
        print("  python3.11 -m venv venv")
        print()
        response = input("그래도 계속하시겠습니까? (y/N): ")
        if response.lower() != 'y':
            sys.exit(1)

try:
    from flask import Flask
    from config import Config
    from models import db
    from sqlalchemy import inspect, text
except ImportError as e:
    print(f"❌ 모듈을 불러올 수 없습니다: {e}")
    print("\n가상환경을 활성화하고 의존성을 설치해주세요:")
    print("  1. source venv/bin/activate")
    print("  2. pip install -r requirements.txt")
    sys.exit(1)

# Flask 앱 생성
app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)


def list_tables():
    """모든 테이블 목록 출력"""
    with app.app_context():
        inspector = inspect(db.engine)
        tables = inspector.get_table_names()
        print("\n=== 데이터베이스 테이블 목록 ===")
        for i, table in enumerate(tables, 1):
            print(f"{i}. {table}")
        print(f"\n총 {len(tables)}개의 테이블이 있습니다.\n")
        return tables


def show_table_structure(table_name):
    """특정 테이블의 구조 출력"""
    with app.app_context():
        inspector = inspect(db.engine)
        if table_name not in inspector.get_table_names():
            print(f"❌ 테이블 '{table_name}'을 찾을 수 없습니다.")
            return
        
        columns = inspector.get_columns(table_name)
        primary_keys = inspector.get_primary_keys(table_name)
        foreign_keys = inspector.get_foreign_keys(table_name)
        
        print(f"\n=== 테이블: {table_name} ===")
        print("\n[컬럼 정보]")
        for col in columns:
            pk_mark = " (PK)" if col['name'] in primary_keys else ""
            nullable = "NULL" if col['nullable'] else "NOT NULL"
            default = f" DEFAULT {col['default']}" if col['default'] is not None else ""
            print(f"  - {col['name']}: {col['type']}{pk_mark} {nullable}{default}")
        
        if foreign_keys:
            print("\n[외래키]")
            for fk in foreign_keys:
                print(f"  - {fk['constrained_columns']} -> {fk['referred_table']}.{fk['referred_columns']}")
        
        print()


def show_table_data(table_name, limit=10):
    """특정 테이블의 데이터 출력"""
    with app.app_context():
        inspector = inspect(db.engine)
        if table_name not in inspector.get_table_names():
            print(f"❌ 테이블 '{table_name}'을 찾을 수 없습니다.")
            return
        
        # 테이블 데이터 조회
        result = db.session.execute(text(f"SELECT * FROM {table_name} LIMIT {limit}"))
        rows = result.fetchall()
        columns = result.keys()
        
        if not rows:
            print(f"\n테이블 '{table_name}'에 데이터가 없습니다.\n")
            return
        
        print(f"\n=== 테이블: {table_name} (최대 {limit}개 행) ===")
        
        # 컬럼명 출력
        print("\n" + " | ".join(str(col) for col in columns))
        print("-" * 80)
        
        # 데이터 출력
        for row in rows:
            print(" | ".join(str(val) if val is not None else "NULL" for val in row))
        
        # 전체 행 수 확인
        count_result = db.session.execute(text(f"SELECT COUNT(*) FROM {table_name}"))
        total_count = count_result.scalar()
        print(f"\n총 {total_count}개의 행이 있습니다. (표시: {len(rows)}개)\n")


def show_all_tables_info():
    """모든 테이블의 구조와 행 수 출력"""
    with app.app_context():
        inspector = inspect(db.engine)
        tables = inspector.get_table_names()
        
        print("\n=== 모든 테이블 정보 ===\n")
        for table in tables:
            # 행 수 조회
            count_result = db.session.execute(text(f"SELECT COUNT(*) FROM {table}"))
            row_count = count_result.scalar()
            
            # 컬럼 수 조회
            columns = inspector.get_columns(table)
            
            print(f"📊 {table}")
            print(f"   - 컬럼 수: {len(columns)}")
            print(f"   - 행 수: {row_count}")
            print()


def run_query(query):
    """사용자 정의 SQL 쿼리 실행"""
    with app.app_context():
        try:
            result = db.session.execute(text(query))
            
            # SELECT 쿼리인 경우
            if query.strip().upper().startswith('SELECT'):
                rows = result.fetchall()
                columns = result.keys()
                
                if not rows:
                    print("\n결과가 없습니다.\n")
                    return
                
                print("\n=== 쿼리 결과 ===")
                print("\n" + " | ".join(str(col) for col in columns))
                print("-" * 80)
                
                for row in rows:
                    print(" | ".join(str(val) if val is not None else "NULL" for val in row))
                print(f"\n총 {len(rows)}개의 행이 반환되었습니다.\n")
            else:
                # INSERT, UPDATE, DELETE 등
                db.session.commit()
                print(f"\n✅ 쿼리가 성공적으로 실행되었습니다.\n")
        except Exception as e:
            print(f"\n❌ 오류 발생: {e}\n")
            db.session.rollback()


def main():
    """메인 함수"""
    # 가상환경 체크 (필요한 모듈이 없을 때만 경고)
    try:
        import flask
    except ImportError:
        check_venv()
    
    if len(sys.argv) < 2:
        print("""
사용법:
  python utils/db_inspect.py list                    # 모든 테이블 목록
  python utils/db_inspect.py info                    # 모든 테이블 정보 요약
  python utils/db_inspect.py structure <테이블명>    # 테이블 구조 확인
  python utils/db_inspect.py data <테이블명> [개수]   # 테이블 데이터 확인 (기본 10개)
  python utils/db_inspect.py query "<SQL 쿼리>"      # SQL 쿼리 실행

예시:
  python utils/db_inspect.py list
  python utils/db_inspect.py structure users
  python utils/db_inspect.py data missions 20
  python utils/db_inspect.py query "SELECT * FROM users LIMIT 5"
        """)
        return
    
    command = sys.argv[1].lower()
    
    if command == 'list':
        list_tables()
    elif command == 'info':
        show_all_tables_info()
    elif command == 'structure':
        if len(sys.argv) < 3:
            print("❌ 테이블명을 입력해주세요.")
            print("사용법: python utils/db_inspect.py structure <테이블명>")
            return
        show_table_structure(sys.argv[2])
    elif command == 'data':
        if len(sys.argv) < 3:
            print("❌ 테이블명을 입력해주세요.")
            print("사용법: python utils/db_inspect.py data <테이블명> [개수]")
            return
        limit = int(sys.argv[3]) if len(sys.argv) > 3 else 10
        show_table_data(sys.argv[2], limit)
    elif command == 'query':
        if len(sys.argv) < 3:
            print("❌ SQL 쿼리를 입력해주세요.")
            print('사용법: python utils/db_inspect.py query "SELECT * FROM users"')
            return
        run_query(sys.argv[2])
    else:
        print(f"❌ 알 수 없는 명령어: {command}")


if __name__ == '__main__':
    main()

