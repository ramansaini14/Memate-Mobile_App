// src/redux/slices/authSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {ApiBaseUrl, verifyPhoneCode} from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const hitVerifyPhoneCode = createAsyncThunk('hitVerifyPhoneCode', async (payload, { rejectWithValue }) => {
  try {
    const token = await AsyncStorage.getItem("token");

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + token,
      },
    };

  
    console.log("Payload phone verification===> ", payload)
    const url = ApiBaseUrl + verifyPhoneCode;
    console.log("url ===> ",url)
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


const VerifyPhoneCodeSlice = createSlice({
  name: 'verifyPhoneCodeReducer',
  initialState: {
    isLoading: false,
    data: null,
    statusCode: null,
    error: null,
  },
  reducers: {
    clearVerifyPhoneCode: state => {
      state.data = null;
      state.isAuthenticated = false;
      state.statusCode = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(hitVerifyPhoneCode.pending, state => {
        state.isLoading = true;
        state.statusCode = null;
        state.error = null;
      })
      .addCase(hitVerifyPhoneCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.statusCode = action.payload.status;
      })
      .addCase(hitVerifyPhoneCode.rejected, (state, action) => {
        state.isLoading = false;
        state.statusCode = action.payload?.status;
        state.error = action.payload?.message;
      });
  },
});

export const {clearVerifyPhoneCode} = VerifyPhoneCodeSlice.actions;
export default VerifyPhoneCodeSlice.reducer;
