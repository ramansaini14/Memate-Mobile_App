import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {ApiBaseUrl, BASE_URL, updateProfile} from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Async thunk for fetching data
export const hitUpdateProfile = createAsyncThunk(
  'hitUpdateProfile',
  async ( payload) => {

  
    const token = await AsyncStorage.getItem('token');
    
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-HTTP-Method-Override': 'PUT',
        Authorization: 'Bearer ' + token,
      },
    };

    const formData = new FormData();

    


    formData.append('photo', {
      uri: payload.image.path,
      name: payload.image.filename,
      type: 'image/jpeg',
    });

   
    formData.append('first_name', payload.profileData.data.detailData.firstName);
    formData.append('last_name',payload.profileData.data.detailData.lastName);
    formData.append('country_code', payload.profileData.data.detailData.countryCode);
    formData.append('phone', payload.profileData.data.detailData.phoneNumber);
    formData.append('date_of_birth',payload.profileData.data.detailData.dob);
    formData.append('abn', payload.profileData.data.detailData.abn);
    formData.append('city', payload.profileData.data.profileData.city);
    formData.append('street_address',payload.profileData.data.profileData.streetAddress);
    formData.append('postcode', payload.profileData.data.profileData.postcode);
    formData.append('emergency_country_code', payload.profileData.emergencyData.countryCode);
    formData.append('emergency', payload.profileData.emergencyData.phoneNumber);
    formData.append('emergency_name', payload.profileData.emergencyData.name);
    console.log('FormData ===> ', formData);

    // const requestBody = {
    //   first_name: payload.profileData.data.detailData.firstName || '',
    //   last_name: payload.profileData.data.detailData.lastName || '',
    //   country_code: payload.profileData.data.detailData.countryCode || '',
    //   phone: payload.profileData.data.detailData.phoneNumber || '',
    //   date_of_birth: payload.profileData.data.detailData.dob || '',
    //   abn: payload.profileData.data.detailData.abn || '',
    //   city: payload.profileData.data.profileData.city || '',
    //   street_address: payload.profileData.data.profileData.streetAddress || '',
    //   postcode: payload.profileData.data.profileData.postcode || '',
    //   emergency_country_code:payload.profileData.emergencyData.countryCode || '',
    //   emergency: payload.profileData.emergencyData.phoneNumber || '',
    //   emergency_name: payload.profileData.emergencyData.name|| '',
    // };
    
    // If the image exists, add its base64 or file URL (depending on API requirements)
    // if (payload.image && payload.image.path) {
    //   requestBody.photo = {
    //     uri: payload.image.path,
    //     name: payload.image.filename || payload.image.name || 'profile.jpg',
    //     type: payload.image.mime || 'image/jpeg',
    //   };
    // }
    
    // Convert the request body into JSON for the API call
    // const jsonBody = JSON.stringify(requestBody);
    // console.log('FormData ===> ', jsonBody);

    try {
      const url = ApiBaseUrl + updateProfile;
      console.log("URl ====> ",url)
      const response = await axios.put(url, formData, config);
      console.log('Upload file Response ===>', response.data);
      return response.data;
    } catch (error) {
      console.log('Error Details:', error.response?.data || error.message);
      throw error;
    }
  },
);

const UpdateProfileSlice = createSlice({
  name: 'updateProfileReducer',
  initialState: {
    data: null,
    loading: 'idle',
    error: null,
  },
  reducers: {
    clearUpdateProfile: state => {
      state.data = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(hitUpdateProfile.pending, state => {
        state.loading = 'pending';
      })
      .addCase(hitUpdateProfile.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(hitUpdateProfile.rejected, (state, action) => {
        console.log('Upload Image Error ===> ', action.payload);
        state.loading = 'idle';
        state.error = action.error.message;
      });
  },
});

export const {clearUpdateProfile} = UpdateProfileSlice.actions;
export default UpdateProfileSlice.reducer;
