import React, { useState, useEffect } from "react";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatIcon from "@mui/icons-material/Chat";
import { useDispatch } from "react-redux";
import {
  incrementLikes,
  deletePost,
  deletePostFailure,
  updatePost,
} from "../Store/Action";
import EditPost from "./EditPost";
import CommentModel from "./CommentModel";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const MealPost = ({ meal, onAddComment }) => {
  const dispatch = useDispatch();

  // Destructure meal object safely with default values
  const {
    username = "John Doe",
    profileImage = "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=600",
    data: { id, caption, imageUrl } = {},
  } = meal || {}; // Ensure meal is defined before destructuring

  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [commentModelOpen, setCommentModelOpen] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  // Declare state variables for id, caption, and imageUrl
  const [postId, setPostId] = useState(id);
  const [postCaption, setPostCaption] = useState(caption);
  const [postImageUrl, setPostImageUrl] = useState(imageUrl);

  useEffect(() => {
    // Update local state when meal prop changes
    if (meal) {
      const { id, caption, imageUrl } = meal;
      setPostId(id);
      setPostCaption(caption);
      setPostImageUrl(imageUrl);
    }
  }, [meal]);

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
    onAddComment(postId, comment);
  };

  const handleEditPost = () => {
    setIsEditing(true);
  };

  const handleEditSubmit = async (editedCaption, editedImageUrl) => {
    try {
      // Dispatch the updatePost action with the edited post data
      dispatch(
        updatePost(postId, { caption: editedCaption, imageUrl: editedImageUrl })
      );
      setIsEditing(false);
      toast.success("Post updated successfully!"); // Display success toast
    } catch (error) {
      console.error("Error updating post:", error);
      // Handle error if update fails
      toast.error("Error updating post. Please try again later."); // Display error toast
    }
  };

  const handleDeletePost = () => {
    // Open the delete confirmation dialog
    setDeleteConfirmationOpen(true);
  };

  const handleConfirmDelete = () => {
    // Dispatch the deletePost action with the postId
    dispatch(deletePost(postId))
      .then(() => {
        toast.success("Post deleted successfully!"); // Display success toast
      })
      .catch((error) => {
        // Handle delete post failure
        dispatch(deletePostFailure(error));
        toast.error("Error deleting post. Please try again later.");
      })
      .finally(() => {
        // Close the delete confirmation dialog
        setDeleteConfirmationOpen(false);
      });
    // You can also perform other necessary operations here
  };

  const handleCloseDeleteConfirmation = () => {
    // Close the delete confirmation dialog without deleting the post
    setDeleteConfirmationOpen(false);
  };

  return (
    <div className="p-4 border rounded-md shadow-md bg-white">
      <div className="flex items-center mb-2">
        <img
          src={profileImage}
          alt="Profile"
          className="w-8 h-8 rounded-full mr-2"
        />
        <span className="font-bold mr-2">{username}</span>
      </div>
      {postImageUrl && (
        <div className="flex items-center mb-2">
          <img
            src={postImageUrl} // Render the imageUrl here
            alt="Uploaded"
            className="object-cover rounded-md ml-2"
          />
        </div>
      )}
      <div className="flex items-center mb-2">{postCaption}</div>
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
          initialCaption={postCaption}
          initialImageUrl={postImageUrl}
          postId={postId} // Pass postId to EditPost component
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
          postId={postId}
          onAddComment={handleAddComment}
          onClose={() => setCommentModelOpen(false)}
        />
      )}
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleCloseDeleteConfirmation}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this post?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirmation}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MealPost;
