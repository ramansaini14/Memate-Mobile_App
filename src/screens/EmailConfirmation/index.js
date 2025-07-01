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
import React, {useEffect, useState} from 'react';
import {appColors} from '../../utils/appColors';
import OTPTextView from 'react-native-otp-textinput';
import MainLogo from '../../assets/svg/MainLogo';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearVerifyEmailCodeSlice,
  hitVerifyEmailCode,
} from '../../redux/VerifyEmailCodeSlice';
import {clearVerifyEmailSlice, hitVerifyEmail} from '../../redux/VerifyEmailSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {clearLoginData, loginUser} from '../../redux/loginSlice';
import { OtpInput } from 'react-native-otp-entry';

const EmailConfirmation = ({navigation, route}) => {
  const {email, from} = route.params;

  const dispatch = useDispatch();

  const responseVerifyCode = useSelector(
    state => state.verifyEmailCodeReducer.data,
  );

  const responseLogin = useSelector(state => state.loginReducer.data);
  const error = useSelector(state => state.verifyEmailCodeReducer.error);
  const status = useSelector(state => state.verifyEmailCodeReducer.status);

  const [otp, setOtp] = useState('');

    const [isSignupClicked, setIsSignupClicked] = useState(false);
    const [timer, setTimer] = useState(60);

    useEffect(() => {
        const interval = setInterval(() => {
          if (timer > 0) {
            setTimer(timer - 1);
          }
        }, 1000);
        return () => clearInterval(interval);
      
    }, [timer, isSignupClicked]);

  useEffect(() => {
    if (responseVerifyCode != null) {
      // if (responseVerifyCode.data != null) {

      navigation.navigate('CreatePin');
      saveToken(responseVerifyCode.access);
      // navigation.navigate('ChooseOrganization');

      dispatch(clearVerifyEmailSlice());
      dispatch(clearVerifyEmailCodeSlice());
      dispatch(clearVerifyEmailCodeSlice());
      }
      // } else {
      //   Alert.alert('MeMate', 'Email already existed.');
      // }
  
  }, [responseVerifyCode]);

  useEffect(() => {
    console.log("error ===> ",error);
    console.log("status ===> ",status); 
    if (error != null) {
    Alert.alert('MeMate', error.error);
    }
  }, [error,status]);

  // useEffect(() => {
  //   if (responseLogin != null) {
  //     saveToken(responseLogin.access);
  //     navigation.navigate('ChooseOrganization');
  //     dispatch(clearVerifyEmailSlice());
  //     dispatch(clearVerifyEmailCodeSlice());
  //     dispatch(clearVerifyEmailCodeSlice());
  //     dispatch(clearLoginData());
  //   }
  // }, [responseLogin]);

  const saveToken = async token => {
    console.log('Token ===> ', token);
    await AsyncStorage.setItem('token', token);
  };

  const onSubmitClick = () => {
    if (otp.length < 6) {
      Alert.alert('Please enter valid otp');
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

  return (
    <SafeAreaView
      style={styles.containerStyle}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.textView}>
        <Text style={styles.headerTextStyle}>Email Confirmation</Text>
      </View>

      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
      <ScrollView style={styles.innerContainer}>
        <View style={{marginTop: 150, alignSelf: 'center'}}>
          <MainLogo width={200} />
        </View>
        <Text style={[styles.textStyle, {marginTop: 72}]}>
          Please check your email for verification code
        </Text>
        {/* <View style={styles.logoStyle}> */}
        <OtpInput
          numberOfDigits={6}
          onTextChange={text => {setOtp(text);
            if(text.length == 6){
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
            focusStickStyle:{backgroundColor:appColors.borderLightGrey}
          }}
        />
        {/* </View> */}

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
            Confirm
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.timerBackground} onPress={() => {
          if (timer <= 0) {
            // setIsSignupClicked(true);
            setTimer(60);
            const payload = {
              email: email,
            };
            dispatch(hitVerifyEmail(payload));
          } else {
            Alert.alert('MeMate', 'Please wait for the timer to finish');
          }
        }
        }>
          <Text
            style={{
              color: appColors.borderLightGrey,
              padding: 16,
              fontWeight: '600',
              fontSize: 16,
            }}>
            Resend code in {' '}
            {timer>0&&<Text
              style={{
                color: appColors.white,
                padding: 16,
                fontWeight: '600',
                fontSize: 16,
              }}>
              00:{timer < 10 ? `0${timer}` : timer}
            </Text>}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      {/* </TouchableWithoutFeedback> */}
    </SafeAreaView>
  );
};

export default EmailConfirmation;

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
    marginTop: 24,
    fontSize: 20,
    paddingHorizontal: 48,
    textAlign: 'center',
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
    height: 60,
    color: appColors.white,
    backgroundColor: appColors.inputBackground,
    borderColor: appColors.borderLightGrey,
    marginTop:32
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
    color:appColors.white
  },
});
