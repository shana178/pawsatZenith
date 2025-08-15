import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPets } from "../api/api";

export const fetchPets = createAsyncThunk("pets/fetchPets", async (_, { rejectWithValue }) => {
  try {
    const response = await getPets();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch pets");
  }
});

const petSlice = createSlice({
  name: "pets",
  initialState: { pets: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPets.pending, (state) => { state.loading = true; })
      .addCase(fetchPets.fulfilled, (state, action) => {
        state.loading = false;
        state.pets = action.payload;
        state.error = null;
      })
      .addCase(fetchPets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default petSlice.reducer;
