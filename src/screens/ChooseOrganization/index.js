import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  NativeModules,
} from 'react-native';
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
import {
  emitSocket,
  emitSocketWithAck,
  emitSocketWithoutCallback,
  getSocket,
} from '../../socketService';
import {useIsFocused} from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';
import {selectJobTimer} from '../../redux/TimerSlice';
import TimerNotification, {
  startNotificationTimer,
  stopNotificationTimer,
} from '../../services/TimerNotification';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
// import PushNotificationIOS from '@react-native-community/push-notification-ios'

// const {MeMateTimer} = NativeModules

const ChooseOrganization = ({navigation}) => {
  // const socket = getSocket()

  // const jobData = useSelector(state => state.globalReducer.jobData);
  // const jobTimer = useSelector(state => selectJobTimer(state, jobData?.id));
  // const timer = jobTimer ? jobTimer.value : 0;
  const dispatch = useDispatch();

  const responseOrg = useSelector(state => state.getOrganizationReducer.data);
  const [orgData, setOrgData] = useState(null);

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('chat Response ===> ', message);
  }, [message]);

  const isFocused = useIsFocused();

  // const emitSocket = (event, data) => {
  //   console.log('event ===> ', event, '  socket ====> ', socket);
  //   if (socket) {
  //     socket.emit(event, data, response => {
  //       setMessage(response)
  //       console.log('Response Chat', response); // ok
  //     });
  //   }
  // };

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('Token');

    setInterval(() => {
      if (token == null) {
        navigation.reset({
          index: 0,
          routes: [{name: 'StartScreen'}],
        });
      }
    }, 1200);
  };

  // useEffect(()=>{

  // MeMateTimer.endTimer()

  // },[])

  const chatResponse = res => {
    console.log('Chat Response ===> ', res);
  };

  const onNextClick = async itemData => {
    console.log('ORG ID ===> ', JSON.stringify(itemData.id));

    try {
      const payload = {
        user_id: itemData.appuser_id,
      };
      emitSocketWithoutCallback('register_user', payload);

      onSocket('new_message', response => {
        console.log('new_message ===> ', response);
        emitSocketWithoutCallback('message_delivered', {
          message_id: response.id,
          user_id: itemData.appuser_id,
        });
      });

      // const registerUser = await emitSocketWithAck('register_user', payload);
      // console.log('Response in variable registerUser:', registerUser);
    } catch (err) {
      console.error('Error from socket:', err.message);
    }

    await AsyncStorage.setItem('orgId', JSON.stringify(itemData.id));

    dispatch(setGloballyOrgData(itemData));

    if (itemData.terms) navigation.navigate('BottomBar', {orgId: itemData.id});
    else
      navigation.navigate('TermsAndConditions', {from: 'org', id: itemData.id});
  };

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      dispatch(getOrganization());
    }
  }, [isFocused]);

  useEffect(() => {
    console.log('responseOrg ===> ', responseOrg);
    if (responseOrg != null) {
      setLoading(false);
      setOrgData(responseOrg);
      dispatch(getOrganizationClear());
    }
  }, [responseOrg]);

  // let time = 0;

  // const test = async (value) => {

  //     await MeMateTimer.startTimer("🔥", value);

  // };
  // const endT = () =>{
  //   MeMateTimer.endTimer()
  // }

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
      {loading
        ? Array.from({length: 3}).map((_, index) => (
            <ShimmerPlaceholder
              key={index}
              LinearGradient={LinearGradient}
              style={{
                height: 120,
                width: '90%',
                borderRadius: 24,
                marginVertical: 10,
                marginHorizontal: 16,
                backgroundColor: appColors.offWhite,
              }}
              shimmerStyle={{borderRadius: 24}}
              shimmerColors={['#f0f0f0', '#e0e0e0', '#f0f0f0']}
              location={[0.3, 0.5, 0.7]}
              isInteraction={false}
              duration={1000}
              autoRun
              // Diagonal direction
              shimmerDirection="diagonal"
              LinearGradientProps={{
                start: {x: 0, y: 1},
                end: {x: 1, y: 0},
              }}
            />
          ))
        : orgData != null &&
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
      {/* <TimerNotification/> */}
      {/* <TouchableOpacity onPress={() => test()} style={{height: 50, width: 100, backgroundColor: appColors.black}}></TouchableOpacity>
      <TouchableOpacity onPress={() => endT()} style={{height: 50, width: 100, backgroundColor: 'red'}}></TouchableOpacity> */}
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
