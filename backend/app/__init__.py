from flask import Flask
from flask_cors import CORS
import os

def create_app():
    app = Flask(__name__)

    CORS(app,
         origins=[
             "http://localhost:3000",
             "http://127.0.0.1:3000",
             "http://192.168.0.103:3000",
             "http://192.168.1.103:3000",
             "http://0.0.0.0:3000",
             "http://10.5.50.227:3000",
             "http://10.5.50.227:5001"

         ],
         supports_credentials=False,
         methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
         allow_headers=["Content-Type", "Authorization", "Accept"],
         expose_headers=["Content-Type", "Authorization"]
         )

    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key')
    app.config['UPLOAD_FOLDER'] = 'uploads'

    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

    from .ui import bp as ui_bp
    app.register_blueprint(ui_bp)

    return app
app = create_app()

__all__ = [
    "file_parser",
    "claude_client",
    "ui",
    "google_docs_parser",
    "database"
]