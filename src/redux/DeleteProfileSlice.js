// src/redux/slices/authSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {ApiBaseUrl, deleteProfile} from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const hitDeleteProfile = createAsyncThunk('hitDeleteProfile', async (payload, { rejectWithValue }) => {
  try {
    const token = await AsyncStorage.getItem("token");

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + token,
      },
    };

  
    const url = ApiBaseUrl + deleteProfile;
    console.log("url ===> ",url)
    const response = await axios.delete(url, config);

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


const DeleteProfileSlice = createSlice({
  name: 'deleteProfileReducer',
  initialState: {
    isLoading: false,
    data: null,
    statusCode: null,
    error: null,
  },
  reducers: {
    clearDeleteProfile: state => {
      state.data = null;
      state.isAuthenticated = false;
      state.statusCode = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(hitDeleteProfile.pending, state => {
        state.isLoading = true;
        state.statusCode = null;
        state.error = null;
      })
      .addCase(hitDeleteProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.statusCode = action.payload.status;
      })
      .addCase(hitDeleteProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.statusCode = action.payload?.status;
        state.error = action.payload?.message;
      });
  },
});

export const {clearDeleteProfile} = DeleteProfileSlice.actions;
export default DeleteProfileSlice.reducer;
