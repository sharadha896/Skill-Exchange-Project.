import React, { useEffect, useState } from "react";
import "./BrowseSkills.css";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

function BrowseSkills() {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const querySnapshot = await getDocs(collection(db, "videos"));
    const data = querySnapshot.docs.map(doc => doc.data());
    setVideos(data);
  };

  // 🔍 Filter
  const filtered = videos.filter(v =>
    v.skill?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="browse-container">

      <h1>Browse Skills 🎯</h1>

      {/* 🔍 Search */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by skill (React, Java...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 🎥 Cards */}
      <div className="card-grid">
        {filtered.length === 0 ? (
          <p>No videos found 🚫</p>
        ) : (
          filtered.map((video, index) => (
            <div className="card" key={index}>

              <video controls>
                <source src={video.url} type="video/mp4" />
              </video>

              <div className="card-body">
                <h3>{video.title}</h3>
                <p className="skill">{video.skill}</p>

                {/* ⭐ Rating */}
                <div className="rating">
                  {"⭐".repeat(video.rating || 0)}
                </div>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default BrowseSkills;