import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {ApiBaseUrl, jobStart} from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const hitStartJob = createAsyncThunk(
  'hitStartJob',
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
        ApiBaseUrl + jobStart + payload.orgId + '/' + payload.jobId + '/';
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

const StartJobSlice = createSlice({
  name: 'jobsStartReducer',

  initialState: {
    isLoading: false,
    data: null,
    statusStartJob: null,
    errorStartJob: null,
  },
  reducers: {
    clearStartStatus: state => {
      // Reset the data property to an empty array
      state.data = null;
      state.isAuthenticated = false;
      state.statusStartJob = null;
      state.errorStartJob = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(hitStartJob.pending, state => {
        console.log('Loading  ===> ', state);
        state.isLoading = true;
        state.statusStartJob = null;
        state.errorStartJob = null;
      })
      .addCase(hitStartJob.fulfilled, (state, action) => {
        console.log('Response  ===> ', state);
        state.isLoading = false;
        state.data = action.payload;
        state.statusStartJob = action.payload.status;
      })
      .addCase(hitStartJob.rejected, (state, action) => {
        console.log('Errorrrrrr  ===> ',  action.payload?.message);
        state.errorStartJob = action.payload?.message;
        console.log('Errorrrrrr  ===> ',  state.errorStartJob);
        state.statusStartJob = action.payload?.status;
      });
  },
});

export const {clearStartStatus} = StartJobSlice.actions;
export default StartJobSlice.reducer;
