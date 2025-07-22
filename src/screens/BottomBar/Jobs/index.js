import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {use, useEffect, useRef, useState} from 'react';
import {appColors} from '../../../utils/appColors';
import WhiteBackIcon from '../../../assets/svg/WhiteBackIcon';
import CalenderIcon from '../../../assets/svg/CalenderIcon';
import MenuIcon from '../../../assets/svg/MenuIcon';
import NotificationIcon from '../../../assets/svg/NotificationIcon';
import ClockIcon from '../../../assets/svg/ClockIcon';
import MapMarkerIcon from '../../../assets/svg/MapMarkerIcon';
import StatusIcon from '../../../assets/svg/StatusIcon';
import AllJobsIcon from '../../../assets/svg/AllJobsIcon';
import {SafeAreaView} from 'react-native-safe-area-context';
import PinkDot from '../../../assets/svg/PinkDot';
// import GradientBackground from '../../../components/GradientBackgound';
import LinearGradient from 'react-native-linear-gradient';
import WhiteDot from '../../../assets/svg/WhiteDot';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {clearJobsData, getJobs} from '../../../redux/GetJobsSlice';
import {useIsFocused} from '@react-navigation/native';
import JobFilterModal from '../../../components/JobFilterModal';
import moment from 'moment';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const JobsScreen = ({navigation, route}) => {
  const {isWhiteDot, from} = route.params;

  const flatListRef = useRef(null);

  const gloabllyOrgData = useSelector(
    state => state.globalReducer.globallyOrgData,
  );

  const [active, setInActive] = useState(0);
  const [isWhitDot, setWhiteDot] = useState(-1);

  const [isFiltersVisible, setFilterVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [jobsData, setJobsData] = useState(null);
  const [inProgressLength, setInProgressLength] = useState(0);
  const [loading, setLoading] = useState(true);

  const isFocused = useIsFocused();
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextUrl, setNextUrl] = useState('');

  const [filterData, setFilterData] = useState([
    {status: '0', name: 'All Jobs', count: 0},
    {status: '2', name: 'Require Confirmation', count: 0},
    {status: 'a', name: 'Confirmed Jobs', count: 0},
    {status: '3', name: 'Waiting for Approval', count: 0},
    {status: 'p', name: 'Job In Progress', count: 0},
    {status: '1', name: 'Open Jobs', count: 0},
    // {status: '6', name: 'Declined Jobs', count: 0},
  ]);

  const statusMap = {
    1: 'Open Jobs',
    2: 'Require Confirmation',
    3: 'Waiting for Approval',
    p: 'Job In Progress',
    5: 'Completed',
    6: 'Declined Jobs',
    a: 'Confirmed Jobs',
    d: 'Declined', // Note: Declined does not exist in your `filterData` array
  };

  const dispatch = useDispatch();
  const responseJobs = useSelector(state => state.getJobsReducer.data);

  const getJob = async () => {
    const orgId = gloabllyOrgData ? gloabllyOrgData.id : null;
    const payload = {
      id: orgId,
      offset: 0,
      status:
        filterData[isWhitDot].status == 'p'
          ? 'a'
          : filterData[isWhitDot].status, // For Job In Progress, we want to filter by status 'a' (active)
      action_status: isWhitDot == 4 ? '1,2' : '', // For Job In Progress, we want to filter by action_status 1 and 2
    };
    console.log(' payload Get Jobs===> ', payload);
    dispatch(getJobs(payload));
  };

  useEffect(() => {
    if (isFocused) {
      if (from !== undefined) {
        setWhiteDot(isWhiteDot);
        console.log('isWhitDot ===> ', isWhitDot, isWhiteDot, from);
        if (isWhitDot == isWhiteDot) {
          getJob();
        }
        // setLoading(true);

        // setInActive(!active);
        // scrollToSelectedIndex(isWhitDot);
        // getJob();
        navigation.setParams({
          isWhiteDot: undefined,
          from: undefined,
        });
      } else {
        console.log('isWhitDot ===> ', isWhitDot, isWhiteDot);
        if (isWhitDot == -1) {
          setWhiteDot(0);
        } else {
          getJob();
        }
      }
    }
  }, [isFocused]);

  useEffect(() => {
    setLoading(true);
    console.log('Loading ===> ', 'Loading');
    // setInActive(!active);
    // scrollToSelectedIndex(isWhitDot);
    getJob();
  }, [isWhitDot]);

  useEffect(() => {
    if (responseJobs != null && responseJobs.status == 'OK') {
      console.log('responseJobs ===>', responseJobs);
      setNextUrl(responseJobs.next);
      setLoading(false);
      if (
        filterData[isWhitDot == -1 ? 0 : isWhitDot].status == 0 &&
        isWhitDot != 0
      ) {
        const inProgressData = responseJobs.results.filter(
          item =>
            (String(item.action_status) === '1' ||
              String(item.action_status) === '2') &&
            item.status === 'a',
        );
        if (loadingMore) {
          setJobsData(prevData => [...prevData, ...inProgressData]);
        }else {
        setJobsData(inProgressData);
        }
        setLoadingMore(false);
      } else if (filterData[isWhitDot].status == 'a') {
        const comfiredJobData = responseJobs.results.filter(
          item => item.status === 'a' && item.action_status === null,
        );
        if (loadingMore) {
          setJobsData(prevData => [...prevData, ...comfiredJobData]);
        }else {
        setJobsData(comfiredJobData);
        }
        setLoadingMore(false);
      } else {
        if (loadingMore) {
          setJobsData(prevData => [...prevData, ...responseJobs.results]);
        }else {
        setJobsData(responseJobs.results);
        }
        setLoadingMore(false);
      }
      const updatedData = filterData.map(item => ({...item, count: 0}));

      responseJobs.summary.forEach(item => {
        const statusName = statusMap[item.status];
        const filterItem = updatedData.find(fd => fd.name === statusName);
          if (filterItem) {
            if (filterItem.status == 'a') {
              const cmfLength = responseJobs.summary[4].total-responseJobs.summary[5].total;
              filterItem.count = cmfLength;
            } else {
              filterItem.count = item.total;
            }
          }
      });

      const totalJobs = responseJobs.summary
        .filter(item => item.name !== 'All Jobs')
        .reduce(
          (sum, item) =>
            sum + (item.status == 'p' || item.status == '4' ? 0 : item.total),
          0,
        );

      const allJobsItem = updatedData.find(fd => fd.name === 'All Jobs');
      if (allJobsItem) {
        allJobsItem.count = totalJobs;
      }

      // if (isWhitDot == 0) {
      //   const inProgressData = responseJobs.results.filter(
      //     item =>
      //       (String(item.action_status) === '1' ||
      //         String(item.action_status) === '2') &&
      //       item.status === 'a',
      //   );

      //   const inProgressJobsItem = updatedData.find(
      //     fd => fd.name === 'Job In Progress',
      //   );

      //   if (inProgressJobsItem) {
      //     setInProgressLength(inProgressData.length);
      //     inProgressJobsItem.count = inProgressData.length;
      //   }

      //   // console.log('IN Progress Data ====> ', inProgressData);
      // }

      setFilterData(updatedData);

      dispatch(clearJobsData());
    }
  }, [responseJobs]);

  const onClose = () => {
    setFilterVisible(false);
  };

  const onItemSelect = index => {
    setSelectedFilter(prevItems => {
      if (prevItems.includes(index)) {
        // Remove the item if it already exists in the array
        return prevItems.filter(item => item !== index);
      } else {
        // Add the item if it doesn't already exist in the array
        return [...prevItems, index];
      }
    });
    // setSelectedFilter(index)
  };

  // const scrollToSelectedIndex = index => {
  //   if (flatListRef.current && index >= 0 && index < filterData.length) {
  //     flatListRef.current.scrollToIndex({
  //       index,
  //       animated: true,
  //       viewPosition: 0.5,
  //     });
  //   }
  // };
  // useEffect(() => {

  // }, [isWhitDot]);
  // console.log(item)
  return (
    <SafeAreaView style={styles.containerStyle}>
      <View style={styles.headerStyle}>
        <View style={{height: 40, width: 40}}>
          <WhiteBackIcon onPress={() => navigation.goBack()} />
        </View>
        <Text style={styles.usernameStyle}>Jobs</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity>
            <NotificationIcon />
          </TouchableOpacity>
          <TouchableOpacity style={{marginHorizontal: 5}}>
            <CalenderIcon />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
            <MenuIcon />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.headStyle}>Jobs</Text>
      <View>
      <FlatList
        ref={flatListRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={filterData}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => setWhiteDot(index)}
            style={{
              width: 136,
              height: 106,
              justifyContent: 'center',
              marginLeft: 4,
            }}>
            <LinearGradient
              colors={
                isWhitDot == index
                  ? ['#1AB2FF', '#FFB258']
                  : [appColors.white, appColors.white]
              } // Define gradient colors
              start={{x: 0, y: 0}} // Top-left corner
              end={{x: 1, y: 1}} // Bottom-right corner (Diagonal direction)
              style={{
                flex: 1,
                borderRadius: 25,
                // paddingHorizontal: 16,
                // paddingVertical: 16,
                borderWidth: 1,
                borderColor: appColors.lightGrey,
                // justifyContent: 'center',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    color:
                      isWhitDot == index ? appColors.white : appColors.black,
                    paddingRight: 10,
                    fontSize: 24,
                    fontWeight: '500',
                    paddingLeft: 10,
                    paddingTop: 16,
                  }}>
                  {item.count}
                </Text>
                {isWhitDot == index ? (
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'flex-end',
                      padding: 16,
                    }}>
                    <WhiteDot height={6} width={6} />
                  </View>
                ) : (
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'flex-end',
                      padding: 16,
                    }}>
                    <PinkDot height={6} width={6} />
                  </View>
                )}
              </View>

              <Text
                style={{
                  fontSize: 14,
                  marginTop: 7,
                  fontFamily: 'sf-pro-text-semibold',
                  fontWeight: 600,

                  color: isWhitDot == index ? appColors.white : appColors.black,
                  // width: "70%"
                  paddingHorizontal: 8,
                }}>
                {item.name}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      />
      </View>
     

      <View style={{flex: 1}}>
        <View
          style={{
            marginTop: 15,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              color: appColors.black,
              marginLeft: 16,
              paddingBottom:8,
              fontFamily: 'sf-pro-text-semibold',
            }}>
            {filterData[isWhitDot == -1 ? 0 : isWhitDot].name}
          </Text>
          {/* <TouchableOpacity onPress={() => setFilterVisible(true)}>
            <AllJobsIcon width={40} height={40} />
          </TouchableOpacity> */}
        </View>
        <View style={{marginBottom: 120}}>
          {loading
            ? Array.from({length: 5}).map((_, index) => (
                <ShimmerPlaceholder
                  key={index}
                  LinearGradient={LinearGradient}
                  style={{
                    height: 230,
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
            : jobsData != null && (
                <FlatList
                showsVerticalScrollIndicator={false}
                  data={jobsData}
                  keyExtractor={(item, index) =>
                    item.id?.toString() ?? index.toString()
                  }
                  renderItem={({item}) => (
                    <TouchableOpacity
                      key={item.id}
                      style={styles.shiftCard}
                      onPress={() =>
                        navigation.navigate('JobCard', {data: item})
                      }>
                      <View style={styles.viewStyle}>
                        <View style={styles.headerViewStyle}>
                          <View
                            style={{
                              flexDirection: 'row',
                              backgroundColor:
                                item.time_type == '1'
                                  ? appColors.lightGreen
                                  : item.time_type == 'T'
                                  ? appColors.yellow
                                  : appColors.lightPurple,
                              alignItems: 'center',
                              borderRadius: 16,
                              borderRadius: 16,
                              marginTop: 8,
                            }}>
                            <Text
                              style={{
                                paddingLeft: 8,
                                paddingVertical: 3,
                                color: appColors.black,
                                fontFamily: 'SF-Pro-Text-Semibold',
                                borderRadius: 16,
                                fontSize: 11,
                                fontWeight: '600',
                              }}>
                              {item.time_type_text}
                            </Text>
                            <View
                              style={{
                                backgroundColor: appColors.white,
                                marginLeft: 4,
                                marginRight: 1,
                                borderTopRightRadius: 8,
                                borderBottomRightRadius: 8,
                                paddingVertical: 2,
                                paddingHorizontal: 6,
                              }}>
                              <Text
                                style={{
                                  fontSize: 11,
                                  fontFamily: 'SF-Pro-Text-Semibold',
                                  fontWeight: '600',
                                }}>
                                {item.type_text}
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'flex-end',
                            }}>
                            <View style={{marginRight: 4}}>
                              <ClockIcon />
                            </View>
                            <Text style={styles.headerTextStyle}>
                              {item.duration}h
                            </Text>
                            <Text
                              style={[styles.headerTextStyle, {marginLeft: 8}]}>
                              ${item.cost}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            height: 1,
                            backgroundColor: appColors.lightGrey,
                            marginHorizontal: 16,
                          }}
                        />
                        <View style={{padding: 16}}>
                          <Text
                            style={{
                              color: appColors.black,
                              fontSize: 10,
                              fontFamily: 'SF-Pro-Text-Semibold',
                              fontWeight: '600',
                            }}>
                            {item.number}
                          </Text>
                          <Text
                            style={[styles.headerTextStyle, {marginTop: 8}]}>
                            {item.short_description}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              marginTop: 8,
                              alignItems: 'center',
                            }}>
                            <MapMarkerIcon />
                            <Text
                              style={{
                                color: appColors.placeholderColor,
                                fontFamily: 'SF-Pro-Text-Semibold',
                                fontWeight: '600',
                                fontSize: 11,
                              }}>
                              {item.address}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <View
                              style={{
                                borderRadius: 12,
                                backgroundColor: appColors.white,
                                marginTop: 8,
                                flexDirection: 'row',
                              }}>
                              <Text
                                style={{
                                  paddingVertical: 4,
                                  paddingHorizontal: 8,
                                  color: appColors.black,
                                  fontWeight: '600',
                                  fontFamily: 'SF-Pro-Text-Semibold',
                                  fontSize: 11,
                                }}>
                                {moment
                                  .unix(parseInt(item.start_date, 10))
                                  .format('DD.MM.YYYY')}
                              </Text>
                              <Text
                                style={{
                                  paddingVertical: 4,
                                  paddingRight: 8,
                                  color: appColors.placeholderColor,
                                  fontWeight: '600',
                                  fontFamily: 'SF-Pro-Text-Semibold',
                                  fontSize: 11,
                                }}>
                                {moment
                                  .unix(parseInt(item.start_date, 10))
                                  .format('HH:mm')}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: 10,
                                backgroundColor: appColors.placeholderColor,
                                height: 1,
                                marginHorizontal: 5,
                                marginTop: 8,
                              }}
                            />
                            <View
                              style={{
                                borderRadius: 12,
                                backgroundColor: appColors.white,
                                marginTop: 8,
                                flexDirection: 'row',
                              }}>
                              <Text
                                style={{
                                  paddingVertical: 4,
                                  paddingHorizontal: 8,
                                  color: appColors.black,
                                  fontWeight: '600',
                                  fontFamily: 'SF-Pro-Text-Semibold',
                                  fontSize: 12,
                                }}>
                                {moment
                                  .unix(parseInt(item.end_date, 10))
                                  .format('DD.MM.YYYY')}
                              </Text>
                              <Text
                                style={{
                                  paddingVertical: 4,
                                  paddingRight: 8,
                                  color: appColors.placeholderColor,
                                  fontWeight: '600',
                                  fontFamily: 'SF-Pro-Text-Semibold',
                                  fontSize: 11,
                                }}>
                                {moment
                                  .unix(parseInt(item.end_date, 10))
                                  .format('HH:mm')}
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              height: 1,
                              backgroundColor: appColors.lightGrey,
                              marginTop: 16,
                            }}
                          />
                          <View
                            style={{
                              flexDirection: 'row',
                              marginTop: 16,
                              alignItems: 'center',
                            }}>
                            <StatusIcon />
                            <Text
                              style={{
                                marginLeft: 8,
                                color: appColors.black,
                                fontFamily: 'SF-Pro-Text-Semibold',
                                fontSize: 12,
                                fontWeight: '600',
                              }}>
                              {item.status == 2
                                ? 'Require Confirmation'
                                : item.status == 3
                                ? 'Waiting for Approval'
                                : item.status == 'a' &&
                                  (item.action_status == 1 ||
                                    item.action_status == 2)
                                ? 'Job In Progress'
                                : item.status == 5
                                ? 'Completed'
                                : item.status == 6
                                ? 'Declined'
                                : item.status == 4
                                ? 'Approved'
                                : item.status == 'a'
                                ? 'Confirmed'
                                : ''}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                  onEndReached={() => {
                    if (!loadingMore) {
                      if (!nextUrl) {
                        return; // No more data to load
                      }
                      setLoadingMore(true);
                      // fetchJobs(page + 1);
                      const payload = {
                        url:nextUrl.replace('http:', 'https:'),
                      }
                      console.log('payload ===> ', payload);
                      dispatch(getJobs(payload));
                    }
                  }}
                  onEndReachedThreshold={0.5}
                  ListFooterComponent={() =>
                    loadingMore ? <ActivityIndicator size="small" color={appColors.primary} style={{marginVertical: 16}} /> : null
                  }
                />
              )}
        </View>

        <JobFilterModal
          visible={isFiltersVisible}
          onClose={onClose}
          filters={filterData}
          onItemSelect={onItemSelect}
          selectedFilter={selectedFilter}
        />
      </View>
    </SafeAreaView>
  );
};

export default JobsScreen;

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
    marginRight: 16,
  },
  headStyle: {
    fontSize: 26,
    fontWeight: '600',
    color: appColors.black,
    marginBottom: 15,
    marginLeft: 10,
  },
  shiftCard: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  titleStyle: {
    color: appColors.black,
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'SF-Pro',
  },
  viewStyle: {
    backgroundColor: appColors.offWhite,
    borderRadius: 16,
    marginTop: 16,
  },
  headerViewStyle: {
    flexDirection: 'row',
    margin: 10,
  },
  headerTextStyle: {
    fontSize: 16,
    fontWeight: '600',
    color: appColors.black,
    fontFamily: 'SF-Pro',
  },
  gradient: {
    flex: 1,
  },
  text: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
});
