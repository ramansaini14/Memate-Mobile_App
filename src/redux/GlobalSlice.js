import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profileData: null, // or an empty object: {}
  jobData:null,
  chatData:null,
  isPausedGlobal:true
};

const GlobalSlice = createSlice({
  name: 'globalReducer',
  initialState,
  reducers: {
    setProfileData(state, action) {
      state.profileData = action.payload;
    },
    setJobDataGlobally(state, action) {
      state.jobData = action.payload;
    },
    setChatData(state, action) {
      state.chatData = action.payload;
    },
    setIsPayused(state, action) {
      state.isPausedGlobal = action.payload;
    },
    clearProfileData(state) {
      state.profileData = null;
    }
  }
});

export const { setProfileData, clearProfileData,setJobDataGlobally,setChatData,setIsPayused } = GlobalSlice.actions;
export default GlobalSlice.reducer;