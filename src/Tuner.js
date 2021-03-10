import React, { useState, useEffect } from "react";
import "./Tuner.css";

const Tuner = ({ frequency }) => {
  const [percentage, setParcentage] = useState(0);

  useEffect(() => {
    const perc = (frequency * 100) / 82;
    const deg = (perc - 100) * 2;
    setParcentage(deg);
    console.log(percentage);
  }, [frequency]);

  return (
    <div className="container">
      <div className="dot">
        <div
          className="cursor"
          style={{ transform: `rotate(${percentage.toString()}deg)` }}
        ></div>
      </div>
    </div>
  );
};

export default Tuner;
