// src/redux/slices/authSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {ApiBaseUrl, getCountries, getStates} from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const hitGetState= createAsyncThunk('hitGetState', async payload => {
  try {
    const token = await AsyncStorage.getItem("token")

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer "+token
      },
    };
   
    const url = ApiBaseUrl+getStates+payload.id+"/"
    console.log('Payload ===> ', url);
    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    console.log('Error  ===> ', error.response.data);
    throw error.response.data;
  }
});

const GetStateSlice = createSlice({
  name: 'getStateReducer',

  initialState: {
    isLoading: false,
    data: null,
  },
  reducers: {
    clearGetState: state => {
      // Reset the data property to an empty array
      state.data = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(hitGetState.pending, state => {
        console.log('Loading  ===> ', state);
        state.isLoading = true;
      })
      .addCase(hitGetState.fulfilled, (state, action) => {
        console.log('Response  ===> ', state);
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(hitGetState.rejected, (state, action) => {
        console.log('Errorrrrrr  ===> ', state);
        state.isError = false;
      });
  },
});

export const {clearGetState} = GetStateSlice.actions;
export default GetStateSlice.reducer;
