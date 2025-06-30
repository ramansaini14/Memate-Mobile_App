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
  import LogoIcon from '../../assets/svg/LogoIcon';
  import OTPTextView from 'react-native-otp-textinput';
  import MainLogo from '../../assets/svg/MainLogo';
  import {useDispatch, useSelector} from 'react-redux';
  import {clearCreatePin, hitCreatePin} from '../../redux/CreatePinSlice';
  import {getToken} from '../../utils/Constants';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { OtpInput } from 'react-native-otp-entry';
import BackIcon from '../../assets/svg/BackIcon';
  
  const ResetPassword = ({navigation}) => {
    const dispatch = useDispatch();
  
    const token = getToken();
  
    const responseCreatePin = useSelector(state => state.createPinReducer.data);
  
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
  
    const onCreatePinClick = () => {

        console.log('Pin ===> ', pin);
      console.log('Confirm Pin ===> ', confirmPin);

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
        dispatch(hitCreatePin(payload));
      }
    };
  
    const savePinCreated = async () => {
      await AsyncStorage.setItem('isPinCreate', 'true');
      navigation.reset({
        index: 0,
        routes: [{name: 'StartScreen'}],
      });
      dispatch(clearCreatePin());
    };
    useEffect(() => {
      if (responseCreatePin != null) {
        Alert.alert(
          'MeMate',
          responseCreatePin.message,
          [
            {
              text: 'OK',
              onPress: () => {
                savePinCreated();
              },
            },
          ],
          {cancelable: false},
        );
        // savePinCreated();
      }
    }, [responseCreatePin]);
  
    return (
      <SafeAreaView style={styles.containerStyle}>
          <View style={styles.textView}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTextStyle}>Reset Pin</Text>
      </View>

        {/* <View style={styles.textView}>
          <Text style={styles.headerTextStyle}>Reset Pin</Text>
        </View> */}
  
        <View style={styles.innerContainer}>
          <Text style={styles.textStyle}>Create 6 digit pin</Text>
          <OtpInput
            numberOfDigits={6}
            onTextChange={text => {setPin(text);
                if (text.length === 6) {
                  Keyboard.dismiss(); // hide keyboard
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
  
          <View
            style={{
              height: 1,
              width: '60%',
              backgroundColor: appColors.borderLightGrey,
              marginTop: 32,
              alignSelf: 'center',
            }}
          />
          <Text style={[styles.textStyle, {marginTop: 48}]}>Confirm Pin</Text>
          <OtpInput
            numberOfDigits={6}
            onTextChange={text => {setConfirmPin(text);
                if (text.length === 6) {
                  Keyboard.dismiss(); // hide keyboard
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
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => onCreatePinClick()}>
            <Text
              style={{
                color: appColors.black,
                fontWeight: '600',
                fontSize: 16,
                padding: 16,
                fontFamily: 'SF-Pro-Display-Bold',
              }}>
              Reset Pin
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };
  
  export default ResetPassword;
  
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
      flex: 1,
      marginRight: 64,
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
      flexDirection: 'row',
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
      marginTop:16
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
  