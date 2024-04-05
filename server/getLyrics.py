import whisper
from pydub import AudioSegment
import datetime

def getAllLyrics(file, language):
    # Load the Whisper model
    model = whisper.load_model("medium")

    options = {
        "language": language,
        "verbose": True,
        "word_timestamps": True
    }

    # Transcribe the audio and obtain the JSON result with word timestamps
    result = model.transcribe(file, **options)  

    return result['segments']

def getLyrics(segments):
    lyrics = []

    # Loop through each segment
    for segment in segments:
        # Loop through each word
        for word in segment['words']:
            # Set start and end for each word
            start = word['start']
            end = word['end']
            text = word['word']
            lyric = {
                "word": text,
                "start": start,
                "end": end
            }
            lyrics.append(lyric)

    return lyrics