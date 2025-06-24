import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {act, use, useEffect, useState} from 'react';
import {appColors} from '../../../utils/appColors';
import DummyUserIcon from '../../../assets/svg/DummyUserIcon';
import NotificationIcon from '../../../assets/svg/NotificationIcon';
import CalenderIcon from '../../../assets/svg/CalenderIcon';
import MenuIcon from '../../../assets/svg/MenuIcon';
import DollerIcon from '../../../assets/svg/DollerIcon';
import AcceptedIcon from '../../../assets/svg/AcceptedIcon';
import ReportIcon from '../../../assets/svg/ReportIcon';
import RightArrowWhite from '../../../assets/svg/RightArrowWhite';
import PinkRightArrow from '../../../assets/svg/PickRightArrow';
import TaskComponent from '../../../components/TaskComponent';
import {SafeAreaView} from 'react-native-safe-area-context';
import ArrowRight from '../../../assets/svg/ArrowRight';
import DownIcon from '../../../assets/svg/DownIcon';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OrganizationListModal from '../../../components/OrganizationListModal';
import {getOrganization} from '../../../redux/getOrganizationSlice';
import {useIsFocused} from '@react-navigation/native';
import HomeGreenTickSvg from '../../../assets/svg/HomeGreenTickSvg';
import HomeTickIcon from '../../../assets/svg/HomeTickIcon';
import RightArrowHome from '../../../assets/svg/RightArrowHome';
import CherryRightArrow from '../../../assets/svg/CherryRightArrow';
import {reportRead} from '../../../redux/ReportReadSlice';
import PdfIcon from '../../../assets/svg/PdfIcon';
import DownloadPdfIcon from '../../../assets/svg/DownloadPdfIcon';
import CalendarStrip from '../../../components/CalendarStrip';
import {getJobs} from '../../../redux/GetJobsSlice';
import BackIcon from '../../../assets/svg/BackIcon';
import LinearGradient from 'react-native-linear-gradient';
import WhiteDot from '../../../assets/svg/WhiteDot';
import PinkDot from '../../../assets/svg/PinkDot';
import {hitAllTasks} from '../../../redux/AllTaskSlice';
import {selectJobTimer} from '../../../redux/TimerSlice';
import TimerHomePage from '../../../components/TimerHomePage';

// const { height, width } = Dimensions.get("window");

