import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {appColors} from '../../utils/appColors';
import {SafeAreaView} from 'react-native-safe-area-context';
import MainLogo from '../../assets/svg/MainLogo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StartScreen = ({navigation}) => {
  const [token, setToken] = useState(null);

  const getEmail = async () => {
    const token = await AsyncStorage.getItem('email');
    console.log('Email ===> ', token);
    setToken(token);
  };

  useEffect(() => {
    console.log('First Screen');
    getEmail();
  }, []);

  const goToCreate = async () => {
    await AsyncStorage.setItem('isNew', 'true');
    navigation.navigate('SignInWithEmail', {from: 2});
  };

  const goToLogin = async () => {
    console.log('Token ===> ', token);
    await AsyncStorage.setItem('isNew', 'false');
    if (token != null) {
      console.log('LoginPin email ===> ', token);
      navigation.navigate('LoginPin', {
        email: token,
        from: 0,
        isFaceLock: false,
      });
    } else {
      navigation.navigate('SignInWithEmail', {from: 0});
    }
  };

  return (
    <SafeAreaView style={styles.containerStyle}>
      {/* <Text style={styles.textStyle}>Sign in</Text> */}
      <View style={styles.logoStyle}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <MainLogo width={200} />
        </View>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => goToLogin()}
          // onPress={() => navigation.navigate('ImageCropper')}
        >
          <Text
            style={{color: appColors.black, fontWeight: '700', fontSize: 16}}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => goToCreate()}>
          <Text style={styles.textStyle}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default StartScreen;

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
    top: 30,
    fontWeight: '500',
    fontSize: 16,
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
    padding: 15,
    borderRadius: 24,
    marginTop: 40,
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
    borderRadius: 24,
    borderColor: appColors.grey,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    bottom: 36,
  },
});
