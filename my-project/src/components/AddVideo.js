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

  const navigate = useNavigate();

  const handleAdd = async () => {
    if (!title || !file || !skill || !rating) {
      alert("Please fill all fields");
      return;
    }

    try {
      const storageRef = ref(storage, "videos/" + Date.now() + file.name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        () => {
          console.log("Uploading...");
        },
        (error) => {
          console.error(error);
          alert("Upload failed");
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);

          console.log("VIDEO URL:", url);

          await addDoc(collection(db, "videos"), {
            title,
            url,
            skill,
            rating: Number(rating),
            likes:0,
            comments:[]
          });

          alert("Video uploaded successfully 🎉");

          setTitle("");
          setFile(null);
          setSkill("");
          setRating("");

          navigate("/dashboard");
        }
      );

    } catch (error) {
      console.error(error);
      alert("Error uploading video");
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
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button onClick={handleAdd} className="add-btn">
          Upload Video 🚀
        </button>

      </div>
    </div>
  );
}

export default AddVideo;