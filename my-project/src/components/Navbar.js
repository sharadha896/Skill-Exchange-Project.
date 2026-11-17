import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const load = () => {
      const saved = localStorage.getItem("user");
      setUser(saved ? JSON.parse(saved) : null);
    };
    load();
    window.addEventListener("userChanged", load);
    return () => window.removeEventListener("userChanged", load);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userChanged"));
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="logo" onClick={() => navigate("/")}>
        <span>🔁</span> SkillSwap
      </div>

      <ul className="nav-menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/browse">Browse Skills</Link></li>
        <li><Link to="/add-video">Add Video</Link></li>
        <li><Link to="/courses">All Courses</Link></li>
      </ul>

      <div className="nav-buttons">
        {user ? (
          <>
            <div
              className="profile-section"
              onClick={() => navigate("/dashboard")}
            >
              <img
                src={user.image || "https://via.placeholder.com/40"}
                alt="profile"
                className="profile-img"
              />
            </div>
            <button className="logout" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="login">Login</Link>
            <Link to="/signup" className="signup">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;