const HomeScreen = ({navigation, route}) => {
  const [active, setInActive] = useState(0);
  const [orgId, setOrgId] = useState('');
  const [isResultReport, setIsResultReport] = useState(true);

  const jobData = useSelector(state => state.globalReducer.jobData);
  const isPaused = useSelector(state => state.globalReducer.isPausedGlobal);
  console.log('Job Data Home===> ', jobData, ' isPaused: ', isPaused);

  const jobTimer = useSelector(state => selectJobTimer(state, jobData?.id));
  const timer = jobTimer ? jobTimer.value : 0;

  const [approvedJobs, setApprovedJobs] = useState(null);
  const [tasks, setTasks] = useState(null);

  const responseAllTasks = useSelector(state => state.allTaskReducer.data);

  const responseOrg = useSelector(state => state.getOrganizationReducer.data);
  const reportReadData = useSelector(state => state.reportReadReducer.data);
  const responseJobs = useSelector(state => state.getJobsReducer.data);
  const [pdfFileName, setPdfFileName] = useState('');
  const dispatch = useDispatch();
  const [orgData, setOrgData] = useState(null);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const isFocused = useIsFocused();

  const [orgVisible, setOrgVisible] = useState(false);

  const onClose = () => {
    setOrgVisible(false);
  };

  const onItemSelect = () => {};

  const [jobs, setJobs] = useState(null);
  const [progressJobs, setProgressJobs] = useState(null);
  const [upcoming, setUpcomingJobs] = useState(null);
  const [isWhitDot, setWhiteDot] = useState(0);

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

  const getReportData = async () => {
    const id = await AsyncStorage.getItem('orgId');
    setTimeout(() => {
      setOrgId(id);
      if (isResultReport) {
        const payload = {
          id: id,
        };
        dispatch(reportRead(payload));
      }
      
      const payload = {
        id: id,
        offset: 0,
        status: "a",
        action_status: '',
      };

      dispatch(getJobs(payload));

      const payload1 = {
        id: id,
        api: 'not-completed',
      };
      dispatch(hitAllTasks(payload1));
    }, 1200);
  };

  // const getJob = async () => {
  //   const orgId = await AsyncStorage.getItem('orgId');
  //   setTimeout(() => {
  //     // console.log('Ord Id ===> ', orgId);

  //   }, 1500);
  // };

  useEffect(() => {
    if (isFocused) {
      dispatch(getOrganization());
      getReportData();
    }
  }, [isFocused,jobData]);

  useEffect(() => {
    // clearToken()
    console.log('OrgData ===> ', responseOrg);
    if (responseOrg != null) {
      setOrgData(responseOrg);
      setSelectedOrg(responseOrg[0]);
    }
  }, [responseOrg]);

  useEffect(() => {
    if (responseJobs != null && responseJobs.status == 'OK') {
      setJobs(responseJobs.results);
      const progJobs = responseJobs.results.filter(
        item => item.action_status === '1' || item.action_status === '2',
      );
      const sortProgJobs = progJobs.sort(
        (a, b) => parseInt(b.start_date) - parseInt(a.start_date), // descending
      );

      console.log('InProgress jobs ===>', sortProgJobs);
      setProgressJobs(sortProgJobs);
      const upJobs = responseJobs.results.filter(
        item => item.status === 'a' && (item.action_status === '0' || item.action_status === null),
      );
      const sortUpJobs = upJobs.sort(
        (a, b) => parseInt(b.start_date) - parseInt(a.start_date), // descending
      );

      console.log('Upcoming jobs ===>', sortUpJobs);
      setUpcomingJobs(sortUpJobs);

      const updatedData = filterData.map(item => ({...item, count: 0}));

      responseJobs.summary.forEach(item => {
        const statusName = statusMap[item.status];
        if (item.status != '4') {
        const filterItem = updatedData.find(fd => fd.name === statusName);
        // console.log('Filter Item ===> ', filterItem);
        filterItem.count = item.total;
        }
      });

      const totalJobs = responseJobs.summary
        .filter(item => item.name !== 'All Jobs')
        .reduce((sum, item) => sum + (item.status=='p'?0:item.total), 0);

      const allJobsItem = updatedData.find(fd => fd.name === 'All Jobs');
      if (allJobsItem) {
        allJobsItem.count = totalJobs;
      }

      if (isWhitDot == 0) {
        const inProgressData = responseJobs.results.filter(
          item =>
            (String(item.action_status) === '1' ||
              String(item.action_status) === '2') &&
            item.status === 'a',
        );

        const inProgressJobsItem = updatedData.find(
          fd => fd.name === 'Job In Progress',
        );

        if (inProgressJobsItem) {
          inProgressJobsItem.count = inProgressData.length;
        }

        // console.log('IN Progress Data ====> ', inProgressData);
      }

      setFilterData(updatedData);
    }
  }, [responseJobs]);

  useEffect(() => {
    console.log('All Tasks Response ===> ', responseAllTasks);
    if (responseAllTasks) {
      setTasks(responseAllTasks.results);
    }
  }, [responseAllTasks]);

  return (
    <SafeAreaView style={styles.containerStyle}>
      <View style={styles.headerStyle}>
        {/* <DummyUserIcon /> */}
        {selectedOrg != null &&
          (isResultReport ? (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => setOrgVisible(true)}>
                <DownIcon height={16} width={16} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setOrgVisible(true)}>
                <Image
                  source={{uri: selectedOrg.logo}}
                  style={{width: 80, height: 40}}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setOrgVisible(true)}>
                <Text
                  style={[styles.smallTextStyleHeader, {width: 120}]}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {selectedOrg.name}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => setIsResultReport(true)}>
                <BackIcon />
              </TouchableOpacity>
            </View>
          ))}
        <View style={styles.right_}>
          <TouchableOpacity>
            <NotificationIcon />
          </TouchableOpacity>

          <TouchableOpacity
            style={{marginHorizontal: 8}}
            // onPress={() => navigation.navigate('Calendar')}
          >
            <CalenderIcon />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
            <MenuIcon />
          </TouchableOpacity>
        </View>
      </View>
      {/* <Header navigation={navigation} /> */}
      {isResultReport ? (
        <ScrollView
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled>
          <View>
            {jobData != null && (
              <TouchableOpacity style={{marginHorizontal: 16}}  onPress={() => navigation.navigate('JobCard', {data: jobData})}>
                <TimerHomePage data={jobData} timer={timer} />
              </TouchableOpacity>
            )}
            <View style={styles.resultViewStyle}>
              <View style={[styles.row_, {justifyContent: 'space-between'}]}>
                <View style={[styles.cardBox, {marginRight: 8}]}>
                  <View style={styles.row_}>
                    <View>
                      <Text style={styles.lightTextStyle2}>Income</Text>
                      <Text style={styles.smallTextStyle}>this Week</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                      <HomeGreenTickSvg />
                    </View>
                  </View>
                  <Text style={[styles.bigTextStyle, {fontSize: 18}]}>
                    {reportReadData != null
                      ? '$' + reportReadData.income.done
                      : '$0.00'}
                  </Text>
                  <Text style={styles.lightTextStyle}>Potential</Text>
                  <Text style={styles.bigTextStyle2}>
                    {reportReadData != null
                      ? '$' + reportReadData.income.potential
                      : '$0.00'}
                  </Text>
                </View>
                <View style={[styles.cardBox, {marginLeft: 8}]}>
                  <View style={styles.row_}>
                    <View>
                      <Text style={styles.lightTextStyle2}>Finished</Text>
                      <Text style={styles.smallTextStyle}>this Week</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                      <HomeTickIcon />
                    </View>
                  </View>

                  <Text style={[styles.bigTextStyle, {fontSize: 18}]}>
                    {reportReadData != null
                      ? reportReadData.finished.done
                      : '0.00'}
                  </Text>
                  <Text style={styles.lightTextStyle}>Accepted</Text>
                  <Text style={styles.bigTextStyle2}>
                    {reportReadData != null
                      ? reportReadData.finished.accepted
                      : '0.00'}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.blackBar}
                onPress={
                  () => setIsResultReport(false)
                  // navigation.navigate('ResultReport', {orgId: orgId})
                }>
                <ReportIcon />
                <View style={{marginHorizontal: 16}}>
                  <Text style={styles.rateTextStyle}>Results Report</Text>
                  <Text style={styles.smallTextStyle2}>see previous weeks</Text>
                </View>
                <View style={{alignItems: 'flex-end', flex: 1}}>
                  <RightArrowWhite />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.tabStyle}>
              <Text
                style={[
                  styles.tabButton,
                  active === 0 && {
                    backgroundColor: appColors.black,
                    color: appColors.white,
                    fontSize: 16,
                    height: 44,
                    borderRadius: 30,
                    paddingVertical: 12,
                  },
                ]}
                onPress={() => setInActive(0)}>
                Jobs
              </Text>
              <Text
                style={[
                  styles.tabButton,
                  active === 1 && {
                    backgroundColor: appColors.black,
                    color: appColors.white,
                    fontSize: 16,
                    height: 44,
                    borderRadius: 30,
                    paddingVertical: 12,
                  },
                ]}
                onPress={() => setInActive(1)}>
                Tasks
              </Text>
            </View>
          </View>

          {active == 0 && (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{marginTop: 16, paddingLeft: 16}}
              data={filterData}
              keyExtractor={item => item.id}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => {
                    setWhiteDot(index);
                    navigation.navigate('Work', {isWhiteDot: index, from: 1});
                  }}
                  style={{
                    width: 136,
                    height: 124,
                    justifyContent: 'center',
                    marginRight: 16,
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
                            isWhitDot == index
                              ? appColors.white
                              : appColors.black,
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
                          isWhitDot == index
                            ? appColors.white
                            : appColors.black,
                        // width: "70%"
                        paddingHorizontal: 8,
                      }}>
                      {item.name}
                    </Text>
                    <View style={{flexDirection: 'row', marginTop: 4}}>
                      <Text
                        style={{
                          fontSize: 12,
                          marginLeft: 8,
                          color:
                            isWhitDot == index
                              ? appColors.white
                              : appColors.placeholderColor,
                          fontSize: 12,
                          fontFamily: 'SF-Pro',
                          fontWeight: '400',
                        }}>
                        {'View Jobs '}
                      </Text>
                      <View style={{marginTop: 4}}>
                        <RightArrowHome
                          fill={
                            isWhitDot == index ? appColors.white : '#75808A'
                          }
                        />
                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            />
          )}

          {active == 0 && (
            <TouchableOpacity
              style={{alignItems: 'flex-end', marginTop: 16}}
              onPress={() => navigation.navigate('Work', {isWhiteDot: 0})}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: appColors.black,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingVertical: 12,
                  paddingHorizontal: 18,
                  borderRadius: 50,
                  marginRight: 8,
                }}>
                <Text
                  style={{
                    color: appColors.white,
                    textAlign: 'center',
                    fontWeight: '700',
                    width: '18%',
                    height: '100%',
                    paddingTop: 2,
                    paddingBottom: 2,
                    paddingRight: 3,
                    fontSize: 14,
                  }}>
                  View All
                </Text>
                <View style={{paddingLeft: 6}}>
                  <CherryRightArrow />
                </View>
              </View>
            </TouchableOpacity>
          )}
          {active == 0 && (
            <Text style={styles.titleStyle}>Jobs in Progress</Text>
          )}
          {active == 0 ? (
            progressJobs != null && progressJobs.length > 0 ? (
              <FlatList
                key={0}
                data={progressJobs}
                horizontal
                style={{paddingHorizontal: 16,flex:1}}
                nestedScrollEnabled
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                  <TouchableOpacity
                  style={{
                    flex: 1,
                    marginRight: 16,
                  }}
                  onPress={() =>
                    navigation.navigate('JobCard', {data: item})
                  }>
                  <TaskComponent itemData={item} />
                </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
              />
            ) : (
              <Text style={{alignSelf: 'center', marginTop: 8}}>
                No Jobs Found
              </Text>
            )
          ) : (
            <View />
          )}
          {active == 0 && (
            <Text style={[styles.titleStyle, {marginTop: 16}]}>
              Upcoming Deadlines
            </Text>
          )}

          {active == 0 ? (
            upcoming != null && upcoming.length > 0 ? (
              <FlatList
                key={1}
                data={upcoming}
                horizontal
                style={{paddingHorizontal: 16, marginBottom: 64}}
                nestedScrollEnabled
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      width: '100%',
                      marginRight: 16,
                    }}
                    onPress={() =>
                      navigation.navigate('JobCard', {data: item})
                    }>
                    <TaskComponent itemData={item} />
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
              />
            ) : (
              <Text style={{alignSelf: 'center', marginTop: 8}}>
                No Jobs Found
              </Text>
            )
          ) : (
            <View />
          )}
          {active == 1 && (
            <Text style={styles.titleStyle}>Not Complete Tasks</Text>
          )}
          {active == 1 ? (
            tasks != null && tasks.length > 0 ? (
              <FlatList
                key={2}
                data={tasks}
                horizontal
                style={{paddingHorizontal: 16, marginBottom: 64}}
                nestedScrollEnabled
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
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
                )}
                keyExtractor={item => item.id}
              />
            ) : (
              <Text style={{alignSelf: 'center', marginTop: 24}}>
                No Tasks Found
              </Text>
            )
          ) : (
            ''
          )}

          <OrganizationListModal
            visible={orgVisible}
            onClose={onClose}
            organizations={orgData}
            onItemSelect={onItemSelect}
            navigation={navigation}
            selectedOrg={selectedOrg}
            setOrgVisible={setOrgVisible}
          />
        </ScrollView>
      ) : (
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          <View style={{}}>
            {orgId != '' && (
              <CalendarStrip
                setApprovedJobs={setApprovedJobs}
                orgId={orgId}
                setPdfFileName={setPdfFileName}
              />
            )}
            <View style={styles.resultViewStyle}>
              <View style={[styles.row_, {justifyContent: 'space-between'}]}>
                <View style={[styles.cardBox, {marginRight: 8}]}>
                  <View style={styles.row_}>
                    <View>
                      <Text style={styles.lightTextStyle2}>Income</Text>
                      <Text style={styles.smallTextStyle}>this Week</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                      <HomeGreenTickSvg />
                    </View>
                  </View>
                  <Text style={[styles.bigTextStyle, {fontSize: 18}]}>
                    {reportReadData != null
                      ? '$' + reportReadData.income.done
                      : '$0.00'}
                  </Text>
                  <Text style={styles.lightTextStyle}>Potential</Text>
                  <Text style={styles.bigTextStyle2}>
                    {reportReadData != null
                      ? '$' + reportReadData.income.potential
                      : '$0.00'}
                  </Text>
                </View>
                <View style={[styles.cardBox, {marginLeft: 8}]}>
                  <View style={styles.row_}>
                    <View>
                      <Text style={styles.lightTextStyle2}>Finished</Text>
                      <Text style={styles.smallTextStyle}>this Week</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                      <HomeTickIcon />
                    </View>
                  </View>

                  <Text style={[styles.bigTextStyle, {fontSize: 18}]}>
                    {reportReadData != null
                      ? reportReadData.finished.done
                      : '0.00'}
                  </Text>
                  <Text style={styles.lightTextStyle}>Accepted</Text>
                  <Text style={styles.bigTextStyle2}>
                    {reportReadData != null
                      ? reportReadData.finished.accepted
                      : '0.00'}
                  </Text>
                </View>
              </View>

              <TouchableOpacity style={styles.whiteBar}>
                <PdfIcon />
                <View style={{marginHorizontal: 8}}>
                  <Text style={styles.invoiceText}>
                    {reportReadData != null &&
                    reportReadData.invoice &&
                    reportReadData.invoice.number != null
                      ? reportReadData.invoice.number
                      : 'Invoice ID 0001'}
                  </Text>
                </View>
                <View style={{alignItems: 'flex-end', flex: 1}}>
                  <DownloadPdfIcon />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.approveTextStyle}>Approved Jobs</Text>
          <FlatList
            key={0}
            data={approvedJobs}
            style={{paddingHorizontal: 16}}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <View style={{flex: 1, paddingBottom: 16}}>
                <TaskComponent itemData={item} />
              </View>
            )}
            keyExtractor={item => item.id}
          />
          {/* <Text style={styles.titleStyle}>Upcoming Deadlines</Text> */}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: appColors.white,
    justifyContent: 'center',
    paddingVertical: 16,
    paddingBottom: 84,
  },
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  usernameStyle: {
    color: appColors.black,
    fontFamily: 'SF-Pro',
    fontWeight: '700',
  },
  smallTextStyle: {
    fontSize: 12,
    color: appColors.placeholderColor,
    fontFamily: 'SF-Pro',
    letterSpacing: -0.2,
  },
  smallTextStyle2: {
    fontSize: 14,
    color: appColors.grey,
    fontFamily: 'SF-Pro',
  },
  smallTextStyleHeader: {
    marginLeft: 8,
    fontSize: 12,
    color: appColors.black,
  },
  right_: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  resultViewStyle: {
    backgroundColor: appColors.offWhite,
    borderRadius: 30,
    padding: 16,
    marginHorizontal: 16,
  },
  lightTextStyle: {
    color: appColors.placeholderColor,
    fontSize: 14,
    fontFamily: 'SF-Pro',
    fontWeight: '400',
  },
  lightTextStyle: {
    color: appColors.placeholderColor,
    fontSize: 12,
    fontFamily: 'SF-Pro',
    fontWeight: '400',
  },
  lightTextStyle2: {
    color: appColors.placeholderColor,
    fontSize: 16,
    fontFamily: 'SF-Pro',
    fontWeight: '400',
    paddingTop: 4,
    marginTop: 8,
  },
  bigTextStyle: {
    color: appColors.black,
    fontSize: 14,
    fontWeight: '600',
  },
  bigTextStyle2: {
    color: appColors.homeBlack,
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 8,
  },
  rateTextStyle: {
    color: appColors.white,
    fontFamily: 'SF-Pro',
    fontWeight: '600',
    fontSize: 16,
  },
  invoiceText: {
    color: appColors.black,
    fontFamily: 'SF-Pro',
    fontWeight: '600',
    fontSize: 16,
  },
  tabStyle: {
    borderColor: appColors.lightGrey,
    borderWidth: 1,
    borderRadius: 30,
    padding: 0,
    flexDirection: 'row',
    marginTop: 16,
    paddingTop: 2.5,
    paddingRight: 3,
    paddingBottom: 0,
    paddingLeft: 3,
    marginHorizontal: 16,
  },
  titleStyle: {
    color: appColors.black,
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'SF-Pro',
    marginTop: 12,
    marginLeft: 16,
  },
  approveTextStyle: {
    color: appColors.black,
    fontSize: 26,
    fontWeight: '600',
    fontFamily: 'SF-Pro',
    marginTop: 16,
    marginLeft: 24,
  },
  tabButton: {
    paddingVertical: 14,
    color: appColors.borderLightGrey,
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
    fontWeight: '600',
    overflow: 'hidden',
  },
  cardBox: {
    backgroundColor: appColors.white,
    flex: 1,
    padding: 8,
    borderRadius: 30,
    borderStyle: 'solid',
    borderWidth: 0.2,
    borderColor: appColors.grey,
    gap: 1,
    // paddingVertical: 18,
    paddingLeft: 14,
  },
  row_: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  jobCard: {
    width: 140,
    marginRight: 16,
    backgroundColor: appColors.white,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: appColors.lightGrey,
    gap: 6,
  },
  blackBar: {
    backgroundColor: appColors.black,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginTop: 16,
  },
  whiteBar: {
    backgroundColor: appColors.white,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginTop: 16,
  },
});
