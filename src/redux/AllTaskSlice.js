// src/redux/slices/authSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {allTasks, ApiBaseUrl} from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const hitAllTasks = createAsyncThunk(
  'hitAllTasks',
  async payload => {
    try {
      const token = await AsyncStorage.getItem('token');

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      };
     
      const url = ApiBaseUrl+allTasks+payload.id+"/"+payload.api+"/"
      console.log("ALL TASKS GET URL ===> ", url);

      const response = await axios.get(url, config);
      console.log('Response hitAllTasks Data ===> ', response.data);
      return response.data;
    } catch (error) {
      console.log('Error ===> ', error);
      throw error.response.data;
    }
  },
);

const AllTaskSlice = createSlice({
  name: 'allTaskReducer',

  initialState: {
    isLoading: false,
    data: null,
  },
  reducers: {
    clearAllTasks: state => {
      // Reset the data property to an empty array
      state.data = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(hitAllTasks.pending, state => {
        state.isLoading = true;
      })
      .addCase(hitAllTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(hitAllTasks.rejected, (state, action) => {
        state.isError = false;
      });
  },
});

export const {clearAllTasks} = AllTaskSlice.actions;
export default AllTaskSlice.reducer;
