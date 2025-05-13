import {
    Alert,
  PanResponder,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {appColors} from '../../../utils/appColors';
import WhiteBackIcon from '../../../assets/svg/WhiteBackIcon';
import CalenderIcon from '../../../assets/svg/CalenderIcon';
import MenuIcon from '../../../assets/svg/MenuIcon';
import NotificationIcon from '../../../assets/svg/NotificationIcon';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {clearReadTasks, hitReadTasks} from '../../../redux/ReadTasksSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import SwipeButton from 'rn-swipe-button';
import RightArrowJobStart from '../../../assets/svg/RightArrowJobStart';
import ExpandIcon from '../../../assets/svg/ExpandIcon';
import CopyIcon from '../../../assets/svg/CopyIcon';
import Clipboard from '@react-native-clipboard/clipboard';
import { hitCompleteTask } from '../../../redux/CompleteTaskSlice';

const NotCompleteTask = ({navigation, route}) => {
  const {taskId,orgId} = route.params;

  const dispatch = useDispatch();

  const [task, setTask] = useState(null);
    const [isExpand, setExpand] = useState(false);

  const responseTask = useSelector(state => state.readTaskReducer.data);
  const comletedTask = useSelector(state => state.completeTaskReducer.value);

  useEffect(() => {
    const payload = {
      id: orgId,
      taskId: taskId,
    };

    dispatch(hitReadTasks(payload));
  }, []);

  useEffect(() => {
    if (responseTask) {
      console.log('Response Task Data ===> ', responseTask);
      setTask(responseTask);
      // Handle the response data here
    }
    return()=>{
      dispatch(clearReadTasks())
    }
    
  }, [responseTask]);

  const [swiped, setSwiped] = useState(false);

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setSwiped(false);
      },
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx > 50) {
          setSwiped(true);
        }
      },
      onPanResponderRelease: () => {
        if (swiped) {
          console.log('Swipe completed!');
          // Add your logic here for when the swipe is completed
        }
      },
    }),
  );

    const handleCopy = (text) => {
      Clipboard.setString(text);
      if (Platform.OS === 'android') {
        ToastAndroid.show('Copied to clipboard!', ToastAndroid.SHORT);
      } else {
        Alert.alert('Copied!', 'Text copied to clipboard');
      }
    };
   
    const completedJob = () => {
      const payload = {
        orgId: orgId,
        taskId: taskId
      };
      dispatch(hitCompleteTask(payload))
    }

  return (
    <SafeAreaView style={styles.containerStyle}>
      <View style={styles.headerStyle}>
        <View style={{height: 40, width: 40}}>
          <WhiteBackIcon onPress={() => navigation.goBack()} />
        </View>
        <Text style={styles.usernameStyle}>Tasks</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity style={{marginRight: 5}}>
            <NotificationIcon />
          </TouchableOpacity>
          <TouchableOpacity style={{marginHorizontal: 8}}>
            <CalenderIcon />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
            <MenuIcon />
          </TouchableOpacity>
        </View>
      </View>
      {task != null && (
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: appColors.black,
                fontWeight: '600',
                marginBottom: 4,
                fontSize: 12,
                backgroundColor: '#FFA6D1',
                paddingHorizontal: 10,
                paddingVertical: 2,
                borderRadius: 14,
              }}>
              {task.finished ? 'Completed' : 'Not Completed'}
            </Text>
          </View>
          <Text
            style={{
              color: appColors.black,
              marginTop: 10,
              fontSize: 16,
              letterSpacing: 0.3,
              fontWeight: '600',
              fontSize: 22,
            }}>
            {task.title}
          </Text>
          <View style={{flexDirection: 'row', gap: 20}}>
            <View style={{flexDirection: 'column', marginTop: 10, gap: 6}}>
              <Text
                style={{
                  color: appColors.grey,
                  fontSize: 12,
                  fontWeight: '600',
                }}>
                Created:
              </Text>
              <Text
                style={{
                  paddingVertical: 4,
                  backgroundColor: appColors.lightGrey,
                  paddingHorizontal: 8,
                  borderRadius: 16,
                  color: appColors.black,
                  fontWeight: '600',
                  fontSize: 12,
                }}>
               {moment.unix(parseInt(task.created, 10)).format('DD.MM.YYYY')}
              </Text>
            </View>
            <View style={{flexDirection: 'column', marginTop: 10, gap: 6}}>
              <Text
                style={{
                  color: appColors.grey,
                  fontSize: 12,
                  fontWeight: '600',
                }}>
                Due Date:
              </Text>
              <Text
                style={{
                  paddingVertical: 4,
                  backgroundColor: appColors.lightGrey,
                  paddingHorizontal: 8,
                  borderRadius: 16,
                  color: appColors.black,
                  fontWeight: '600',
                  fontSize: 12,
                }}>
                {moment.unix(parseInt(task.due_date, 10)).format('DD.MM.YYYY')}
              </Text>
            </View>
          </View>

          <View style={styles.descriptionCardStyle}>
          <Text
            style={{
              marginBottom: 8,
              color: appColors.placeholderColor,
              fontSize: 13,
            }}>
            Description:
          </Text>
          <Text
            style={{
              color: appColors.black,
              fontSize: 14,
              fontFamily: 'sf_medium',
              width: '90%',
              marginBottom: 2,
              overflow: isExpand ? 'hidden' : 'visible',
              height: isExpand ? 'auto' : '80',
            }}>
            {task.description}
          </Text>
          <View
            style={{
              marginTop: 10,
              alignItems: 'flex-end',
              position: 'absolute',
              right: 16,
              top: 12,
            }}>
            <Pressable
              onPress={()=>handleCopy(task.description)}
              style={({pressed}) => ({
                opacity: pressed ? 0.6 : 1,
              })}>
              <CopyIcon width={16} height={16} />
            </Pressable>
          </View>
          <TouchableOpacity
            onPress={() => setExpand(!isExpand)}
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              paddingVertical: 12,
              width: '32%',
              justifyContent: 'center',
              borderRadius: 22,
              borderColor: appColors.lightGrey,
              marginTop: 18,
            }}>
            <ExpandIcon />
            <Text style={{fontSize: 13, fontWeight: '600', marginLeft: 6}}>
              Expand
            </Text>
          </TouchableOpacity>
        </View>
          {task!=null && !task.finished&&<View style={styles.containerInner}>
          <SwipeButton
            width={"90%"}
            title="Swipe to Complete"
            titleStyles={{
              fontWeight: '700',
              marginLeft: 30,
            }}
            thumbIconBackgroundColor={appColors.darkYellow}
            thumbIconWidth={50}
            thumbIconBorderColor={appColors.darkYellow}
            railBackgroundColor={appColors.black}
            railFillBackgroundColor={appColors.black}
            railFillBorderColor={appColors.black}
            railBorderColor={appColors.white}
            disabledRailBackgroundColor={true}
            // resetAfterSuccessAnimDelay={1000}
            thumbIconComponent={RightArrowJobStart}
            titleColor={appColors.white}
            titleFontSize={16}
            thumbIconStyles={{
              borderRadius: 50,
            }}
            railStyles={{
              backgroundColor: appColors.black,
              flex: 1,
              justifyContent: 'center',
            }}
            onSwipeSuccess={completedJob}
          />
        </View>}

          {/* <TouchableOpacity onPress={() => navigation.navigate('CompleteTask')}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View {...panResponder.panHandlers} style={styles.swipeButton}>
                  <View style={styles.arrowContainer}>
                    <Text style={styles.arrow}>→</Text>
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>Swipe for Done</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity> */}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default NotCompleteTask;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: appColors.white,
    paddingHorizontal: 16,
  },
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  usernameStyle: {
    color: appColors.black,
    fontFamily: 'SF-Pro',
    fontWeight: '700',
    fontSize: 16,
  },
  descriptionCardStyle: {
    borderWidth: 1,
    borderColor: appColors.grey,
    padding: 20,
    borderRadius: 24,
    marginVertical: 20,
  },
  swipeButton: {
    backgroundColor: appColors.black,
    padding: 0,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },
  arrowContainer: {
    backgroundColor: appColors.yellow,
    padding: 10,
    borderRadius: 35,
    marginRight: 20,
  },
  arrow: {
    fontSize: 26,
    marginBottom: 6,
    paddingHorizontal: 6,
    fontWeight: 'bold',
    color: appColors.black,
  },
  text: {
    color: '#FFF',
    fontSize: 16,
  },
  containerInner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
  },
});
