import React from "react";
import "./Toast.css";

function Toast({ type, message, onClose }) {
  return (
    <div className={`toast ${type}`}>
      <div className="icon">
        {type === "success" ? "✔" : "✖"}
      </div>

      <div className="content">
        <h4>{type === "success" ? "SUCCESS!" : "ERROR!"}</h4>
        <p>{message}</p>
      </div>

      <button className="close-btn" onClick={onClose}>✖</button>
    </div>
  );
}

export default Toast;