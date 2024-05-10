import axios from "../Config/axios";
import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  FETCH_COMMENT_REQUEST,
  FETCH_COMMENT_SUCCESS,
  FETCH_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
} from "./ActionType";

export const fetchPosts = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_POSTS_REQUEST });
    try {
      const response = await axios.get("/posts");
      dispatch({ type: FETCH_POSTS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_POSTS_FAILURE, payload: error.message });
    }
  };
};

export const addPost = (postData) => {
  return async (dispatch) => {
    dispatch({ type: ADD_POST_REQUEST });
    try {
      const response = await axios.post("/api/posts", postData);
      dispatch({ type: ADD_POST_SUCCESS, payload: response.data }); // Assuming response.data contains the added post
    } catch (error) {
      dispatch({ type: ADD_POST_FAILURE, payload: error.message });
    }
  };
};

export const updatePost = (postId, updatedPostData) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_POST_REQUEST });
    try {
      const response = await axios.put(`/posts/${postId}`, updatedPostData);
      dispatch({ type: UPDATE_POST_SUCCESS, payload: response.data }); // Assuming response.data contains the updated post data
    } catch (error) {
      dispatch({ type: UPDATE_POST_FAILURE, payload: error.message });
    }
  };
};

export const deletePost = (postId) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_POST_REQUEST });
    try {
      await axios.delete(`/posts/${postId}`);
      dispatch({ type: DELETE_POST_SUCCESS, payload: postId });
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : "Unknown error";
      dispatch({ type: DELETE_POST_FAILURE, payload: errorMessage });
    }
  };
};

// Add deletePostFailure action creator
export const deletePostFailure = (error) => {
  const errorMessage = error.response
    ? error.response.data.message
    : "Unknown error";

  return {
    type: DELETE_POST_FAILURE,
    payload: errorMessage, // Store only the error message
  };
};

export const fetchComments = (postId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_COMMENT_REQUEST });
    try {
      const response = await axios.get(`/posts/${postId}/comments`);
      dispatch({ type: FETCH_COMMENT_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_COMMENT_FAILURE, payload: error.message });
    }
  };
};

export const addComment = (postId, commentData) => {
  return async (dispatch) => {
    dispatch({ type: ADD_COMMENT_REQUEST });
    try {
      dispatch({ type: ADD_COMMENT_SUCCESS, payload: commentData });
    } catch (error) {
      dispatch({ type: ADD_COMMENT_FAILURE, payload: error.message });
    }
  };
};

export const deleteComment = (postId, commentId) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_COMMENT_REQUEST });
    try {
      await axios.delete(`/posts/${postId}/comments/${commentId}`);
      dispatch({ type: DELETE_COMMENT_SUCCESS, payload: commentId });
    } catch (error) {
      dispatch({ type: DELETE_COMMENT_FAILURE, payload: error.message });
    }
  };
};

export const incrementLikes = () => {
  return {
    type: "INCREMENT_LIKES",
  };
};
