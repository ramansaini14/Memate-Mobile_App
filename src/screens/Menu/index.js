import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { appColors } from '../../utils/appColors';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Menu = ({ navigation }) => {

    const clearToken = async () => {
      await AsyncStorage.clear();
      navigation.reset({
        index: 0,
        routes: [{ name: 'StartScreen'}]
  })}

  
  return (
    <SafeAreaView style={styles.containerStyle}>
      <View style={styles.headerStyle}>
        <DummyUserIcon />
        <View style={{ marginLeft: 8, flex: 1 }}>
          <Text style={styles.usernameStyle}>Username</Text>
          <Text style={styles.smallTextStyle}>Designer</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <WhiteCrossIcon />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View>
          <View
            style={{
              marginLeft: 64,
              marginTop: 16,
              justifyContent: 'flex-start',
            }}>
            <TouchableOpacity style={styles.optionStyle} onPress={() => navigation.navigate('JobsScreen')}>
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
                {/* <Text style={styles.textStyle}>Not Accepted</Text> */}
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
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionStyle} onPress={() => navigation.navigate('Profile')}>
              <MenuProfileIcon />
              <View style={{ marginLeft: 16 }}>
                <Text style={styles.mainTextStyle}>Profile</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionStyle} onPress={() => navigation.navigate('Setting')}>
              <MenuSettingIcon />
              <View style={{ marginLeft: 16 }}>
                <Text style={styles.mainTextStyle}>Setting</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionStyle} onPress={() => clearToken()}>
              <MenuSettingIcon />
              <View style={{ marginLeft: 16 }}>
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
              <View style={{ marginLeft: 16 }}>
                <Text style={styles.mainTextStyle}>Help</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('BottomBar')}>
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
          <Text style={styles.termsStyle} onPress={() => navigation.navigate('Conditions')} >Terms and Conditions</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  usernameStyle: {
    color: appColors.white,
    fontFamily: 'SF-Pro',
    fontWeight: '700',
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
  textStyle: { color: appColors.grey, fontWeight: '500' },
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
  optionStyle: { flexDirection: 'row', alignItems: 'center', marginTop: 16 },
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
});
