// src/redux/slices/authSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {ApiBaseUrl, getOrganizationApi} from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getOrganization = createAsyncThunk(
  'getOrganization',
  async payload => {
    try {
      const token = await AsyncStorage.getItem('token');

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      };
      console.log('Url ===> ', ApiBaseUrl + getOrganizationApi);

      console.log("headers ===> ",config)

      const response = await axios.get(ApiBaseUrl + getOrganizationApi, config);
      console.log('Response Login ===> ', response.data);
      return response.data;
    } catch (error) {
      console.log('Error ===> ', error);
      throw error.response.data;
    }
  },
);

const getOrganizationSlice = createSlice({
  name: 'getOrganizationReducer',

  initialState: {
    isLoading: false,
    data: null,
  },
  reducers: {
    getOrganizationClear: state => {
      // Reset the data property to an empty array
      state.data = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getOrganization.pending, state => {
        state.isLoading = true;
      })
      .addCase(getOrganization.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getOrganization.rejected, (state, action) => {
        state.isError = false;
      });
  },
});

export const {getOrganizationClear} = getOrganizationSlice.actions;
export default getOrganizationSlice.reducer;
