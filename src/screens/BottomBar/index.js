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
import AddScreen from './Add';
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
import MainLogo from '../../assets/svg/MainLogo';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) => (
  <TouchableOpacity
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow,
    }}
    onPress={onPress}>
    <View
      style={{
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: appColors.black,
        marginTop: 8,
      }}>
      {children}
    </View>
  </TouchableOpacity>
);

const BottomBar = ({navigation, route}) => {
  const [orgId, setOrgId] = useState(null);

  const getOrgId = async () => {
    const id = await AsyncStorage.getItem('orgId');
    setOrgId(id);
  };

  useEffect(() => {
    getOrgId();
  }, []); // 👈 Added empty dependency array so it runs only once

  // Show a loading screen while orgId is being fetched
  // if (!orgId) {
  //   return (
  //     <SafeAreaView style={styles.container}>
  //       <MainLogo width={200} height={120} />
  //     </SafeAreaView>
  //   );
  // }

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused}) => {
          if (route.name === 'Home') {
            return focused ? (
              <View style={styles.tabIconStyle}>
                <HomeActive />
                <PinkDot />
              </View>
            ) : (
              <View style={styles.tabIconStyle}>
                <HomeIcon />
              </View>
            );
          } else if (route.name === 'Work') {
            return focused ? (
              <View style={styles.tabIconStyle}>
                <JobsIcon />
                <PinkDot />
              </View>
            ) : (
              <View style={styles.tabIconStyle}>
                <JobInactive />
              </View>
            );
          } else if (route.name === 'Tasks') {
            return focused ? (
              <View style={styles.tabIconStyle}>
                <TaskIcon />
                <PinkDot />
              </View>
            ) : (
              <View style={styles.tabIconStyle}>
                <TaskIn />
              </View>
            );
          } else if (route.name === 'Messages') {
            return focused ? (
              <View style={styles.tabIconStyle}>
                <ChatIcon />
                <PinkDot />
              </View>
            ) : (
              <View style={styles.tabIconStyle}>
                <ChatIn />
              </View>
            );
          }
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          height: 76,
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
        initialParams={{isWhiteDot: 0}}
      />
      <Tab.Screen
        name="Plus"
        component={AddScreen}
        options={{
          tabBarIcon: () => (
            <Text
              style={{
                color: appColors.white,
                fontWeight: '700',
                fontSize: 12,
                fontFamily: 'SF-Pro-Display-Bold',
                width: '130%',
              }}>
              START
            </Text>
          ),
          tabBarButton: props => (
            <CustomTabBarButton {...props} focused={props.focused} />
          ),
        }}
      />
      <Tab.Screen name="Tasks" component={TasksScreen} />
      <Tab.Screen name="Messages" component={Chat} />
    </Tab.Navigator>
  );
};

export default BottomBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: appColors.black,
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  tabIconStyle: {
    height: 40,
    marginTop: 20,
    alignItems: 'center',
    gap: 6,
    paddingTop: 14,
  },
});
