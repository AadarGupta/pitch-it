from flask import Flask, request, jsonify
from flask_cors import CORS
from getLyrics import getLyrics, getAllLyrics
from getPitch import analyze_pitch
import os
import tempfile
import json

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "https://pitch-it.app"}})

@app.route('/hello')
def hello_world():
    return "Hello World!"

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify('No file part'), 400
    file = request.files['file']
    language_code = request.form.get('language')
    if file.filename == '':
        return jsonify('No selected file'), 400
    if file:
        temp = tempfile.NamedTemporaryFile(delete=False)
        file.save(temp.name)
        try:
            word_segments = getAllLyrics(temp.name, language_code)
            lyrics = getLyrics(word_segments)
        finally:
            os.unlink(temp.name)
        return jsonify(message='File: ' + file.filename + ' has been uploaded', lyrics=lyrics), 200

@app.route('/analyze-pitches', methods=['POST'])
def analyze_pitches():
    pitches = [{"word": "n/a", "pitch": "n/a"}]
    if 'file' not in request.files:
        return jsonify('No file part'), 400
    file = request.files['file']
    lyrics_str = request.form.get('lyrics', '[]')
    scale_str = request.form.get('scale', '[]')
    noise_reduction = request.form.get('noiseReduction') == 'true'
    lower = request.form.get('lower', 'E2')
    upper = request.form.get('upper', 'C7')
    segments = []
    scale = []
    try:
        segments = json.loads(lyrics_str)
    except json.JSONDecodeError as e:
        return jsonify('Invalid JSON in lyrics'), 400

    if file.filename == '':
        return jsonify('No selected file'), 400

    try:
        scale = json.loads(scale_str)
    except json.JSONDecodeError as e:
        return jsonify('Invalid JSON in scale'), 400

    if file:
        temp = tempfile.NamedTemporaryFile(delete=False)
        file.save(temp.name)
        audio_file = None  # Initialize audio_file as None
        try:
            pitches, audio_file = analyze_pitch(temp.name, segments, scale, noise_reduction, lower, upper)
        finally:
            os.unlink(temp.name)
        response_data = {
            'message': 'Pitches have been detected.',
            'pitches': pitches
        }
        if audio_file is not None:
            response_data['audio_file'] = audio_file
        return jsonify(response_data), 200


if __name__ == '__main__':
    app.run(debug=False)
