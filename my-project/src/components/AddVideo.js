import React, { useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import "./AddVideo.css";

function AddVideo() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [skill, setSkill] = useState("");
  const [rating, setRating] = useState("");
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleAdd = async () => {
    if (!title || !file || !skill || !rating) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    setProgress(0);

    try {
      const storageRef = ref(
        storage,
        "videos/" + Date.now() + "_" + file.name.replace(/\s+/g, "_")
      );

      // contentType ivvadam important (play avvadaniki)
      const uploadTask = uploadBytesResumable(storageRef, file, {
        contentType: file.type || "video/mp4",
      });

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(percent);
        },
        (error) => {
          console.error("UPLOAD ERROR:", error.code, error.message);
          alert("Upload failed: " + error.code);
          setLoading(false);
        },
        async () => {
          try {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("VIDEO URL:", url);

            await addDoc(collection(db, "videos"), {
              title,
              url,
              skill,
              rating: Number(rating),
              likes: 0,
              comments: [],
            });

            alert("Video uploaded successfully 🎉");

            setTitle("");
            setFile(null);
            setSkill("");
            setRating("");
            setProgress(0);
            setLoading(false);

            navigate("/dashboard");
          } catch (err) {
            console.error("FIRESTORE ERROR:", err.code, err.message);
            alert("Saving failed: " + err.code);
            setLoading(false);
          }
        }
      );
    } catch (error) {
      console.error(error);
      alert("Error uploading video");
      setLoading(false);
    }
  };

  return (
    <div className="addvideo-container">
      <div className="addvideo-card">
        <h2>Add Learning Video 🎥</h2>

        <input
          type="text"
          placeholder="Enter video title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <input
          type="text"
          placeholder="Enter skill"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />

        <input
          type="number"
          placeholder="Rating (1-5)"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        {loading && <p>Uploading... {progress}%</p>}

        <button onClick={handleAdd} className="add-btn" disabled={loading}>
          {loading ? "Uploading..." : "Upload Video 🚀"}
        </button>
      </div>
    </div>
  );
}

export default AddVideo;