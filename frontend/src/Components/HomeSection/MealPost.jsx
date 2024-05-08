import React from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplyModel from "./ReplyModel";
import { useDispatch } from "react-redux";

const MealPost = ({ meal }) => {
  const dispatch = useDispatch();
  const { caption, imageUrl } = meal;

  const handleEditPost = () => {
    // Placeholder logic for editing post
    console.log("Edit Post");
  };

  const handleDeletePost = () => {
    // Placeholder logic for deleting post
    console.log("Delete Post");
  };

  return (
    <div className="p-4 border rounded-md shadow-md bg-white margin">
      <div className="flex items-center mb-2">{caption}</div>
      {imageUrl && (
        <div className="flex items-center mb-2">
          <img
            src={imageUrl}
            alt="Uploaded"
            className="w-20 h-20 object-cover rounded-md ml-2"
          />
        </div>
      )}
      <div className="flex items-center justify-between">
        <div>
          <IconButton onClick={() => handleEditPost()}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeletePost()}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
      <ReplyModel />
    </div>
  );
};

export default MealPost;
