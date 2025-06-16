import {
  Alert,
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
import OTPTextView from 'react-native-otp-textinput';
import MainLogo from '../../assets/svg/MainLogo';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearVerifyEmailCodeSlice,
  hitVerifyEmailCode,
} from '../../redux/VerifyEmailCodeSlice';
import {clearVerifyEmailSlice} from '../../redux/VerifyEmailSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {clearLoginData, loginUser} from '../../redux/loginSlice';
import BackIcon from '../../assets/svg/BackIcon';

const LoginPin = ({navigation, route}) => {
  const {email, from} = route.params;

  const dispatch = useDispatch();

  const responseVerifyCode = useSelector(
    state => state.verifyEmailCodeReducer.data,
  );

  const responseLogin = useSelector(state => state.loginReducer.data);
  const {error} = useSelector(state => state.verifyEmailReducer);

  const [otp, setOtp] = useState('');

  useEffect(() => {
    if (responseVerifyCode != null) {
      if (responseVerifyCode.data != null) {
        saveToken(responseVerifyCode.access);
        dispatch(clearVerifyEmailSlice());
        dispatch(clearVerifyEmailCodeSlice());
        navigation.navigate('ChooseOrganization');
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
      saveToken(responseLogin.access);
      navigation.navigate('ChooseOrganization');
      dispatch(clearVerifyEmailSlice());
      dispatch(clearVerifyEmailCodeSlice());
      dispatch(clearVerifyEmailCodeSlice());
      dispatch(clearLoginData());
    }
  }, [responseLogin]);

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

  useEffect(() => {
    console.log('Error Error ===>', error);
    if (error != null) {
      Alert.alert('MeMate', error.detail);
      dispatch(clearVerifyEmailSlice());
    }
  }, [error]);

  return (
    <SafeAreaView
      style={styles.containerStyle}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.textView}>
        <TouchableOpacity onPress={() => {navigation.goBack()}}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTextStyle}>Email Confirmation</Text>
      </View>

      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
      <ScrollView style={styles.innerContainer}>
        <View style={{marginTop: 150, alignSelf: 'center'}}>
          <MainLogo width={200} />
        </View>
        <View style={styles.logoStyle}>
          <OTPTextView
            containerStyle={{marginTop: 72}}
            textInputStyle={styles.roundedTextInput}
            tintColor={appColors.borderLightGrey}
            offTintColor={appColors.borderLightGrey}
            inputCount={6}
            handleTextChange={setOtp} // Update state when OTP changes
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
      </ScrollView>
      {/* </TouchableWithoutFeedback> */}
      <TouchableOpacity
        style={styles.signInPhoneStyle}
        onPress={() => {
          navigation.navigate('SignIn');
        }}>
        <Text style={{color: appColors.white, fontWeight: '700', fontSize: 16}}>
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
