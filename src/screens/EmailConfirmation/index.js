import {
  Alert,
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
import {clearVerifyEmailSlice} from '../../redux/VerifyEmailSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearLoginData, loginUser } from '../../redux/loginSlice';

const EmailConfirmation = ({navigation, route}) => {
  const {email, from} = route.params;

  const dispatch = useDispatch();

  const responseVerifyCode = useSelector(
    state => state.verifyEmailCodeReducer.data,
  );

  const responseLogin = useSelector(
    state => state.loginReducer.data,
  );

  const [otp, setOtp] = useState('');

  useEffect(() => {
    if (responseVerifyCode != null) {
      if (responseVerifyCode.data != null) {
        saveToken(responseVerifyCode.access);
        dispatch(clearVerifyEmailSlice());
        dispatch(clearVerifyEmailCodeSlice());
        navigation.navigate('ChooseOrganization');
        dispatch(clearVerifyEmailCodeSlice())
      } else {
        if (from == 2) {
          // if(responseVerifyCode.data!=null){
          navigation.navigate('CreatePin');
          saveToken(responseVerifyCode.access);
          // navigation.navigate('ChooseOrganization');
         
          dispatch(clearVerifyEmailSlice());
          dispatch(clearVerifyEmailCodeSlice());
          dispatch(clearVerifyEmailCodeSlice())
          // }else{
          //   Alert.alert('MeMate', 'Internal server error');
          // }
        } else {
          Alert.alert('MeMate', 'Your Profile is not completed yet!');
        }
      }
    }
  }, [responseVerifyCode]);

  useEffect(()=>{
    if(responseLogin!=null){
      saveToken(responseLogin.access);
      navigation.navigate('ChooseOrganization');
      dispatch(clearVerifyEmailSlice());
      dispatch(clearVerifyEmailCodeSlice());
      dispatch(clearVerifyEmailCodeSlice())
      dispatch(clearLoginData())
    }
  },[responseLogin])

  const saveToken = async token => {
    console.log('Token ===> ', token);
    await AsyncStorage.setItem('token', token);
  };

  const onSubmitClick = () => {
    if (otp.length < 6) {
      alert('Please enter valid otp');
    } else {
      if(from==0){
        const payload = {
          device_id:"Abc",
          email: email,
          password: otp,
        };
        dispatch(loginUser(payload));
      }else{
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
        <OTPTextView
          containerStyle={{marginTop: 32}}
          textInputStyle={styles.roundedTextInput}
          tintColor={appColors.borderLightGrey}
          offTintColor={appColors.borderLightGrey}
          inputCount={6}
          handleTextChange={setOtp} // Update state when OTP changes
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

        <TouchableOpacity style={styles.timerBackground}>
          <Text
            style={{
              color: appColors.borderLightGrey,
              padding: 16,
              fontWeight: '600',
              fontSize: 16,
            }}>
            Resend code in{' '}
            <Text
              style={{color: appColors.white, padding: 16, fontWeight: '600', fontSize: 16}}>
              59:00
            </Text>
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
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 5,
    paddingVertical: 20,
    borderWidth: 1,
  },
});
