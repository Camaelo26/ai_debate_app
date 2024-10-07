import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DebateForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faFlag, faUser, faBriefcase, faBookOpen } from '@fortawesome/free-solid-svg-icons';

const DebateForm = () => {
  const [debater1, setDebater1] = useState('');
  const [debater2, setDebater2] = useState('');
  const [referee1, setReferee1] = useState('');
  const [referee2, setReferee2] = useState('');
  const [referee3, setReferee3] = useState('');
  const [referee4, setReferee4] = useState('');
  const [topic, setTopic] = useState('');
  const [debater1Role, setDebater1Role] = useState('');
  const [debater2Role, setDebater2Role] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    // Fetch voices once they are loaded by the browser
    const loadVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };

    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices(); // Initial load
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const debateData = {
      debater1,
      debater2,
      referee1,
      referee2,
      referee3,
      referee4,
      topic,
      debater1Role,
      debater2Role,
    };

    try {
      const response = await fetch('http://localhost:3000/startDebate', {
        method: 'POST',
        body: JSON.stringify(debateData),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      setResult(result);
    } catch (error) {
      console.error('Error starting the debate:', error);
      setError('Failed to start the debate. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Text-to-Speech function using the SpeechSynthesis API
  const speak = (text, isFemale = false) => {
    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(text);
    speech.pitch = 1;
    speech.rate = 1;

    // Select a female voice if isFemale is true, otherwise select the default voice
    if (isFemale && voices.length > 0) {
      const femaleVoice = voices.find((voice) => voice.gender === 'female' || voice.name.toLowerCase().includes('female'));
      if (femaleVoice) {
        speech.voice = femaleVoice;
      } else {
        // Fallback to a female-like voice if no 'female' is found
        const fallbackFemaleVoice = voices.find((voice) => voice.lang.includes('en') && (voice.name.toLowerCase().includes('emma') || voice.name.toLowerCase().includes('kate')));
        if (fallbackFemaleVoice) {
          speech.voice = fallbackFemaleVoice;
        }
      }
    }

    window.speechSynthesis.speak(speech);
  };

  // Function to pause speech
  const pauseSpeech = () => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
    }
  };

  // Function to resume speech
  const resumeSpeech = () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  };

  // Function to stop speech
  const stopSpeech = () => {
    window.speechSynthesis.cancel();
  };

  return (
    <div>
      <video autoPlay loop muted playsInline id="bg-video">
        <source src="/debate.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="debate-container">
        <h2>Start a Debate</h2>
        <form onSubmit={handleSubmit} className="debate-form">

          <div className="form-group">
            <label>
              <FontAwesomeIcon icon={faBookOpen} /> Topic:
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder=""
              required
            />
          </div>

          <div className="form-group">
            <label>
              <FontAwesomeIcon icon={faMicrophone} /> Debater 1:
            </label>
            <select value={debater1} onChange={(e) => setDebater1(e.target.value)} required>
              <option value="">Select Debater 1</option>
              <option value="GPT-4">GPT-4</option>
              <option value="Gemini">Gemini</option>
              <option value="LLaMA">LLaMA</option>
              <option value="Gemma">Gemma</option>
              <option value="Mixtral">Mixtral</option>
              <option value="GroqLlama">GroqLlama</option>
            </select>
          </div>
          <div className="form-group">
            <label>
              <FontAwesomeIcon icon={faBriefcase} /> Debater 1 Role:
            </label>
            <input
              type="text"
              value={debater1Role}
              onChange={(e) => setDebater1Role(e.target.value)}
              placeholder="give the debater his role"
              required
            />
          </div>

          <div className="form-group">
            <label>
              <FontAwesomeIcon icon={faMicrophone} /> Debater 2:
            </label>
            <select value={debater2} onChange={(e) => setDebater2(e.target.value)} required>
              <option value="">Select Debater 2</option>
              <option value="GPT-4">GPT-4</option>
              <option value="Gemini">Gemini</option>
              <option value="LLaMA">LLaMA</option>
              <option value="Gemma">Gemma</option>
              <option value="Mixtral">Mixtral</option>
              <option value="GroqLlama">GroqLlama</option>
            </select>
          </div>
          <div className="form-group">
            <label>
              <FontAwesomeIcon icon={faBriefcase} /> Debater 2 Role:
            </label>
            <input
              type="text"
              value={debater2Role}
              onChange={(e) => setDebater2Role(e.target.value)}
              placeholder="give the debater his role(the antithesis)"
              required
            />
          </div>

          {/* Referees */}
          <div className="form-group">
            <label>
              <FontAwesomeIcon icon={faFlag} /> Referee 1:
            </label>
            <select value={referee1} onChange={(e) => setReferee1(e.target.value)} required>
              <option value="">Select Referee 1</option>
              <option value="GPT-4">GPT-4</option>
              <option value="Gemini">Gemini</option>
              <option value="LLaMA">LLaMA</option>
              <option value="Gemma">Gemma</option>
              <option value="GroqLlama">GroqLlama</option>
              <option value="Mixtral">Mixtral</option>
            </select>
          </div>

          <div className="form-group">
            <label>
              <FontAwesomeIcon icon={faFlag} /> Referee 2:
            </label>
            <select value={referee2} onChange={(e) => setReferee2(e.target.value)} required>
              <option value="">Select Referee 2</option>
              <option value="GPT-4">GPT-4</option>
              <option value="Gemini">Gemini</option>
              <option value="LLaMA">LLaMA</option>
              <option value="Gemma">Gemma</option>
              <option value="GroqLlama">GroqLlama</option>
              <option value="Mixtral">Mixtral</option>
            </select>
          </div>

          <div className="form-group">
            <label>
              <FontAwesomeIcon icon={faFlag} /> Referee 3:
            </label>
            <select value={referee3} onChange={(e) => setReferee3(e.target.value)} required>
              <option value="">Select Referee 3</option>
              <option value="GPT-4">GPT-4</option>
              <option value="Gemini">Gemini</option>
              <option value="LLaMA">LLaMA</option>
              <option value="Gemma">Gemma</option>
              <option value="GroqLlama">GroqLlama</option>
              <option value="Mixtral">Mixtral</option>
            </select>
          </div>

          <div className="form-group">
            <label>
              <FontAwesomeIcon icon={faFlag} /> Referee 4:
            </label>
            <select value={referee4} onChange={(e) => setReferee4(e.target.value)} required>
              <option value="">Select Referee 4</option>
              <option value="GPT-4">GPT-4</option>
              <option value="Gemini">Gemini</option>
              <option value="LLaMA">LLaMA</option>
              <option value="Gemma">Gemma</option>
              <option value="GroqLlama">GroqLlama</option>
              <option value="Mixtral">Mixtral</option>
            </select>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Starting Debate...' : 'Start Debate'}
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        {result && (
          <div className="debate-result">
            <h3>Debate Result</h3>
            <p>Winner: <strong>{result.winner}</strong></p>
            <p>Total Score - Debater 1: {result.debater1TotalScore}</p>
            <p>Total Score - Debater 2: {result.debater2TotalScore}</p>

            <h4>Detailed Results by Round</h4>
            {result.debateResults.map((round, index) => (
              <div key={index} className="round-details">
                <h5>
                  <FontAwesomeIcon icon={faUser} /> Round {round.round}
                </h5>
                <div className="arguments">
                  <p>
                    <FontAwesomeIcon icon={faMicrophone} /> Argument 1 (Debater 1): {round.argument1}
                    <button onClick={() => speak(round.argument1)}>
                      <span role="img" aria-label="listen">🔊</span> Listen
                    </button>
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faMicrophone} /> Argument 2 (Debater 2): {round.argument2}
                    <button onClick={() => speak(round.argument2, true)}>
                      <span role="img" aria-label="listen">🔊</span> Listen (Female Voice)
                    </button>
                  </p>

                  {/* Pause, Resume, and Stop buttons */}
                  <div className="tts-controls">
                    <button onClick={pauseSpeech}>
                      <span role="img" aria-label="pause">⏸</span> Pause
                    </button>
                    <button onClick={resumeSpeech}>
                      <span role="img" aria-label="resume">▶️</span> Resume
                    </button>
                    <button onClick={stopSpeech}>
                      <span role="img" aria-label="stop">🛑</span> Stop
                    </button>
                  </div>
                </div>

                <div className="referee-scores">
                  <h6>Referee Scores & Remarks</h6>
                  <table>
                    <thead>
                      <tr>
                        <th>Referee</th>
                        <th>Debater 1 Score</th>
                        <th>Debater 1 Remark</th>
                        <th>Debater 2 Score</th>
                        <th>Debater 2 Remark</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(round)
                        .filter((key) => key.startsWith("referee"))
                        .map((refereeKey, refIndex) => (
                          <tr key={refIndex}>
                            <td>{refereeKey}</td>
                            <td>{round[refereeKey].debater1.score}</td>
                            <td>{round[refereeKey].debater1.remark}</td>
                            <td>{round[refereeKey].debater2.score}</td>
                            <td>{round[refereeKey].debater2.remark}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DebateForm;

