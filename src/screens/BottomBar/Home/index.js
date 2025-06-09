import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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

// const { height, width } = Dimensions.get("window");

const HomeScreen = ({navigation, route}) => {
  const [active, setInActive] = useState(0);
  const {orgId} = route.params;

  const responseOrg = useSelector(state => state.getOrganizationReducer.data);
  const reportReadData = useSelector(state => state.reportReadReducer.data);
  const dispatch = useDispatch();
  const [orgData, setOrgData] = useState(null);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const isFocused = useIsFocused();

  const [orgVisible, setOrgVisible] = useState(false);

  const onClose = () => {
    setOrgVisible(false);
  };

  const onItemSelect = () => {};

  const [JobsData, setJobsData] = useState([
    {
      id: '1',
      number: 20,
      name: 'Require Confirmation',
    },
    {
      id: '2',
      number: 23,
      name: 'Require Confirmation',
    },
    {
      id: '3',
      number: 25,
      name: 'Require Confirmation',
    },
    {
      id: '4',
      number: 5,
      name: 'Require Confirmation',
    },
    {
      id: '5',
      number: 9,
      name: 'Require Confirmation',
    },
  ]);

  useEffect(() => {
    if (isFocused) {
      dispatch(getOrganization());
      const payload = {
        id: orgId,
      };
      dispatch(reportRead(payload));
    }
  }, [isFocused]);

  useEffect(() => {
    // clearToken()
    console.log('OrgData ===> ', responseOrg);
    if (responseOrg != null) {
      setOrgData(responseOrg);
      setSelectedOrg(responseOrg[0]);
    }
  }, [responseOrg]);

  return (
    <SafeAreaView style={styles.containerStyle}>
      <View style={styles.headerStyle}>
        {/* <DummyUserIcon /> */}
        {selectedOrg != null && (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => setOrgVisible(true)}>
              <DownIcon hieght={16} width={16} />
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
        )}
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
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: 16}}>
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
                <Text style={[styles.bigTextStyle, {fontSize: 24}]}>
                  {reportReadData != null
                    ? '$' + reportReadData.income.done
                    : '$0.00'}
                </Text>
                <Text style={styles.lightTextStyle}>Potential</Text>
                <Text style={styles.bigTextStyle2}>
                  {reportReadData != null
                    ? '$' + reportReadData.income.potentianl
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

                <Text style={[styles.bigTextStyle, {fontSize: 22}]}>
                  {reportReadData != null
                    ? '$' + reportReadData.finished.done
                    : '$0.00'}
                </Text>
                <Text style={styles.lightTextStyle}>Accepted</Text>
                <Text style={styles.bigTextStyle2}>
                  {reportReadData != null
                    ? '$' + reportReadData.finished.accepted
                    : '$0.00'}
                </Text>
              </View>
            </View>

            <View style={styles.blackBar}>
              <ReportIcon />
              <View style={{marginHorizontal: 16}}>
                <Text style={styles.rateTextStyle}>Results Report</Text>
                <Text style={styles.smallTextStyle2}>see previous weeks</Text>
              </View>
              <View style={{alignItems: 'flex-end', flex: 1}}>
                <RightArrowWhite />
              </View>
            </View>
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
        <FlatList
          data={JobsData}
          horizontal
          style={{paddingHorizontal: 16}}
          nestedScrollEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <View style={styles.jobCard} key={index}>
              <Text style={[styles.bigTextStyle, {fontSize: 24}]}>
                {item?.number}
              </Text>
              <Text style={[styles.bigTextStyle, {fontWeight: '500'}]}>
                {item?.name}
              </Text>
              <Text
                style={[
                  styles.lightTextStyle,
                  {fontSize: 12},
                  {marginBottom: 4},
                ]}>
                {'View Jobs '} <RightArrowHome />
              </Text>
            </View>
          )}
          keyExtractor={item => item.id}
        />
        <View style={{alignItems: 'flex-end', marginTop: 16}}>
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
        </View>
        <Text style={styles.titleStyle}>Jobs in Progress</Text>
        <FlatList
          key={0}
          data={JobsData}
          horizontal
          style={{paddingHorizontal: 16}}
          nestedScrollEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <View style={{width: 320}}>
              <TaskComponent />
            </View>
          )}
          keyExtractor={item => item.id}
        />
        <Text style={styles.titleStyle}>Upcoming Deadlines</Text>

        <FlatList
          key={1}
          data={JobsData}
          horizontal
          style={{paddingHorizontal: 16, paddingBottom: 16}}
          nestedScrollEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <View style={{width: 320}}>
              <TaskComponent />
            </View>
          )}
          keyExtractor={item => item.id}
        />
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
    marginBottom: 64,
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
    width: '100%',
    padding: 16,
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
  },
  titleStyle: {
    color: appColors.black,
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'SF-Pro',
    marginTop: 12,
    marginLeft: 16,
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
});
