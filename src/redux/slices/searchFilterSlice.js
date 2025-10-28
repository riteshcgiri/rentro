import { createSlice } from "@reduxjs/toolkit";

const searchFilterSlice = createSlice({
    name: "searchFilter",
    initialState: {
        isFilterVisible: false,
        isHomePageVisible: false,
        isSearchFocused: false,
        selectedCar: null,
        searchOptions: {
            type: [
                {
                    label: 'Sedan',
                    id: 'sedan',
                    isChecked: false,
                    checkbox: 'carType',
                    qty: 20
                },
                {
                    label: 'SUV',
                    id: 'suv',
                    isChecked: false,
                    checkbox: 'carType',
                    qty: 12
                },
                {
                    label: 'Hatchback',
                    id: 'hatchback',
                    isChecked: false,
                    checkbox: 'carType',
                    qty: 14
                },
                {
                    label: 'Coupe',
                    id: 'coupe',
                    isChecked: false,
                    checkbox: 'carType',
                    qty: 14
                },
                {
                    label: 'MPV',
                    id: 'mpv',
                    isChecked: false,
                    checkbox: 'carType',
                    qty: 16
                },
                {
                    label: 'Sport',
                    id: 'sport',
                    isChecked: false,
                    checkbox: 'carType',
                    qty: 10
                },
            ],
            seatingCapacity: [
                {
                    label: '2 Persons',
                    id: 'two',
                    isChecked: false,
                    checkbox: 'seatingType',
                    qty: 10

                },
                {
                    label: '4 Persons',
                    id: 'four',
                    isChecked: false,
                    checkbox: 'seatingType',
                    qty: 14

                },
                {
                    label: '6 Persons',
                    id: 'six',
                    isChecked: false,
                    checkbox: 'seatingType',
                    qty: 12

                },
                {
                    label: '8 Persons & More',
                    id: 'eight',
                    isChecked: false,
                    checkbox: 'seatingType',
                    qty: 8

                },
            ],
            priceRange: 100,
            transmission: {
                automatic: false,
                manual: false,
            },
            fuelType: {
                petrol: false,
                diesel: false,
                cng: false,
                electric: false,
            },
            searchValue: "",
        },
    },
    reducers: {
        toggleFilterVisibility: (state) => {
            state.isHomePageVisible = false;
            state.isFilterVisible = !state.isFilterVisible;
        },
        toggleHomePageVisibility: (state) => {
            state.isFilterVisible = false;
            state.isHomePageVisible = !state.isHomePageVisible;
        },
        setType: (state, action) => {
            const { id } = action.payload;
            state.searchOptions.type = state.searchOptions.type.map(item =>
                item.id === id ? { ...item, isChecked: !item.isChecked } : item
            );
        },
        setSeatingCapacity: (state, action) => {
            const { id } = action.payload;
            state.searchOptions.seatingCapacity = state.searchOptions.seatingCapacity.map(item =>
                item.id === id ? { ...item, isChecked: !item.isChecked } : item
            );
        },
        setPriceRange: (state, action) => {
            state.searchOptions.priceRange = action.payload;
        },
        setSearchValue: (state, action) => {
            state.searchOptions.searchValue = action.payload;
        },
        setSearchFocused: (state, action) => {
            state.isSearchFocused = action.payload;
        },
        setSelectedCar: (state, action) => {
            state.selectedCar = action.payload;
        },
        resetFilters: (state) => {
            state.searchOptions = {
                type: [],
                seatingCapacity: null,
                priceRange: { min: null, max: null },
                transmission: [],
                fuelType: [],
                searchValue: "",
            };
        },
    },
});

export const {
    toggleFilterVisibility,
    toggleHomePageVisibility,
    setType,
    setSeatingCapacity,
    setPriceRange,
    setTransmission,
    setFuelType,
    resetFilters,
    setSearchValue,
    setSearchFocused,
    setSelectedCar,
} = searchFilterSlice.actions;

export default searchFilterSlice.reducer;