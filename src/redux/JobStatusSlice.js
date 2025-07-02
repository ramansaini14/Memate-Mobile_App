// src/redux/slices/authSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {ApiBaseUrl, jobPause, jobStart, jobStop} from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const hitJobStart = createAsyncThunk('hitJobStart',async (payload, { rejectWithValue }) => {
  try {
    const token = await AsyncStorage.getItem("token")
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer "+token
      },
    };
  
    const url = ApiBaseUrl+jobStart+payload.orgId+"/"+payload.jobId+"/"
    console.log('url ===> ', url);
    const param = 
        payload.data
  

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
});

export const hitJobPause = createAsyncThunk('hitJobPause',async (payload, { rejectWithValue }) => {
    try {
        const token = await AsyncStorage.getItem("token")
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer "+token
        },
      };
      
      console.log('Payload Job Pause ===> ', payload);
      const url = ApiBaseUrl+jobPause+payload.orgId+"/"+payload.jobId+"/"
      console.log('url ===> ', url);
      const param =  payload.data
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
  });
  
export const hitJobStop = createAsyncThunk('hitJobStop',async (payload, { rejectWithValue }) => {
    try {
        const token = await AsyncStorage.getItem("token")
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer "+token
          },
        };
      
      console.log('Payload Job Stopped ===> ', payload);
      const url = ApiBaseUrl+jobStop+payload.orgId+"/"+payload.jobId+"/"
      console.log('url ===> ', url);
      const param =  payload.data
      const response = await axios.post(url, param, config);
      console.log('response Finish Job ===> ', response.data);
      return response.data;
    } catch (error) {
      console.log('Error  ===> ', error.response.data);
      return rejectWithValue({
        status: error.response?.status,
        message: error.response?.data || 'Something went wrong',
      });
    }
  });
  

const JobsStatusSlice = createSlice({
  name: 'jobsStatusReducer',

  initialState: {
    isLoading: false,
    data: null,
    status: null,
    error: null,
  },
  reducers: {
    clearJobStatus: state => {
      // Reset the data property to an empty array
      state.data = null;
      state.isAuthenticated = false;
      state.status = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(hitJobStart.pending, state => {
        console.log('Loading  ===> ', state);
        state.isLoading = true;
        state.status = null;
        state.error = null;
      })
      .addCase(hitJobStart.fulfilled, (state, action) => {
        console.log('Response  ===> ', state);
        state.isLoading = false;
        state.data = action.payload;
        state.status = action.payload.status;
        
      })
      .addCase(hitJobStart.rejected, (state, action) => {
        console.log('Errorrrrrr  ===> ', state);
        state.error = action.payload?.message;
        state.status = action.payload?.status; 
      })
      .addCase(hitJobPause.pending, state => {
        console.log('Loading  ===> ', state);
        state.isLoading = true;
        state.status = null;
        state.error = null;
      })
      .addCase(hitJobPause.fulfilled, (state, action) => {
        console.log('Response  ===> ', state);
        state.isLoading = false;
        state.data = action.payload;
        state.status = action.payload.status;
      })
      .addCase(hitJobPause.rejected, (state, action) => {
        console.log('Errorrrrrr  ===> ', state);
        state.error = action.payload?.message;
        state.status = action.payload?.status;
      })
      .addCase(hitJobStop.pending, state => {
        console.log('Loading  ===> ', state);
        state.isLoading = true;
        state.status = null;
        state.error = null;
      })
      .addCase(hitJobStop.fulfilled, (state, action) => {
        console.log('Response  ===> ', action);
        state.isLoading = false;
        state.data = action.payload;
        state.status = action.payload.status;
      })
      .addCase(hitJobStop.rejected, (state, action) => {
        console.log('Errorrrrrr  ===> ', state);
        state.error = action.payload?.message;
        state.status = action.payload?.status;
      });
  },
});

export const {clearJobStatus} = JobsStatusSlice.actions;
export default JobsStatusSlice.reducer;
