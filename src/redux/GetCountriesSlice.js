// src/redux/slices/authSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {ApiBaseUrl, getCountries} from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const hitGetCounties = createAsyncThunk('hitGetCounties', async payload => {
  try {
    const token = await AsyncStorage.getItem("token")

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer "+token
      },
    };
    console.log('Payload ===> ', config);
    const url = ApiBaseUrl+getCountries
    console.log('URL Country===> ', url);
    const response = await axios.get(url, config);
    console.log('Response Verify Phone ===> ', response.data);
    return response.data;
  } catch (error) {
    console.log('Error  ===> ', error.response.data);
    throw error.response.data;
  }
});

const GetCountriesSlice = createSlice({
  name: 'getCountriesReducer',

  initialState: {
    isLoading: false,
    data: null,
  },
  reducers: {
    clearGetCountries: state => {
      // Reset the data property to an empty array
      state.data = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(hitGetCounties.pending, state => {
        console.log('Loading  ===> ', state);
        state.isLoading = true;
      })
      .addCase(hitGetCounties.fulfilled, (state, action) => {
        console.log('Response  ===> ', state);
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(hitGetCounties.rejected, (state, action) => {
        console.log('Errorrrrrr  ===> ', state);
        state.isError = false;
      });
  },
});

export const {clearGetCountries} = GetCountriesSlice.actions;
export default GetCountriesSlice.reducer;
