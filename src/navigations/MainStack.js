import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../screens/SignIn';
import SignInWithEmail from '../screens/SignIn/SignInWithEmail';
import OtpScreen from '../screens/Otp';
import ChooseOrganization from '../screens/ChooseOrganization';
import BottomBar from '../screens/BottomBar';
import Menu from '../screens/Menu';
import HomeScreen from '../screens/BottomBar/Home';
import Profile from '../screens/Profile/Index';
import EditProfile from '../screens/Profile/EditProfile';
import DeleteAccount from '../screens/DeleteAccount/DeleteAccount';
import Setting from '../screens/Settng/Setting';
import Unavailability from '../screens/Unavailability/Unavailability';
import NewDateAdd from '../screens/NewDateAdd/NewDateAdd';
import Chat from '../screens/Chat/Chat';
import BellaMeillenia from '../screens/BellaMeillenia/BellaMeillenia';
import News from '../screens/News/News';
import NewsLink from '../screens/News/NewsLink';
import Conditions from '../screens/Conditions/Conditions';
import JobCard from '../screens/JobCard/JobCard';
import JobsScreen from '../screens/BottomBar/Jobs';
import JobCardConfirmButton from '../screens/JobCard/JobCardConfirmButton';
import JobCardSwipeJob from '../screens/JobCard/JobCardSwipeJob';
import JobSwipeDone from '../screens/JobCard/JobSwipeDone';
import CompleteJob from '../screens/JobCard/CompleteJob';
import ApprovedJob from '../screens/JobCard/ApprovedJob';
import EditionWork from '../screens/JobCard/EditionWork';
import NotCompleteTask from '../screens/BottomBar/Tasks/NotCompleteTask';
import CompleteTask from '../screens/BottomBar/Tasks/CompleteTask';
import TasksScreen from '../screens/BottomBar/Tasks';
import {Calendar} from '../screens/Calendar';
import StartScreen from '../screens/StartScreen';
import EmailConfirmation from '../screens/EmailConfirmation';
import CreatePin from '../screens/CreatePin';
import RequireDetails from '../screens/CreateProfile/RequiredDetails';
import VerifyPhoneNumber from '../screens/CreateProfile/VerifyPhoneNumber';
import ProfileAddress from '../screens/CreateProfile/ProfileAddress';
import ProfilePicture from '../screens/CreateProfile/ProfilePicture';
import ProfileAgencyContact from '../screens/CreateProfile/EmergencyContact';
import TermsAndConditions from '../screens/TermsAndConditions';
import ImageCropper from '../screens/ImageCropper';
import SplashScreen from '../screens/SplashScreen';
import LoginPin from '../screens/LoginPin';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName='SplashScreen'>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="StartScreen" component={StartScreen} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="LoginPin" component={LoginPin} />
      <Stack.Screen name="SignInWithEmail" component={SignInWithEmail} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
      <Stack.Screen name="EmailConfirmation" component={EmailConfirmation} />
      <Stack.Screen name="CreatePin" component={CreatePin} />
      <Stack.Screen name="RequireDetails" component={RequireDetails} />
      <Stack.Screen name="VerifyPhoneNumber" component={VerifyPhoneNumber} />
      <Stack.Screen name="ProfileAddress" component={ProfileAddress} />
      <Stack.Screen name="ProfileAgencyContact" component={ProfileAgencyContact} />
      <Stack.Screen name="ProfilePicture" component={ProfilePicture} />
      <Stack.Screen name="ChooseOrganization" component={ChooseOrganization} />
      <Stack.Screen name="BottomBar" component={BottomBar} />
      <Stack.Screen name="JobsScreen" component={JobsScreen} />
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="Unavailability" component={Unavailability} />
      <Stack.Screen name="NewDateAdd" component={NewDateAdd} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="BellaMeillenia" component={BellaMeillenia} />
      <Stack.Screen name="News" component={News} />
      <Stack.Screen name="NewLink" component={NewsLink} />
      <Stack.Screen name="Conditions" component={Conditions} />
      <Stack.Screen name="JobCard" component={JobCard} />
      <Stack.Screen name="Calendar" component={Calendar} />
      <Stack.Screen name="JobCardConfirmButton" component={JobCardConfirmButton} />
      <Stack.Screen name="JobCardSwipeJob" component={JobCardSwipeJob} />
      <Stack.Screen name="JobSwipeDone" component={JobSwipeDone} />
      <Stack.Screen name="CompleteJob" component={CompleteJob} />
      <Stack.Screen name="ApprovedJob" component={ApprovedJob} />
      <Stack.Screen name="EditionWork" component={EditionWork} />
      <Stack.Screen name="TasksScreen" component={TasksScreen} />
      <Stack.Screen name="NotCompleteTask" component={NotCompleteTask} />
      <Stack.Screen name="CompleteTask" component={CompleteTask} />
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
      <Stack.Screen name="ImageCropper" component={ImageCropper} />
    </Stack.Navigator>
  );
};

export default MainStack; 