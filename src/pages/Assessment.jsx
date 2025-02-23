import React, { useState } from "react";
import Game from "./components/Game/Game.jsx";
import "./assessment.css";


export const Assessment = () => { 
    const [fontSize, setFontSize] = useState(16);  // Default font size
    const [bgColor, setBgColor] = useState("#f5f5f5"); // Default background color
  
  return (
    <div className="App" style={{ fontSize: `${fontSize}px`, backgroundColor: bgColor }}>
      <div className="settings">
        <label>
          Font Size:
          <input
            type="range"
            min="12"
            max="30"
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
          />
        </label>

        <label>
          Background Color:
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          />
        </label>
      </div>
      <Game />
    </div>
    )};

export default Assessment;