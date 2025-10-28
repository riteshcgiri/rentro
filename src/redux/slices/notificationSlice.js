import { createSlice, nanoid } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: [],
    reducers: {
        addNotification: {
            reducer: (state, action) => {
                state.push(action.payload);
            },
            // ✅ FIXED: use correct name 'prepare'
            prepare: ({ message, type = 'info', duration = 5000, sound = false }) => {
                return {
                    payload: {
                        id: nanoid(),
                        message,
                        type,
                        duration,
                        sound
                    }
                };
            }
        },
        removeNotification: (state, action) => {
            return state.filter(notification => notification.id !== action.payload);
        }
    }
});

export const { addNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
