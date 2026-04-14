import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">

      {/* 🔥 HERO SECTION */}
      <div className="hero">
        <div className="hero-left">
          <h1>Learn and Share Skills</h1>
          <p>
            Upload videos, gain knowledge, and connect with other learners around the world.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary" onClick={()=>navigate("/signup")}>Get Started ▶</button>
          </div>
        </div>

        <div className="hero-right">
         <img 
  src="https://img.freepik.com/premium-vector/group-students-explores-various-concepts-online-sharing-knowledge-ideas-together-students-use-internet-find-ideas-their-studies_585735-47149.jpg?w=360"
  alt="learning" 
/>
        </div>
      </div>

      {/* 🔥 STATS */}
      <div className="stats">
        <div className="stat-card">
          <h2>4,000+</h2>
          <p>Active Users</p>
        </div>

        <div className="stat-card">
          <h2>1,200+</h2>
          <p>Videos Uploaded</p>
        </div>

        <div className="stat-card">
          <h2>500+</h2>
          <p>Skills Shared</p>
        </div>
      </div>

      {/* 🔥 VIDEOS */}
      <div className="videos-section">
        <h2>Popular Learning Videos</h2>

        <div className="video-cards">

          <div className="video-card">
            <iframe
              src="https://www.youtube.com/embed/Ke90Tje7VS0"
              title="React"
            ></iframe>
            <p>React JS Full Course</p>
          </div>

          <div className="video-card">
            <iframe
              src="https://www.youtube.com/embed/Oe421EPjeBE"
              title="Node"
            ></iframe>
            <p>Node.js Tutorial</p>
          </div>

          <div className="video-card">
            <iframe
              src="https://www.youtube.com/embed/zJSY8tbf_ys"
              title="JS"
            ></iframe>
            <p>JavaScript Basics</p>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Home;