// src/redux/slices/authSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {ApiBaseUrl, completeTask} from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const hitCompleteTask = createAsyncThunk('hitCompleteTask', async payload => {
  try {
    const token = await AsyncStorage.getItem("token")
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer "+token
      },
    };
    console.log('Payload ===> ', config);
    const url = ApiBaseUrl+completeTask+payload.orgId+"/"+payload.taskId+"/complete/";
    console.log('url ===> ', url);
    const response = await axios.post(url, payload, config);
    console.log("Response accept",response.data)
    return response.data;
  } catch (error) {
    console.log('Error  ===> ', error.response.data);
    throw error.response.data;
  }
});


const CompleteTaskSlice = createSlice({
  name: 'completeTaskReducer',

  initialState: {
    isLoading: false,
    data: null,
  },
  reducers: {
    clearhitCompleteTask: state => {
      // Reset the data property to an empty array
      state.data = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(hitCompleteTask.pending, state => {
        console.log('Loading  ===> ', state);
        state.isLoading = true;
      })
      .addCase(hitCompleteTask.fulfilled, (state, action) => {
        console.log('Response aaaddd ===> ', state);
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(hitCompleteTask.rejected, (state, action) => {
        console.log('Errorrrrrr  ===> ', state);
        state.isError = false;
      });
  },
});

export const {clearhitCompleteTask} = CompleteTaskSlice.actions;
export default CompleteTaskSlice.reducer;
