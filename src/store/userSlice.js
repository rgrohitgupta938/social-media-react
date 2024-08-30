import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get } from "../services/httpService";

// Function to get userId from localStorage safely
const getUserFromLocalStorage = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return user || {};
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return {};
  }
};

const { userId } = getUserFromLocalStorage();

console.log(userId);

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      if (!userId) throw new Error("User ID is missing");
      const res = await get(`/user/${userId}`);
      return res;
    } catch (error) {
      // Return a rejected value with a custom error message
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: {},
  error: null,
  status: "idle",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeUser: (state) => {
      console.log("remove");
      state.user = {};
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null; // Clear any previous errors
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        console.log(action.payload);
        state.error = action.payload || "Failed to fetch user data";
      });
  },
});

export const { removeUser } = userSlice.actions;
export default userSlice.reducer;
