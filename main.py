from flask import Flask, request, render_template
import os
import speech_recognition as sr

app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = 'uploads'

def transcribe_audio(audio_path):
    r = sr.Recognizer()
    with sr.AudioFile(audio_path) as source:
        audio = r.listen(source)
        try:
            text = r.recognize_google(audio)
            return text
        except sr.UnknownValueError:
            return "Could not understand audio."
        except sr.RequestError as e:
            return f"Could not request results: {e}"

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        if 'file' not in request.files:
            return "File Not Found"

        file = request.files['file']

        if file.filename == '':
            return "No selected file"
        if file:
            audio_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
            file.save(audio_path)

            transcription = transcribe_audio(audio_path)
            os.remove(audio_path)

            return "Transcription: " + transcription

    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
