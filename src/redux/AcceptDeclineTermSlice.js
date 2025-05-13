// src/redux/slices/authSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {ApiBaseUrl, appTerms} from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const hitAcceptDeclineTerms= createAsyncThunk('hitAcceptDeclineTerms', async payload => {
  try {
    const token = await AsyncStorage.getItem("token")

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer "+token
      },
    };
   
    const url = `${ApiBaseUrl}${appTerms}${payload.id}/${payload.accept}/`
    console.log('Url ===> ', url);
    const response = await axios.put(url, payload,config);

    console.log('response hitAcceptDeclineTerms ===> ', response.data);
    return response.data;
  } catch (error) {
    console.log('Error  ===> ', error.response.data);
    throw error.response.data;
  }
});

const AcceptDeclineTermSlice = createSlice({
  name: 'acceptDeclineTermsReducer',

  initialState: {
    isLoading: false,
    data: null,
  },
  reducers: {
    clearAcceptDeclineTerms: state => {
      // Reset the data property to an empty array
      state.data = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(hitAcceptDeclineTerms.pending, state => {
        console.log('Loading  ===> ', state);
        state.isLoading = true;
      })
      .addCase(hitAcceptDeclineTerms.fulfilled, (state, action) => {
        console.log('Response  ===> ', state);
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(hitAcceptDeclineTerms.rejected, (state, action) => {
        console.log('Errorrrrrr  ===> ', state);
        state.isError = false;
      });
  },
});

export const {clearAcceptDeclineTerms} = AcceptDeclineTermSlice.actions;
export default AcceptDeclineTermSlice.reducer;
