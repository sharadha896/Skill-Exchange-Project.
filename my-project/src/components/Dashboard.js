import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import "./Dashboard.css";
import Loader from "./Loader";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setLoading(true);

      const startTime = Date.now();

      const querySnapshot = await getDocs(collection(db, "videos"));
      const videoList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setVideos(videoList);

      const endTime = Date.now();
      const timeTaken = endTime - startTime;

      const remainingTime = 1000 - timeTaken;

      setTimeout(() => {
        setLoading(false);
      }, remainingTime > 0 ? remainingTime : 0);

    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // ❤️ LIKE FUNCTION
  const handleLike = async (videoId, currentLikes) => {
    const videoRef = doc(db, "videos", videoId);

    await updateDoc(videoRef, {
      likes: currentLikes + 1,
    });

    fetchVideos();
  };

  // 💬 COMMENT FUNCTION
  const handleComment = async (videoId, text) => {
    if (!text) return;

    const videoRef = doc(db, "videos", videoId);
    const video = videos.find((v) => v.id === videoId);

    await updateDoc(videoRef, {
      comments: [...(video.comments || []), text],
    });

    fetchVideos();
  };

  if (loading) return <Loader />;
  if (!user) return <h2>Please login first</h2>;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard">

      {/* Sidebar */}
      <div className="sidebar">
        <h2>SkillSwap</h2>
        <p onClick={() => navigate("/dashboard")}>Dashboard</p>
        <p onClick={() => navigate("/add-video")}>Add Video</p>
        <p onClick={() => navigate("/users")}>Users</p>
        <p onClick={handleLogout}>Logout</p>
      </div>

      {/* Main */}
      <div className="main">

        {/* Cards */}
        <div className="cards">
          <div className="card">
            <h4>Total Videos</h4>
            <p>{videos.length}</p>
          </div>

          <div className="card">
            <h4>User</h4>
            <p>{user.name}</p>
          </div>

          <div className="card">
            <h4>Skills</h4>
            <p>{user.skillsOffered?.length || 0}</p>
          </div>

          <div className="card">
            <h4>Status</h4>
            <p>Active</p>
          </div>
        </div>

        {/* Middle */}
        <div className="middle">
          <div className="box">
            <h3>Profile Info</h3>
            <p><b>Email:</b> {user.email}</p>
            <p><b>Skills:</b> {user.skillsOffered?.join(", ")}</p>

            <button onClick={() => navigate("/profile")} className="edit-btn">
              Edit Profile ✏️
            </button>
          </div>

          <div className="box">
            <h3>Activity</h3>
            <p>Total Videos: {videos.length}</p>
            <p>Status: Active User</p>
          </div>
        </div>

        {/* Videos */}
        <h3 style={{ marginTop: "20px" }}>Videos 🎥</h3>

        <div className="video-grid">
          {videos.length === 0 ? (
            <p>No videos yet 🚀</p>
          ) : (
            videos.map((video) => (
              <div className="video-card" key={video.id}>
                <p><b>{video.title}</b></p>

                <video 
                src={video.url} 
                controls
                 width="100%" 
                  onClick={()=> navigate(`/video/${video.id}`)}
                   style={{ cursor:"pointer"}}
                   />

                <p>⭐ {video.rating}</p>

                {/* ❤️ LIKE */}
                <button onClick={() => handleLike(video.id, video.likes || 0)}>
                  ❤️ {video.likes || 0}
                </button>

                {/* 💬 COMMENT INPUT */}
                <input
                  type="text"
                  placeholder="Add comment"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleComment(video.id, e.target.value);
                      e.target.value = "";
                    }
                  }}
                />

                {/* 💬 COMMENTS */}
                <div>
                  {(video.comments || []).map((c, i) => (
                    <p key={i}>💬 {c}</p>
                  ))}
                </div>

              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;