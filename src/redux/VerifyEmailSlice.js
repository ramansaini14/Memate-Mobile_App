// src/redux/slices/authSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {ApiBaseUrl, verifyEmail, verifyPhoneCode} from '../utils/Constants';

export const hitVerifyEmail = createAsyncThunk('hitVerifyEmail', async (payload, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      console.log('Payload ===> ', payload);
      const url = ApiBaseUrl + verifyEmail;
      console.log('URL ===> ', url);

      const response = await axios.post(url, payload, config);

    console.log("Response ===> ",response.data, " status ===> ",response.status)
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    // send status code and message on failure
    return rejectWithValue({
      status: error.response?.status,
      message: error.response?.data || 'Something went wrong',
    });
  }
});


const VerifyEmailSlice = createSlice({
  name: 'verifyEmailReducer',
  initialState: {
    isLoading: false,
    data: null,
    statusCode: null,
    error: null,
  },
  reducers: {
    clearVerifyEmailSlice: state => {
      state.data = null;
      state.isAuthenticated = false;
      state.statusCode = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(hitVerifyEmail.pending, state => {
        state.isLoading = true;
        state.statusCode = null;
        state.error = null;
      })
      .addCase(hitVerifyEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.statusCode = action.payload.status;
      })
      .addCase(hitVerifyEmail.rejected, (state, action) => {
        console.log("Erroradff===> ",action.payload?.message)
        state.isLoading = false;
        state.statusCode = action.payload?.status;
      
        state.error = action.payload?.message;
      });
  },
});

export const {clearVerifyEmailSlice} = VerifyEmailSlice.actions;
export default VerifyEmailSlice.reducer;
