import { createSlice } from "@reduxjs/toolkit";
import tokenConfig from "../../api/tokenConfig";

const initialState = {
  id: null,
  isAdOpen: false,
  carDetails: null,
  loading: false,
  error: null,
};

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    openBanner(state, action) {
      state.id = action.payload;
      state.isAdOpen = true;
      state.loading = true;
      state.error = null;
      state.carDetails = null;
    },
    closeBanner(state) {
      state.id = null;
      state.isAdOpen = false;
      state.carDetails = null;
      state.loading = false;
      state.error = null;
    },
    setCarDetails(state, action) {
      state.carDetails = action.payload;
      state.loading = false;
      state.error = null;
    },
    setError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const {
  openBanner,
  closeBanner,
  setCarDetails,
  setError,
  setLoading,
} = bannerSlice.actions;

// ✅ Thunk to fetch car details
export const fetchCarDetails = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await tokenConfig.get(`/cars/car/${id}`);
    dispatch(setCarDetails(res.data));
  } catch (err) {
    dispatch(setError(err.message || "Failed to fetch car details"));
  }
};

// ✅ Convenience thunk
export const openBannerAndFetch = (id) => async (dispatch) => {
    console.log(id);
    
  dispatch(openBanner(id));
  await dispatch(fetchCarDetails(id));
};

export default bannerSlice.reducer;
