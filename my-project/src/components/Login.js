import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Toast from "./Toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setToast({
        type: "error",
        message: "Please fill all fields ❌"
      });
      setTimeout(() => setToast(null), 3000);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(response.data.user));

      // ✅ SUCCESS TOAST
      setToast({
        type: "success",
        message: "Login successful 🎉"
      });

      setTimeout(() => {
        setToast(null);
        navigate("/dashboard");
      }, 2000);

    } catch (error) {
      let msg = "Login failed ❌";

      if (error.response) msg = error.response.data.message;
      else if (error.request) msg = "Server not responding 🚫";

      setToast({
        type: "error",
        message: msg
      });

      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h3>Please enter your details</h3>
        <h1>Welcome back</h1>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-btn" onClick={handleLogin}>
          Sign in
        </button>

        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
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

export default Login;