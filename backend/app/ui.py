from flask import Blueprint, request, render_template, current_app, flash, jsonify
from .claude_client import get_medical_analysis_from_text, get_general_assistant_response
from .file_parser import parse_attachment
from .database import get_all_medical_data, insert_medical_data, get_medical_data_count, get_analysis_by_patient
import json
import os
from werkzeug.utils import secure_filename

bp = Blueprint('ui', __name__)

@bp.route("/", methods=["GET", "POST"])
def home():
    if request.method == "POST":
        text_to_process = ""

        if 'file' in request.files:
            file = request.files['file']
            if file and file.filename:
                filename = secure_filename(file.filename)
                upload_folder = current_app.config['UPLOAD_FOLDER']
                os.makedirs(upload_folder, exist_ok=True)
                filepath = os.path.join(upload_folder, filename)
                file.save(filepath)

                try:
                    text_to_process = parse_attachment(filepath)
                except Exception as e:
                    flash(f"Error parsing file: {e}", "danger")

        if not text_to_process:
            text_to_process = request.form.get("body", "")

        if text_to_process:
            medical_analysis_dict = get_medical_analysis_from_text(text_to_process)

            if "error" in medical_analysis_dict:
                flash(f"API Error: {medical_analysis_dict['error']}", "danger")
            elif "medical_results" in medical_analysis_dict:
                count = insert_medical_data(medical_analysis_dict["medical_results"])
                flash(f"Successfully analyzed {count} medical indicators!", "success")

    all_data = get_all_medical_data()
    total_count = get_medical_data_count()

    if request.headers.get('Accept') == 'application/json':
        return jsonify({
            'all_data': all_data,
            'total_count': total_count
        })

    return render_template("index.html", all_data=all_data, total_count=total_count)

@bp.route('/patient/<patient_id>', methods=['GET'])
def patient_analysis(patient_id):
    patient_data = get_analysis_by_patient(patient_id)

    if request.headers.get('Accept') == 'application/json':
        return jsonify(patient_data)

    return render_template("patient.html", patient_data=patient_data, patient_id=patient_id)

@bp.route('/api/analysis', methods=['POST'])
def api_analysis():
    try:
        data = request.get_json()
        if not data or 'text' not in data:
            return jsonify({'error': 'No text provided'}), 400

        text = data['text']
        medical_analysis_dict = get_medical_analysis_from_text(text)

        if "error" in medical_analysis_dict:
            return jsonify({'error': medical_analysis_dict['error']}), 500

        if "medical_results" in medical_analysis_dict:
            count = insert_medical_data(medical_analysis_dict["medical_results"])
            medical_analysis_dict['inserted_count'] = count

        return jsonify(medical_analysis_dict)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/api/upload', methods=['POST'])
def api_upload():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400

        filename = secure_filename(file.filename)
        upload_folder = current_app.config['UPLOAD_FOLDER']
        os.makedirs(upload_folder, exist_ok=True)
        filepath = os.path.join(upload_folder, filename)
        file.save(filepath)

        text_to_process = parse_attachment(filepath)
        medical_analysis_dict = get_medical_analysis_from_text(text_to_process)

        if "error" in medical_analysis_dict:
            return jsonify({'error': medical_analysis_dict['error']}), 500

        if "medical_results" in medical_analysis_dict:
            count = insert_medical_data(medical_analysis_dict["medical_results"])
            medical_analysis_dict['inserted_count'] = count

        return jsonify(medical_analysis_dict)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/api/assistant', methods=['POST'])
def api_assistant():
    """API endpoint for general AI assistant."""
    try:
        data = request.get_json()
        if not data or 'text' not in data:
            return jsonify({'error': 'No text provided'}), 400
        text = data['text']
        assistant_response = get_general_assistant_response(text)
        if 'error' in assistant_response:
            return jsonify({'error': assistant_response['error']}), 500
        return jsonify({'answer': assistant_response['answer']})
    except Exception as e:
        return jsonify({'error': str(e)}), 500