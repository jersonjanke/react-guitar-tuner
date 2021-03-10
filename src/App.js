import React, { useState } from "react";
import "./App.css";
import getUserMedia from "get-user-media-promise";
import MicrophoneStream from "microphone-stream";
import Pitchfinder from "pitchfinder";

function App() {
  const [frequency, setFrequency] = useState(0);

  const tunerHandler = () => {
    getUserMedia({ video: false, audio: true }).then((stream) => {
      const micStream = new MicrophoneStream(stream, {
        bufferSize: 4096,
      });

      micStream.on("data", (chunk) => {
        const detectPitch = new Pitchfinder.AMDF({
          maxFrequency: 800,
          minFrequency: 50,
        });

        const freq = detectPitch(MicrophoneStream.toRaw(chunk));
        if (freq) {
          setFrequency(freq * 1.088);
        }
      });
    });
  };

  return (
    <div className="App">
      <div>Guitar tuner</div>
      <p>{frequency}</p>
      <button onClick={tunerHandler}>Tuner</button>
    </div>
  );
}

export default App;
