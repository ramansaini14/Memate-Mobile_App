// src/redux/slices/authSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {ApiBaseUrl, appTerms} from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const hitAppTerms= createAsyncThunk('hitAppTerms', async payload => {
  try {
    const token = await AsyncStorage.getItem("token")

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer "+token
      },
    };
   
    const url =  payload?.orgId?`${ApiBaseUrl+appTerms}${payload.orgId}/`:ApiBaseUrl+appTerms;
    console.log('url terms ===> ', url);
    const response = await axios.get(url, config);

    console.log('response appTerms ===> ', response.data);
    return response.data;
  } catch (error) {
    console.log('Error  ===> ', error.response.data);
    throw error.response.data;
  }
});

const GetAppTermsSlice = createSlice({
  name: 'getAppTermsReducer',

  initialState: {
    isLoading: false,
    data: null,
  },
  reducers: {
    clearAppTerms: state => {
      // Reset the data property to an empty array
      state.data = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(hitAppTerms.pending, state => {
        console.log('Loading  ===> ', state);
        state.isLoading = true;
      })
      .addCase(hitAppTerms.fulfilled, (state, action) => {
        console.log('Response  ===> ', state);
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(hitAppTerms.rejected, (state, action) => {
        console.log('Errorrrrrr  ===> ', state);
        state.isError = false;
      });
  },
});

export const {clearAppTerms} = GetAppTermsSlice.actions;
export default GetAppTermsSlice.reducer;
