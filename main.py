#pip install SpeechRecognition 
#conda istall pyaudios

import speech_recognition as sr
r=sr.Recognizer()

with sr.AudioFile(eng_m7.wav) as source:
    audio = r.listen(source)
    try:
        text = r.recognize_google(audio)
        print("Working on ...")
        print(text)
    except:
        print("sorry run again...")