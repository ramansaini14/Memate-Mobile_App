import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {ApiBaseUrl, jobPause, jobStop} from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const hitFinishJob = createAsyncThunk(
  'hitFinishJob',
  async (payload, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      };

      const url =
        ApiBaseUrl + jobStop + payload.orgId + '/' + payload.jobId + '/';
      console.log('url ===> ', url);
      const param = payload.data;

      console.log('URL Job Started ===> ', url);
      console.log('Payload Job Started ===> ', param);
      const response = await axios.post(url, param, config);

      console.log('Response  ===> ', response.data);

      return response.data;
    } catch (error) {
      console.log('Error  ===> ', error.response.data);
      return rejectWithValue({
        status: error.response?.status,
        message: error.response?.data || 'Something went wrong',
      });
    }
  },
);

const FinishJobSlice = createSlice({
  name: 'jobFinishReducer',

  initialState: {
    isLoading: false,
    data: null,
    status: null,
    error: null,
  },
  reducers: {
    clearFinishStatus: state => {
      // Reset the data property to an empty array
      state.data = null;
      state.isAuthenticated = false;
      state.status = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(hitFinishJob.pending, state => {
        console.log('Loading  ===> ', state);
        state.isLoading = true;
        state.status = null;
        state.error = null;
      })
      .addCase(hitFinishJob.fulfilled, (state, action) => {
        console.log('Response  ===> ', state);
        state.isLoading = false;
        state.data = action.payload;
        state.status = action.payload.status;
      })
      .addCase(hitFinishJob.rejected, (state, action) => {
        console.log('Errorrrrrr  ===> ', state);
        state.error = action.payload?.message;
        state.status = action.payload?.status;
      });
  },
});

export const {clearFinishStatus} = FinishJobSlice.actions;
export default FinishJobSlice.reducer;