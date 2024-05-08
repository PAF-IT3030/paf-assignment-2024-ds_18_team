import React, { useState } from "react";
import { IconButton, Button } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatIcon from "@mui/icons-material/Chat";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplyModel from "./ReplyModel";
import { useDispatch } from "react-redux";
import { addPost } from "../Store/Actions"; // Assuming your action is in this file

const MealPost = () => {
  const dispatch = useDispatch();
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [openReplyModel, setOpenReplyModel] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handlePostClick = () => {
    if (image && caption) {
      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("image", image);
      dispatch(addPost(formData));
      setCaption("");
      setImage(null);
    }
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
          <IconButton onClick={() => setOpenReplyModel(true)}>
            <ChatIcon />
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
      <ReplyModel
        open={openReplyModel}
        handleClose={() => setOpenReplyModel(false)}
      />
    </div>
  );
};

export default MealPost;
