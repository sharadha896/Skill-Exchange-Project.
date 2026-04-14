import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="navbar">

      {/* Logo */}
      <div className="logo" onClick={() => navigate("/")}>
        <span>🔁</span> SkillSwap
      </div>

      {/* Menu */}
      <ul className="nav-menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/browse">Browse Skills</Link></li>
        <li><Link to="/add-video">Add Video</Link></li>
        <li><Link to="/courses">All Courses</Link></li>
      </ul>

      {/* Right side */}
      <div className="nav-buttons">
        {user ? (
          <>
            {/* 👤 Profile Section */}
            <div 
              className="profile-section"
              onClick={() => navigate("/dashboard")} // ✅ goes to dashboard
            >
              <img
                src={user.image || "https://via.placeholder.com/40"}
                alt="profile"
                className="profile-img"
              />
            
            </div>

            {/* 🔥 Logout */}
            
          </>
        ) : (
          <>
            <Link to="/login" className="login">Login</Link>
            <Link to="/signup" className="signup">Sign Up</Link>
            <Link to="/add-course" className="add-course">Add Course</Link>

          </>
        )}
      </div>

    </div>
  );
}

export default Navbar;