import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {ApiBaseUrl, attachmentFileUrl, profile} from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Async thunk for fetching data
export const getProfile = createAsyncThunk('getProfile', async payload => {
  const token = await AsyncStorage.getItem('token');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  };
  try {
    const url = ApiBaseUrl + profile;
    console.log('URl ====> ', url);
    const response = await axios.get(url, config);
    console.log('Profile ===>', response.data);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log('Error Profile:', error.response?.data || error.message);
    throw error;
  }
});

const GetProfileSlice = createSlice({
  name: 'getProfileReducer',
  initialState: {
    data: null,
    loading: 'idle',
    status: null,
    error: null,
  },
  reducers: {
    clearProfile: state => {
      state.data = null;
      state.statusCode = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getProfile.pending, state => {
        state.loading = 'pending';
        state.statusCode = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.data = action.payload;
        state.error = null;
        state.statusCode = action.payload.status;
      })
      .addCase(getProfile.rejected, (state, action) => {
        console.log('Get Profile Error ===> ', action.payload);
        state.loading = 'idle';
        state.statusCode = action.payload?.status;
        state.error = action.error.message;
      });
  },
});

export const {clearProfile} = GetProfileSlice.actions;
export default GetProfileSlice.reducer;
