import { createSlice, nanoid } from "@reduxjs/toolkit";


// https://www.youtube.com/watch?v=1i04-A7kfFI&t=3793s/
const initialState ={
    rentros: [
        {
            // this is example data
            id: nanoid(),
            name: "Rentro",
            description: "Rentro is a rental service that allows users to rent items from each other.",
            image: "https://example.com/rentro.jpg",
            location: "New York",
        }
    
    ] 
}


export const rentroSlice = createSlice({
    name : "rentros",
    initialState,
    reducers : {
        addRentro: (state, action) => {
            state.rentros.push(action.payload);
        },
        removeRentro: (state, action) => {
            state.rentros = state.rentros.filter(rentro => rentro.id !== action.payload);
        },
        updateRentro: (state, action) => {
            const { id, data } = action.payload;
            const index = state.rentros.findIndex(rentro => rentro.id === id);
            if (index !== -1) {
                state.rentros[index] = { ...state.rentros[index], ...data };
            }
        }
    }
})  

export const { addRentro, removeRentro, updateRentro } = rentroSlice.actions;
export default rentroSlice.reducer;
// This is a slice of the Redux store that manages the state of rentros.




// https://www.youtube.com/watch?v=1i04-A7kfFI&t=3793s