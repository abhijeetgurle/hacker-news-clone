import React from "react";
import lightThemeIcon from "../assets/Light_Theme-512.png";
import darkThemeIcon from "../assets/Dark_Theme-512.png";
import "./Switch.css";

function Switch({ darkMode, onDarkModeToogle }) {
  return (
    <div className="switchToggle">
      <img src={lightThemeIcon} height="20px" alt="Light mode"></img>
      <label className="switch">
        <input type="checkbox" checked={darkMode} onChange={onDarkModeToogle} />
        <span className="slider round"></span>
      </label>
      <img src={darkThemeIcon} height="20px" alt="Dark mode"></img>
    </div>
  );
}

export default Switch;
