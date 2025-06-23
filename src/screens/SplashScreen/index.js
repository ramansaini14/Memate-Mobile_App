import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {appColors} from '../../utils/appColors';
import MainLogo from '../../assets/svg/MainLogo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connectSocket } from '../../socketService';

const SplashScreen = ({navigation}) => {
  const [token, setToken] = useState(null);
  const [isPinCreate, setPinCreated] = useState(false);
  const [isAppTerm, setAppTerm] = useState(false);
  const [isRequired, setRequired] = useState(false);
  const [loading, setLoading] = useState(false); // new state
  const [isNew, setIsNew] = useState(false);

  const getToken = async () => {
    try {
      const tok = await AsyncStorage.getItem('token');
      const pin = await AsyncStorage.getItem('isPinCreate');
      const required = await AsyncStorage.getItem('isRequired');
      const newUser = await AsyncStorage.getItem('isNew');
      console.log('Pin ===> ', pin);
      const appTerm = await AsyncStorage.getItem('isAppTerm'); // likely should be this, correct if needed

      console.log('Token ===> ', tok);
      setToken(tok);
      setPinCreated(!!pin);
      setAppTerm(!!appTerm);
      setRequired(!!required);
      setIsNew(newUser);
      setTimeout(() => {
        setLoading(true);
      }, 1500);
    } catch (e) {
      console.error('Error loading async storage:', e);
    } finally {
      setLoading(false); // finish loading
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    console.log('Token ===> ', token);
    console.log(
      'Required ===> ',
      isRequired,
      'isPinCreate ===> ',
      isPinCreate,
      ' isAppTerm ===> ',
      isAppTerm,
      ' New ===> ',
      isNew,
    );
    if (loading) {
      if (token == null) navigation.navigate('StartScreen');
      else if (isNew == true) {
        if (isNew && !isPinCreate) {
          navigation.navigate('CreatePin');
        } else if (isNew && !isAppTerm) {
          navigation.navigate('TermsAndConditions', {from: 'pin', id: 0});
        } else if (isNew && isRequired) {
          navigation.navigate('RequireDetails');
        } else {

          connectSocket();
          navigation.reset({
            index: 0,
            routes: [{name: 'BottomBar'}],
          });
          // navigation.reset('BottomBar');
        }
      } else {

        connectSocket();
        navigation.reset({
          index: 0,
          routes: [{name: 'BottomBar'}],
        });
      }
    }
  }),
    [loading];

  return (
    <SafeAreaView style={styles.container}>
      <MainLogo width={200} height={120} />
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
