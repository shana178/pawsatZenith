import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, logoutUser, getProfile } from "../api/api";

export const login = createAsyncThunk("user/login", async (userData, { rejectWithValue }) => {
  try {
    await loginUser(userData);
    const response = await getProfile();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

export const logout = createAsyncThunk("user/logout", async () => {
  await logoutUser();
  return null;
});

export const fetchSession = createAsyncThunk("user/fetchSession", async (_, { rejectWithValue }) => {
  try {
    const response = await getProfile();
    return response.data;
  } catch (error) {
    return rejectWithValue(null);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: { userInfo: null, loading: false, error: null }, // ✅ Fixes structure
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.userInfo = null;
      })
      .addCase(fetchSession.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        localStorage.setItem("userInfo", JSON.stringify(action.payload)); // ✅ Persist session
      })
      
  },
});

export default userSlice.reducer;
