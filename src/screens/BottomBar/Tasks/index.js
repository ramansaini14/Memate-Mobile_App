import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {appColors} from '../../../utils/appColors';
import WhiteBackIcon from '../../../assets/svg/WhiteBackIcon';
import CalenderIcon from '../../../assets/svg/CalenderIcon';
import MenuIcon from '../../../assets/svg/MenuIcon';
import NotificationIcon from '../../../assets/svg/NotificationIcon';
import AllJobsIcon from '../../../assets/svg/AllJobsIcon';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {hitAllTasks} from '../../../redux/AllTaskSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

const TasksScreen = ({navigation}) => {
  const [active, setInActive] = useState(0);
  const dispatch = useDispatch();
  const isFoucsed = useIsFocused();
  const [oId, setOrgId] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const gloabllyOrgData = useSelector(state => state.globalReducer.globallyOrgData);

  const [tasks, setTasks] = useState(null);

  const responseAllTasks = useSelector(state => state.allTaskReducer.data);

  const getTasks = async () => {
    const orgId = gloabllyOrgData ? gloabllyOrgData.id : 0;
    setOrgId(orgId);
      const payload = {
        id: orgId,
        api:
          active === 0 ? 'all' : active === 1 ? 'not-completed' : 'completed',
      };

      dispatch(hitAllTasks(payload));
  };

  useEffect(() => {
    setLoading(true);
    getTasks();
  }, [isFoucsed, active]);

  useEffect(() => {
    console.log('responseAllTasks ===> ', responseAllTasks);
    if (responseAllTasks) {
      setTasks(responseAllTasks);
      setLoading(false);
    }
  }, [responseAllTasks]);

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
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <Text style={styles.headStyle}>Tasks</Text>

        {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}> */}
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 10,
            gap: 5,
            flex: 1,
            width: '100%',
          }}>
          <TouchableOpacity
            onPress={() => setInActive(0)}
            style={{
              flex: 1,
              flexDirection: 'row',
              backgroundColor: active === 0 ? appColors.black : appColors.white,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 25,
              paddingHorizontal: 12,
              paddingVertical: 10,
              borderColor: active === 0 ? appColors.black : appColors.lightGrey,
              borderWidth: 1,
            }}>
            <Text
              style={{
                backgroundColor:
                  active === 0 ? appColors.black : appColors.white,
                color: active === 0 ? appColors.white : appColors.grey,
                paddingRight: 10,
                fontSize: 12,
              }}>
              All
            </Text>

            <Text
              style={{
                borderWidth: 1,
                fontSize: 12,
                paddingHorizontal: 5,
                paddingVertical: 1,
                borderRadius: 50,
                borderColor: appColors.white,
                color: appColors.white,
                backgroundColor:
                  active === 0 ? appColors.black : appColors.grey,
                textAlign: 'center',
              }}>
              {tasks != null && tasks.count}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setInActive(1)}
            style={{
              flex: 1,
              flexDirection: 'row',
              backgroundColor: active === 1 ? appColors.black : appColors.white,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 25,
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderWidth: 1,
              borderColor: active === 1 ? appColors.black : appColors.lightGrey,
            }}>
            <Text
              style={{
                backgroundColor:
                  active === 1 ? appColors.black : appColors.white,
                color: active === 1 ? appColors.white : appColors.grey,
                paddingRight: 10,
                fontSize: 12,
              }}>
              Not Complete
            </Text>

            <Text
              style={{
                borderWidth: 1,
                fontSize: 12,
                paddingHorizontal: 5,
                borderRadius: 50,
                borderColor: appColors.white,
                color: appColors.white,
                backgroundColor:
                  active === 1 ? appColors.black : appColors.grey,
                textAlign: 'center',
              }}>
              {tasks != null && tasks.not_completed}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setInActive(2)}
            style={{
              flex: 1,
              flexDirection: 'row',
              backgroundColor: active === 2 ? appColors.black : appColors.white,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 25,
              paddingHorizontal: 12,
              paddingVertical: 10,
              borderWidth: 1,
              borderColor: active === 2 ? appColors.black : appColors.lightGrey,
            }}>
            <Text
              style={{
                backgroundColor:
                  active === 2 ? appColors.black : appColors.white,
                color: active === 2 ? appColors.white : appColors.grey,
                paddingRight: 10,
                fontSize: 12,
              }}>
              Complete
            </Text>

            <Text
              style={{
                borderWidth: 1,
                fontSize: 12,
                paddingHorizontal: 5,
                borderRadius: 50,
                borderColor: appColors.white,
                color: appColors.white,
                backgroundColor:
                  active === 2 ? appColors.black : appColors.grey,
                textAlign: 'center',
              }}>
              {tasks != null && tasks.completed}
            </Text>
          </TouchableOpacity>
        </View>
        {/* </ScrollView> */}

        <View
          style={{
            marginTop: 15,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{fontSize: 18, fontWeight: '600', color: appColors.black}}>
            All Tasks
          </Text>
          <AllJobsIcon width={40} height={40} />
        </View>

        {loading
          ? Array.from({length: 5}).map((_, index) => (
              <ShimmerPlaceholder
                key={index}
                LinearGradient={LinearGradient}
                style={{
                  height: 100,
                  width: '100%',
                  borderRadius: 24,
                  marginVertical: 10,
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
          : tasks != null &&
            tasks.results.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate('NotCompleteTask', {
                    taskId: item.id,
                    orgId: oId,
                  })
                }>
                <View style={styles.noteCardStyle}>
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
                      {item.finished ? 'Completed' : 'Not Complete'}
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: appColors.black,
                      marginTop: 10,
                      fontSize: 16,
                      letterSpacing: 0.3,
                    }}>
                    {item.title}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
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
                        backgroundColor: appColors.white,
                        paddingHorizontal: 8,
                        borderRadius: 16,
                        color: appColors.black,
                        fontWeight: '600',
                        fontSize: 12,
                        marginLeft: 6,
                      }}>
                      {moment
                        .unix(parseInt(item.created, 10))
                        .format('DD.MM.YYYY')}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TasksScreen;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: appColors.white,
    padding: 16,
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
  headStyle: {
    fontSize: 20,
    fontWeight: '600',
    color: appColors.black,
    marginBottom: 15,
  },
  headerViewStyle: {
    flexDirection: 'row',
    margin: 10,
  },
  headerTextStyle: {
    fontSize: 16,
    fontWeight: '700',
    color: appColors.black,
    fontFamily: 'SF-Pro',
  },
  noteCardStyle: {
    backgroundColor: appColors.offWhite,
    padding: 14,
    borderRadius: 24,
    borderBottomRightRadius: 0,
    marginTop: 15,
  },
});
