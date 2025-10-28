import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    id: nanoid(),
    pickupLocation: null,
    dropoffLocation: null,
    pickupDate: null,
    dropoffDate: null,
    carType: null,
};

const rentFormSlice = createSlice({
    name: "rentForm",
    initialState,
    reducers: {
        setPickupLocation: (state, action) => {
            state.pickupLocation = action.payload;
        },
        setDropoffLocation: (state, action) => {
            state.dropoffLocation = action.payload;
        },
        setPickupDate: (state, action) => {
            state.pickupDate = action.payload;
        },
        setDropoffDate: (state, action) => {
            state.dropoffDate = action.payload;
        },
        setCarType: (state, action) => {
            state.carType = action.payload;
        },
        resetForm: (state) => {
            state.pickupLocation = null;
            state.dropoffLocation = null;
            state.pickupDate = null;
            state.dropoffDate = null;
            state.carType = null;
        },
    },
});

export const {
    setPickupLocation,
    setDropoffLocation,
    setPickupDate,
    setDropoffDate,
    setCarType,
    resetForm,
} = rentFormSlice.actions;

export default rentFormSlice.reducer;