import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {ApiBaseUrl, attachmentFileUrl} from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Async thunk for fetching data
export const hitAttachmentFileUrl = createAsyncThunk(
  'hitAttachmentFileUrl',
  async payload => {
    const token = await AsyncStorage.getItem('token');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };

    const params = {
      filename: payload.filename,
    };

    try {
      const url =
        ApiBaseUrl +
        attachmentFileUrl +
        payload.orgId +
        '/' +
        payload.jobId +
        '/';
      console.log('URl ====> ', url);
      const response = await axios.post(url, params, config);
      console.log('Upload file Response ===>', response.data);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.log('Error Details:', error.response?.data || error.message);
      throw error;
    }
  },
);

const AttachmentFileUrlSlice = createSlice({
  name: 'attachmentFileUrlReducer',
  initialState: {
    data: null,
    loading: 'idle',
    status: null,
    error: null,
  },
  reducers: {
    clearAttachmentFileUrl: state => {
      state.data = null;
      state.statusCode = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(hitAttachmentFileUrl.pending, state => {
        state.loading = 'pending';
        state.statusCode = null;
      })
      .addCase(hitAttachmentFileUrl.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.data = action.payload;
        state.error = null;
        state.statusCode = action.payload.status;
      })
      .addCase(hitAttachmentFileUrl.rejected, (state, action) => {
        console.log('Upload Image Error ===> ', action.payload);
        state.loading = 'idle';
        state.statusCode = action.payload?.status;
        state.error = action.error.message;
      });
  },
});

export const {clearAttachmentFileUrl} = AttachmentFileUrlSlice.actions;
export default AttachmentFileUrlSlice.reducer;
