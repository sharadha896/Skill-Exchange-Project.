import React from "react";
import "./Loader.css";

function Loader() {
  return (
    <div className="loader-container">

      {/* 🔵 Spinner */}
      <div className="spinner"></div>

      {/* ✨ Icons around */}
      <div className="icons">
        <span>💡</span>
        <span>💻</span>
        <span>📱</span>
        <span>🎓</span>
        <span>📚</span>
        <span>🎯</span>
      </div>

      {/* Text */}
      <p className="loading-text">Loading...</p>

    </div>
  );
}

export default Loader;