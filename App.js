import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import SignIn from './src/screens/SignIn';
import SignInWithEmail from './src/screens/SignIn/SignInWithEmail';
import OtpScreen from './src/screens/Otp';
import ChooseOrganization from './src/screens/ChooseOrganization';
import BottomBar from './src/screens/BottomBar';
import Menu from './src/screens/Menu';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import HomeScreen from './src/screens/BottomBar/Home';
import Profile from './src/screens/Profile/Index';
import EditProfile from './src/screens/Profile/EditProfile';
import DeleteAccount from './src/screens/DeleteAccount/DeleteAccount';
import Setting from './src/screens/Settng/Setting';
import Unavailability from './src/screens/Unavailability/Unavailability';
import NewDateAdd from './src/screens/NewDateAdd/NewDateAdd';
import Chat from './src/screens/Chat/Chat';
import BellaMeillenia from './src/screens/BellaMeillenia/BellaMeillenia';
import News from './src/screens/News/News';
import NewsLink from './src/screens/News/NewsLink';
import Conditions from './src/screens/Conditions/Conditions';
import JobCard from './src/screens/JobCard/JobCard';
import JobsScreen from './src/screens/BottomBar/Jobs';
import JobCardConfirmButton from './src/screens/JobCard/JobCardConfirmButton';
import JobCardSwipeJob from './src/screens/JobCard/JobCardSwipeJob';
import JobSwipeDone from './src/screens/JobCard/JobSwipeDone';
import CompleteJob from './src/screens/JobCard/CompleteJob';
import ApprovedJob from './src/screens/JobCard/ApprovedJob';
import EditionWork from './src/screens/JobCard/EditionWork';
import NotCompleteTask from './src/screens/BottomBar/Tasks/NotCompleteTask';
import CompleteTask from './src/screens/BottomBar/Tasks/CompleteTask';
import TasksScreen from './src/screens/BottomBar/Tasks';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import {appColors} from './src/utils/appColors';
import {Calendar} from './src/screens/Calendar';
import StartScreen from './src/screens/StartScreen';
import EmailConfirmation from './src/screens/EmailConfirmation';
import CreatePin from './src/screens/CreatePin';
import RequireDetails from './src/screens/CreateProfile/RequiredDetails';
import VerifyPhoneNumber from './src/screens/CreateProfile/VerifyPhoneNumber';
import ProfileAddress from './src/screens/CreateProfile/ProfileAddress';
import ProfilePicture from './src/screens/CreateProfile/ProfilePicture';
import ProfileAgencyContact from './src/screens/CreateProfile/EmergencyContact';
import TermsAndConditions from './src/screens/TermsAndConditions';
import ImageCropper from './src/screens/ImageCropper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {appTerms} from './src/utils/Constants';
import SplashScreen from './src/screens/SplashScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  

  return (
    <Provider store={store}>
      <SafeAreaProvider style={{flex: 1}}>
        <StatusBar
          backgroundColor={appColors.white}
          animated
          barStyle={'default'}
        />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName='SplashScreen'>
            <Stack.Group>
              <Stack.Screen name="SplashScreen" component={SplashScreen} />
              <Stack.Screen name="StartScreen" component={StartScreen} />
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen
                name="SignInWithEmail"
                component={SignInWithEmail}
              />
              <Stack.Screen name="OtpScreen" component={OtpScreen} />
            </Stack.Group>
            <Stack.Screen
              name="EmailConfirmation"
              component={EmailConfirmation}
            />
            <Stack.Screen name="CreatePin" component={CreatePin} />
            <Stack.Screen name="RequireDetails" component={RequireDetails} />
            <Stack.Screen
              name="VerifyPhoneNumber"
              component={VerifyPhoneNumber}
            />
            <Stack.Screen name="ProfileAddress" component={ProfileAddress} />
            <Stack.Screen
              name="ProfileAgencyContact"
              component={ProfileAgencyContact}
            />
            <Stack.Screen name="ProfilePicture" component={ProfilePicture} />
            <Stack.Screen
              name="ChooseOrganization"
              component={ChooseOrganization}
            />
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
            <Stack.Screen
              name="JobCardConfirmButton"
              component={JobCardConfirmButton}
            />
            <Stack.Screen name="JobCardSwipeJob" component={JobCardSwipeJob} />
            <Stack.Screen name="JobSwipeDone" component={JobSwipeDone} />
            <Stack.Screen name="CompleteJob" component={CompleteJob} />
            <Stack.Screen name="ApprovedJob" component={ApprovedJob} />
            <Stack.Screen name="EditionWork" component={EditionWork} />
            <Stack.Screen name="TasksScreen" component={TasksScreen} />
            <Stack.Screen name="NotCompleteTask" component={NotCompleteTask} />
            <Stack.Screen name="CompleteTask" component={CompleteTask} />
            <Stack.Screen
              name="TermsAndConditions"
              component={TermsAndConditions}
            />
            <Stack.Screen name="ImageCropper" component={ImageCropper} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};
export default App;
