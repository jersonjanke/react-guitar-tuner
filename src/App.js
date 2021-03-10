import React, { useState, useEffect } from "react";
import "./App.css";
import getUserMedia from "get-user-media-promise";
import MicrophoneStream from "microphone-stream";
import Pitchfinder from "pitchfinder";
import Tuner from "./Tuner";

function App() {
  const [frequency, setFrequency] = useState(0);

  useEffect(() => {
    tunerHandler();
  }, []);

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
          setFrequency(freq);
        }
      });
    });
  };

  return (
    <div className="App">
      <Tuner frequency={frequency} />
    </div>
  );
}

export default App;
