// store.js
import { configureStore } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import { postReducer } from "./Reducer";

const store = configureStore({
  reducer: {
    post: postReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
