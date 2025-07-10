import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {appColors} from '../../utils/appColors';
import OrganizationComponent from '../../components/OrganizationComponent';
import RateStar from '../../assets/svg/RateStar';
import {useDispatch, useSelector} from 'react-redux';
import {
  getOrganization,
  getOrganizationClear,
} from '../../redux/getOrganizationSlice';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setGloballyOrgData} from '../../redux/GlobalSlice';
import CalenderIcon from '../../assets/svg/CalenderIcon';
import SimpleCalenderIcon from '../../assets/svg/SimpleCalenderIcon';
import { emitSocket } from '../../socketService';
import { useIsFocused } from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';
import { selectJobTimer } from '../../redux/TimerSlice';
import TimerNotification, { startNotificationTimer, stopNotificationTimer } from '../../services/TimerNotification';
// import PushNotificationIOS from '@react-native-community/push-notification-ios'

const ChooseOrganization = ({navigation}) => {

   const jobData = useSelector(state => state.globalReducer.jobData);
   const jobTimer = useSelector(state => selectJobTimer(state, jobData?.id));
    const timer = jobTimer ? jobTimer.value : 0;
  const dispatch = useDispatch();

  const responseOrg = useSelector(state => state.getOrganizationReducer.data);
  const [orgData, setOrgData] = useState(null);
  
  const [message,setMessage] = useState(timer)

  const isFocused= useIsFocused();

  const onNextClick = async itemData => {
    console.log('ORG ID ===> ', JSON.stringify(itemData.id));
    
    const payload = {
      user_id: itemData.appuser_id,
    }
    const register_user = emitSocket('register_user', payload);

    // await AsyncStorage.setItem('orgId', JSON.stringify(itemData.id));

    dispatch(setGloballyOrgData(itemData));

    if (itemData.terms) navigation.navigate('BottomBar', {orgId: itemData.id});
    else
      navigation.navigate('TermsAndConditions', {from: 'org', id: itemData.id});
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(getOrganization());
    }
    
  }, [isFocused]);

  useEffect(() => {
    console.log('responseOrg ===> ', responseOrg);
    if (responseOrg != null) {
      setOrgData(responseOrg);
      // dispatch(getOrganizationClear())
    }
  }, [responseOrg]);

  const test = () => {
    // PushNotification.localNotification({
    //   channelId: 'default-channel-id',
    //   title: 'Test Push',
    //   message: 'This is a test local notification 🎉',
    // });
    PushNotification.localNotification({
      channelId: 'default-channel-id',
      id:1,
      title: 'Test Push',
      message: `Running Time ${message}`,
      ongoing: true,
      importance: 'max',
      priority: 'max',
      onlyAlertOnce: true,
    });
  }


    // useEffect(() => {
    //   PushNotification.localNotification({
    //     channelId: 'default-channel-id',
    //     id: 1, // constant ID to "update" notification
    //     title: 'Timer Running',
    //     message: `Time Left: ${timer} seconds`,
    //     ongoing: true,
    //     importance: 'max',
    //     priority: 'max',
    //     onlyAlertOnce: true, // avoid multiple alerts
    //   });

    //   // setMessage(timer)
    // }, [timer]);

  return (
    <SafeAreaView style={styles.containerStyle}>
      <Text style={[styles.textStyle, {marginBottom: 20}]}>
        Choose Organization
      </Text>
      {orgData != null &&
        orgData.map(item => (
          <OrganizationComponent
            onNextClick={onNextClick}
            itemData={item}
            from={1}
          />
        ))}

      <TouchableOpacity
        style={styles.calenderButton}
        onPress={() => navigation.navigate('Unavailability')}>
        <SimpleCalenderIcon />
        <Text style={{fontSize: 16, fontWeight: '700', marginLeft: 8}}>
          Calender
        </Text>
      </TouchableOpacity>

      <View style={{justifyContent: 'flex-end', flex: 1}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('BottomBar')}
          style={{
            backgroundColor: appColors.black,
            marginHorizontal: 16,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            paddingVertical: 16,
          }}>
          <RateStar />
          <Text style={styles.rateTextStyle}>Rate MeMate</Text>
        </TouchableOpacity>
        <Text
          style={styles.termsStyle}
          onPress={() => navigation.navigate('Conditions')}>
          Terms and Conditions
        </Text>
      </View>
      <TimerNotification/>
      {/* <TouchableOpacity onPress={() => test()} style={{height: 50, width: 100, backgroundColor: appColors.black}}></TouchableOpacity> */}
     
    </SafeAreaView>
  );
};

export default ChooseOrganization;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  textStyle: {
    fontFamily: 'SF-Pro',
    textAlign: 'center',
    fontWeight: '700',
    color: appColors.black,
    marginTop: 16,
    fontSize: 16,
  },
  rateTextStyle: {
    color: appColors.white,
    marginLeft: 8,
    fontFamily: 'SF-Pro',
    fontWeight: '700',
    fontSize: 16,
  },
  termsStyle: {
    textAlign: 'center',
    color: appColors.black,
    marginVertical: 16,
    fontFamily: 'SF-Pro',
    fontWeight: '700',
  },
  calenderButton: {
    backgroundColor: appColors.white,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 8,
    flexDirection: 'row',
    borderRadius: 32,
    marginHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: appColors.lightGrey,
    marginTop: 32,
  },
});
