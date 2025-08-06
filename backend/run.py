import sys
import os
from dotenv import load_dotenv

load_dotenv()

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '.')))
from app import app
from app.database import init_db

try:
    init_db()
    print("Database initialized successfully.")
except Exception as e:
    print(f"Failed to initialize database: {e}")

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5001)