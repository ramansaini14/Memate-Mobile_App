import {createSlice} from '@reduxjs/toolkit';
import {clear} from 'console';

const initialState = {
  profileData: null, // or an empty object: {}
  jobData: null,
  chatData: null,
  isPausedGlobal: true,
  globallyOrgData: null,
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
    setGloballyOrgData(state, action) {
      console.log("Setting globallyOrgData:", action.payload);
      state.globallyOrgData = action.payload;
    },
    clearProfileData(state) {
      state.profileData = null;
    },
    clearJobData(state) {
      state.jobData = null;
    },
    clearChatData(state) {
      state.chatData = null;
    },
    clearGloballyOrgData(state) {
      state.globallyOrgData = null;
    },
  },
});

export const {
  setProfileData,
  clearProfileData,
  setJobDataGlobally,
  setChatData,
  setIsPayused,
  setGloballyOrgData,
  clearJobData,
  clearChatData,
  clearGloballyOrgData,
} = GlobalSlice.actions;
export default GlobalSlice.reducer;
