import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Modal,
  Button,
} from 'react-native';
import {appColors} from '../../../utils/appColors';
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';
import BackIcon from '../../../assets/svg/BackIcon';
import WhiteCalender from '../../../assets/svg/WhiteCalender';
import NextArrow from '../../../assets/svg/NextArrow';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearVerifyPhone,
  hitVerifyPhone,
} from '../../../redux/VerifyPhoneSlice';
import {Calendar} from 'react-native-calendars';
import CalenderModal from '../../../components/CalenderModal';
import {clearVerifyPhoneCode} from '../../../redux/VerifyPhoneCodeSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useIsFocused } from '@react-navigation/native';

const RequiredDetails = ({navigation}) => {
  const dispatch = useDispatch();
  const responseVerifyPhone = useSelector(
    state => state.verifyPhoneReducer.data,
  );

  const phoneRef = useRef(null);
  const {statusCode, error, isLoading,data } = useSelector(state => state.verifyPhoneCodeReducer);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDOB] = useState('');
  const [abn, setAbn] = useState('');
  const [verifiedPhn, setVarifiedPhn] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('AU'); // Default country
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('yes');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const isFouced = useIsFocused()

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios'); // On Android, hide the picker after selection
    setDate(currentDate);
  };

  const options = [
    {id: 'yes', label: 'Yes'},
    {id: 'no', label: 'No'},
  ];

  const onSelectCountry = country => {
    console.log('country ===> ', country);
    setCountryCode(country.cca2);
    setCountryPickerVisible(false);
  };

  const onClickVerify = () => {
    if(phoneNumber!=""){
    const payload = {
      phone: phoneNumber,
    };
    console.log('Payload ===>', payload);
    dispatch(hitVerifyPhone(payload));
  }
  else{
    Alert.alert("Please Enter Phone number!")
  }
  };

  const getEmail = async () => {
    const email = await AsyncStorage.getItem('email');
    setEmail(email);
    await AsyncStorage.setItem("isRequired",'true')
  };

  useEffect(() => {
    getEmail();
  }, []);

  useEffect(() => {

    if (responseVerifyPhone != null) {
      console.log('responseVerifyPhone ===> ', responseVerifyPhone);
      navigation.navigate('VerifyPhoneNumber', {phoneNumber: phoneNumber});
      dispatch(clearVerifyPhone());
     
    }
  }, [responseVerifyPhone]);

  useEffect(() => {
    console.log('responseVerifyCode ===> ', statusCode);

      if(statusCode==200){
      setVarifiedPhn(true);
      dispatch(clearVerifyPhoneCode());
      }
    
  }, [statusCode]);

  const [selected, setSelected] = useState('');
  const [viewCal, setViewCal] = useState(false);
  const currentDate = new Date().toISOString().split('T')[0];

  const goToNextScreen = () => {

    if (
      lastName == '' ||
      firstName == '' ||
      phoneNumber == '' ||
      selectedDate==''
    ) {
      Alert.alert('All fields are required!');
    } else {
      navigation.navigate('ProfileAddress', {
        detailData: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          countryCode: countryCode == 'AU' ? 61 : countryCode,
          phoneNumber: phoneNumber.substring(countryCode.length + 1),
          dob: selectedDate,
          abn: abn,
        },
      });
    }
  };

  return (
    <SafeAreaView style={styles.containerStyle}>
      <View style={styles.headerView}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerText}>Profile - Require Details</Text>
      </View>

      <ScrollView
        style={styles.mainViewStyle}
        showsVerticalScrollIndicator={false}>
        <View>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'sf-pro-text-semibold',
              color: appColors.white,
            }}>
            Required Details
          </Text>

          {/* First Name */}
          <Text style={styles.textStyle}>First Name</Text>
          <View style={styles.inputViewStyle}>
            <TextInput
              style={styles.inputStyle}
              placeholder="First Name"
              placeholderTextColor={appColors.placeholderColor}
              keyboardType="default"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          {/* Last Name */}
          <Text style={styles.textStyle}>Last Name</Text>
          <View style={styles.inputViewStyle}>
            <TextInput
              style={styles.inputStyle}
              placeholder="Last Name"
              placeholderTextColor={appColors.placeholderColor}
              keyboardType="default"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>

          {/* Email */}
          <Text style={styles.textStyle}>Email</Text>
          <View style={styles.inputViewStyle}>
            <TextInput
              style={styles.inputStyle}
              placeholder="email@email.com"
              placeholderTextColor={appColors.placeholderColor}
              keyboardType="email-address"
              value={email}
              editable={false}
              onChangeText={setEmail}
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
              onSelectCountry={iso2 => {
                console.log(
                  'phoneRef.current.getCountryCode() ===> ',
                  phoneRef.current.getCountryCode(),
                );
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
              onSelect={()=>onSelectCountry()}
              onClose={() => setCountryPickerVisible(false)}
              visible={countryPickerVisible}
            />
          )} */}
          {verifiedPhn && (
            <Text
              style={{
                color: appColors.green,
                alignSelf: 'flex-end',
                marginTop: 8,
                fontSize: 16,
                marginRight: 8,
              }}>
              Varified
            </Text>
          )}

          {/* Verify Phone Button */}
          {!verifiedPhn && (
            <TouchableOpacity
              style={styles.timerBackground}
              onPress={() => onClickVerify()}>
              <Text
                style={{
                  color: appColors.white,
                  padding: 16,
                  fontWeight: '600',
                  fontSize: 16,
                }}>
                Verify Phone Number
              </Text>
            </TouchableOpacity>
          )}

          <Text style={styles.textStyle}>DOB</Text>
          <View style={styles.inputViewStyle}>
            <TextInput
              style={styles.inputStyle}
              editable={false}
              placeholder="21 Aug 2021"
              placeholderTextColor={appColors.placeholderColor}
              keyboardType="email-address"
              value={moment(selectedDate, "YYYY-MM-DD").format("DD MMM, YYYY")}
            />
            <TouchableOpacity
              style={{marginRight: 16}}
              onPress={() => setShowDatePicker(true)}>
              <WhiteCalender />
            </TouchableOpacity>
          </View>
          <Text>{viewCal ? calenderOpener() : 'click to open calender'}</Text>
          <Text style={styles.textStyle}>GST</Text>
          <View style={{marginTop: 24, flexDirection: 'row'}}>
            {options.map(option => (
              <TouchableOpacity
                key={option.id}
                style={styles.optionContainer}
                onPress={() => setSelectedOption(option.id)}>
                {/* Outer radio button */}
                <View
                  style={[
                    styles.radioButton,
                    {
                      borderColor:
                        selectedOption === option.id
                          ? appColors.white
                          : appColors.borderLightGrey,
                      backgroundColor:
                        selectedOption === option.id
                          ? appColors.white
                          : appColors.black,
                    },
                  ]}>
                  {/* Inner pink dot only when selected */}
                  {selectedOption === option.id && (
                    <View style={styles.innerDot} />
                  )}
                </View>

                {/* Label text */}
                <Text style={styles.label}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.textStyle}>
            {selectedOption == 'yes' ? 'ABN' : 'TFN'}
          </Text>
         {selectedOption=='yes'&& <View style={styles.inputViewStyle}>
            <TextInput
              style={styles.inputStyle}
              placeholder="00000000000"
              placeholderTextColor={appColors.placeholderColor}
              keyboardType="numeric"
              value={abn}
              onChangeText={setAbn}
            />
          </View>}
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => goToNextScreen()}>
            <Text
              style={{
                color: appColors.black,
                fontWeight: '600',
                fontSize: 16,
                padding: 16,
                fontFamily: 'SF-Pro-Display-Bold',
                textAlign: 'center',
                flex: 1,
              }}>
              Next
            </Text>
            <NextArrow />
          </TouchableOpacity>
        </View>
        {showDatePicker  && (
            <Modal transparent={true} animationType="slide">
              <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: '#00000088' }}>
                <View style={{ backgroundColor: 'white', padding: 16 }}>
                  <DateTimePicker
                    value={tempDate}
                    mode="date"
                    display="spinner"
                    onChange={(event, selectedDate) => {
                      if (selectedDate) {
                        console.log("Selected Date ====> ",selectedDate)
                        setTempDate(selectedDate); // Store temporarily until OK is pressed
                      }
                    }}
                  />
                  <Button
                    title="OK"
                    onPress={() => {
                      setShowDatePicker(false);
                      if (tempDate) {
                        const formattedDate = tempDate.toISOString().split('T')[0];
                        setSelectedDate(formattedDate);
                      }
                    }}
                  />
                </View>
              </View>
            </Modal>
          )} 
        {/* <Modal
          isVisible={isDatePickerVisible}
          onBackdropPress={hideDatePicker}
          style={{justifyContent: 'flex-end', margin: 0}}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <Text style={{fontSize: 18, marginBottom: 10}}>Select a Date</Text>
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
            <TouchableOpacity
              onPress={hideDatePicker}
              style={[styles.buttonStyle, {marginTop: 20}]}>
              <Text style={{fontWeight: '700'}}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </Modal> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RequiredDetails;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    padding: 16,
    backgroundColor: appColors.black,
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
    textAlign: 'center',
  },
  mainViewStyle: {
    marginHorizontal: 32,
    marginVertical: 16,
  },
  textStyle: {
    fontSize: 13,
    fontFamily: 'sf_medium',
    color: appColors.borderLightGrey,
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
    fontFamily: 'SF-Pro',
    backgroundColor: appColors.inputBackground,
    flex: 1,
    color: appColors.white,
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

  timerBackground: {
    borderWidth: 1,
    borderColor: appColors.borderLightGrey,
    backgroundColor: appColors.black,
    marginTop: 16,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20, // Spacing between radio buttons
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10, // Makes it a perfect circle
    borderWidth: 2,
    // White background
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: appColors.pink, // Pink dot when selected
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
    color: appColors.white, // Label text color
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
});
