// src/redux/slices/authSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {ApiBaseUrl, verifyEmailCode} from '../utils/Constants';

export const hitVerifyEmailCode = createAsyncThunk('hitVerifyEmailCode', async (payload, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    console.log('Payload ===> ', payload);
    const url = ApiBaseUrl+verifyEmailCode
    console.log('url ===> ', url);
    const response = await axios.post(url, payload, config);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log('Error  ===> ', error.response.data);
    return rejectWithValue({
      status: error.response?.status,
      message: error.response?.data || 'Something went wrong',
    });
  }
});

const VerifyEmailCodeSlice = createSlice({
  name: 'verifyEmailCodeReducer',

  initialState: {
    isLoading: false,
    data: null,
    statusCode: null,
    error: null,
  },
  reducers: {
    clearVerifyEmailCodeSlice: state => {
      // Reset the data property to an empty array
      state.data = null;
      state.isAuthenticated = false;
      state.statusCode = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(hitVerifyEmailCode.pending, state => {
        state.isLoading = true;
        state.statusCode = null;
        state.error = null;
      })
      .addCase(hitVerifyEmailCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.statusCode = action.payload.status;
      })
      .addCase(hitVerifyEmailCode.rejected, (state, action) => {
        console.log('Errorrrrrr  ===> ', state);
        state.isLoading = false;
        state.statusCode = action.payload?.status;
      
        state.error = action.payload?.message;
      });
  },
});

export const {clearVerifyEmailCodeSlice} = VerifyEmailCodeSlice.actions;
export default VerifyEmailCodeSlice.reducer;
