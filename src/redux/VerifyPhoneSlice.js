// src/redux/slices/authSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {ApiBaseUrl, verifyPhone} from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const hitVerifyPhone = createAsyncThunk('hitVerifyPhone', async payload => {
  try {
    const token = await AsyncStorage.getItem("token")

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer "+token
      },
    };
    console.log('Payload ===> ', config);
    const url = ApiBaseUrl+verifyPhone
    const response = await axios.post(url, payload, config);
    console.log('Response Verify Phone ===> ', response.data);
    return response.data;
  } catch (error) {
    console.log('Error  ===> ', error.response.data);
    throw error.response.data;
  }
});

const VerifyPhoneSlice = createSlice({
  name: 'verifyPhoneReducer',

  initialState: {
    isLoading: false,
    data: null,
  },
  reducers: {
    clearVerifyPhone: state => {
      // Reset the data property to an empty array
      state.data = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(hitVerifyPhone.pending, state => {
        console.log('Loading  ===> ', state);
        state.isLoading = true;
      })
      .addCase(hitVerifyPhone.fulfilled, (state, action) => {
        console.log('Response  ===> ', state);
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(hitVerifyPhone.rejected, (state, action) => {
        console.log('Errorrrrrr  ===> ', state);
        state.isError = false;
      });
  },
});

export const {clearVerifyPhone} = VerifyPhoneSlice.actions;
export default VerifyPhoneSlice.reducer;
