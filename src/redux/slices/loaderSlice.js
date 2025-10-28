import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isPageLoading: false,
    isProcessing: false,
};

export const loaderSlice = createSlice({
    name: "loader",
    initialState,
    reducers: {
        setPageLoading: (state, action) => {
            state.isPageLoading = action.payload;
        },
        setProcessing: (state, action) => {
            state.isProcessing = action.payload;
        },
    },
});

export const { setPageLoading, setProcessing } = loaderSlice.actions;

export default loaderSlice.reducer;