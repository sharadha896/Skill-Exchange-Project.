import React, { useState } from "react";
import "./Profile.css";
function Profile() {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [name, setName] = useState(storedUser.name);
  const [email] = useState(storedUser.email);
  const [editing, setEditing] = useState(false);
  const [image, setImage] = useState(storedUser.image || "");

  // 📸 handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result); // base64 image
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const updatedUser = { ...storedUser, name, image };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setEditing(false);
    alert("Profile updated ✅");
    window.location.reload();
  };
return (
  <div className="profile-container">
    <div className="profile-card">

      <h2>My Profile 👤</h2>

      {/* Image */}
      <div className="profile-img-section">
        <img
          src={image || "https://via.placeholder.com/120"}
          alt="profile"
        />

        {editing && (
          <input type="file" onChange={handleImageChange} />
        )}
      </div>

      {/* Name */}
      <div className="profile-field">
        <label>Name</label>
        {editing ? (
          <input value={name} onChange={(e) => setName(e.target.value)} />
        ) : (
          <p>{name}</p>
        )}
      </div>

      {/* Email */}
      <div className="profile-field">
        <label>Email</label>
        <p>{email}</p>
      </div>

      {/* Buttons */}
      <div className="profile-actions">
        {editing ? (
          <button className="save-btn" onClick={handleSave}>Save</button>
        ) : (
          <button className="edit-btn" onClick={() => setEditing(true)}>
            Edit Profile
          </button>
        )}
      </div>

    </div>
  </div>
);
  
}

export default Profile;