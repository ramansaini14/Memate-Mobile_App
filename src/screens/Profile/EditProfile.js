import {
  Alert,
  Button,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {appColors} from '../../utils/appColors';
import WhiteCalenderIcon from '../../assets/svg/WhiteCalenderIcon';
import WhiteMenuIcon from '../../assets/svg/WhiteMenuIcon';
import WhiteBackIcon from '../../assets/svg/WhiteBackIcon';
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';
import FormCalender from '../../assets/svg/FormCalender';
import KeyIcon from '../../assets/svg/KeyIcon';
import DeleteIcon from '../../assets/svg/DeleteIcon';
import DatePicker from 'react-native-date-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import StateModal from '../../components/StateModal';
import WhiteDownArrow from '../../assets/svg/WhiteDownArrow';
import {hitGetCities} from '../../redux/GetCitiesSlice';
import moment from 'moment';
import {hitUpdateProfile} from '../../redux/UpdateProfileSlice';
import WhiteCalender from '../../assets/svg/WhiteCalender';
import DateTimePicker from '@react-native-community/datetimepicker';

const EditProfile = ({navigation, route}) => {
  const {
    profileData,
    countries,
    states,
    cities,
    country,
    state,
    city,
    profileEmail,
    profilePhone,
  } = route.params;
  const [profile, setProfile] = useState(null);

    const {statusCode,data} = useSelector((state)=>state.updateProfileReducer)

  const dispatch = useDispatch();
  const phoneRef = useRef(null);
  const emgPhoneRef = useRef(null);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('AU'); // Assuming default country is Aus
  const [emgPhoneNumber, setEmgPhoneNumber] = useState('');
  const [emgCountryCode, setEmgCountryCode] = useState('AU'); // Assuming default country is Aus

  const [countryPickerVisible, setCountryPickerVisible] = useState(false);

  const responseCountries = useSelector(
    state => state.getCountriesReducer.data,
  );
  const responseState = useSelector(state => state.getStateReducer.data);
  const responseCities = useSelector(state => state.getCityReducer.data);
  const profileResponse = useSelector(state => state.getProfileReducer.data);

  const [countryData, setCountries] = useState([]);
  const [stateData, setStates] = useState([]);
  const [cityData, setCities] = useState([]);
  const [selectedCountry, setCountry] = useState(null);
  const [selectedState, setState] = useState(null);
  const [selectedCity, setCity] = useState(null);
  const [isState, setIsState] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [abn, setAbn] = useState('');
  const [street, setStreet] = useState('');
  const [postcode, setPostcode] = useState('');
  const [emgNumber, setEmgNumber] = useState('');
  const [emgName, setEmgName] = useState('');

   const [showDatePicker, setShowDatePicker] = useState(false);
    const [tempDate, setTempDate] = useState(new Date());

  const toggleCountryPicker = () => {
    setCountryPickerVisible(!countryPickerVisible);
  };

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log('profileData', profileData);
    setProfile(profileData);
    setCountries(countries);
    setState(states);
    setCities(cities);
    setCountry(country);
    setState(state);
    setCity(city);
    setEmail(profileEmail);
    setAbn(profileData.abn || '');
    setDob(
      moment(profileData.date_of_birth * 1000).format('DD MMM, YYYY') || '',
    );
    setStreet(profileData.street_address || '');
    setPostcode(profileData.postcode || '');
    setEmgName(profileData.emergency_name || '');

    if (phoneRef.current && emgCountryCode) {
      phoneRef.current.selectCountry(emgCountryCode); // Set country using ISO2 (e.g., 'us', 'in')
    }

    setPhoneNumber(profileData.country_code + profileData.phone || '');
    // setCountryCode(profileData.country_code );
    setEmgPhoneNumber(
      profileData.emergency_country_code + profileData?.emergency,
    );
    // setEmgCountryCode( );
  }, []);
  const onDropDownClick = value => {
    setIsState(value);
    setModalVisible(true);
  };

  useEffect(() => {
    if (selectedState != null) {
      const payload = {
        id: selectedState.id,
      };
      dispatch(hitGetCities(payload));
    }
  }, [selectedState]);

  useEffect(() => {
    console.log('responseCities', responseCities);
    if (responseCities != null) {
      setCities(responseCities);
      setCity(responseCities[0]);
    }
  }, [responseCities]);

  const onUpdate = () => {
    const profileData = {
      firstName: profile.first_name,
      lastName: profile.last_name,
      email: email,
      countryCode: countryCode == 'AU' ? 61 : countryCode,
      phoneNumber: phoneNumber.substring(countryCode.length),
      dob: dob,
      abn: abn,
      city:selectedCity.id,
      streetAddress: street,
      postcode: postcode,
      emgCountryCode: emgCountryCode == 'AU' ? 61 : emgCountryCode,
      emgPhoneNumber: emgPhoneNumber.substring(emgCountryCode.length),
      emgName: emgName,
    };

    const payload = {
      image:null,
      profileData,
    };

    dispatch(hitUpdateProfile(payload));
  };
  useEffect(()=>{
    if(statusCode == 200) {
      Alert.alert('Profile updated successfully');
      navigation.goBack();
    }
  },[data])

  return (
    <SafeAreaView style={styles.containerStyle}>
      <View style={styles.headerStyle}>
        <View style={{height: 40, width: 40}}>
          <WhiteBackIcon onPress={() => navigation.goBack()} />
        </View>
        <Text style={styles.usernameStyle}>Edit Profile</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity style={{marginHorizontal: 8}}>
            <WhiteCalenderIcon />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
            <WhiteMenuIcon />
          </TouchableOpacity>
        </View>
      </View>
      {profile && (
        <ScrollView style={{flex: 1}}>
          <View style={{alignItems: 'center'}}>
            <View style={{marginVertical: 15}}>
              {profile != null &&
                (profile.has_photo ? (
                  <Image
                    source={{uri: profile.photo}}
                    style={styles.avatar_}
                    resizeMode="contain"
                  />
                ) : (
                  <ProfileDummy width={120} height={120} />
                ))}
            </View>
            <Text style={styles.userName}>
              {profile.first_name + ' ' + profile.last_name}
            </Text>
            {/* <Text style={styles.ratingNumber}>
              Rating: <Text style={{color: appColors.yellow}}>367</Text>
            </Text> */}
          </View>
          <View
            style={{
              paddingBottom: 15,
              marginTop: 15,
              borderColor: appColors.borderLightGrey,
              borderBottomWidth: 1,
            }}>
            <Text style={styles.userDetailStyle}>User Details</Text>
            <View style={{marginBottom: 10}}>
              <Text style={{color: appColors.grey, fontSize: 13}}>Email</Text>
              <TextInput
                style={{
                  backgroundColor: '#212528',
                  color: appColors.white,
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  borderRadius: 8,
                  marginTop: 5,
                }}
                placeholder="Email"
                placeholderTextColor={appColors.placeholderColor}
                value={email}
                onChangeText={v => setEmail(v)}
              />
            </View>
            <View style={{marginBottom: 10}}>
              <Text style={{color: appColors.grey, fontSize: 13}}>Phone</Text>
              <View
                style={{
                  backgroundColor: '#212528',
                  borderRadius: 8,
                  marginTop: 5,
                }}>
                <PhoneInput
                  ref={phoneRef}
                  style={{
                    padding: 16,
                    backgroundColor: appColors.inputBackground,
                  }}
                  value={phoneNumber}
                  initialValue={phoneNumber}
                  initialCountry={countryCode}
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
            </View>
            <View style={{marginBottom: 10}}>
              <Text style={{color: appColors.grey, fontSize: 13}}>DOB</Text>
              <View style={styles.inputViewStyle}>
            <TextInput
              style={styles.inputStyle}
              editable={false}
              placeholder="21 Aug 2021"
              placeholderTextColor={appColors.placeholderColor}
              keyboardType="email-address"
              value={moment(dob, "YYYY-MM-DD").format("DD MMM, YYYY")}
            />
            <TouchableOpacity
              style={{marginRight: 16}}
              onPress={() => setShowDatePicker(true)}>
              <WhiteCalender />
            </TouchableOpacity>
          </View>
            </View>
            <View style={{marginBottom: 10}}>
              <Text style={{color: appColors.grey, fontSize: 13}}>ABN</Text>
              <TextInput
                style={{
                  backgroundColor: '#212528',
                  color: appColors.white,
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  borderRadius: 8,
                  marginTop: 5,
                }}
                placeholder="Number"
                placeholderTextColor={appColors.placeholderColor}
                value={abn}
                onChangeText={v => setAbn(v)}
              />
            </View>
          </View>

          <View style={{marginTop: 15}}>
            <View
              style={{
                paddingBottom: 10,
                borderColor: appColors.borderLightGrey,
                borderBottomWidth: 1,
              }}>
              <Text style={[styles.addressStyle, {marginBottom: 10}]}>
                Address
              </Text>
              <View>
                <Text style={styles.textStyle}>Country</Text>
                <View style={styles.inputViewStyle}>
                  <TextInput
                    style={styles.inputStyle}
                    editable={false}
                    value={selectedCountry != null ? selectedCountry.name : ''}
                    placeholderTextColor={appColors.placeholderColor}
                    keyboardType="email-address"
                  />
                  <TouchableOpacity style={{marginRight: 16}}>
                    <WhiteDownArrow />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{marginTop: 15}}>
                <Text style={styles.textStyle}>State</Text>
                <View style={styles.inputViewStyle}>
                  <TextInput
                    style={styles.inputStyle}
                    editable={false}
                    placeholder="Select"
                    value={selectedState != null ? selectedState.name : ''}
                    placeholderTextColor={appColors.placeholderColor}
                    keyboardType="email-address"
                  />
                  <TouchableOpacity
                    style={{marginRight: 16}}
                    onPress={() => onDropDownClick(true)}>
                    <WhiteDownArrow />
                  </TouchableOpacity>
                </View>
                <Text style={{fontSize: 14}}>
                  {selectedState != null ? selectedState.name : ''}
                </Text>
              </View>
              <View>
                <Text style={styles.textStyle}>City</Text>
                <View style={styles.inputViewStyle}>
                  <TextInput
                    style={styles.inputStyle}
                    editable={false}
                    placeholder="Select"
                    value={selectedCity != null ? selectedCity.name : ''}
                    placeholderTextColor={appColors.placeholderColor}
                    keyboardType="email-address"
                  />
                  <TouchableOpacity
                    style={{marginRight: 16}}
                    onPress={() => onDropDownClick(false)}>
                    <WhiteDownArrow />
                  </TouchableOpacity>
                </View>
                <Text style={{fontSize: 14}}>
                  {' '}
                  {selectedCity != null ? selectedCity.name : ''}
                </Text>
              </View>

              <View style={{marginBottom: 15}}>
                <Text style={{color: appColors.grey, fontSize: 13}}>
                  Street Address
                </Text>
                <TextInput
                  style={{
                    backgroundColor: '#212528',
                    color: appColors.white,
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 8,
                    marginTop: 5,
                  }}
                  placeholder="Number"
                  placeholderTextColor={appColors.placeholderColor}
                  value={street}
                  onChangeText={v => setStreet(v)}
                />
              </View>
              <View style={{marginBottom: 15}}>
                <Text style={{color: appColors.grey, fontSize: 13}}>
                  Postcode
                </Text>
                <TextInput
                  style={{
                    backgroundColor: '#212528',
                    color: appColors.white,
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 8,
                    marginTop: 5,
                  }}
                  placeholder="Number"
                  placeholderTextColor={appColors.placeholderColor}
                  value={postcode}
                  onChangeText={v => setPostcode(v)}
                />
              </View>
            </View>
          </View>

          <View style={{marginTop: 15}}>
            <View
              style={{
                paddingBottom: 15,
                borderColor: appColors.borderLightGrey,
                borderBottomWidth: 1,
              }}>
              <Text style={[styles.addressStyle, {marginBottom: 10}]}>
                Emergency Contact
              </Text>
              <View style={{marginBottom: 15}}>
                <Text style={{color: appColors.grey, fontSize: 13}}>
                  Contact Name
                </Text>
                <TextInput
                  style={{
                    backgroundColor: '#212528',
                    color: appColors.white,
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 8,
                    marginTop: 5,
                  }}
                  placeholder="Number"
                  placeholderTextColor={appColors.placeholderColor}
                  value={emgName}
                  onChangeText={v => setEmgName(v)}
                />
              </View>
              <View style={{marginBottom: 8}}>
                <Text style={{color: appColors.grey, fontSize: 13}}>Phone</Text>
                <PhoneInput
                  ref={emgPhoneRef}
                  style={{
                    padding: 16,
                    backgroundColor: appColors.inputBackground,
                  }}
                  value={emgPhoneNumber}
                  initialValue={emgPhoneNumber}
                  initialCountry={emgCountryCode}
                  onChangePhoneNumber={setEmgPhoneNumber}
                  textStyle={{color: 'white'}}
                  onSelectCountry={iso2 => {
                    console.log(
                      'phoneRef.current.getCountryCode() ===> ',
                      emgPhoneRef.current.getCountryCode(),
                    );
                    const code = emgPhoneRef.current.getCountryCode();
                    setEmgCountryCode(code);
                  }}
                />
              </View>
            </View>
          </View>

          <View style={{marginTop: 20, marginBottom: 25}}>
            <View
              style={{
                paddingBottom: 20,
                borderColor: appColors.borderLightGrey,
                borderBottomWidth: 1,
              }}>
              <Text style={styles.addressStyle}>Security Options</Text>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: 30, height: 30}}>
                  <KeyIcon />
                </View>
                <Text style={{color: appColors.white, fontSize: 16}}>
                  Reset the Password
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={{flexDirection: 'row', marginBottom: 10}}
            onPress={() => navigation.navigate('DeleteAccount')}>
            <View style={{width: 30, height: 30}}>
              <DeleteIcon />
            </View>
            <View>
              <Text style={{color: appColors.lightRed, fontSize: 15}}>
                Delete the Account
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{alignItems: 'center', flex: 1}} onPress={()=> onUpdate()}>
            <Text style={styles.saveChangeButton}>Save changes</Text>
          </TouchableOpacity>
          <StateModal
            title={isState ? 'Select State' : 'Select City'}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            selectedItem={isState ? selectedState : selectedCity}
            setSelectedItem={isState ? setState : setCity}
            items={isState ? states : cities}
          />

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
                        setDob(formattedDate);
                      }
                    }}
                  />
                </View>
              </View>
            </Modal>
          )} 
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: appColors.black,
    padding: 16,
  },
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  usernameStyle: {
    color: appColors.white,
    fontFamily: 'SF-Pro',
    fontWeight: '700',
    fontSize: 16,
  },
  userName: {
    color: appColors.white,
    fontFamily: 'SF-Pro',
    fontWeight: '700',
    fontSize: 22,
  },
  ratingNumber: {
    color: appColors.white,
    fontFamily: 'SF-Pro',
    fontWeight: '700',
    fontSize: 17,
    marginBottom: 15,
  },
  userDetailStyle: {
    color: appColors.white,
    fontFamily: 'SF-Pro',
    fontWeight: '700',
    fontSize: 19,
    marginBottom: 10,
  },
  addressStyle: {
    color: appColors.white,
    fontFamily: 'SF-Pro',
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 10,
  },
  saveChangeButton: {
    color: appColors.black,
    backgroundColor: appColors.white,
    borderWidth: 1,
    paddingVertical: 10,
    borderColor: appColors.grey,
    paddingHorizontal: 15,
    fontFamily: 'SF-Pro',
    fontWeight: '600',
    borderRadius: 25,
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 14,
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
    color: appColors.white,
    flex: 1,
  },
  textStyle: {
    fontSize: 13,
    fontFamily: 'sf_medium',
    color: appColors.grey,
    // marginTop: 16,
  },
  avatar_: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: appColors.lightGrey,
  },
});
