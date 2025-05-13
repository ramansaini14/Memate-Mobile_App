// src/redux/slices/authSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {ApiBaseUrl, readTasks} from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const hitReadTasks = createAsyncThunk(
  'hitReadTasks',
  async payload => {
    try {
      const token = await AsyncStorage.getItem('token');

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      };
     
      const url = ApiBaseUrl+readTasks+payload.id+"/"+payload.taskId+"/"
      console.log('URL ===> ', url);

      const response = await axios.get(url, config);
      console.log('Response read Data ===> ', response.data);
      return response.data;
    } catch (error) {
      console.log('Error ===> ', error);
      throw error.response.data;
    }
  },
);

const ReadTaskSlice = createSlice({
  name: 'readTaskReducer',

  initialState: {
    isLoading: false,
    data: null,
  },
  reducers: {
    clearReadTasks: state => {
      // Reset the data property to an empty array
      state.data = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(hitReadTasks.pending, state => {
        state.isLoading = true;
      })
      .addCase(hitReadTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(hitReadTasks.rejected, (state, action) => {
        state.isError = false;
      });
  },
});

export const {clearReadTasks} = ReadTaskSlice.actions;
export default ReadTaskSlice.reducer;
