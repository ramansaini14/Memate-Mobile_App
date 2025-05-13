// src/redux/slices/authSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {ApiBaseUrl, verifyEmailCode} from '../utils/Constants';

export const hitVerifyEmailCode = createAsyncThunk('hitVerifyEmailCode', async payload => {
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
    return response.data;
  } catch (error) {
    console.log('Error  ===> ', error.response.data);
    throw error.response.data;
  }
});

const VerifyEmailCodeSlice = createSlice({
  name: 'verifyEmailCodeReducer',

  initialState: {
    isLoading: false,
    data: null,
  },
  reducers: {
    clearVerifyEmailCodeSlice: state => {
      // Reset the data property to an empty array
      state.data = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(hitVerifyEmailCode.pending, state => {
        console.log('Loading  ===> ', state);
        state.isLoading = true;
      })
      .addCase(hitVerifyEmailCode.fulfilled, (state, action) => {
        console.log('Response  ===> ', state);
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(hitVerifyEmailCode.rejected, (state, action) => {
        console.log('Errorrrrrr  ===> ', state);
        state.isError = false;
      });
  },
});

export const {clearVerifyEmailCodeSlice} = VerifyEmailCodeSlice.actions;
export default VerifyEmailCodeSlice.reducer;
