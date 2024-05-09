import React, { useState } from "react";
import { IconButton, Button } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useDispatch } from "react-redux";
import { addPost } from "../Store/Action";

const NewPost = () => {
  const dispatch = useDispatch();
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
 

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handlePostClick = async () => {
    if (image && caption) {
      try {
        // Upload image to Cloudinary
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "paf123");
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/ddvmuwi3e/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        if (!response.ok) {
          throw new Error("Failed to upload image to Cloudinary");
        }
        const data = await response.json();
        const imageUrl = data.secure_url;

        // Dispatch action to add post
        dispatch(addPost({ caption, imageUrl }));

        // Reset form
        setCaption("");
        setImage(null);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleEditPost = () => {
    // Placeholder logic for editing post
    console.log("Edit Post");
  };

  const handleDeletePost = () => {
    // Placeholder logic for deleting post
    console.log("Delete Post");
  };

  return (
    <div className="p-4 border rounded-md shadow-md bg-white">
      <textarea
        rows={4}
        placeholder="Write a caption..."
        className="w-full border border-gray-300 rounded-md p-2 mb-2"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      ></textarea>
      <div className="flex items-center mb-2">
        <input
          type="file"
          accept="image/*"
          id="image-upload"
          className="hidden"
          onChange={handleImageChange}
        />
        <label htmlFor="image-upload">
          <IconButton component="span">
            <PhotoCameraIcon />
          </IconButton>
        </label>
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Uploaded"
            className="w-20 h-20 object-cover rounded-md ml-2"
          />
        )}
      </div>
      <div className="flex items-center justify-between">
        <div>
          <IconButton onClick={handlePostClick} disabled={!image || !caption}>
            <ThumbUpIcon />
          </IconButton>

        </div>
        <div>
          <IconButton onClick={() => handleEditPost()}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeletePost()}>
            <DeleteIcon />
          </IconButton>
          <Button
            variant="contained"
            onClick={handlePostClick}
            disabled={!image || !caption}
          >
            Post
          </Button>
        </div>
      </div>

    </div>
  );
};

export default NewPost;
