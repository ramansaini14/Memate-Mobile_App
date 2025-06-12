import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {appColors} from '../../utils/appColors';
import WhiteCalenderIcon from '../../assets/svg/WhiteCalenderIcon';
import WhiteMenuIcon from '../../assets/svg/WhiteMenuIcon';
import UserIcon from '../../assets/svg/UserIcon';
import WhiteBackIcon from '../../assets/svg/WhiteBackIcon';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {getProfile} from '../../redux/GetProfileSlice';
import CircularProgress from '../../components/CircularProgress';
import {clearGetCountries, hitGetCounties} from '../../redux/GetCountriesSlice';
import {clearGetState, hitGetState} from '../../redux/GetStateSlice';
import {hitGetCities} from '../../redux/GetCitiesSlice';

// const { height, width } = Dimensions.get("window");

const Profile = ({navigation}) => {
  const dispatch = useDispatch();

  const profileResponse = useSelector(state => state.getProfileReducer.data);

  const responseCountries = useSelector(
    state => state.getCountriesReducer.data,
  );
  const responseState = useSelector(state => state.getStateReducer.data);
  const responseCities = useSelector(state => state.getCityReducer.data);

  const [profile, setProfile] = useState(null);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setCountry] = useState(null);
  const [selectedState, setState] = useState(null);
  const [selectedCity, setCity] = useState(null);

  useEffect(() => {
    dispatch(hitGetCounties());
  }, []);

  useEffect(() => {
    console.log('Response Countries ===>', responseCountries);
    if (responseCountries != null) {
      setCountries(responseCountries);
      dispatch(clearGetCountries());
      const payload = {
        id: responseCountries[0].id,
      };
      dispatch(hitGetState(payload));
    }
  }, [responseCountries]);

  useEffect(() => {
    console.log('Response responseState ===>', responseState);
    if (responseState != null) {
      setStates(responseState);
      dispatch(getProfile());
      dispatch(clearGetState());
    }
  }, [responseState]);

  useEffect(() => {
    console.log('responseCities', responseCities);
    if (responseCities != null) {
      setCities(responseCities);
      const city = responseCities.find(
        obj => obj.id === profileResponse.data.city,
      );
      setCity(city);
    }
  }, [responseCities]);

  useEffect(() => {
    if (profileResponse != null && profileResponse.status === 200) {
      console.log('response data ===> ', profileResponse.data);
      setProfile(profileResponse.data);
      const country = countries.find(
        obj => obj.id === profileResponse.data.country,
      );
      const state = states.find(obj => obj.id === profileResponse.data.state);
      setCountry(country);
      setState(state);

      const payload = {
        id: profileResponse.data.state,
      };
      dispatch(hitGetCities(payload));
    }
  }, [profileResponse]);

  const timeStampToDate = timestamp => {
    const date = new Date(timestamp * 1000); // convert to milliseconds

    // Format date to '21 Aug 2021' style
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    return formattedDate;
  };

  return (
    <SafeAreaView style={styles.containerStyle}>
      <View style={styles.headerStyle}>
        <View style={{height: 40, width: 40}}>
          <WhiteBackIcon onPress={() => navigation.navigate('Menu')} />
        </View>
        <Text style={styles.usernameStyle}>Profile</Text>
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
      {profile != null ? (
        <ScrollView style={{flex: 1}}>
          <View style={{alignItems: 'center'}}>
            <View style={{marginVertical: 15}}>
              {profile != null && (
                <Image
                  source={{uri: profile.photo}}
                  style={styles.avatar_}
                  resizeMode="contain"
                />
              )}
            </View>
            <Text style={styles.userName}>
              {profile.first_name + ' ' + profile.last_name}
            </Text>
            <Text style={styles.ratingNumber}>
              Rating: <Text style={{color: appColors.yellow}}>367</Text>
            </Text>
          </View>
          <View
            style={{
              paddingBottom: 15,
              borderColor: appColors.grey,
              borderBottomWidth: 2,
            }}>
            <Text style={styles.userDetailStyle}>User Details</Text>
            <View style={{marginBottom: 8}}>
              <Text style={{color: appColors.grey, fontSize: 13}}>Email</Text>
              <Text style={{color: appColors.white, fontSize: 15}}>
                email@gmail.com
              </Text>
            </View>
            <View style={{marginBottom: 8}}>
              <Text style={{color: appColors.grey, fontSize: 13}}>Phone</Text>
              <Text style={{color: appColors.white, fontSize: 15}}>
                +{profile.country_code + profile.phone}
              </Text>
            </View>
            <View style={{marginBottom: 8}}>
              <Text style={{color: appColors.grey, fontSize: 13}}>DOB</Text>
              <Text style={{color: appColors.white, fontSize: 15}}>
                {timeStampToDate(profile.date_of_birth)}
              </Text>
            </View>
            <View style={{marginBottom: 8}}>
              <Text style={{color: appColors.grey, fontSize: 13}}>ABN</Text>
              <Text style={{color: appColors.white, fontSize: 15}}>
                {profile.abn}
              </Text>
            </View>
            <View style={{marginBottom: 8}}>
              <Text style={{color: appColors.grey, fontSize: 13}}>Address</Text>
              {selectedCity != null && (
                <Text style={{color: appColors.white, fontSize: 15}}>
                  {profile.street_address +
                    ', ' +
                    selectedCity.name +
                    ', ' +
                    selectedState.name +
                    ', ' +
                    selectedCountry.name}
                </Text>
              )}
            </View>
          </View>
          <View style={{marginTop: 15}}>
            <Text style={[styles.userDetailStyle, {marginBottom: 10}]}>
              Emergency Contact
            </Text>
            <View style={{marginBottom: 8}}>
              <Text style={{color: appColors.grey, fontSize: 13}}>
                Contact Name
              </Text>
              <Text
                style={{color: appColors.white, fontSize: 15, marginBottom: 8}}>
                {profile.emergency_name}
              </Text>
            </View>
            {profile.emergency != null && (
              <View style={{marginBottom: 15}}>
                <Text style={{color: appColors.grey, fontSize: 13}}>Phone</Text>
                <Text style={{color: appColors.white, fontSize: 15}}>
                  {profile.emergency}
                </Text>
              </View>
            )}
          </View>

          <View style={{alignItems: 'center'}}>
            <Text
              style={styles.editButton}
              onPress={() => navigation.navigate('EditProfile')}>
              Edit Profile
            </Text>
          </View>
        </ScrollView>
      ) : (
        <CircularProgress />
      )}
    </SafeAreaView>
  );
};

export default Profile;

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
  editButton: {
    color: appColors.white,
    borderWidth: 1,
    paddingVertical: 10,
    borderColor: appColors.grey,
    paddingHorizontal: 15,
    fontFamily: 'SF-Pro',
    fontWeight: '700',
    borderRadius: 25,
    textAlign: 'center',
  },
  inputStyle: {
    borderRadius: 8,
    backgroundColor: appColors.inputBackground,
    borderWidth: 1,
    marginTop: 5,
    paddingHorizontal: 16,
  },
  avatar_: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: appColors.lightGrey,
  },
});
