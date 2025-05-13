// src/redux/slices/authSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {ApiBaseUrl, loginApi, verifyEmail} from '../utils/Constants';

export const hitVerifyEmail = createAsyncThunk('hitVerifyEmail', async payload => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    console.log('Payload ===> ', payload);
    const url = ApiBaseUrl+verifyEmail
    const response = await axios.post(url, payload, config);
    console.log('Response Login ===> ', response.data);
    return response.data;
  } catch (error) {
    console.log('Error  ===> ', error.response.data);
    throw error.response.data;
  }
});

const VerifyEmailSlice = createSlice({
  name: 'verifyEmailReducer',

  initialState: {
    isLoading: false,
    data: null,
  },
  reducers: {
    clearVerifyEmailSlice: state => {
      // Reset the data property to an empty array
      state.data = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(hitVerifyEmail.pending, state => {
        console.log('Loading  ===> ', state);
        state.isLoading = true;
      })
      .addCase(hitVerifyEmail.fulfilled, (state, action) => {
        console.log('Response  ===> ', state);
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(hitVerifyEmail.rejected, (state, action) => {
        console.log('Errorrrrrr  ===> ', state);
        state.isError = false;
      });
  },
});

export const {clearVerifyEmailSlice} = VerifyEmailSlice.actions;
export default VerifyEmailSlice.reducer;
