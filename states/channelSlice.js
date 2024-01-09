import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getChannels from '../services/GetChannels';

export const fetchChannels = createAsyncThunk('channels/fetchChannels',
    async () => {
        return getChannels();
    }
);

const initialState = {
  channels: {},
  status: 'idle',
  error: null,
};

const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    addChannel(state, action) {
      const channel = action.payload;
      state.channels[channel.id] = channel;
    },
    removeChannel(state, action) {
      const id = action.payload;
      delete state.channels[id];
    },
    updateChannel(state, action) {
      const channel = action.payload;
      state.channels[channel.id] = channel;
    },
    setStatus(state, action) {
        state.status = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        console.log("loading"); 
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        action.payload.forEach(channel => {
          state.channels[channel.id] = channel;
        });
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        console.log("error receiving Messages: " , action.error.message);
        state.error = action.error.message;
      });
  },
});


export const { addChannel, removeChannel, updateChannel, setStatus } = channelSlice.actions;

export default channelSlice.reducer;