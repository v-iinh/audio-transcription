from flask import Flask, request, render_template
import os
import speech_recognition as sr

app = (__name__)

upload_folder = 'uploads'
app.config['upload_folder', exist_ok=True]

def transcribe_audio(audio_path):
    r=sr.Recognizer()
    with sr.AudioFile("user input") as source:
        audio = r.listen(source)
        try:
            text = r.recognize_google(audio)
            return text 
        except sr.UnknownValueError: 
            return "Could not understand audio."
        except sr.RequestError as e: 
            return "Could not request results: {0}.format(e)
        
@app.route('/', methods=['GET', 'POST'])
def index():