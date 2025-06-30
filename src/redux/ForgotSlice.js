// src/redux/slices/authSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {ApiBaseUrl, forgotApi} from '../utils/Constants';

export const hitForgotApi = createAsyncThunk('hitForgotApi', async (payload, { rejectWithValue }) => {
  try {

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

  
    const url = ApiBaseUrl + forgotApi;
    console.log("url forgot ===> ",url)
    const response = await axios.post(url,payload);

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


const ForgotSlice = createSlice({
  name: 'forgotReducer',
  initialState: {
    isLoading: false,
    data: null,
    statusCode: null,
    error: null,
  },
  reducers: {
    clearForgotSlice: state => {
      state.data = null;
      state.isAuthenticated = false;
      state.statusCode = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(hitForgotApi.pending, state => {
        state.isLoading = true;
        state.statusCode = null;
        state.error = null;
      })
      .addCase(hitForgotApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.statusCode = action.payload.status;
      })
      .addCase(hitForgotApi.rejected, (state, action) => {
        state.isLoading = false;
        state.statusCode = action.payload?.status;
        state.error = action.payload?.message;
      });
  },
});

export const {clearForgotSlice} = ForgotSlice.actions;
export default ForgotSlice.reducer;
