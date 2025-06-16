// src/redux/slices/authSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {ApiBaseUrl, emailLogin} from '../utils/Constants';

export const loginUser = createAsyncThunk('loginUser', async (payload,{ rejectWithValue } )=> {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    console.log('Url ===> ', ApiBaseUrl + emailLogin);
    console.log('Payload ===> ', payload);
    const response = await axios.post(ApiBaseUrl + emailLogin, payload, config);
    console.log('Response Login ===> ', response.data);
    return response.data;
  } catch (error) {
    console.log('Error  ===> ', error.response.data);
    return error.response.data;
    // return rejectWithValue({
    //   message: error.response?.data || 'Something went wrong',
    // });
  }
});

const loginSlice = createSlice({
  name: 'loginReducer',

  initialState: {
    isLoading: false,
    data: null,
    error:null
  },
  reducers: {
    clearLoginData: state => {
      // Reset the data property to an empty array
      state.data = null;
      state.isAuthenticated = false;
      error: null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        console.log('Loading  ===> ', state);
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log('Response  ===> ', state);
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log('Errorrrrrr  Login Slice===> ', action.error);
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const {clearLoginData} = loginSlice.actions;
export default loginSlice.reducer;
