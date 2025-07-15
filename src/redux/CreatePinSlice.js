// src/redux/slices/authSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {ApiBaseUrl, createPin, getToken} from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const hitCreatePin = createAsyncThunk('hitCreatePin', async (payload, {rejectWithValue}) => {
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
    console.log('Url ===> ', url);
    const response = await axios.post(url, payload, config);
    console.log('Response Login pin created ===> ', response.data);
    return response.data;
  } catch (error) {
    console.log('Error  ===> ', error.response.data);
    return rejectWithValue({
      status: error.response?.status,
      message: error.response?.data ,
      loading: error.response.loading
    });
    // throw rejectWithValue(error.response.status);
  }
});

const CreatePinSlice = createSlice({
  name: 'createPinReducer',

  initialState: {
    isLoading: false,
    data: null,
    status: null,
    isError: null,
  },
  reducers: {
    clearCreatePin: state => {
      // Reset the data property to an empty array
      state.data = null;
      state.isAuthenticated = false;
      state.status = null;
      state.isError = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(hitCreatePin.pending, state => {
        console.log('Loading FOR FACEID  ===> ', state);
        state.isLoading = true;
      })
      .addCase(hitCreatePin.fulfilled, (state, action) => {
        console.log('Persisted before PIN Creation ===> ', state);
        state.isLoading = false;
        state.data = action.payload;
        state.status = true;
        state.isError = false;
        console.log('Persisted after PIN Creation ===> ', state);
      })
      .addCase(hitCreatePin.rejected, (state, action) => {
        
        state.isLoading = false;
        state.status = false;
        state.isError = true;
        console.log('Errorrrrrr  ===> ', state);
      });
  },
});

export const {clearCreatePin} = CreatePinSlice.actions;
export default CreatePinSlice.reducer;
