import {
  FlatList,
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
import {getJobs} from '../../../redux/GetJobsSlice';
import {useIsFocused} from '@react-navigation/native';
import JobFilterModal from '../../../components/JobFilterModal';
import moment from 'moment';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

const JobsScreen = ({navigation}) => {
  const [active, setInActive] = useState(0);
  const [isWhitDot, setWhiteDot] = useState(0);

  const [isFiltersVisible, setFilterVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [jobsData, setJobsData] = useState(null);

  const [loading, setLoading] = useState(true);

  const isFocused = useIsFocused();

  const [filterData, setFilterData] = useState([
    {status: '0', name: 'All Jobs', count: 0},
    {status: '2', name: 'Require Confirmation', count: 0},
    {status: 'a', name: 'Confirmed Jobs', count: 0},
    {status: '3', name: 'Waiting for Approval', count: 0},
    {status: '4', name: 'Job In Progress', count: 0},
    {status: '1', name: 'Open Jobs', count: 0},
    // {status: '6', name: 'Declined Jobs', count: 0},
  ]);

  const statusMap = {
    1: 'Open Jobs',
    2: 'Require Confirmation',
    3: 'Waiting for Approval',
    4: 'Job In Progress',
    5: 'Completed',
    6: 'Declined Jobs',
    a: 'Confirmed Jobs',
    d: 'Declined', // Note: Declined does not exist in your `filterData` array
  };

  const dispatch = useDispatch();
  const responseJobs = useSelector(state => state.getJobsReducer.data);

  const getJob = async () => {
    const orgId = await AsyncStorage.getItem('orgId');
    setTimeout(() => {
      // console.log('Ord Id ===> ', orgId);
      const payload = {
        id: orgId,
        offset: 0,
        status: filterData[isWhitDot].status,
      };

      dispatch(getJobs(payload));
    }, 1500);
  };

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      getJob();
    }
  }, [isFocused, isWhitDot]);

  useEffect(() => {
    if (responseJobs != null && responseJobs.status == 'OK') {
      console.log('responseJobs ===>', responseJobs);
      setLoading(false);
      setJobsData(responseJobs.results);
      const updatedData = filterData.map(item => ({...item, count: 0}));

      responseJobs.summary.forEach(item => {
        const statusName = statusMap[item.status];
        const filterItem = updatedData.find(fd => fd.name === statusName);
        if (filterItem) {
          filterItem.count = item.total;
        }
      });

      const totalJobs = updatedData
        .filter(item => item.name !== 'All Jobs')
        .reduce((sum, item) => sum + item.count, 0);

      const allJobsItem = updatedData.find(fd => fd.name === 'All Jobs');
      if (allJobsItem) {
        allJobsItem.count = totalJobs;
      }

      setFilterData(updatedData);
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
  useEffect(() => {
    setInActive(!active);
  }, [isWhitDot]);
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
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <Text style={styles.headStyle}>Jobs</Text>

        <FlatList
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

                    color:
                      isWhitDot == index ? appColors.white : appColors.black,
                    // width: "70%"
                    paddingHorizontal: 8,
                  }}>
                  {item.name}
                  {/* <Text style={{textAlign: 'left', color: appColors.black , fontSize: 14, fontFamily: 'sf-pro-text-semibold', fontWeight: 600}}>{item.name}</Text> */}
                  {/* {item.name.split(' ').map((word, index) => (
                     <Text key={index}  style={{textAlign: 'left',fontSize: 14, fontFamily: 'sf-pro-text-semibold', fontWeight: 600}}>{word}</Text>
                   )
                   )} */}
                  {/* <View style={{ flexDirection: 'column', alignItems: 'left'}}>
                    {item.name=='All Jobs' ?  item.name.split(' ').map((word, index) => (
                      <Text key={index} style={{ textAlign: 'left', color: appColors.white , fontSize: 14, fontFamily: 'sf-pro-text-semibold', fontWeight: 600}}>
                        {word}
                      </Text>
                    )) : 
                    <Text style={{textAlign: 'left', color: appColors.black , fontSize: 14, fontFamily: 'sf-pro-text-semibold', fontWeight: 600}}>{item.name}</Text>
                  //   item.name.split(' ').map((word, index) => (
                  //   <Text key={index}  style={{textAlign: 'left', color: appColors.black , fontSize: 14, fontFamily: 'sf-pro-text-semibold', fontWeight: 600}}>{word}</Text>
                  // )
                  // )
                  }
                  </View>                 */}
                </Text>
                {/* <Text
                style={{
                  fontSize: 14,
                  color: active === index ? appColors.white : appColors.black,
                }}>
                Jobs
              </Text> */}
              </LinearGradient>
            </TouchableOpacity>
          )}
        />

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
              fontFamily: 'sf-pro-text-semibold',
            }}>
            All Jobs
          </Text>
          <TouchableOpacity onPress={() => setFilterVisible(true)}>
            <AllJobsIcon width={40} height={40} />
          </TouchableOpacity>
        </View>
        <View style={{marginBottom: 80}}>
          {console.log('Job Data ====> ', jobsData)}
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
            : jobsData != null &&
              jobsData.map((item, index) => (
                <TouchableOpacity
                  style={styles.shiftCard}
                  onPress={() => navigation.navigate('JobCard', {data: item})}>
                  <View style={styles.viewStyle}>
                    <View style={styles.headerViewStyle}>
                      <View
                        style={{
                          flexDirection: 'row',
                          backgroundColor: appColors.lightGreen,
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
                        <Text style={[styles.headerTextStyle, {marginLeft: 8}]}>
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
                        THE-JB-{item.number}
                      </Text>
                      <Text style={[styles.headerTextStyle, {marginTop: 8}]}>
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
                        style={{flexDirection: 'row', alignItems: 'center'}}>
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
                              .unix(parseInt(item.end_date, 10))
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
                              .unix(parseInt(item.start_date, 10))
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
                          {item.status_text}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
        </View>

        <JobFilterModal
          visible={isFiltersVisible}
          onClose={onClose}
          filters={filterData}
          onItemSelect={onItemSelect}
          selectedFilter={selectedFilter}
        />
      </ScrollView>
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
