// reducers.js
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
} from "./ActionTypes";

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
    case ADD_POST_REQUEST:
    case UPDATE_POST_REQUEST:
    case DELETE_POST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: [...state.posts, action.payload],
      };
    case UPDATE_POST_SUCCESS:
      const updatedPosts = state.posts.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );
      return {
        ...state,
        loading: false,
        posts: updatedPosts,
      };
    case DELETE_POST_SUCCESS:
      const filteredPosts = state.posts.filter(
        (post) => post.id !== action.payload
      );
      return {
        ...state,
        loading: false,
        posts: filteredPosts,
      };
    case FETCH_POSTS_FAILURE:
    case ADD_POST_FAILURE:
    case UPDATE_POST_FAILURE:
    case DELETE_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
