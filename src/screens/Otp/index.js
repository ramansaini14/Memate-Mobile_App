import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {appColors} from '../../utils/appColors';
import LogoIcon from '../../assets/svg/LogoIcon';
import OTPTextView from 'react-native-otp-textinput';
import MainLogo from '../../assets/svg/MainLogo';
import CheckBox from '@react-native-community/checkbox';
import { OtpInput } from 'react-native-otp-entry';

const OtpScreen = ({navigation}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  return (
    <SafeAreaView
      style={styles.containerStyle}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.innerContainer}>
        <View style={{alignSelf: 'center'}}>
          <MainLogo />
        </View>

        <View style={styles.logoStyle}>
        <OtpInput
          numberOfDigits={6}
          onTextChange={text => console.log(text)}
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
        </View>

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => navigation.navigate('ChooseOrganization')}>
          <Text style={{color: appColors.black, fontWeight: '700'}}>
            Submit
          </Text>
        </TouchableOpacity>

        <View style={styles.row__}>
          <CheckBox
            disabled={false}
            value={toggleCheckBox}
            boxType="square"
            lineWidth={2}
            onCheckColor={appColors.black} // Tick color (black)
            onFillColor={appColors.white}// Fill color (white when checked)
            tintColor={appColors.borderLightGrey} // Border color when unchecked
            onTintColor={appColors.black} // Border color when checked
            onValueChange={newValue => setToggleCheckBox(newValue)}
            style={{width: 20, height: 20,borderRadius:8,padding:2}}
          />

          <Text style={{color: appColors.grey, fontSize: 14}}>Remember Me</Text>
        </View>
      </View>
       <TouchableOpacity
              style={styles.signInStyle}
              onPress={() => {
                navigation.navigate('SignInWithEmail',{ from: 0});
              }}>
              <Text style={{color: appColors.white, fontWeight: '700', fontSize: 18}}>
                Sign in with Email
              </Text>
            </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: appColors.black,
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  logoStyle: {
    alignItems: 'center',
    marginTop: 64,
  },
  viewStyle: {
    flex: 3,
  },
  inputStyle: {
    marginHorizontal: 16,
    borderRadius: 8,
    backgroundColor: appColors.inputBackground,
    borderWidth: 1,
    marginTop: 16,
    paddingHorizontal: 16,
  },
  buttonStyle: {
    color: appColors.black,
    backgroundColor: appColors.white,
    padding: 20,
    borderRadius: 30,
    marginTop: 20,
    alignItems: 'center',
  },
  textStyle: {
    color: appColors.white,
    fontWeight: '600',
  },
  signInStyle: {
    marginHorizontal: 16,
    borderRadius: 30,
    borderColor: appColors.white,
    borderWidth: 1,
    alignItems: 'center',
    padding: 16,
    marginBottom:24
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 1,
    borderBottomWidth: 1,
    height: 60,
    color: appColors.white,
    backgroundColor: appColors.inputBackground,
    borderColor: appColors.borderLightGrey,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 5,
    paddingVertical: 20,
    borderWidth: 1,
  },
  row__: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginVertical: 30,
  },
  otpTextInput: {
    color:appColors.white
  },
});
