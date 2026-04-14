import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import "./VideoDetail.css";

function VideoDetail() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchVideo();
  }, []);

  const fetchVideo = async () => {
    const docRef = doc(db, "videos", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setVideo(docSnap.data());
    }
  };

  const handleLike = async () => {
    const videoRef = doc(db, "videos", id);

    await updateDoc(videoRef, {
      likes: (video.likes || 0) + 1,
    });

    fetchVideo();
  };

  const handleComment = async () => {
    if (!comment) return;

    const videoRef = doc(db, "videos", id);

    await updateDoc(videoRef, {
      comments: [...(video.comments || []), comment],
    });

    setComment("");
    fetchVideo();
  };

  if (!video) return <h2>Loading...</h2>;

  return (
    <div className="container">
      <div className="video-box">

        <h2>{video.title}</h2>

        <video src={video.url} controls />

        <p>⭐ {video.rating}</p>
        <p>Skill: {video.skill}</p>

        <button className="like-btn" onClick={handleLike}>
          ❤️ {video.likes || 0}
        </button>

        <div className="comment-box">
          <input
            type="text"
            placeholder="Add comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button onClick={handleComment}>Post</button>
        </div>

        <h3>Comments</h3>
        {(video.comments || []).map((c, i) => (
          <p key={i} className="comment">💬 {c}</p>
        ))}

      </div>
    </div>
  );
}

export default VideoDetail;