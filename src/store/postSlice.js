import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get, post, put, del } from "../services/httpService";

// Define the thunk for fetching posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  return data;
});

// Define the thunk for posting a new post
export const postPost = createAsyncThunk("posts/postPost", async (postData) => {
  const response = await post("/post", postData);
  console.log(response); // Adjust the endpoint and data as needed
  return response;
});

const initialState = {
  items: [],
  error: null,
  status: "idle",
  sel: 1,
  postStatus: "idle",
  postError: null,
};

// Create the slice
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.items = action.payload.items;
    },
    setSel: (state, action) => {
      state.sel = action.payload.sel;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(postPost.pending, (state) => {
        state.postStatus = "loading";
      })
      .addCase(postPost.fulfilled, (state, action) => {
        state.postStatus = "succeeded";
        // state.items.push(action.payload); // Add the new post to the list
      })
      .addCase(postPost.rejected, (state, action) => {
        state.postStatus = "failed";
        console.log(action.error);
        state.postError = action.error.message;
      });
  },
});

// Export actions
export const { setPosts, setSel } = postSlice.actions;

// Export the reducer
export default postSlice.reducer;
