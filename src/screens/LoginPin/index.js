import {
  Alert,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { appColors } from '../../utils/appColors';
import OTPTextView from 'react-native-otp-textinput';
import MainLogo from '../../assets/svg/MainLogo';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearVerifyEmailCodeSlice,
  hitVerifyEmailCode,
} from '../../redux/VerifyEmailCodeSlice';
import { clearVerifyEmailSlice } from '../../redux/VerifyEmailSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearLoginData, loginUser } from '../../redux/loginSlice';
import BackIcon from '../../assets/svg/BackIcon';
import { OtpInput } from 'react-native-otp-entry';
import * as Keychain from 'react-native-keychain';
import FaceId from '../../assets/svg/FaceId.js';

const LoginPin = ({ navigation, route }) => {
  const { email, from,isFacelock } = route.params;

  const dispatch = useDispatch();

  const responseVerifyCode = useSelector(
    state => state.verifyEmailCodeReducer.data,
  );

  const responseLogin = useSelector(state => state.loginReducer.data);
  const { error } = useSelector(state => state.verifyEmailReducer);

  const [otp, setOtp] = useState('');

  const [faceLogin,setFaceLgin] = useState(false) 

  useEffect(() => {
    if (responseVerifyCode != null) {
      if (responseVerifyCode.data != null) {
        saveToken(responseVerifyCode.access);
        dispatch(clearVerifyEmailSlice());
        dispatch(clearVerifyEmailCodeSlice());
        navigation.reset({
          index: 0,
          routes: [{ name: 'ChooseOrganization' }],
        });
        dispatch(clearVerifyEmailCodeSlice());
      }
    }
  }, [responseVerifyCode]);

  useEffect(() => {
    console.log('Response Login ===> ', responseLogin);
    if (responseLogin && responseLogin.detail) {
      Alert.alert('MeMate', responseLogin.detail);
      dispatch(clearLoginData());
      return;
    } else if (responseLogin != null) {
      if(faceLogin){
        saveToken(responseLogin.access);
        navigation.reset({
          index: 0,
          routes: [{ name: 'ChooseOrganization' }],
        });
        dispatch(clearVerifyEmailSlice());
        dispatch(clearVerifyEmailCodeSlice());
        dispatch(clearVerifyEmailCodeSlice());
        dispatch(clearLoginData());
      }
      else{
        showFaceIDAlert()
      }
      
    }
  }, [responseLogin]);

  const saveToken = async token => {
    console.log('Token ===> ', token);
    await AsyncStorage.setItem('token', token);
  };

  const onSubmitClick = () => {

    setFaceLgin(false)
    if (otp.length < 6) {
      Alert.alert('MeMate', 'Please enter valid otp');
    } else {
      if (from == 0) {
        const payload = {
          device_id: 'Abc',
          email: email,
          password: otp,
        };
        dispatch(loginUser(payload));
      } else {
        const payload = {
          email: email,
          code: otp,
        };
        dispatch(hitVerifyEmailCode(payload));
      }
    }
  };
  

  const handleAuthUsingFaceId = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        console.log('Face ID authentication successful');
        console.log('Credentials ===> ', credentials);
        handleFaceIdLoginPayloadData(email, credentials.password);
        return credentials;
      } else {
        console.log('Face ID authentication failed');
      }
    } catch (error) {
      console.error('Error during Face ID authentication:', error);
    }
  };

  /**
  * @param {string} email 
  * @param {string} pin 
  * @callback {handles face id login payload data}
  * @returns {void} <void>
  * @handles {Face ID and fingerPrint authentication for biometrics authentication for ios and android}
  */
  const handleFaceIdLoginPayloadData = async (emailFromKeychain, pinFromKeychain) => {
    setFaceLgin(true)
    setOtp(pinFromKeychain);
    const payload = {
      device_id: 'Abc',
      email: emailFromKeychain,
      password: pinFromKeychain
    }
    console.log('Payload from Keychain to login ===> ', payload);
    dispatch(loginUser(payload));
  }

  useEffect(() => {
    console.log('Error Error ===>', error);
    if (error?.error) {
      Alert.alert('MeMate', error.error);
    } else if (error?.detail) {
      Alert.alert('MeMate', error.detail);
    }
    dispatch(clearVerifyEmailSlice());
  }, [error]);

