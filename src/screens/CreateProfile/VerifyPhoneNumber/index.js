
import { Keyboard, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, } from 'react-native';
import React, { useEffect, useState } from 'react';
import { appColors } from '../../../utils/appColors';
import OTPTextView from 'react-native-otp-textinput';
import BackIcon from '../../../assets/svg/BackIcon';
import { useDispatch, useSelector } from 'react-redux';
import { hitVerifyPhoneCode } from '../../../redux/VerifyPhoneCodeSlice';
import { OtpInput } from 'react-native-otp-entry';

const VerifyPhoneNumber = ({ navigation,route }) => {
  const {phoneNumber} = route.params;

  const dispatch = useDispatch()
  const {statusCode, error, isLoading,data } = useSelector(state => state.verifyPhoneCodeReducer);
  // const responseVerifyCode = useSelector(state => state.verifyPhoneCodeReducer.data);

  const [otp,setOtp] = useState("")

  const onConfirmClick = () =>{
    const payload = {
      phone:phoneNumber,
      code:otp
    }
    dispatch(hitVerifyPhoneCode(payload))
    // navigation.goBack()
  }

  useEffect(()=>{
    console.log("responseVerifyCode ===> ",statusCode)
    if(statusCode!=null){
      navigation.goBack()
    }
  },[statusCode])

  return (

    <SafeAreaView
      style={styles.containerStyle}
    >
        <View style={styles.headerView}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerText}>Verify Phone Number</Text>
      </View>
        
        <View style={styles.innerContainer}>
        <Text style={styles.textStyle}>
            Verify Phone Number
        </Text>
        <Text style={{color:appColors.white,fontFamily:'SF-Pro',marginTop:24,marginHorizontal:32,textAlign:'center',fontSize:17}}>A text message with a six-digit verification code has been sent to your phone number ending in {phoneNumber}</Text>
        <OtpInput
          numberOfDigits={6}
          onTextChange={text =>{setOtp(text);
            if(text.length==6){
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
{/* navigation.navigate('ProfileAddress')} */}
          <TouchableOpacity style={styles.buttonStyle} onPress={() =>  onConfirmClick()}>
            <Text style={{ color: appColors.black, fontWeight: '600',fontSize:16,padding:16,fontFamily:'SF-Pro-Display-Bold', }}>Confirm</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

export default VerifyPhoneNumber;

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: appColors.black,
    flex: 1,
  },
  innerContainer: {
    flex:1,
    paddingHorizontal: 16,
    justifyContent:'center'
  },
  logoStyle: {
    alignItems: 'center',
  },

  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  headerText: {
    color: appColors.white,
    fontSize: 16,
    fontFamily: 'SF-Pro-Display-Bold',
    flex: 1,
    fontWeight:'700',
    textAlign: 'center',
  },

  textStyle:{
    color:appColors.white,
    fontWeight:'700',
    marginTop:16,
   fontSize:20,
   paddingHorizontal:48,
   textAlign:'center',
   fontFamily:'sf-pro-text-semibold'
  },
  textView:{
    alignItems:'center'
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
    marginTop:32
  },

  timerBackground:{
    borderWidth:1,
    borderColor:appColors.borderLightGrey,
    backgroundColor:appColors.black,
    marginTop:32,
    borderRadius:24,
    marginHorizontal: 16,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
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
    height:60,
    color: appColors.white,
    backgroundColor:appColors.inputBackground,
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