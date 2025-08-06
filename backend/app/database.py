import os
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    conn = psycopg2.connect(
        host=os.environ.get("DB_HOST", "localhost"),
        dbname=os.environ.get("DB_NAME", "medical_db"),
        user=os.environ.get("DB_USER", "postgres"),
        password=os.environ.get("DB_PASSWORD", "password"),
        port=os.environ.get("DB_PORT", "5432")
    )
    return conn

def init_db():
    conn = get_db_connection()
    with conn.cursor() as cur:
        cur.execute("""
            CREATE TABLE IF NOT EXISTS medical_analysis (
                id SERIAL PRIMARY KEY,
                patient_id VARCHAR(255),
                analysis_type VARCHAR(255),
                test_name VARCHAR(255),
                value TEXT,
                unit VARCHAR(100),
                reference_range VARCHAR(255),
                status VARCHAR(50),
                priority VARCHAR(50),
                recommendations TEXT,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        """)
        cur.execute("""
            CREATE INDEX IF NOT EXISTS idx_medical_analysis_created_at 
            ON medical_analysis (created_at DESC);
        """)

        cur.execute("""
            CREATE INDEX IF NOT EXISTS idx_medical_analysis_patient_id 
            ON medical_analysis (patient_id);
        """)

        cur.execute("""
            CREATE INDEX IF NOT EXISTS idx_medical_analysis_status 
            ON medical_analysis (status);
        """)

    conn.commit()
    conn.close()
    print("✅ Medical database initialized successfully")

def insert_medical_data(analysis_results: list):
    if not analysis_results:
        return 0

    conn = get_db_connection()
    with conn.cursor() as cur:
        for result in analysis_results:
            cur.execute(
                """
                INSERT INTO medical_analysis 
                (patient_id, analysis_type, test_name, value, unit, reference_range, status, priority, recommendations)
                VALUES (%(patient_id)s, %(analysis_type)s, %(test_name)s, %(value)s, %(unit)s, %(reference_range)s, %(status)s, %(priority)s, %(recommendations)s)
                """,
                {
                    'patient_id': result.get('patient_id'),
                    'analysis_type': result.get('analysis_type'),
                    'test_name': result.get('test_name'),
                    'value': result.get('value'),
                    'unit': result.get('unit'),
                    'reference_range': result.get('reference_range'),
                    'status': result.get('status'),
                    'priority': result.get('priority'),
                    'recommendations': result.get('recommendations')
                }
            )
    conn.commit()
    count = len(analysis_results)
    conn.close()
    return count

def get_all_medical_data():
    conn = get_db_connection()
    with conn.cursor(cursor_factory=RealDictCursor) as cur:
        cur.execute("SELECT * FROM medical_analysis ORDER BY created_at DESC;")
        data = cur.fetchall()
    conn.close()
    return data

def get_medical_data_count():
    conn = get_db_connection()
    with conn.cursor() as cur:
        cur.execute("SELECT COUNT(*) FROM medical_analysis;")
        result = cur.fetchone()
        count = result[0] if result else 0
    conn.close()
    return count

def get_analysis_by_patient(patient_id: str):
    conn = get_db_connection()
    with conn.cursor(cursor_factory=RealDictCursor) as cur:
        cur.execute("SELECT * FROM medical_analysis WHERE patient_id = %s ORDER BY created_at DESC;", (patient_id,))
        data = cur.fetchall()
    conn.close()
    return data
