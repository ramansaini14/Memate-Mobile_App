import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {appColors} from '../../utils/appColors';
import HomeScreen from './Home';
import JobsScreen from './Jobs';
import TasksScreen from './Tasks';
import Chat from '../Chat/Chat';
import PinkDot from '../../assets/svg/PinkDot';
import HomeIcon from '../../assets/svg/HomeIcon';
import HomeActive from '../../assets/svg/HomeActive';
import JobsIcon from '../../assets/svg/JobsIcon';
import JobInactive from '../../assets/svg/JobInactive';
import TaskIcon from '../../assets/svg/TasksIcon';
import TaskIn from '../../assets/svg/TaskIn';
import ChatIcon from '../../assets/svg/ChatIcon';
import ChatIn from '../../assets/svg/ChatIn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StartButton from '../../assets/svg/StartButton';
import PlayIconCenter from '../../assets/svg/PlayIconCenter';
import PauseIcon from '../../assets/svg/PauseIcon';
import CenterButtonModal from '../../components/CenterButtonModal';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) => (
  <TouchableOpacity
    style={{justifyContent: 'center', alignItems: 'center', ...styles.shadow}}
    onPress={onPress}>
    <View style={styles.centerButton}>{children}</View>
  </TouchableOpacity>
);

const BottomBar = () => {
  const [orgId, setOrgId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [centerButtonState, setCenterButtonState] = useState('initial');
  const navigation = useNavigation();

  const orgData = useSelector(state => state.globalReducer.globallyOrgData);
  console.log('orgData ===> ', orgData);

  // const getOrgId = async () => {
  //   const id = await AsyncStorage.getItem('orgId');
  //   setOrgId(id);
  // };

  useEffect(() => {
    setOrgId(orgData ? orgData.id : null);
  }, []);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleModalStateChange = state => {
    setCenterButtonState(state);
  };

  const renderCenterIcon = () => {
    switch (centerButtonState) {
      case 'pause':
        return <PauseIcon width={24} height={24} />;
      default:
        return <StartButton width={44} height={24} />;
    }
  };

  const onAvailableClick = position => {
    console.log('Available clicked');
    navigation.navigate('BottomBar', {
      screen: 'Work',
      params: {isWhiteDot: position, from: 0},
    }); // ✅ should work now
  };

  // const onContinueClick = (position) => {
  //   console.log('onContinueClick clicked');
  //   navigation.navigate("BottomBar",{screen:'Work', params:{isWhiteDot: position, from: 0}}); // ✅ should work now
  // };

  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({focused}) => {
            if (route.name === 'Home') {
              return (
                <View style={styles.tabIconStyle}>
                  {focused ? <HomeActive /> : <HomeIcon />}
                  {focused && <PinkDot />}
                </View>
              );
            } else if (route.name === 'Work') {
              return (
                <View style={styles.tabIconStyle}>
                  {focused ? <JobsIcon /> : <JobInactive />}
                  {focused && <PinkDot />}
                </View>
              );
            } else if (route.name === 'Tasks') {
              return (
                <View style={styles.tabIconStyle}>
                  {focused ? <TaskIcon /> : <TaskIn />}
                  {focused && <PinkDot />}
                </View>
              );
            } else if (route.name === 'Messages') {
              return (
                <View style={styles.tabIconStyle}>
                  {focused ? <ChatIcon /> : <ChatIn />}
                  {focused && <PinkDot />}
                </View>
              );
            }
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            backgroundColor: '#fff',
            height: 112,
          },
        })}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{orgId: orgId}}
        />
        <Tab.Screen
          name="Work"
          component={JobsScreen}
          initialParams={{isWhiteDot: 0, from: 0}}
        />

        <Tab.Screen
          name="Plus"
          component={() => null}
          options={{
            tabBarIcon: () => (
              <View style={styles.centerLabelContainer}>
                {renderCenterIcon()}
              </View>
            ),
            tabBarButton: props => (
              <CustomTabBarButton {...props} onPress={toggleModal} />
            ),
          }}
        />

        <Tab.Screen name="Tasks" component={TasksScreen} />
        <Tab.Screen name="Messages" component={Chat} />
      </Tab.Navigator>

      <CenterButtonModal
        visible={modalVisible}
        onClose={closeModal}
        onStateChange={handleModalStateChange}
        onAvailableClick={onAvailableClick}
        orgId={orgId}
      />
    </>
  );
};

export default BottomBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.black,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  shadow: {
    shadowColor: appColors.black,
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  tabIconStyle: {
    height: 50,
    marginTop: 28,
    alignItems: 'center',
    gap: 6,
    paddingTop: 40,
    paddingBottom: 48,
  },
  centerButton: {
    width: 72,
    height: 72,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColors.black,
    marginTop: 8,
    padding: 'auto',
  },
  centerLabelContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