// Register face id
  const registerFaceID = async () => {
    try {
      await Keychain.setGenericPassword(email, otp, {
        accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
        authenticationPrompt: 'Authenticate to register Face ID',
      });
  
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        console.log('Face ID registered successfully');
        return true;
      } else {
        throw new Error('Face ID scan failed');
      }
    } catch (error) {
      console.log('Face ID registration failed:', error);
      throw error;
    }
  };

  const showFaceIDAlert = async () => {
    try {
      const biometryType = await Keychain.getSupportedBiometryType();
      if (!biometryType) {
        Alert.alert(
          'Not Available',
          'Face ID/Touch ID is not available on this device.',
          [{ text: 'OK', onPress: () => savePinCreated() }],
          { cancelable: false }
        );
        return;
      }
  
      const attemptFaceIDRegistration = async () => {
        try {
          const success = await registerFaceID();
          if (success) {
            await AsyncStorage.setItem('faceIdEnabled', 'true');
            Alert.alert(
              'Success',
              'Face ID has been registered successfully!',
              [{ text: 'OK', onPress: () => savePinCreated() }],
              { cancelable: false }
            );
          }
        } catch (error) {
          Alert.alert(
            'Face ID Failed',
            'Face ID could not be recognized. Would you like to try again?',
            [
              {
                text: 'Try Again',
                onPress: () => {
                  attemptFaceIDRegistration(); 
                },
              },
              {
                text: 'Skip',
                style: 'destructive',
                onPress: () => savePinCreated(),
              },
            ],
            { cancelable: false }
          );
        }
      };
  
      Alert.alert(
        'Face ID Registration',
        'Do you want to register Face ID for quick and secure access?',
        [
          {
            text: 'Disallow',
            style: 'destructive',
            onPress: () => savePinCreated(),
          },
          {
            text: 'Allow',
            onPress: attemptFaceIDRegistration,
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.log('Error checking biometric availability:', error);
      Alert.alert('Error', 'Unable to check Face ID availability.');
    }
  };

  const savePinCreated = async () => {
    saveToken(responseLogin.access);
    navigation.reset({
      index: 0,
      routes: [{ name: 'ChooseOrganization' }],
    });
    dispatch(clearVerifyEmailSlice());
    dispatch(clearVerifyEmailCodeSlice());
    dispatch(clearVerifyEmailCodeSlice());
    dispatch(clearLoginData());
  };

  return (
    <SafeAreaView
      style={styles.containerStyle}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.textView}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTextStyle}>
          {from == 0 ? 'Sign in - Pin' : 'Email Confirmation'}
        </Text>
      </View>

      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
      <ScrollView style={styles.innerContainer}>
        <View style={{ marginTop: 150, alignSelf: 'center' }}>
          <MainLogo width={200} />
        </View>
        <View style={styles.logoStyle}>
          {/* <OTPTextView
            containerStyle={{marginTop: 72}}
            textInputStyle={styles.roundedTextInput}
            tintColor={appColors.borderLightGrey}
            offTintColor={appColors.borderLightGrey}
            inputCount={6}
            keyboardType="number-pad"
            handleTextChange={val => {
              setOtp(val);
              if (val.length === 6) {
                Keyboard.dismiss(); // hide keyboard
              }
            }} // Update state when OTP changes
            defaultValue={otp}
          /> */}

          <OtpInput
            numberOfDigits={6}
            onTextChange={text => {
              setOtp(text);
              if (text.length === 6) {
                Keyboard.dismiss(); 
              }
            }}
            autoFocus={true}
            blurOnFilled={true}
            type="numeric"
            theme={{
              pinCodeContainerStyle: styles.roundedTextInput,
              focusedPinCodeContainerStyle: styles.roundedTextInput,
              pinCodeTextStyle: styles.otpTextInput,
              focusStickStyle: { backgroundColor: appColors.borderLightGrey }
            }
            }
          />
        </View>

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => onSubmitClick()}>
          <Text
            style={{
              color: appColors.black,
              fontWeight: '600',
              fontSize: 16,
              padding: 16,
            }}>
            Sign In
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginTop: 16, alignItems: 'center' }} onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={{ color: appColors.white, textAlign: 'right', width: '100%', marginRight: 42 }}>Forgot Pin</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={{ alignItems: 'center', marginTop: 16 }} onPress={() => {
          handleAuthUsingFaceId()
        }}><FaceId />
        </TouchableOpacity>
      </ScrollView>
      {/* </TouchableWithoutFeedback> */}
      <TouchableOpacity
        style={styles.signInPhoneStyle}
        onPress={() => {
          navigation.navigate('SignIn');
        }}>
        <Text style={{ color: appColors.white, fontWeight: '700', fontSize: 16 }}>
          Sign in with Phone
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginPin;

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: appColors.black,
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: -32,
  },
  logoStyle: {
    alignItems: 'center',
    marginTop: 64,
  },

  headerTextStyle: {
    color: appColors.white,
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
  },

  textStyle: {
    color: appColors.white,
    fontWeight: '700',
    marginTop: 24,
    fontSize: 20,
    paddingHorizontal: 48,
    textAlign: 'center',
  },
  textView: {
    alignItems: 'center',
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 22,
    marginLeft: 8,
  },
  inputStyle: {
    marginHorizontal: 16,
    borderRadius: 8,
    backgroundColor: appColors.borderLightGrey,
    borderWidth: 1,
    marginTop: 32,
    paddingHorizontal: 16,
  },
  buttonStyle: {
    color: appColors.black,
    backgroundColor: appColors.white,
    marginHorizontal: 16,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: 24,
  },

  timerBackground: {
    borderWidth: 1,
    borderColor: appColors.borderLightGrey,
    backgroundColor: appColors.black,
    marginTop: 32,
    borderRadius: 24,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  signInStyle: {
    marginHorizontal: 16,
    borderRadius: 24,
    borderColor: appColors.white,
    borderWidth: 1,
    alignItems: 'center',
    padding: 16,
    marginTop: 48,
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: appColors.borderLightGrey,
    height: 60,
    color: appColors.white,
    backgroundColor: appColors.inputBackground,
  },
  otpTextInput: {
    color: appColors.white
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 5,
    paddingVertical: 20,
    borderWidth: 1,
  },
  signInPhoneStyle: {
    marginHorizontal: 16,
    borderRadius: 30,
    borderColor: appColors.grey,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginBottom: 24,
  },
});