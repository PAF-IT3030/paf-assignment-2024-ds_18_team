import React, { useState } from "react";
import { Modal, IconButton, TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const CommentModel = ({ postId, onClose, onAddComment }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    // Pass the new comment to the parent component
    onAddComment(comment);

    // Reset comment input
    setComment("");
  };

  return (
    <Modal open={true} onClose={onClose}>
      <div
        className="comment-model"
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          width: "400px",
          margin: "auto",
          marginTop: "50px",
        }}
      >
        <div
          className="comment-model-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ margin: "0" }}>Comments</h2>
          <IconButton onClick={onClose} style={{ color: "#333" }}>
            Close
          </IconButton>
        </div>
        <div className="comment-model-content">
          {/* Display existing comments */}
          {/* Existing comments can be fetched from an API or passed as props */}
        </div>
        <div className="comment-model-footer">
          <TextField
            label="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
            variant="outlined"
            style={{ marginBottom: "10px" }}
          />
          <Button
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}
            onClick={handleSubmit}
          >
            Comment
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CommentModel;
