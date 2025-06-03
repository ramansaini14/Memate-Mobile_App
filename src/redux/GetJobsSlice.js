// src/redux/slices/authSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {ApiBaseUrl, jobs} from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getJobs = createAsyncThunk('getJobs', async payload => {
  try {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };

    const url =
      ApiBaseUrl +
      jobs +
      payload.id +
      (payload.status == '0' ? '/' : `/?statuses=${payload.status}`);
    // +      `/?limit=10&offset=${payload.offset}&statuses=${payload.status}`;

    console.log('URL JOBs ====> ', url);

    const response = await axios.get(url, config);
    console.log('Response Jobs Data ===> ', response.data);
    return response.data;
  } catch (error) {
    console.log('Error ===> ', error);
    throw error.response.data;
  }
});

const GetJobsSlice = createSlice({
  name: 'getJobsReducer',

  initialState: {
    isLoading: false,
    data: null,
  },
  reducers: {
    clearJobsData: state => {
      // Reset the data property to an empty array
      state.data = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getJobs.pending, state => {
        state.isLoading = true;
      })
      .addCase(getJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getJobs.rejected, (state, action) => {
        state.isError = false;
      });
  },
});

export const {clearJobsData} = GetJobsSlice.actions;
export default GetJobsSlice.reducer;
