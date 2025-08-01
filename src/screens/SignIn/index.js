import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import LogoIcon from '../../assets/svg/LogoIcon';
import {appColors} from '../../utils/appColors';
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';
import CheckBox from '@react-native-community/checkbox';
import {SafeAreaView} from 'react-native-safe-area-context';
import MainLogo from '../../assets/svg/MainLogo';

const SignInWithPhone = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('61');
  const [countryCode, setCountryCode] = useState('AU');

  const [countryPickerVisible, setCountryPickerVisible] = useState(false);

  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const toggleCountryPicker = () => {
    setCountryPickerVisible(!countryPickerVisible);
  };

  const onSelectCountry = country => {
    setCountryCode(country.cca2);

    const callingCode = country.callingCode[0];
    console.log('callingCode ==>', callingCode);
    setPhoneNumber(callingCode);

    setCountryPickerVisible(false);
  };
  useEffect(() => {
    console.log('Phone number ==>', phoneNumber);
  }, [phoneNumber]);
  return (
    <SafeAreaView style={styles.containerStyle}>
      {/* <Text style={styles.textStyle}>Sign in</Text> */}
      <View style={styles.logoStyle}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <MainLogo />
        </View>

        <View
          style={{
            backgroundColor: appColors.inputBackground,
            marginHorizontal: 16,
            padding: 20,
            borderRadius: 8,
            marginTop: 80,
            borderColor: appColors.borderLightGrey,
            borderWidth: 1,
          }}>
          <PhoneInput
            withDropdown={true} // Ensures dropdown arrow is shown
            onPressFlag={toggleCountryPicker}
            initialCountry={countryCode}
            initialValue={phoneNumber}
            value={phoneNumber}
            onChangePhoneNumber={number => setPhoneNumber(number)}
            textStyle={{color: appColors.white, fontSize: 16}}
          />
        </View>

        {countryPickerVisible && (
          <CountryPicker
            withFilter
            withFlagButton={false}
            withCountryNameButton={false}
            onSelect={onSelectCountry}
            onClose={() => setCountryPickerVisible(false)}
            visible={countryPickerVisible}
            containerButtonStyle={styles.countryPickerButton}
            closeButtonImageStyle={styles.countryPickerCloseButton}
          />
        )}

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => navigation.navigate('OtpScreen')}>
          <Text
            style={{color: appColors.black, fontWeight: '700', fontSize: 16}}>
            Send Code
          </Text>
        </TouchableOpacity>
        {/* <View
            style={styles.row__}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              boxType={'circle'}
              lineWidth={2}
              onCheckColor={appColors.white}
              tintColors={appColors.grey}
              onTintColor={appColors.white}
              onValueChange={newValue => setToggleCheckBox(newValue)}
              style={{ width: 20, height: 20, }}
            />
            <Text style={{ color: appColors.grey, fontSize: 14 }}>Remember Me</Text>
          </View> */}
      </View>
      <TouchableOpacity
        style={styles.signInStyle}
        onPress={() => {
          navigation.navigate('SignInWithEmail', {from: 0});
        }}>
        <Text style={{color: appColors.white, fontWeight: '700', fontSize: 18}}>
          Sign in with Email
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SignInWithPhone;

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: appColors.black,
    flex: 1,
  },
  logoStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  textStyle: {
    color: appColors.white,
    alignSelf: 'center',
    top: 20,
    fontWeight: '500',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: appColors.inputColor,
  },
  buttonStyle: {
    color: appColors.black,
    backgroundColor: appColors.white,
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 30,
    marginTop: 24,
    alignItems: 'center',
  },
  row__: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginVertical: 10,
  },
  phoneInput: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  countryButton: {
    marginBottom: 20,
  },
  countryPickerButton: {
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  countryPickerCloseButton: {
    width: 20,
    height: 20,
  },
  signInStyle: {
    marginHorizontal: 16,
    borderRadius: 30,
    borderColor: appColors.grey,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
