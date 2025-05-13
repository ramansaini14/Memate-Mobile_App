// src/redux/slices/authSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {ApiBaseUrl, getCity, getCountries, getStates} from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const hitGetCities= createAsyncThunk('hitGetCities', async payload => {
  try {
    const token = await AsyncStorage.getItem("token")

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer "+token
      },
    };
   
    const url = ApiBaseUrl+getCity+payload.id+"/"
    console.log('Payload ===> ', url);
    const response = await axios.get(url, config);

    // console.log('response Cities===> ', response.data);
    return response.data;
  } catch (error) {
    console.log('Error  ===> ', error.response.data);
    throw error.response.data;
  }
});

const GetCitySlice = createSlice({
  name: 'getCityReducer',

  initialState: {
    isLoading: false,
    data: null,
  },
  reducers: {
    clearGetCity: state => {
      // Reset the data property to an empty array
      state.data = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(hitGetCities.pending, state => {
        console.log('Loading  ===> ', state);
        state.isLoading = true;
      })
      .addCase(hitGetCities.fulfilled, (state, action) => {
        console.log('Response  ===> ', state);
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(hitGetCities.rejected, (state, action) => {
        console.log('Errorrrrrr  ===> ', state);
        state.isError = false;
      });
  },
});

export const {clearGetCity} = GetCitySlice.actions;
export default GetCitySlice.reducer;
