import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { IconButton, Button } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useDispatch } from "react-redux";
import { addPost } from "../Store/Action";

import { uploadToS3 } from "../Config/awsS3";

const NewPost = () => {
  const dispatch = useDispatch();
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);

  const S3_BUCKET_NAME = process.env.REACT_APP_S3_BUCKET_NAME;
  const S3_BUCKET_REGION = process.env.REACT_APP_S3_BUCKET_REGION;

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handlePostClick = async () => {
    if (image && caption) {
      try {
        const fileName =
          "paf_sfa_" + uuidv4() + "." + image.name.split(".").pop();
        await uploadToS3(image, fileName);
        // Upload image to Cloudinary

        //const data = await response.json();
        //const imageUrl = data.secure_url;

        // Placeholder image URL
        const imageUrl = `https://${S3_BUCKET_NAME}.s3.${S3_BUCKET_REGION}.amazonaws.com/${fileName}`;

        // Dispatch action to add post
        dispatch(addPost({ caption, imageUrl }));
        /*
        const response = await fetch("http://localhost:8080/api/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ caption, imageUrl }),
        });

        const json = await response.json();
        console.log("Post added:", json);
*/

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