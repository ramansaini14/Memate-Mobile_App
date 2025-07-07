import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {ApiBaseUrl, updateProfile} from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Async thunk for fetching data
export const hitUpdateProfileInner = createAsyncThunk(
  'hitUpdateProfileInner',
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

    if (payload.image === null || payload.image === undefined) {

     console.log("Payload Not with Image ===> ", payload.profileData);
      
      formData.append(
        'first_name',
        payload.profileData.firstName,
      );
      
      formData.append(
        'last_name',
        payload.profileData.lastName,
      );

      formData.append(
        'country_code',
        payload.profileData.countryCode,
      );
     
      formData.append('phone', payload.profileData.phoneNumber);
      formData.append('date_of_birth', payload.profileData.dob);
      formData.append('abn', payload.profileData.abn);
      formData.append('city', payload.profileData.city);
      formData.append('city_text', payload.profileData.city_text);
      formData.append('state_text', payload.profileData.state_text);
      formData.append('country_text', payload.profileData.country_text);
      formData.append(
        'street_address',
        payload.profileData.streetAddress,
      );
      formData.append(
        'postcode',
        payload.profileData.postcode,
      );
      formData.append(
        'emergency_country_code',
        payload.profileData.countryCode,
      );
      formData.append(
        'emergency',
        payload.profileData.phoneNumber,
      );
      formData.append('emergency_name', payload.profileData.name);

    } else {
     
      console.log("Payload with Image ===> ", payload);
      formData.append('photo', {
        uri: payload.image.path,
        name: payload.image?.filename,
        type: 'image/jpg',
      });

      formData.append(
        'first_name',
        payload.profileData.firstName,
      );
      
      formData.append(
        'last_name',
        payload.profileData.lastName,
      );

      formData.append(
        'country_code',
        payload.profileData.countryCode,
      );
     
      formData.append('phone', payload.profileData.phoneNumber);
      formData.append('date_of_birth', payload.profileData.dob);
      formData.append('abn', payload.profileData.abn);
      formData.append('city', payload.profileData.city);
      formData.append('city_text', payload.profileData.city_text);
      formData.append('state_text', payload.profileData.state_text);
      formData.append('country_text', payload.profileData.country_text);
      formData.append(
        'street_address',
        payload.profileData.streetAddress,
      );
      formData.append(
        'postcode',
        payload.profileData.postcode,
      );
      formData.append(
        'emergency_country_code',
        payload.profileData.countryCode,
      );
      formData.append(
        'emergency',
        payload.profileData.phoneNumber,
      );
      formData.append('emergency_name', payload.profileData.name);

    }
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

const UpdateProfileInnerSlice = createSlice({
  name: 'updateProfileInnerReducer',
  initialState: {
    data: null,
    loading: 'idle',
    statusCode: null,
    error: null,
  },
  reducers: {
    clearUpdateProfileInner: state => {
      state.data = null;
      state.statusCode = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(hitUpdateProfileInner.pending, state => {
        state.loading = 'pending';
        state.statusCode = null;
      })
      .addCase(hitUpdateProfileInner.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.data = action.payload;
        state.error = null;
        state.statusCode = action.payload.status;
      })
      .addCase(hitUpdateProfileInner.rejected, (state, action) => {
        console.log('Upload Image Error ===> ', state);
        state.loading = 'idle';
        state.statusCode = action.payload?.status;
        state.error = action.error.message;
      });
  },
});

export const {clearUpdateProfileInner} = UpdateProfileInnerSlice.actions;
export default UpdateProfileInnerSlice.reducer;
