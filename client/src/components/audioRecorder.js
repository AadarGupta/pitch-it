import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import Select from "react-select";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faMicrophone, faStop } from '@fortawesome/free-solid-svg-icons';
import { scaleOptions, languageOptions, selectStyle, rangeOptions} from "../constants";
import logo from '../logo.png';
import "./audioRecorder.css";

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showLongProcessMessage, setShowLongProcessMessage] = useState("");
  const [selectedLanguageCode, setSelectedLanguageCode] = useState("");
  const [selectedScale, setSelectedScale] = useState("");
  const [upperRange, setUpper] = useState("C7");
  const [lowerRange, setLower] = useState("E2");
  const [pitches, setPitches] = useState([]);
  const [processedAudio, setProcessedAudio] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [noiseReduction, setNoiseReduction] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    if (pitches.length > 0 && !processedAudio) {
      setShowOverlay(true);
    }
  }, [pitches, processedAudio]);

  useEffect(() => {
    if (showOverlay) {
      generateNotes();
    }
  }, [showOverlay]);
  
  const generateNotes = () => {
    const colors = ['#F1F0F3', '#A87F4C', '#96766B'];
    const overlay = document.querySelector('.overlay');
    const notes = ['♫', '♪', '𝄢', '𝄡', '𝄞', '♩', '♬']; 
    const notesCount = 30;
  
    for (let i = 0; i < notesCount; i++) {
      let note = document.createElement('span');
      note.className = 'note';
      note.textContent = notes[Math.floor(Math.random() * notes.length)];
      note.style.left = `${Math.random() * 100}%`;
      note.style.animationDelay = `${Math.random() * 3}s`;
      note.style.animationDuration = `${3 + Math.random() * 3}s`;
      note.style.color = colors[Math.floor(Math.random() * colors.length)];
      overlay.appendChild(note);
    }
  };
  
  const handleChangeLanguage = (selectedOption) => {
    setSelectedLanguageCode(selectedOption.value);
  };

  const handleChangeScale = (selectedOption) => {
    setSelectedScale(selectedOption.value);
  };

  const handleLowerRange = (selectedOption) => {
    setLower(selectedOption.value);
  };

  const handleUpperRange = (selectedOption) => {
    setUpper(selectedOption.value);
  };

  const handleNoiseReductionChange = (event) => {
    setNoiseReduction(event.target.value === 'true');
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const submitAudio = async () => {
    if (!selectedLanguageCode || !selectedScale || !uploadedFile) {
      if (!selectedLanguageCode) {
        alert("Please select a language for the lyrics.");
      } else if (!selectedScale) {
        alert("Please select a musical key.");
      } else if (!uploadedFile) {
        alert("Please upload a file or record your audio.");
      }
      return;
    }
    await processAudio(uploadedFile);
  };

  const processAudio = async (file) => {
    setIsUploading(true);
    setShowLongProcessMessage("Uploading Audio");
    const timer = setTimeout(() => {
      setShowLongProcessMessage("Detecting Lyrics");
    }, 10000);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("language", selectedLanguageCode);
    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      let lyrics = response.data.lyrics;
      await analyzePitches(lyrics, file);
    } catch (error) {
      console.error("Error uploading file:", error.response?.data);
    } finally {
      setIsUploading(false);
      setShowLongProcessMessage("");
      clearTimeout(timer);
    }
  };

  const newAnalysis = () => {
    window.location.reload(true);
  };

  const analyzePitches = async (lyrics, file) => {
    setShowLongProcessMessage("Analyzing Pitches");

    const timer = setTimeout(() => {
      setShowLongProcessMessage("Generating Audio");
    }, 10000);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("lyrics", JSON.stringify(lyrics));
    formData.append("scale", JSON.stringify(selectedScale));
    formData.append("noiseReduction", noiseReduction);
    formData.append("lower", lowerRange);
    formData.append("upper", upperRange);
    try {
      const response = await axios.post("/api/analyze-pitches", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setPitches(response.data.pitches);
      setProcessedAudio(response.data.audio_file);
    } catch (error) {
      console.error("Error analyzing pitches:", error);
    } finally {
      clearTimeout(timer);
    }
  };

  const startRecording = async () => {
    if (!selectedLanguageCode || !selectedScale) {
      if (!selectedLanguageCode) {
        alert("Please select a language for the lyrics before recording.");
      } else if (!selectedScale) {
        alert("Please select a musical key before recording.");
      }
      return;
    }
    if (uploadedFile || isRecording) return;
    setIsRecording(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunksRef.current = [];
    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };
    mediaRecorderRef.current.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/mp3" });
      const audioFile = new File([audioBlob], "recording.mp3", { type: "audio/mp3" });
      setUploadedFile(audioFile);
    };
    
    mediaRecorderRef.current.start();
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    mediaRecorderRef.current.stop();
  };

  const hideOverlay = () => {
    setShowOverlay(false);
  };

  return (
    <div className="container">
      {isUploading ? (
        <div className="spinner-container">
          <ClipLoader color="#32343E" size={100} />
          {showLongProcessMessage && <p>{showLongProcessMessage}</p>}
        </div>
      ) : (
        <div>
          <img src={logo} className="logo" />
          <p className="light-text">If you can't hit your pitch, PitchIt!</p>
          {!uploadedFile && (
            <div>
              <p>SELECT A LANGUAGE FOR THE LYRICS & THE KEY</p>
              <div className="action-container">
                <Select
                  options={languageOptions}
                  onChange={handleChangeLanguage}
                  placeholder="LANGUAGE"
                  styles={selectStyle}
                  isDisabled={isRecording || isUploading}
                  value={languageOptions.find(option => option.value === selectedLanguageCode)}
                />
                <Select
                  options={scaleOptions}
                  onChange={handleChangeScale}
                  placeholder="KEY"
                  styles={selectStyle}
                  isDisabled={isRecording || isUploading}
                  value={scaleOptions.find(option => option.value === selectedScale)}
                />
              </div>
            </div>
          )}
          
          {selectedLanguageCode && selectedScale && !uploadedFile && (
            <div>
              <p>UPLOAD A FILE OR RECORD YOUR AUDIO</p>
              <div className="action-container">
                {!isRecording && 
                  <div>
                    <input
                      type="file"
                      id="fileInput"
                      className="file-input"
                      onChange={handleFileUpload}
                      disabled={isRecording}
                      accept="audio/*"
                    />
                    <label htmlFor="fileInput" className={`button-style primary-btn ${isRecording ? "recording" : ""}`}>
                      <FontAwesomeIcon icon={faUpload} /><span style={{ marginLeft: '10px' }}>UPLOAD</span>
                    </label>
                  </div>
                }
                <button
                  onClick={isRecording ? handleStopRecording : startRecording}
                  disabled={!!uploadedFile}
                  className='button-style red-btn'
                >
                  <FontAwesomeIcon icon={isRecording ? faStop : faMicrophone} style={{ marginRight: '10px' }} />
                  {isRecording ? 'STOP' : 'RECORD'}
                </button>
              </div>
            </div>
          )}

          {uploadedFile && pitches.length === 0 && (
            <div className="noise-reduction-container">
              <p>Would you like to reduce noise?</p>
              <div className="same-line">
                <div className="radio-option">
                  <label>
                    <input
                      type="radio"
                      name="noiseReduction"
                      value="true"
                      checked={noiseReduction === true}
                      onChange={handleNoiseReductionChange}
                    />
                    Yes
                  </label>
                </div>
                <div className="radio-option">
                  <label>
                    <input
                      type="radio"
                      name="noiseReduction"
                      value="false"
                      checked={noiseReduction === false}
                      onChange={handleNoiseReductionChange}
                    />
                    No
                  </label>
                </div>
              </div>
              <p>Enter Your Vocal Range (Optional)</p>
              <div className="same-line">
              <Select
                  options={rangeOptions}
                  onChange={handleLowerRange}
                  placeholder="Lower"
                  styles={selectStyle}
                  value={rangeOptions.find(option => option.value === lowerRange)}
                />
                <Select
                  options={rangeOptions}
                  onChange={handleUpperRange}
                  placeholder="Upper"
                  styles={selectStyle}
                  value={rangeOptions.find(option => option.value === upperRange)}
                />
              </div>
            </div>
          )}

          {showOverlay && (
            <div className="overlay">
              <div className="overlay-content">
                <p>PITCH PERFECT!</p>
                <button onClick={hideOverlay} className='button-style primary-btn'>Pitch It!</button>
              </div>
            </div>
          )}

          <div className="action-container">
            {uploadedFile && (
              <div className="audio-container">
                {processedAudio && (<h2>Original</h2>) }
                {uploadedFile && (
                  <audio controls src={URL.createObjectURL(uploadedFile)}>
                    Your browser does not support the audio element.
                  </audio>
                )}

                <div className="same-line">
                  {pitches.length > 0 && pitches.map((pitch, index) => (
                    <div key={index}>
                      <p className="pitch">{pitch.pitch}</p>
                      <p className="word">{pitch.word}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {uploadedFile && processedAudio && (<div className="divider" />)}

            {processedAudio && (
              <div className="audio-container">
                <h2>Processed</h2>

                <audio controls src={`data:audio/wav;base64,${processedAudio}`}>
                  Your browser does not support the audio element.
                </audio>

                <div className="same-line">
                  {pitches.length > 0 && pitches.map((pitch, index) => (
                    <div key={index}>
                      <p className="pitch">{pitch.closest}</p>
                      <p className="word">{pitch.word}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {uploadedFile && (
            <div className="action-container">
                <button onClick={submitAudio} disabled={!uploadedFile || isUploading} className='button-style primary-btn'>
                  ANALYZE
                </button>
                <button onClick={newAnalysis} className='button-style red-btn'>
                  RESET
                </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
};

export default AudioRecorder;
