import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading : false,
    error : null,
    temp : null,
    data : null,
    pickup : {
        location : null,
        date : null,
        time : null,
    },
    dropoff : {
        location : null,
        date : null,
        time : null,
    },

};

const tripSwapperSlice = createSlice({
    name : 'tripSwapperSlice',
    initialState,
    reducers : {
        pickupSelector(state, action) {
            state.pickup.location = action.payload.location;
            state.pickup.date = action.payload.date;
            state.pickup.time = action.payload.time;
        },
        dropoffSelector(state, action){
            state.dropoff.location = action.payload.location;
            state.dropoff.date = action.payload.date;
            state.dropoff.time = action.payload.time;

        },
        setLoading(state, action) {
            state.isLoading = action.payload;
        },
        swapData (state) {
            state.temp = {...state.pickup};
            state.pickup = {...state.dropoff};
            state.dropoff = state.temp;
        },
        setError (state, action) {
            state.error = action.payload;
            state.isLoading = false;
        }
    }

})

export const { pickupSelector, dropoffSelector, setLoading, swapData, setError} = tripSwapperSlice.actions;


export default tripSwapperSlice.reducer;