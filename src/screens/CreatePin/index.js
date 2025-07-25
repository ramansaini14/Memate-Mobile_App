import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {appColors} from '../../utils/appColors';
// import LogoIcon from '../../assets/svg/LogoIcon';
// import OTPTextView from 'react-native-otp-textinput';
// import MainLogo from '../../assets/svg/MainLogo';
import {useDispatch, useSelector} from 'react-redux';
import {clearCreatePin, hitCreatePin} from '../../redux/CreatePinSlice';
import {getToken} from '../../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {OtpInput} from 'react-native-otp-entry';
import * as Keychain from 'react-native-keychain';

const CreatePin = ({navigation}) => {
  const dispatch = useDispatch();
  const token = getToken();

  const responseCreatePin = useSelector(state => state.createPinReducer.data);
  const responseStatus = useSelector(state => state.createPinReducer.status);

  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onCreatePinClick = () => {
    if (pin.length < 6) {
      Alert.alert('Enter Pin');
    } else if (confirmPin.length < 6) {
      Alert.alert('Enter correct confirm pin');
    } else if (pin != confirmPin) {
      Alert.alert('Confirm pin not matched');
    } else {
      const payload = {
        new_password: pin,
      };
      setIsLoading(true);
      dispatch(hitCreatePin(payload));
      console.log('Creating pin with payload:', payload);
    }
  };

  /**
   * @constant to setup pin created in async storage
   */

  const savePinCreated = async () => {
    await AsyncStorage.setItem('isPinCreate', 'true');
    navigation.navigate('TermsAndConditions', {from: 'pin', id: 0});
    dispatch(clearCreatePin());
  };

  useEffect(() => {
    console.log('Response Create Pin ===> ', responseCreatePin);
    console.log('Response Status ===> ', responseStatus);
    if (responseStatus === true) {
      setIsLoading(false);
      console.log('Pin created successfully, showing Face ID setup');
      showFaceIDAlert();
    } else if (responseStatus === false) {
      setIsLoading(false);
      Alert.alert(
        'Error',
        'Something went wrong, pin not created. Please try again.',
      );
    }
  }, [responseStatus]);

  useEffect(() => {
    return () => {
      setIsLoading(false);
      dispatch(clearCreatePin());
    };
  }, []);

  /**
   * @static <Functionality for setting up keychain credentials for Face ID>
   * @returns {boolean} <True if successful, false otherwise >
   * @handles {Face ID registration for ios and android}
   */
  const registerFaceID = async () => {
    try {
      const email = await AsyncStorage.getItem('email');
      await Keychain.setGenericPassword(email, pin, {
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

  // const showFaceIDAlert = async () => {
  //   try {
  //     const biometryType = await Keychain.getSupportedBiometryType();
  //     console.log('Biometry Type ===> ', biometryType);

  //     if (biometryType) {
  //       Alert.alert(
  //         'Face ID Registration',
  //         'Do you want to register Face ID for quick and secure access?',
  //         [
  //           {
  //             text: 'Disallow',
  //             style: 'destructive',
  //             onPress: () => {
  //               console.log('User declined Face ID registration');
  //               savePinCreated();
  //             }
  //           },
  //           {
  //             text: 'Allow',
  //             onPress: async () => {
  //               console.log('User approved Face ID registration');
  //               const success = await registerFaceID();
  //               if (success) {
  //                 await AsyncStorage.setItem('faceIdEnabled', 'true');
  //                 Alert.alert('Success', 'Face ID has been registered successfully!',
  //                   [
  //                     {
  //                       text: 'OK',
  //                       onPress: () => {
  //                         savePinCreated();
  //                       },
  //                     },
  //                   ],
  //                   { cancelable: false }
  //                 );
  //               } else {
  //                 Alert.alert(
  //                   'Failed to register Face ID',
  //                   'Failed to register Face ID but pin is created. You can create pin from your profile settings.',
  //                   [
  //                     {
  //                       text: 'OK',
  //                       onPress: () => {
  //                         savePinCreated();
  //                       },
  //                     },
  //                   ],
  //                   { cancelable: false }
  //                 );
  //               }
  //             }
  //           }
  //         ]
  //       );
  //     } else {
  //       Alert.alert(
  //         'Not Available',
  //         'Face ID/Touch ID is not available on this device.',
  //         [
  //           {
  //             text: 'OK',
  //             onPress: () => {
  //               savePinCreated();
  //             },
  //           },
  //         ],
  //         { cancelable: false }
  //       );
  //     }
  //   } catch (error) {
  //     console.log('Error checking biometric availability:', error);
  //     Alert.alert('Error', 'Unable to check Face ID availability.');
  //   }
  // };
  /**
   *
   * @returns {keychain credentials} <keychain credentials>
   * @handles {Face ID registration for ios and android using faceId or fingerPrint for biometrics authentication}
   */
  const showFaceIDAlert = async () => {
    try {
      const biometryType = await Keychain.getSupportedBiometryType();
      if (!biometryType) {
        Alert.alert(
          'Not Available',
          'Face ID/Touch ID is not available on this device.',
          [{text: 'OK', onPress: () => savePinCreated()}],
          {cancelable: false},
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
              'Authentication has been registered successfully!',
              [{text: 'OK', onPress: () => savePinCreated()}],
              {cancelable: false},
            );
          }
        } catch (error) {
          Alert.alert(
            'Authentication Failed',
            'Authenticator could not be recognized. Would you like to try again?',
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
            {cancelable: false},
          );
        }
      };

      Alert.alert(
        'Authentication Registration',
        'Do you want to register Face ID/Biometric for quick and secure access?',
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
        {cancelable: false},
      );
    } catch (error) {
      console.log('Error checking biometric availability:', error);
      Alert.alert('Error', 'Unable to check Authentication availability.');
    }
  };

  /**
   * @access {checkLogin} <Functionality for checking login>
   */
  // const checkLogin = async () => {
  //   const login = await Keychain.getGenericPassword();
  //   console.log('Login ===> ', login);
  // };

  /**
   * Refined views for keyboard functionality
   * @satisfies {KeyboardAvoidingView} <Functionality while entering OTP>
   */

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}>
        <SafeAreaView style={styles.containerStyle}>
          <View style={styles.textView}>
            <Text style={styles.headerTextStyle}>Create Pin</Text>
          </View>

          <View style={styles.innerContainer}>
            <Text style={styles.textStyle}>Create 6 digit pin</Text>
            <OtpInput
              numberOfDigits={6}
              onTextChange={text => {
                setPin(text);
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
                focusStickStyle: {backgroundColor: appColors.borderLightGrey},
              }}
            />

            <View
              style={{
                height: 1,
                width: '60%',
                backgroundColor: appColors.borderLightGrey,
                marginTop: 32,
                alignSelf: 'center',
              }}
            />
            <Text style={[styles.textStyle, {marginTop: 32}]}>Confirm Pin</Text>
            <OtpInput
              numberOfDigits={6}
              onTextChange={text => {
                setConfirmPin(text);
                if (text.length === 6) {
                  Keyboard.dismiss();
                }
              }}
              autoFocus={false}
              blurOnFilled={true}
              type="numeric"
              theme={{
                pinCodeContainerStyle: styles.roundedTextInput,
                focusedPinCodeContainerStyle: styles.roundedTextInput,
                pinCodeTextStyle: styles.otpTextInput,
                focusStickStyle: {backgroundColor: appColors.borderLightGrey},
              }}
            />
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => onCreatePinClick()}
              disabled={isLoading}>
              <Text
                style={{
                  color: appColors.black,
                  fontWeight: '600',
                  fontSize: 16,
                  padding: 16,
                  fontFamily: 'SF-Pro-Display-Bold',
                }}>
                {isLoading ? 'Creating Pin...' : 'Create Pin'}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default CreatePin;

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: appColors.black,
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  logoStyle: {
    alignItems: 'center',
  },

  headerTextStyle: {
    color: appColors.white,
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },

  textStyle: {
    color: appColors.white,
    fontWeight: '700',
    marginTop: 16,
    fontSize: 20,
    paddingHorizontal: 48,
    textAlign: 'center',
    fontFamily: 'sf-pro-text-semibold',
  },
  textView: {
    alignItems: 'center',
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
    marginTop: 32,
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
    height: 60,
    color: appColors.white,
    backgroundColor: appColors.inputBackground,
    borderColor: appColors.borderLightGrey,
    marginTop: 16,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 5,
    paddingVertical: 20,
    borderWidth: 1,
  },
  otpTextInput: {
    color: appColors.white,
  },
});
