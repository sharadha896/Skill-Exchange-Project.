import React, { useState } from "react";
import axios from "axios";
import Toast from "./Toast";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState(null);

  const navigate = useNavigate();

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      showToast("error", "Fill all fields ❌");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/login", {
        email: email.trim(),
        password: password.trim(),
      });

      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.dispatchEvent(new Event("userChanged"));
      navigate("/dashboard");
    } catch (error) {
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);

      let msg = "Login failed ❌";
      if (error.response?.data?.message) {
        msg = error.response.data.message;
      } else if (error.response?.data?.error) {
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
        <h2>LOGIN</h2>

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

        <button className="signup-btn" onClick={handleLogin}>
          LOGIN
        </button>

        <p>
          New here? <a href="/signup">Register</a>
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

export default Login;