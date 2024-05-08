import React, { useState } from "react";
import { Button, TextField } from "@mui/material";

const EditPost = ({ initialCaption, initialImageUrl, onSubmit, onCancel }) => {
  const [caption, setCaption] = useState(initialCaption);
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "paf123");
    fetch("https://api.cloudinary.com/v1_1/ddvmuwi3e/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        const imageUrl = data.secure_url;
        onSubmit(caption, imageUrl);
      })
      .catch((error) => console.error("Error uploading image:", error));
  };

  return (
    <div
      style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "5px" }}
    >
      <TextField
        label="Caption"
        variant="outlined"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        style={{ marginBottom: "20px", width: "100%" }}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ marginBottom: "20px" }}
      />
      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        style={{ marginRight: "10px" }}
      >
        Save
      </Button>
      <Button onClick={onCancel} variant="outlined">
        Cancel
      </Button>
    </div>
  );
};

export default EditPost;
