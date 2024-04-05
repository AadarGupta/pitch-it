import librosa
import numpy as np
import noisereduce as nr
import io
import base64
import soundfile as sf
from pydub import AudioSegment, effects

def normalize_audio(y, sr):
    # Write to bytes_io stream
    byte_io = io.BytesIO()
    sf.write(byte_io, y, sr, format='wav')
    byte_io.seek(0)

    # Get audio segment and normalize it
    audio_segment = AudioSegment.from_file(byte_io, format="wav")
    normalized_audio_segment = effects.normalize(audio_segment)

    # Convert to samples (np array)
    samples = np.array(normalized_audio_segment.get_array_of_samples())
    y_normalized = librosa.util.buf_to_float(samples, dtype=np.float32)

    return y_normalized

def check_in_scale(scale, note):
    # Find frequencies of notes
    target_freq = librosa.note_to_hz(note)
    scale_freqs = librosa.note_to_hz(scale)

    # Find closest frequency
    closest_freq = min(scale_freqs, key=lambda x: abs(x - target_freq))

    # Convert it back to note
    closest_note = librosa.hz_to_note([closest_freq])
    return ''.join([i for i in closest_note[0] if not i.isdigit()])

def semitones_difference(note1, note2):
    # Find frequencies for notes
    freq1 = librosa.note_to_hz(note1)
    freq2 = librosa.note_to_hz(note2)

    # Convert frequencies to midi numbers
    midi1 = librosa.hz_to_midi(freq1)
    midi2 = librosa.hz_to_midi(freq2)

    # Calculate difference of midi numbers
    return midi2 - midi1

def find_dominant_pitch(voiced_f0):
    if voiced_f0.size > 0:
        # Find dominant pitch
        hist = np.histogram(voiced_f0, bins=50)
        idx = np.argmax(hist[0])
        dominant_pitch = hist[1][idx]
    else:
        dominant_pitch = 0

    # Find note using the frequency of dominant pitch
    note = ''.join([i for i in librosa.hz_to_note(float(dominant_pitch)) if not i.isdigit()])
    return [note]


def analyze_pitch(audio_file, segments, scale, noise_reduction, lower, upper, min_continuity_samples=5):
    not_in_key = False
    processed_audio = None
    try:
        # Load and preprocess audio
        y, sr = librosa.load(audio_file)

        # Apply noise reduction if needed
        if noise_reduction:
            y = nr.reduce_noise(y=y, sr=sr)

        # Normalize audio
        y_proc = normalize_audio(y, sr)

    # Throw an exception is not possible
    except Exception as e:
        return [{"word": "ERROR", "error": f"Error loading audio file: {str(e)}"}], None
    
    pitch_results = []
    processed_segments = []
    for segment in segments:
        # Extract segment
        start_sample = int(segment['start'] * sr)
        end_sample = int(segment['end'] * sr)
        samples = y_proc[start_sample:end_sample]
        
        # Pitch analysis
        f0, flag, probs = librosa.pyin(samples, sr=sr, fmin=librosa.note_to_hz(lower), fmax=librosa.note_to_hz(upper))
        voiced_f0 = f0[flag]

        musical_notes = [''.join([i for i in librosa.hz_to_note(pitch) if not i.isdigit()]) for pitch in voiced_f0]

        # Find duplicated notes with at least 5 consecutive samples of continuity
        duplicated_notes = []
        closest_notes = []
        current_note = None
        continuity_count = 0
        for note in musical_notes:
            if note == current_note:
                continuity_count += 1
                if continuity_count >= min_continuity_samples and note not in duplicated_notes:
                    duplicated_notes.append(note)
                    if(not note in scale):
                        not_in_key = True
                        closest = check_in_scale(scale, note)
                        closest_notes.append(closest)
                    else:
                        closest_notes.append(note)
            else:
                current_note = note
                continuity_count = 1           

        if len(duplicated_notes) < 1:
            duplicated_notes = find_dominant_pitch(voiced_f0)

        if len(closest_notes) < 1:
            note = duplicated_notes[0]
            if(not note in scale):
                not_in_key = True
                closest = check_in_scale(scale, note)
                closest_notes.append(closest)
            else:
                closest_notes.append(note)

        
        semitones = semitones_difference(duplicated_notes[0], closest_notes[0])
        adj_recording = librosa.effects.pitch_shift(samples, sr=sr, n_steps=semitones)
        processed_segments.append(adj_recording)


        pitch_results.append({"word": segment['word'], "pitch": ' '.join(duplicated_notes), "closest": ' '.join(closest_notes)})
    
    # Return processed_audio if needed
    if(not_in_key):
        # Combine segments
        combined_audio = np.concatenate(processed_segments)
        
        # Convert to base64
        with io.BytesIO() as buffer:
            sf.write(buffer, combined_audio, sr, format='FLAC')
            buffer.seek(0)
            processed_audio = base64.b64encode(buffer.read()).decode('utf-8')
        
    return pitch_results, processed_audio