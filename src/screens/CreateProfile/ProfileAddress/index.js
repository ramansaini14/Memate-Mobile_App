import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
} from 'react-native';
import {appColors} from '../../../utils/appColors';
import BackIcon from '../../../assets/svg/BackIcon';
import NextArrow from '../../../assets/svg/NextArrow';
import WhiteDownArrow from '../../../assets/svg/WhiteDownArrow';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearGetCountries,
  hitGetCounties,
} from '../../../redux/GetCountriesSlice';
import {clearGetState, hitGetState} from '../../../redux/GetStateSlice';
import StateModal from '../../../components/StateModal';
import {hitGetCities} from '../../../redux/GetCitiesSlice';
import RBSheet from 'react-native-raw-bottom-sheet';
import WhiteCrossIcon from '../../../assets/svg/WhiteCrossIcon';

const ProfileAddress = ({navigation, route}) => {
  const {detailData} = route.params;
  const dispatch = useDispatch();

  const refRBSheet = useRef();
  const refRBSheetCountry = useRef();

  const responseCountries = useSelector(
    state => state.getCountriesReducer.data,
  );
  const responseState = useSelector(state => state.getStateReducer.data);
  const responseCities = useSelector(state => state.getCityReducer.data);

  console.log('Details Screen Data ===>', detailData);
  const [countries, setCountries] = useState(null);
  const [states, setStates] = useState(null);
  const [cities, setCities] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const [selectedState, setSelectedState] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isState, setIsState] = useState(false);
  const [streetAddress, setStreetAddress] = useState('');
  const [postcode, setPostCode] = useState('');
  const [stateText, setStateText] = useState('');
  const [cityText, setCityText] = useState('');
  const [countryText, setCountryText] = useState('');

  const options = [
    {id: 'yes', label: 'Yes'},
    {id: 'no', label: 'No'},
  ];

  useEffect(() => {
    dispatch(hitGetCounties());
  }, []);

  useEffect(() => {
    setSelectedState(null);
    setSelectedCity(null);
  }, [selectedCountry]);

  useEffect(() => {
    console.log('Response Countries ===>', responseCountries);
    if (responseCountries != null) {
      setCountries(responseCountries);
      setSelectedCountry(responseCountries[0]);
      const payload = {
        id: responseCountries[0].id,
      };
      dispatch(clearGetCountries());
      dispatch(hitGetState(payload));
    }
  }, [responseCountries]);

  useEffect(() => {
    if (responseState != null) {
      setStates(responseState);
      setSelectedState(responseState[0]);
      dispatch(clearGetState());
    }
  }, [responseState]);

  useEffect(() => {
    console.log('responseCities', responseCities);
    if (responseCities != null) {
      setCities(responseCities);
      setSelectedCity(responseCities[0]);
    }
  }, [responseCities]);

  useEffect(() => {
    if (selectedState != null) {
      const payload = {
        id: selectedState.id,
      };
      dispatch(hitGetCities(payload));
    }
  }, [selectedState]);

  const onDropDownClick = value => {
    setIsState(value);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.containerStyle}>
      <View style={styles.headerView}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerText}>Profile - Address</Text>
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
            Address
          </Text>

          {/* Country */}
          <Text style={styles.textStyle}>Country</Text>
          <View style={styles.inputViewStyle}>
            <TextInput
              style={styles.inputStyle}
              editable={false}
              value={selectedCountry != null ? selectedCountry.name : ''}
              placeholderTextColor={appColors.placeholderColor}
              keyboardType="email-address"
            />
            <TouchableOpacity
              style={{marginRight: 16}}
              onPress={() => {
                refRBSheetCountry.current.open();
              }}>
              <WhiteDownArrow />
            </TouchableOpacity>
          </View>

          {/* State*/}
          {/* <Text style={styles.textStyle}>State</Text>
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
          </View> */}

          {selectedCountry?.id == 1 ? (
            <View style={styles.inputViewStyle}>
              <TextInput
                style={styles.inputStyle}
                editable={false}
                placeholder="Select State"
                value={selectedState != null ? selectedState.name : ''}
                placeholderTextColor={appColors.placeholderColor}
                keyboardType="email-address"
              />
              <TouchableOpacity
                style={{marginRight: 16}}
                onPress={() => {
                  setIsState(true);
                  refRBSheet.current.open();
                }}>
                <WhiteDownArrow />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.inputViewStyle}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Enter State"
                value={stateText}
                placeholderTextColor={appColors.placeholderColor}
                keyboardType="email-address"
                onChangeText={v => setStateText(v)}
              />
            </View>
          )}

          {/* City */}
          {/* <Text style={styles.textStyle}>City</Text>
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
          </View> */}

          {selectedCountry?.id == 1 ? (
            <View style={styles.inputViewStyle}>
              <TextInput
                style={styles.inputStyle}
                editable={false}
                placeholder="Select City"
                value={selectedCity != null ? selectedCity.name : ''}
                placeholderTextColor={appColors.placeholderColor}
                keyboardType="email-address"
              />
              <TouchableOpacity
                style={{marginRight: 16}}
                onPress={() => {
                  setIsState(false);
                  refRBSheet.current.open();
                }}>
                <WhiteDownArrow />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.inputViewStyle}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Enter City"
                value={cityText}
                placeholderTextColor={appColors.placeholderColor}
                keyboardType="email-address"
                onChangeText={v => setCityText(v)}
              />
            </View>
          )}

          {/* Street Address */}
          <Text style={styles.textStyle}>Street Address</Text>
          <View style={styles.inputViewStyle}>
            <TextInput
              style={styles.inputStyle}
              placeholder="1 / 50 Street Rd"
              placeholderTextColor={appColors.placeholderColor}
              keyboardType="default"
              value={streetAddress}
              onChangeText={v => setStreetAddress(v)}
            />
          </View>

          {/* Postcode */}
          <Text style={styles.textStyle}>Postcode</Text>
          <View style={styles.inputViewStyle}>
            <TextInput
              style={styles.inputStyle}
              placeholder="2000"
              placeholderTextColor={appColors.placeholderColor}
              keyboardType="numeric"
              value={postcode}
              onChangeText={v => setPostCode(v)}
            />
          </View>

          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              const profileData =
                selectedCountry.id == 1
                  ? {
                      country: selectedCountry.name,
                      state: selectedState.name,
                      city: selectedCity.id,
                      streetAddress: streetAddress,
                      postcode: postcode,
                      country_text: '',
                      state_text: '',
                      city_text: '',
                    }
                  : {
                      country: '',
                      state: '',
                      city: '',
                      streetAddress: streetAddress,
                      postcode: postcode,
                      country_text: selectedCountry.name,
                      state_text: stateText,
                      city_text: cityText,
                    };

              console.log('Profile Data ===>', profileData);
              navigation.navigate('ProfileAgencyContact', {
                data: {
                  detailData: detailData,
                  profileData: profileData,
                },
              });
            }}>
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
          {/* <StateModal
            title={isState ? 'Select State' : 'Select City'}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            selectedItem={isState ? selectedState : selectedCity}
            setSelectedItem={isState ? setSelectedState : setSelectedCity}
            items={isState ? states : cities}
          /> */}

          <RBSheet
            ref={refRBSheet}
            height={300}
            openDuration={300}
            customStyles={{
              container: {
                backgroundColor: '#111',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                padding: 20,
              },
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.sheetTitle}>
                {isState ? 'Select State' : 'Select City'}
              </Text>
              <TouchableOpacity
                style={{alignSelf: 'flex-end'}}
                onPress={() => refRBSheet.current.close()}>
                <WhiteCrossIcon height={28} width={28} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={isState ? states : cities}
              keyExtractor={item => item.id}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  key={index}
                  style={styles.countryRow}
                  onPress={() => {
                    refRBSheet.current.close();
                    isState ? setSelectedState(item) : setSelectedCity(item);
                  }}>
                  <Text style={styles.countryText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </RBSheet>

          <RBSheet
            ref={refRBSheetCountry}
            height={300}
            openDuration={300}
            customStyles={{
              container: {
                backgroundColor: '#111',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                padding: 20,
              },
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.sheetTitle}>Select Country</Text>
              <TouchableOpacity
                style={{alignSelf: 'flex-end'}}
                onPress={() => refRBSheetCountry.current.close()}>
                <WhiteCrossIcon height={28} width={28} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={countries}
              keyExtractor={item => item.id}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  key={index}
                  style={styles.countryRow}
                  onPress={() => {
                    refRBSheetCountry.current.close();
                    setSelectedCountry(item);
                  }}>
                  <Text style={styles.countryText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </RBSheet>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileAddress;

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
    fontWeight: '700',
  },
  mainViewStyle: {
    marginHorizontal: 32,
    marginVertical: 16,
  },
  textStyle: {
    fontSize: 13,
    fontFamily: 'sf_medium',
    color: appColors.white,
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
    color: appColors.white,
    flex: 1,
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
  sheetTitle: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    flex: 1,
    marginLeft: 28,
  },
  countryRow: {
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  countryText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
