import React, { useState } from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatIcon from "@mui/icons-material/Chat";
import { useDispatch } from "react-redux";
import { incrementLikes } from "../Store/Action";
import EditPost from "./EditPost";
import CommentModel from "./CommentModel";

const MealPost = ({ meal, onAddComment }) => {
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
  const [comments, setComments] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [commentModelOpen, setCommentModelOpen] = useState(false);

  const handleLikeClick = () => {
    setLikes((prevLikes) => prevLikes + 1);
    dispatch(incrementLikes());
  };

  const handleCommentClick = () => {
    setCommentModelOpen(true);
  };

  const handleAddComment = (comment) => {
    // Add comment to local state
    setComments([...comments, comment]);
    // Pass comment to parent component
    onAddComment(id, comment);
  };

  const handleEditPost = () => {
    setIsEditing(true);
  };

  const handleEditSubmit = (editedCaption, editedImageUrl) => {
    setCaption(editedCaption);
    setImageUrl(editedImageUrl);
    setIsEditing(false);
  };

  const handleDeletePost = () => {
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
          <IconButton onClick={handleDeletePost}>
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

      {isEditing && (
        <EditPost
          initialCaption={caption}
          initialImageUrl={imageUrl}
          onSubmit={handleEditSubmit}
          onCancel={() => setIsEditing(false)}
        />
      )}

      {comments.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold">Comments:</h3>
          {comments.map((comment, index) => (
            <div key={index} className="mt-2">
              {comment}
            </div>
          ))}
        </div>
      )}

      {commentModelOpen && (
        <CommentModel
          postId={id}
          onAddComment={handleAddComment}
          onClose={() => setCommentModelOpen(false)}
        />
      )}
    </div>
  );
};

export default MealPost;
