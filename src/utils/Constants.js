import AsyncStorage from '@react-native-async-storage/async-storage';

//BASE URL
export const ApiBaseUrl = 'https://dev.memate.com.au/';
export const BASE_URL = `https://dev.memate.com.au/api/v1`;
// export const ApiBaseUrl = 'http://sn-cast-api.sparcknet.com:3001/api/';

//login
// https://dev.memate.com.au/api/v1/m/login/
export const emailLogin = 'api/v1/m/login/';
// Api Names
export const verifyEmail = 'api/v1/m/verify/email/';
export const getOrganizationApi = 'api/v1/m/organizations/list/';
// https://dev.memate.com.au/api/v1/m/verify/email/code/
export const verifyEmailCode = 'api/v1/m/verify/email/code/';
// https://dev.memate.com.au/api/v1/m/user/pin/
export const createPin = 'api/v1/m/user/pin/';
export const verifyPhone = 'api/v1/m/verify/phone/';
// https://dev.memate.com.au/api/v1/m/verify/phone/code/
export const verifyPhoneCode = 'api/v1/m/verify/phone/code/';
// https://dev.memate.com.au/api/v1/references/countries/
export const getCountries = 'api/v1/references/countries/';
// https://dev.memate.com.au/api/v1/references/states/{country}/
export const getStates = 'api/v1/references/states/';
export const getCity = 'api/v1/references/cities/';
export const attachmentFileUrl = 'api/v1/m/jobs/attachments/url/';

// https://dev.memate.com.au/api/v1/m/user/profile/update/
export const updateProfile = 'api/v1/m/user/profile/update/';

// https://dev.memate.com.au/api/v1/m/terms-and-conditions/
export const appTerms = 'api/v1/m/terms-and-conditions/';

// https://dev.memate.com.au/api/v1/m/jobs/{organization_pk}/

export const jobs = 'api/v1/m/jobs/';
// https://dev.memate.com.au/api/v1/m/jobs/accept/{organization_pk}/{id}/
export const jobsAccept = 'api/v1/m/jobs/accept/';
export const jobsDecline = 'api/v1/m/jobs/decline/';

export const jobStart = 'api/v1/m/jobs/start/';
export const jobStop = 'api/v1/m/jobs/finish/';
export const jobPause = 'api/v1/m/jobs/pause/';

// https://dev.memate.com.au/api/v1/m/tasks/{organization_pk}/all/
export const allTasks = 'api/v1/m/tasks/';
export const readTasks = 'api/v1/m/tasks/';
export const completeTask = 'api/v1/m/tasks/';

//Home Api's
export const report_read = 'api/v1/m/dashboard/report/';

export const getToken = async () => {
  const token = await AsyncStorage.getItem('token');
  return token;
};

export const formatDate = dateString => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};
