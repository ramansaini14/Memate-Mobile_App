/* eslint-disable react-native/no-inline-styles */
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {TouchableOpacity, TextInput} from 'react-native';
import BackIcon from '../../../assets/svg/BackIcon';
import {appColors} from '../../../utils/appColors';
import PhoneInput from 'react-native-phone-input';
// import CountryPicker from 'react-native-country-picker-modal';
import NextArrow from '../../../assets/svg/NextArrow';

const ProfileAgencyContact = ({navigation, route}) => {
  const {data} = route.params;
  console.log('Data ===> ', data);
  
    const phoneRef = useRef(null);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState("AU"); // Default country
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);
  const [name, setName] = useState('');

  return (
    <SafeAreaView style={styles.containerStyle}>
      <View style={styles.headerView}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerText}>Profile-Emergency Contact</Text>
      </View>
      <View style={styles.mainViewStyle}>
        <View>
          <Text style={styles.fontColor}>Emergency Contact</Text>
        </View>
        <Text style={styles.textStyle}>Contact Name</Text>
        <View style={styles.inputViewStyle}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Name"
            placeholderTextColor={appColors.placeholderColor}
            keyboardType="default"
            value={name}
            onChangeText={val => setName(val)}
          />
        </View>
        {/* Phone */}
        <Text style={styles.textStyle}>Phone</Text>
        <View style={styles.inputViewStyle}>
          {/* <PhoneInput
                onPressFlag={toggleCountryPicker}
                initialCountry={countryCode}
                initialValue={phoneNumber}
                value={phoneNumber}
                onChangePhoneNumber={number => setPhoneNumber(number)}
                textStyle={{color: 'white'}}
              /> */}
          <PhoneInput
          ref={phoneRef}
            style={{padding: 16, backgroundColor: appColors.inputBackground}}
            initialCountry={countryCode.toLowerCase()} // Convert to lowercase
            value={phoneNumber}
            onChangePhoneNumber={setPhoneNumber}
            textStyle={{color: 'white'}}
            onSelectCountry={(iso2) => {
              const code = phoneRef.current.getCountryCode();
              setCountryCode(code);
            }}
          />
        </View>

        {/* Country Picker */}
        {/* {countryPickerVisible && (
          <CountryPicker
            withFilter
            withFlag
            withCountryNameButton
            onSelect={onSelectCountry}
            onClose={() => setCountryPickerVisible(false)}
            visible={countryPickerVisible}
          />
        )} */}
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() =>
            navigation.navigate('ProfilePicture', {
              profileData: {
                data: data,
                emergencyData: {
                  name: name,
                  countryCode: countryCode=="AU"?61:countryCode,
                  phoneNumber: phoneNumber.substring(countryCode.length+1),
                },
              },
            })
          }>
          <Text
            style={{
              color: appColors.black,
              fontWeight: '600',
              fontSize: 16,
              padding: 16,
              textAlign: 'center',
              flex: 1,
            }}>
            Next
          </Text>
          <NextArrow />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileAgencyContact;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    padding: 16,
    backgroundColor: appColors.black,
  },
  backButton: {
    backgroundColor: 'white',
    padding: 32,
    borderRadius: 32,
  },
  headerText: {
    color: 'white',
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
    fontWeight: '700',
    padding: 16,
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  fontColor: {
    color: 'white',
    fontSize: 20,
  },
  textStyle: {
    fontSize: 13,
    color: 'white',
    marginTop: 16,
  },
  inputViewStyle: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: appColors.borderLightGrey,
    marginTop: 8,
    padding: 2,
    flexDirection: 'row',
    backgroundColor: appColors.inputBackground,
    alignItems: 'center',
  },
  inputStyle: {
    padding: 16,
    fontSize: 16,
    backgroundColor: appColors.inputBackground,
    color: appColors.white,
    flex: 1,
  },
  buttonStyle: {
    color: appColors.black,
    backgroundColor: appColors.white,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: 48,
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  mainViewStyle: {
    marginHorizontal: 32,
    marginVertical: 16,
  },
});
