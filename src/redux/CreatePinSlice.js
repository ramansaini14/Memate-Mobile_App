// src/redux/slices/authSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {ApiBaseUrl, createPin, getToken} from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const hitCreatePin = createAsyncThunk('hitCreatePin', async payload => {
  try {

    const token = await AsyncStorage.getItem("token")

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer "+token
      },
    };
    console.log('Headers ===> ', config, " Payload ===> ",payload);
    const url = ApiBaseUrl+createPin
    const response = await axios.post(url, payload, config);
    console.log('Response Login ===> ', response.data);
    return response.data;
  } catch (error) {
    console.log('Error  ===> ', error.response.data);
    throw error.response.data;
  }
});

const CreatePinSlice = createSlice({
  name: 'createPinReducer',

  initialState: {
    isLoading: false,
    data: null,
  },
  reducers: {
    clearCreatePin: state => {
      // Reset the data property to an empty array
      state.data = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(hitCreatePin.pending, state => {
        console.log('Loading  ===> ', state);
        state.isLoading = true;
      })
      .addCase(hitCreatePin.fulfilled, (state, action) => {
        console.log('Response  ===> ', state);
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(hitCreatePin.rejected, (state, action) => {
        console.log('Errorrrrrr  ===> ', state);
        state.isError = false;
      });
  },
});

export const {clearCreatePin} = CreatePinSlice.actions;
export default CreatePinSlice.reducer;
