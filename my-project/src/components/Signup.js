import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";
import Toast from "./Toast";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState(null);

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setToast({
        type: "error",
        message: "Fill all fields ❌"
      });
      setTimeout(() => setToast(null), 3000);
      return;
    }

    try {
      await axios.post("http://localhost:5000/register", {
        name,
        email,
        password,
        skillsOffered: ["React"],
        skillsWanted: ["Node"]
      });

      // ✅ SUCCESS
      setToast({
        type: "success",
        message: "Registration successful 🎉"
      });

      setTimeout(() => {
        setToast(null);
        navigate("/login");
      }, 2000);

    } catch (error) {
      let msg = "Registration failed ❌";

      if (error.response) msg = error.response.data.error;

      setToast({
        type: "error",
        message: msg
      });

      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>CREATE ACCOUNT</h2>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="signup-btn" onClick={handleRegister}>
          SIGN UP
        </button>

        <p>
          Already have account? <a href="/login">Login</a>
        </p>
      </div>

      {/* ✅ TOAST */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default Signup;