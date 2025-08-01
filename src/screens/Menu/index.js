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
import DummyUserIcon from '../../assets/svg/DummyUserIcon';
import WhiteCrossIcon from '../../assets/svg/WhiteCrossIcon';
import MenuJobIcon from '../../assets/svg/MenuJobIcon';
import RateStar from '../../assets/svg/RateStar';
import MenuTaskIcon from '../../assets/svg/MenuTaskIcon';
import MenuCalenderIcon from '../../assets/svg/MenuCalenderIcon';
import MenuChatIcon from '../../assets/svg/MenuChatIcon';
import MenuNewsIcon from '../../assets/svg/MenuNewsIcon';
import MenuProfileIcon from '../../assets/svg/MenuProfileIcon';
import MenuSettingIcon from '../../assets/svg/MenuSettingIcon';
import MenuHelpIcon from '../../assets/svg/MenuHelpIcon';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {get} from 'http';
import {getProfile} from '../../redux/GetProfileSlice';
import {useDispatch, useSelector} from 'react-redux';
import ProfileDummy from '../../assets/svg/ProfileDummy';

const Menu = ({navigation}) => {
  const [profile, setProfile] = useState(null);
  const profileResponse = useSelector(state => state.getProfileReducer.data);

  const dispatch = useDispatch();

  const clearToken = async () => {
    await AsyncStorage.removeItem('token');
    navigation.reset({
      index: 0,
      routes: [{name: 'StartScreen'}],
    });
  };

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  useEffect(() => {
    console.log('profileResponse ===> ', profileResponse);
    if (profileResponse != null && profileResponse.status === 200) {
      setProfile(profileResponse.data);
      // dispatch(getProfile());
      // dispatch(clearGetState());
    }
  }, [profileResponse]);

  return (
    <SafeAreaView style={styles.containerStyle}>
      <View style={styles.headerStyle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <WhiteCrossIcon />
        </TouchableOpacity>
      </View>

      {profile != null && (
        <View style={{alignItems: 'center'}}>
          {profile.has_photo ? (
            <Image
              source={{uri: profile.photo}}
              style={styles.avatar_}
              resizeMode="contain"
            />
          ) : (
            <ProfileDummy width={120} height={120} />
          )}

          <Text style={styles.usernameStyle}>
            {profile.first_name} {profile.last_name}
          </Text>
          {/* <Text style={styles.smallTextStyle}>Designer</Text> */}
        </View>
      )}
      <ScrollView>
        <View>
          <View
            style={{
              marginLeft: 64,
              marginTop: 16,
              justifyContent: 'flex-start',
            }}>
            {/* <TouchableOpacity style={styles.optionStyle} onPress={() => navigation.navigate('JobsScreen')}>
              <MenuJobIcon />
              <View style={{ marginLeft: 16 }}>
                <Text style={styles.mainTextStyle}>Jobs</Text>
                <Text style={styles.textStyle}>Not Accepted</Text>
              </View>
              <Text style={styles.badgeStyle}>3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionStyle} onPress={() => navigation.navigate('Tasks')}>
              <MenuTaskIcon />
              <View style={{ marginLeft: 16 }}>
                <Text style={styles.mainTextStyle}>Tasks</Text>
                <Text style={styles.textStyle}>Unfinished</Text>
              </View>
              <Text style={styles.badgeStyle}>3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionStyle} onPress={() => navigation.navigate('NewDateAdd')}>
              <MenuCalenderIcon />
              <View style={{ marginLeft: 16 }}>
                <Text style={styles.mainTextStyle}>Calender</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionStyle} onPress={() => navigation.navigate('Chat')}>
              <MenuChatIcon />
              <View style={{ marginLeft: 16 }}>
                <Text style={styles.mainTextStyle}>Chat</Text>
                <Text style={styles.textStyle}>Not Accepted</Text>
              </View>
              <Text style={styles.badgeStyle}>3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionStyle} onPress={() => navigation.navigate('News')}>
              <MenuNewsIcon />
              <View style={{ marginLeft: 16 }}>
                <Text style={styles.mainTextStyle}>News</Text>
                <Text style={styles.textStyle}>Not Accepted</Text>
              </View>
              <Text style={styles.badgeStyle}>3</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.optionStyle}
              onPress={() => navigation.navigate('Profile')}>
              <MenuProfileIcon />
              <View style={{marginLeft: 16}}>
                <Text style={styles.mainTextStyle}>Profile</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionStyle}
              onPress={() => navigation.navigate('Setting')}>
              <MenuSettingIcon />
              <View style={{marginLeft: 16}}>
                <Text style={styles.mainTextStyle}>Setting</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionStyle}
              onPress={() => clearToken()}>
              <MenuSettingIcon />
              <View style={{marginLeft: 16}}>
                <Text style={styles.mainTextStyle}>Logout</Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                height: 1,
                backgroundColor: appColors.grey,
                marginTop: 16,
                width: 200,
              }}
            />
            <TouchableOpacity style={styles.optionStyle}>
              <MenuHelpIcon />
              <View style={{marginLeft: 16}}>
                <Text style={styles.mainTextStyle}>Help</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{}}>
            <TouchableOpacity
            // onPress={() => navigation.navigate('BottomBar')}
            >
              <View
                style={{
                  backgroundColor: appColors.black,
                  marginHorizontal: 16,
                  borderRadius: 30,
                  marginTop: 32,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingVertical: 16,
                  borderWidth: 1,
                  borderColor: appColors.grey,
                }}>
                <RateStar />
                <Text style={styles.rateTextStyle}>Rate MeMate</Text>
              </View>
            </TouchableOpacity>
            <Text
              style={styles.termsStyle}
              onPress={() => navigation.navigate('Conditions')}>
              Terms and Conditions
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Menu;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: appColors.black,
    padding: 16,
  },
  headerStyle: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  usernameStyle: {
    color: appColors.white,
    fontFamily: 'SF-Pro',
    fontWeight: '600',
    fontSize: 20,
    marginTop: 8,
  },
  smallTextStyle: {
    fontSize: 12,
    color: appColors.grey,
  },
  mainTextStyle: {
    fontSize: 18,
    color: appColors.white,
    fontWeight: '700',
    fontFamily: 'SF-Pro',
  },
  deleteTextStyle: {
    fontSize: 18,
    color: 'red',
    fontWeight: '700',
    fontFamily: 'SF-Pro',
  },
  textStyle: {color: appColors.grey, fontWeight: '500'},
  badgeStyle: {
    backgroundColor: appColors.pink,
    borderRadius: 16,
    height: 18,
    width: 18,
    textAlign: 'center',
    alignSelf: 'flex-end',
    marginLeft: 4,
    color: appColors.white,
    fontSize: 12,
  },
  optionStyle: {flexDirection: 'row', alignItems: 'center', marginTop: 16},
  rateTextStyle: {
    color: appColors.white,
    marginLeft: 8,
    fontFamily: 'SF-Pro',
    fontWeight: '700',
    fontSize: 16,
  },
  termsStyle: {
    textAlign: 'center',
    color: appColors.grey,
    marginVertical: 32,
    fontFamily: 'SF-Pro',
    fontWeight: '700',
  },
  avatar_: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: appColors.lightGrey,
  },
});
