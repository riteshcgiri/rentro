import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import tokenConfig from "../../api/tokenConfig"; // axios instance with baseURL & token


// Async Thunk: Fetch Cars

export const fetchCars = createAsyncThunk("cars/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const res = await tokenConfig.get("/cars/cars"); // adjust path if different
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

// Slice
const carsSlice = createSlice({
  name: "cars",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
        
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default carsSlice.reducer;
