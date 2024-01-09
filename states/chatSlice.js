import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addMessage: (state, action) => {
            const { channelId, message } = action.payload;
            if (!state[channelId]) {
                state[channelId] = [];
            }
            state[channelId].push(message);
        },
    },
});

export const { addMessage } = chatSlice.actions;

export default chatSlice.reducer;