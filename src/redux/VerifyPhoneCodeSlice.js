// src/redux/slices/authSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {ApiBaseUrl, verifyPhoneCode} from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const hitVerifyPhoneCode = createAsyncThunk('hitVerifyPhoneCode', async payload => {
  try {
    const token = await AsyncStorage.getItem("token")

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer "+token
      },
    };
    console.log('Payload ===> ', payload);
    const url = ApiBaseUrl+verifyPhoneCode
    const response = await axios.post(url, payload, config);
    console.log('Response Verify Phone ===> ', response.data);
    return response.data;
  } catch (error) {
    console.log('Error  ===> ', error.response.data);
    throw error.response.data;
  }
});

const VerifyPhoneCodeSlice = createSlice({
  name: 'verifyPhoneCodeReducer',

  initialState: {
    isLoading: false,
    data: null,
  },
  reducers: {
    clearVerifyPhoneCode: state => {
      // Reset the data property to an empty array
      state.data = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(hitVerifyPhoneCode.pending, state => {
        console.log('Loading  ===> ', state);
        state.isLoading = true;
      })
      .addCase(hitVerifyPhoneCode.fulfilled, (state, action) => {
        console.log('Response  ===> ', state);
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(hitVerifyPhoneCode.rejected, (state, action) => {
        console.log('Errorrrrrr  ===> ', state);
        state.isError = false;
      });
  },
});

export const {clearVerifyPhoneCode} = VerifyPhoneCodeSlice.actions;
export default VerifyPhoneCodeSlice.reducer;
