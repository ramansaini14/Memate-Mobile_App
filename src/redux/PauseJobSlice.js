import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {ApiBaseUrl, jobPause} from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const hitPauseJob = createAsyncThunk(
  'hitPauseJob',
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
        ApiBaseUrl + jobPause + payload.orgId + '/' + payload.jobId + '/';
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

const PauseJobSlice = createSlice({
  name: 'jobPauseReducer',

  initialState: {
    isLoading: false,
    data: null,
    statusJobPause: null,
    errorJobPause: null,
  },
  reducers: {
    clearPauseStatus: state => {
      // Reset the data property to an empty array
      state.data = null;
      state.isAuthenticated = false;
      state.statusJobPause = null;
      state.errorJobPause = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(hitPauseJob.pending, state => {
        console.log('Loading  ===> ', state);
        state.isLoading = true;
        state.statusJobPause = null;
        state.errorJobPause = null;
        // state.statusJobPause = action.payload.status
      })
      .addCase(hitPauseJob.fulfilled, (state, action) => {
        console.log('Response  ===> ', state);
        state.isLoading = false;
        state.data = action.payload;
        state.statusJobPause = action.payload.status;
      })
      .addCase(hitPauseJob.rejected, (state, action) => {
        console.log('Errorrrrrr  ===> ', state);
        state.errorJobPause = action.payload?.message;
        state.statusJobPause = action.payload?.status;
      });
  },
});

export const {clearPauseStatus} = PauseJobSlice.actions;
export default PauseJobSlice.reducer;
