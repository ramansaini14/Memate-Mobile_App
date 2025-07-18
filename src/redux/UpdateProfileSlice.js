import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {ApiBaseUrl, BASE_URL, updateProfile} from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Async thunk for fetching data
export const hitUpdateProfile = createAsyncThunk(
  'hitUpdateProfile',
  async payload => {
    const token = await AsyncStorage.getItem('token');

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-HTTP-Method-Override': 'PUT',
        Authorization: 'Bearer ' + token,
      },
    };

    const formData = new FormData();

     
      console.log("Payload with Image ===> ", payload);
      formData.append('photo', {
        uri: payload.image.path,
        name: payload.image?.filename,
        type: 'image/jpg',
      });

      formData.append(
        'first_name',
        payload.profileData.data.detailData.firstName,
      );
      formData.append(
        'last_name',
        payload.profileData.data.detailData.lastName,
      );
      formData.append(
        'country_code',
        payload.profileData.data.detailData.countryCode,
      );
      formData.append('phone', payload.profileData.data.detailData.phoneNumber);
      formData.append('date_of_birth', payload.profileData.data.detailData.dob);
      formData.append('abn', payload.profileData.data.detailData.abn);
      formData.append('city', payload.profileData.data.profileData.city);
      formData.append('city_text', payload.profileData.data.profileData.city_text);
      formData.append('state_text', payload.profileData.data.profileData.state_text);
      formData.append('country_text', payload.profileData.data.profileData.country_text);
      formData.append(
        'street_address',
        payload.profileData.data.profileData.streetAddress,
      );
      formData.append(
        'postcode',
        payload.profileData.data.profileData.postcode,
      );
      formData.append(
        'emergency_country_code',
        payload.profileData.emergencyData.countryCode,
      );
      formData.append(
        'emergency',
        payload.profileData.emergencyData.phoneNumber,
      );
      formData.append('emergency_name', payload.profileData.emergencyData.name);
  
    console.log('FormData ===> ', formData);
    try {
      const url = ApiBaseUrl + updateProfile;
      console.log('URl ====> ', url);
      const response = await axios.put(url, formData, config);
      console.log('Upload file Response ===>', response.data);
      return {
        data: response.data,
        status: response.status,
      };
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
    status: null,
    error: null,
  },
  reducers: {
    clearUpdateProfile: state => {
      state.data = null;
      state.statusCode = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(hitUpdateProfile.pending, state => {
        state.loading = 'pending';
        state.statusCode = null;
      })
      .addCase(hitUpdateProfile.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.data = action.payload;
        state.error = null;
        state.statusCode = action.payload.status;
      })
      .addCase(hitUpdateProfile.rejected, (state, action) => {
        console.log('Upload Image Error ===> ', state);
        state.loading = 'idle';
        state.statusCode = action.payload?.status;
        state.error = action.error.message;
      });
  },
});

export const {clearUpdateProfile} = UpdateProfileSlice.actions;
export default UpdateProfileSlice.reducer;
