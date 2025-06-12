import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import RNFS from 'react-native-fs';
import {Buffer} from 'buffer';

export const uploadImageToS3 = createAsyncThunk(
  'upload/uploadImageToS3',
  async ({localFilePath, presignedUrl}, {rejectWithValue}) => {
    try {
      // Read the image file as base64
      const base64 = await RNFS.readFile(localFilePath, 'base64');

      // Convert base64 to binary buffer
      const buffer = Buffer.from(base64, 'base64');

      console.log('🟡 Uploading to:', presignedUrl);
      console.log('📄 File path:', localFilePath);
      //   console.log('🧾 MIME type:', mimeType);

      // Upload to S3 with binary data and proper headers
      const response = await axios.put(presignedUrl, buffer);
      console.log('Response Upload Image ====> ', response);
      if (response.status === 200) {
        console.log('✅ Upload successful!');
        return '✅ Upload successful!';
      } else {
        return rejectWithValue('❌ Upload failed: ' + response.status);
      }
    } catch (error) {
      console.error('❌ Upload error:', error);
      return rejectWithValue(error?.message || 'Unknown error');
    }
  },
);

const uploadSlice = createSlice({
  name: 'upload',
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(uploadImageToS3.pending, state => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(uploadImageToS3.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(uploadImageToS3.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      });
  },
});

export default uploadSlice.reducer;
