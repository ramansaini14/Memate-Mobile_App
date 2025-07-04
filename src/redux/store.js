import {configureStore} from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import verifyEmailReducer from './VerifyEmailSlice';
import verifyEmailCodeReducer from './VerifyEmailCodeSlice';
import createPinReducer from './CreatePinSlice';
import verifyPhoneReducer from './VerifyPhoneSlice';
import verifyPhoneCodeReducer from './VerifyPhoneCodeSlice';
import getCountriesReducer from './GetCountriesSlice';
import getStateReducer from './GetStateSlice';
import getCityReducer from './GetCitiesSlice';
import updateProfileReducer from './UpdateProfileSlice';
import getAppTermsReducer from './GetAppTermsSlice';
import getOrganizationReducer from './getOrganizationSlice';
import acceptDeclineTermsReducer from './AcceptDeclineTermSlice';
import getJobsReducer from './GetJobsSlice';
import jobsAcceptDeclineReducer from './JobsAcceptDeclineSlice';
import jobsStatusReducer from './JobStatusSlice';
import timerReducer from './TimerSlice';
import allTaskReducer from './AllTaskSlice';
import readTaskReducer from './ReadTasksSlice';
import completeTaskReducer from './CompleteTaskSlice';
import attachmentFileUrlReducer from './AttachmentFileUrlSlice';
import reportReadReducer from './ReportReadSlice';
import upload from './uploadSlice';
import getProfileReducer from './GetProfileSlice';
import deleteProfileReducer from './DeleteProfileSlice';
import globalReducer from './GlobalSlice';
import forgotReducer from './ForgotSlice';
import jobPauseReducer from './PauseJobSlice';
import jobsStartReducer from './StartJobSlice';
import jobFinishReducer from './FinishJobSlice';
import updateProfileInnerReducer from './UpdateProfileInnerSlice';

const store = configureStore({
  reducer: {
    loginReducer: loginReducer,
    verifyEmailReducer: verifyEmailReducer,
    verifyEmailCodeReducer: verifyEmailCodeReducer,
    createPinReducer: createPinReducer,
    verifyPhoneReducer: verifyPhoneReducer,
    verifyPhoneCodeReducer: verifyPhoneCodeReducer,
    getCountriesReducer: getCountriesReducer,
    getStateReducer: getStateReducer,
    getCityReducer: getCityReducer,
    updateProfileReducer: updateProfileReducer,
    getAppTermsReducer: getAppTermsReducer,
    getOrganizationReducer: getOrganizationReducer,
    acceptDeclineTermsReducer: acceptDeclineTermsReducer,
    getJobsReducer: getJobsReducer,
    jobsAcceptDeclineReducer: jobsAcceptDeclineReducer,
    jobsStatusReducer: jobsStatusReducer,
    timer: timerReducer,
    allTaskReducer: allTaskReducer,
    readTaskReducer: readTaskReducer,
    completeTaskReducer: completeTaskReducer,
    attachmentFileUrlReducer: attachmentFileUrlReducer,
    reportReadReducer: reportReadReducer,
    upload: upload,
    getProfileReducer: getProfileReducer,
    deleteProfileReducer: deleteProfileReducer,
    globalReducer:globalReducer,
    forgotReducer:forgotReducer,
    jobPauseReducer:jobPauseReducer,
    jobsStartReducer:jobsStartReducer,
    jobFinishReducer:jobFinishReducer,
    updateProfileInnerReducer:updateProfileInnerReducer,
  },
});

export default store;
