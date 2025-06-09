// src/redux/slices/authSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {ApiBaseUrl, jobs, report_read} from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const reportRead = createAsyncThunk('reportRead', async payload => {
  try {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };

    const url =
      payload && payload.dateFrom
        ? ApiBaseUrl +
          report_read +
          payload.id +
          '/' +
          payload.dateFrom +
          '/' +
          payload.dateTo
        : ApiBaseUrl + report_read + payload.id;
    // +      `/?limit=10&offset=${payload.offset}&statuses=${payload.status}`;

    console.log('URL Report Read ====> ', url);

    const response = await axios.get(url, config);
    console.log('Response report Data ===> ', response.data);
    return response.data;
  } catch (error) {
    console.log('Error ===> ', error);
    throw error.response.data;
  }
});

const ReportReadSlice = createSlice({
  name: 'reportReadReducer',

  initialState: {
    isLoading: false,
    data: null,
  },
  reducers: {
    clearReportRead: state => {
      // Reset the data property to an empty array
      state.data = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(reportRead.pending, state => {
        state.isLoading = true;
      })
      .addCase(reportRead.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(reportRead.rejected, (state, action) => {
        state.isError = false;
      });
  },
});

export const {clearReportRead} = ReportReadSlice.actions;
export default ReportReadSlice.reducer;
