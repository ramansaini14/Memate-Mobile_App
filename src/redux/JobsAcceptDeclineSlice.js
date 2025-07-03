// src/redux/slices/authSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {ApiBaseUrl, jobsAccept, jobsDecline, verifyEmailCode} from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { error } from 'console';

export const hitAcceptJobs = createAsyncThunk('hitAcceptJobs', async (payload, {rejectWithValue}) => {
  try {
    const token = await AsyncStorage.getItem("token")
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer "+token
      },
    };
    // https://dev.memate.com.au/api/v1/m/jobs/accept/{organization_pk}/{id}/
    // https://dev.memate.com.au/api/v1/m/jobs/accept/1/1501
    // https://dev.memate.com.au/api/v1/m/jobs/accept/5/1501/
    // https://dev.memate.com.au/api/v1/m/jobs/accept/5/1500/
    console.log('Payload ===> ', config);
    const url = ApiBaseUrl+jobsAccept+payload.orgId+"/"+payload.jobId+"/";
    console.log('url ===> ', url);
    const response = await axios.put(url, payload, config);
    console.log("Response accept",response.data)
    return response.data;
  } catch (error) {
    console.log('Error  ===> ', error.response.data);
    return rejectWithValue({
      status: error.response?.status,
      message: error.response?.data || 'Something went wrong',
    });
  }
});

export const hitDeclineJobs = createAsyncThunk('hitDeclineJobs', async (payload, {rejectWithValue})=> {
    try {
      const token = await AsyncStorage.getItem("token")
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer "+token
        },
      };
      
      console.log('Payload ===> ', payload);
      const url = ApiBaseUrl+jobsDecline+payload.orgId+"/"+payload.jobId+"/"
      console.log('url ===> ', url);
      const param = {
        message : payload.message,
      }
      const response = await axios.put(url, param, config);
      console.log("Response jobsDecline",response.data)
      return response.data;
    } catch (error) {
      console.log('Error  ===> ', error.response.data);
      return rejectWithValue({
        status: error.response?.status,
        message: error.response?.data || 'Something went wrong',
      });
    }
  });
  

const JobsAcceptDeclineSlice = createSlice({
  name: 'jobsAcceptDeclineReducer',

  initialState: {
    isLoading: false,
    data: null,
    status:null,
    error: null,
  },
  reducers: {
    clearJobsAcceptDecline: state => {
      // Reset the data property to an empty array
      state.data = null;
      state.isAuthenticated = false;
      state.status = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(hitAcceptJobs.pending, state => {
        console.log('Loading  ===> ', state);
        state.isLoading = true;
        state.status = null;
        state.error = null;
      })
      .addCase(hitAcceptJobs.fulfilled, (state, action) => {
        console.log('Response aaaddd ===> ', state);
        state.isLoading = false;
        state.data = action.payload;
        state.status = action.payload.status;
      })
      .addCase(hitAcceptJobs.rejected, (state, action) => {
        console.log('Errorrrrrr  ===> ', state);
        state.error = action.payload?.message;
        state.status = action.payload?.status;
      })
      .addCase(hitDeclineJobs.pending, state => {
        console.log('Loading  ===> ', state);
        state.isLoading = true;
        state.status = null;
        state.error = null;
      })
      .addCase(hitDeclineJobs.fulfilled, (state, action) => {
        console.log('Response  ===> ', state);
        state.isLoading = false;
        state.data = action.payload;
        state.status = action.payload.status;
      })
      .addCase(hitDeclineJobs.rejected, (state, action) => {
        console.log('Errorrrrrr  ===> ', state);
        state.error = action.payload?.message;
        state.status = action.payload?.status;
      });
  },
});

export const {clearJobsAcceptDecline} = JobsAcceptDeclineSlice.actions;
export default JobsAcceptDeclineSlice.reducer;
