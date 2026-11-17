import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    if (localStorage.getItem("user")) navigate("/dashboard");
  }, [navigate]);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const handleRegister = async () => {
    if (!name || !email || !password) {
      showToast("error", "Fill all fields ❌");
      return;
    }

    try {
      await axios.post("http://localhost:5000/register", {
        name,
        email,
        password,
        skillsOffered: ["React"],
        skillsWanted: ["Node"],
      });

      showToast("success", "Registration successful 🎉");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);

      let msg = "Registration failed ❌";
      if (error.response?.data?.error) {
        msg = error.response.data.error;
      } else if (error.message === "Network Error") {
        msg = "Backend run avvatledu ❌";
      }
      showToast("error", msg);
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