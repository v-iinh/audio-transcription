#pip install SpeechRecognition 
#pip install Flask 

import speech_recognition as sr
r=sr.Recognizer()

with sr.AudioFile("user input") as source:
    audio = r.listen(source)
    try:
        text = r.recognize_google(audio)
        print("Working on ...")
        print(text)
    except:
        print("Restart ...")