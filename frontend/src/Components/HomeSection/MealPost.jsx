import React, { useState } from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplyModel from "./ReplyModel";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatIcon from "@mui/icons-material/Chat";
import { useDispatch } from "react-redux";
import { incrementLikes } from "../Store/Action";
import EditPost from "./EditPost";

const MealPost = ({ meal }) => {
  const dispatch = useDispatch();
  const {
    id,
    username = "John Doe",
    profileImage = "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=600",
    caption: initialCaption,
    imageUrl: initialImageUrl,
  } = meal;
  const [likes, setLikes] = useState(0);
  const [caption, setCaption] = useState(initialCaption);
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [replyModelOpen, setReplyModelOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleLikeClick = () => {
    setLikes((prevLikes) => prevLikes + 1);
    dispatch(incrementLikes());
  };

  const handleCommentClick = () => {
    setReplyModelOpen(true);
  };

  const handleEditPost = () => {
    setIsEditing(true);
  };

  const handleEditSubmit = (editedCaption, editedImageUrl) => {
    setCaption(editedCaption);
    setImageUrl(editedImageUrl);
    setIsEditing(false);
  };
  const handleDeletePost = (id) => {
    // Placeholder logic for deleting post
    console.log("Delete Post", id);
  };

  return (
    <div className="p-4 border rounded-md shadow-md bg-white margin">
      <div className="flex items-center mb-2">
        <img
          src={profileImage}
          alt="Profile"
          className="w-8 h-8 rounded-full mr-2"
        />
        <span className="font-bold mr-2">{username}</span>
      </div>
      <div className="flex items-center mb-2">
        <img
          src={imageUrl}
          alt="Uploaded"
          className="object-cover rounded-md ml-2"
        />
      </div>
      <div className="flex items-center mb-2">{caption}</div>
      <div className="flex items-center justify-between">
        <div>
          <IconButton onClick={handleEditPost}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeletePost(id)}>
            <DeleteIcon />
          </IconButton>
        </div>
        <div>
          <IconButton onClick={handleLikeClick}>
            <ThumbUpIcon />
            <span className="ml-1">{likes}</span>
          </IconButton>
          <IconButton onClick={handleCommentClick}>
            <ChatIcon />
          </IconButton>
        </div>
      </div>
      <ReplyModel
        open={replyModelOpen}
        handleClose={() => setReplyModelOpen(false)}
      />
      {isEditing && (
        <EditPost
          initialCaption={caption}
          initialImageUrl={imageUrl}
          onSubmit={handleEditSubmit}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default MealPost;
