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

const initialState = {
  posts: [],
  comments: [],
  loading: false,
  error: null,
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
    case ADD_POST_REQUEST:
    case UPDATE_POST_REQUEST:
    case DELETE_POST_REQUEST:
    case FETCH_COMMENT_REQUEST:
    case ADD_COMMENT_REQUEST:
    case DELETE_COMMENT_REQUEST:
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
      const updatedPost = action.payload; // Assuming action.payload contains only the updated post data
      const updatedPosts = state.posts.map((post) =>
        post.id === updatedPost.id ? updatedPost : post
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
    case FETCH_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: action.payload,
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: [...state.comments, action.payload],
      };
    case DELETE_COMMENT_SUCCESS:
      const filteredComments = state.comments.filter(
        (comment) => comment.id !== action.payload
      );
      return {
        ...state,
        loading: false,
        comments: filteredComments,
      };
    case FETCH_POSTS_FAILURE:
    case ADD_POST_FAILURE:
    case UPDATE_POST_FAILURE:
    case DELETE_POST_FAILURE:
    case FETCH_COMMENT_FAILURE:
    case ADD_COMMENT_FAILURE:
    case DELETE_COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
