import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSearchFocused: false,
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchFocused: (state, action) => {
            state.isSearchFocused = action.payload;
        },
    },
});

export const { setSearchFocused } = searchSlice.actions;

export default searchSlice.reducer;