import { configureStore } from '@reduxjs/toolkit';
import authReducer from './states/authSlice';
import chatReducer from './states/chatSlice';
import channelReducer from './states/channelSlice';

export default configureStore({
    reducer: {
        auth: authReducer,
        chat: chatReducer,
        channel: channelReducer,
    },
});

