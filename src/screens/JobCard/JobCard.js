import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import React, {use, useEffect, useState} from 'react';
import {appColors} from '../../utils/appColors';
import WhiteBackIcon from '../../assets/svg/WhiteBackIcon';
import CalenderIcon from '../../assets/svg/CalenderIcon';
import MenuIcon from '../../assets/svg/MenuIcon';
import NotificationIcon from '../../assets/svg/NotificationIcon';
import SettingIcon from '../../assets/svg/SettingIcon';
import CopyIcon from '../../assets/svg/CopyIcon';
import ExpandIcon from '../../assets/svg/ExpandIcon';
// import Map2 from '../../assets/svg/Map2';
import DocumentIcon from '../../assets/svg/DocumentIcon';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  hitAcceptJobs,
  hitDeclineJobs,
} from '../../redux/JobsAcceptDeclineSlice';
import MapIcon from '../../assets/svg/MapIcon';
import Clipboard from '@react-native-clipboard/clipboard';
import LocationTracker from '../../components/LocationTracker';
import {BlurView} from '@react-native-community/blur';
import CrossCloseIcon from '../../assets/svg/CrossCloseIcon';
import TimeTrackerCard from '../../components/TimeTrackerCard';
import moment from 'moment';
import ChatIconJob from '../../assets/svg/ChatIconJob';
import {increment} from '../../redux/TimerSlice';
const JobCard = ({navigation, route}) => {
  const [showTracker, setShowTracker] = useState(true);
  const {data} = route.params;
  const dispatch = useDispatch();
  const [orgId, setOrgId] = useState('');
  const [isAccept, setAccept] = useState(false);
  const [isDecline, setDecline] = useState(false);
  const [reason, setReason] = useState(false);
  let text = data.long_description;
  const [isJobStarted, setIsJobStarted] = useState(false);
  const [isExpand, setExpand] = useState(false);
  const timer = useSelector(state => state.timer.value);

  const responseAccDec = useSelector(
    state => state.jobsAcceptDeclineReducer.data,
  );

  const getOrgId = async () => {
    const orgId = await AsyncStorage.getItem('orgId');
    setOrgId(orgId);
  };

  const onAccept = () => {
    const payload = {
      orgId: orgId,
      jobId: data.id,
    };
    console.log('Payload Accept ===> ', payload);
    dispatch(hitAcceptJobs(payload));
  };

  const onDecline = () => {
    setDecline(false);
    const payload = {
      orgId: orgId,
      jobId: data.id,
      message: reason,
    };
    dispatch(hitDeclineJobs(payload));
  };
  useEffect(() => {
    getOrgId();
    // setTimer(0);
  }, []);

  useEffect(() => {
    console.log('timer', timer);
    if (data.action_status == 1) {
      setIsJobStarted(true);
    } else {
      setIsJobStarted(false);
    }
    // return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let interval
    if (isJobStarted) {
      interval = setInterval(() => {
        dispatch(increment());
      }, 1000);
    } else {
      if (isJobStarted == false) {
        clearInterval(interval);
      }
    }
  }, [isJobStarted]);
  // const getTimer = async () => {
  //   const timer = await AsyncStorage.getItem('timer');
  //   console.log('Timer', timer);
  //   setTimer(timer.parseInt());

  // }
  const handleCopy = () => {
    Clipboard.setString(text);
    if (Platform.OS === 'android') {
      ToastAndroid.show('Copied to clipboard!', ToastAndroid.SHORT);
    } else {
      Alert.alert('Copied!', 'Text copied to clipboard');
    }
  };

  useEffect(() => {
    console.log('Response ACC Dec', responseAccDec);
    if (responseAccDec != null) {
      if (responseAccDec.status == 'Ok') {
        setAccept(false);
        // navigation.navigate('JobCardConfirmButton');
      } else {
        setAccept(false);
        Alert.alert('MeMate', 'Internal server error');
      }
    }
  }, [responseAccDec]);

  return (
    <SafeAreaView style={styles.containerStyle}>
      <View style={styles.headerStyle}>
        <View style={{height: 40, width: 40}}>
          <WhiteBackIcon onPress={() => navigation.goBack()} />
        </View>
        <Text style={styles.usernameStyle}>Job Card</Text>
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
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        {data.action_status == 1 || data.action_status == 2 ? (
          <LocationTracker
            setIsJobStarted={setIsJobStarted}
            isJobStarted={isJobStarted}
            data={data}
            orgId={orgId}
            showTracker={showTracker}
            setShowTracker={setShowTracker}
            timer={timer}
          />
        ) : (
          ''
        )}
        {isJobStarted || data.action_status == 1 || data.action_status == 2 ? (
          <TimeTrackerCard
            data={data}
            setIsJobStarted={setIsJobStarted}
            isJobStarted={isJobStarted}
            showTracker={showTracker}
            timer={timer}
          />
        ) : (
          <View style={styles.headerViewStyle}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: appColors.yellow,
                alignItems: 'center',
                borderRadius: 16,
                paddingHorizontal: 1,
                marginLeft: 12,
              }}>
              <Text
                style={{
                  paddingLeft: 8,
                  paddingVertical: 4,
                  paddingHorizontal: 4,
                  color: appColors.black,
                  fontFamily: 'sf-pro-text-semibold',
                  fontWeight: '600',
                  fontSize: 11,
                }}>
                {data.time_type_text}
              </Text>
              <View
                style={{
                  borderTopRightRadius: 12,
                  borderBottomRightRadius: 12,
                  backgroundColor: appColors.white,
                  paddingVertical: 1,
                  marginLeft: 4,
                }}>
                <Text
                  style={{
                    marginLeft: 2,
                    marginRight: 2,
                    paddingBottom: 1,
                    paddingTop: 1,
                    paddingHorizontal: 4,
                    fontFamily: 'sf-pro-text-semibold',
                    fontWeight: '600',
                    fontSize: 11,
                  }}>
                  {data.type_text}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <SettingIcon width={20} height={20} />
              <Text style={styles.headerTextStyle}>{data.status_text}</Text>
            </View>
          </View>
        )}

        <Text
          style={{
            color: appColors.black,
            fontSize: 12,
            fontFamily: 'sf-pro-text-semibold',
            fontWeight: '600',
            marginBottom: 10,
            marginLeft: 12,
          }}>
          {data.number}
        </Text>

        <Text style={styles.headStyle}>{data.short_description}</Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 15,
            marginBottom: 20,
          }}>
          <View>
            <Text
              style={{
                fontSize: 13,
                marginLeft: 5,
                marginLeft: 20,
                color: appColors.placeholderColor,
                marginBottom: 8,
              }}>
              Start date:
            </Text>
            <View
              style={{
                paddingVertical: 4,
                backgroundColor: appColors.offWhite,
                paddingHorizontal: 8,
                borderRadius: 16,
                marginLeft: 12,
              }}>
              <Text
                style={{
                  //   marginTop: 4,
                  color: appColors.black,
                  fontWeight: '600',
                  fontSize: 13,
                  //   marginLeft: 12,
                }}>
                {new Date(data.start_date * 1000)
                  .toLocaleDateString('en-GB')
                  .replace(/\//g, '.')}{' '}
                {'  '}
                <Text
                  style={{
                    color: appColors.placeholderColor,
                    fontSize: 13,
                    fontFamily: 'sf-pro-text-semibold',
                  }}>
                  {moment.unix(data.start_date).format('HH:mm')}
                </Text>
              </Text>
            </View>
          </View>

          <View>
            <Text
              style={{
                fontSize: 13,
                marginLeft: 5,
                marginLeft: 20,
                color: appColors.placeholderColor,
                marginBottom: 8,
              }}>
              Finish date:
            </Text>
            <View
              style={{
                paddingVertical: 4,
                backgroundColor: appColors.offWhite,
                paddingHorizontal: 8,
                borderRadius: 16,
                marginLeft: 12,
              }}>
              <Text
                style={{
                  backgroundColor: appColors.offWhite,
                  borderRadius: 16,
                  color: appColors.black,
                  fontWeight: '600',
                  fontSize: 13,
                }}>
                {new Date(data.end_date * 1000)
                  .toLocaleDateString('en-GB')
                  .replace(/\//g, '.')}{' '}
                {'  '}
                <Text
                  style={{
                    color: appColors.placeholderColor,
                    fontSize: 13,
                    fontFamily: 'sf-pro-text-semibold',
                  }}>
                  {moment.unix(data.end_date).format('HH:mm')}
                </Text>
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.blackCardStyle}>
          <View>
            <Text style={styles.timePaymentStyle}>Time</Text>
            <Text style={styles.cardHoursStyle}>
              {data.duration}
              {data.type_text === 'Hours' ? 'h' : ''}
            </Text>
          </View>
          <View>
            <Text style={styles.timePaymentStyle}>Payment</Text>
            <Text style={styles.cardHoursStyle}>${data.cost}</Text>
          </View>
          <View>
            <Text style={styles.timePaymentStyle}>Variations</Text>
            <Text style={styles.cardHoursStyle}>$50.00st</Text>
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
            {data.long_description}
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
              onPress={handleCopy}
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

        <Text
          style={{
            color: appColors.placeholderColor,
            marginLeft: 16,
            marginBottom: 6,
          }}>
          Job Location:
        </Text>
        <Text
          style={{
            color: appColors.black,
            marginTop: 4,
            marginLeft: 16,
            marginBottom: 16,
            width: '80%',
            fontSize: 14,
            fontFamily: 'sf_medium',
            fontWeight: 400,
          }}>
          {data.address}
        </Text>
        <View style={{position: 'absolute', right: 10, bottom: 144}}>
          <MapIcon />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: appColors.placeholderColor, marginLeft: 16}}>
            Documents Attached{' '}
          </Text>
          <View
            style={{
              backgroundColor: appColors.placeholderColor,
              paddingHorizontal: 5,
              borderRadius: 50,
              marginLeft: 2,
            }}>
            <Text
              style={{
                color: appColors.white,
                fontSize: 12,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              1
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            gap: 4,
            marginTop: 12,
            paddingBottom: 15,
            borderColor: appColors.lightGrey,
            // borderBottomWidth: 1,
            marginLeft: 16,
          }}>
          <DocumentIcon width={18} height={18} />
          <Text style={{color: appColors.black}}>Brief.pdf</Text>
        </View>
        <Text
          style={{
            borderColor: appColors.lightGrey,
            borderBottomWidth: 1,
          }}></Text>
        <View>
          <Text style={{fontSize: 20, fontWeight: '600', marginTop: 20}}>
            Images
          </Text>
        </View>
      </ScrollView>
      <View style={{alignItems: 'flex-end', marginBottom: 20}}>
        <Text
          style={{
            marginTop: 4,
            borderBottomWidth: 1,
            borderColor: appColors.black,
            color: appColors.black,
            textDecorationLine: 'underline',
            fontSize: 12,
            fontWeight: '500',
          }}>
          History Log
        </Text>
      </View>
      {data.status_text !== 'Accepted' ? (
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            marginBottom: 10,
            paddingTop: 16,
          }}>
          <Text style={styles.declineButton} onPress={() => setDecline(true)}>
            Decline
          </Text>
          <Text style={styles.confirmButton} onPress={() => setAccept(true)}>
            Confirm
          </Text>
          {/* navigation.navigate('JobCardConfirmButton') */}
        </View>
      ) : (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            gap: 10,
            marginBottom: 10,
            paddingTop: 16,
            backgroundColor: appColors.black,
            padding: 12,
            borderRadius: 32,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ChatIconJob />
          <Text style={styles.ChatButton}>Start Chat</Text>
        </TouchableOpacity>
      )}
      <Modal
        // animationType="slide"
        transparent={true}
        visible={isAccept}
        onRequestClose={() => {
          setAccept(!isAccept);
        }}>
        <BlurView
          blurType="light"
          blurAmount={50}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'rgba(193, 186, 186, 0.92)',
          }}>
          <View
            style={{
              width: '80%',
              backgroundColor: appColors.black,
              borderRadius: 32,
              padding: 20,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                marginBottom: 24,
                marginTop: 10,
                color: appColors.white,
              }}>
              Confirm the Job
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                marginBottom: 10,
                gap: 8,
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: appColors.black,
                  borderRadius: 50,
                  flex: 1,
                  borderWidth: 1,
                  borderColor: appColors.white,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 10,
                }}
                onPress={() => {
                  setAccept(false);
                  onAccept();
                }}>
                <Text
                  style={{
                    color: appColors.white,
                    textAlign: 'center',
                    fontSize: 16,
                    fontWeight: '500',
                  }}>
                  Decline
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: appColors.white,
                  borderRadius: 50,
                  flex: 1,
                  borderWidth: 1,
                  borderColor: appColors.black,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 10,
                }}
                onPress={() => onAccept()}>
                <Text
                  style={{
                    color: appColors.black,
                    textAlign: 'center',
                    fontSize: 16,
                    fontWeight: '500',
                  }}>
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              setAccept(false);
              setDecline(false);
            }}
            style={styles.CrossIcon}>
            <CrossCloseIcon />
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        transparent={true}
        visible={isDecline}
        onRequestClose={() => {
          setAccept(false);
        }}>
        <BlurView
          blurType="light"
          blurAmount={50}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              width: '80%',
              backgroundColor: appColors.black,
              borderRadius: 32,
              padding: 20,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                marginBottom: 16,
                color: appColors.white,
                paddingVertical: 8,
              }}>
              Reason to decline a job
            </Text>
            <TextInput
              style={{
                height: 100,
                width: '100%',
                borderColor: appColors.borderLightGrey,
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                textAlignVertical: 'top',
                marginBottom: 16,
                backgroundColor: appColors.inputColor,
                color: appColors.white,
              }}
              placeholder="Enter your reason here..."
              placeholderTextColor={appColors.placeholderColor}
              multiline={true}
              onChangeText={text => setReason(text)}
              value={reason}
            />
            <TouchableOpacity
              style={{
                backgroundColor: appColors.black,
                paddingVertical: 12,
                paddingHorizontal: 20,
                borderRadius: 10,
                width: '100%',
                alignItems: 'center',
              }}
              onPress={() => {
                setAccept(false);
              }}>
              <Text
                style={{
                  color: appColors.black,
                  fontSize: 16,
                  backgroundColor: appColors.white,
                  paddingVertical: 12,
                  paddingHorizontal: 60,
                  borderRadius: 50,
                }}
                onPress={() => onDecline()}>
                Send
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              setAccept(false);
              setDecline(false);
            }}
            style={styles.CrossIcon}>
            <CrossCloseIcon />
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default JobCard;

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
    fontWeight: '600',
    fontSize: 16,
  },
  headerViewStyle: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTextStyle: {
    fontSize: 12,
    fontWeight: '600',
    color: appColors.black,
    fontFamily: 'sf-pro-text-semibold',
  },
  headStyle: {
    fontSize: 26,
    fontWeight: '600',
    color: appColors.black,
    marginBottom: 15,
    width: '90%',
    marginLeft: 12,
  },
  blackCardStyle: {
    backgroundColor: appColors.black,
    paddingHorizontal: 14,
    paddingVertical: 22,
    borderRadius: 28,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  timePaymentStyle: {
    color: appColors.grey,
    marginBottom: 4,
    fontFamily: 'sf_medium',
    fontSize: 14,
  },
  cardHoursStyle: {
    fontSize: 20,
    color: appColors.white,
    fontWeight: '600',
  },
  descriptionCardStyle: {
    borderWidth: 1,
    borderColor: appColors.black,
    padding: 20,
    borderRadius: 24,
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: appColors.black,
    color: appColors.white,
    fontSize: 16,
    fontWeight: '600',
    borderWidth: 1,
    borderColor: appColors.black,
    flex: 1,
    textAlign: 'center',
    padding: 12,
    borderRadius: 20,
    overflow: 'hidden',
  },
  ChatButton: {
    color: appColors.white,
    fontSize: 16,
    fontWeight: '800',
  },
  declineButton: {
    backgroundColor: appColors.white,
    color: appColors.black,
    fontSize: 16,
    borderWidth: 1,
    fontWeight: '600',
    borderColor: appColors.black,
    flex: 1,
    textAlign: 'center',
    padding: 12,
    borderRadius: 20,
    overflow: 'hidden',
  },
  CrossIcon: {
    width: 40,
    backgroundColor: appColors.white,
    height: 40,
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 16,
  },
});
