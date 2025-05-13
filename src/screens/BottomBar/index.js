import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {appColors} from '../../utils/appColors';
import {
  briefcase,
  briefcaseFill,
  chat,
  chatFill,
  checklist,
  checklistFill,
  Home,
  HomeFill,
  plus,
} from '../../utils/Images';
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
        paddingHorizontal: 0,
        paddingVertical: 0,
        backgroundColor: appColors.black,
        marginTop: 8,
      }}>
      {children}
    </View>
  </TouchableOpacity>
);

const BottomBar = ({navigation}) => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        initialRouteName: 'BottomBar',
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            return (iconName = focused ? (
              <View style={styles.tabIconStyle}>
                <HomeActive />
                <PinkDot />
              </View>
            ) : (
              <View style={styles.tabIconStyle}>
                <HomeIcon />
              </View>
            ));
          } else if (route.name === 'Work') {
            return (iconName = focused ? (
              <View style={styles.tabIconStyle}>
                <JobsIcon />
                <PinkDot />
              </View>
            ) : (
              <View style={styles.tabIconStyle}>
                <JobInactive />
              </View>
            ));
          } else if (route.name === 'Tasks') {
            return (iconName = focused ? (
              <View style={styles.tabIconStyle}>
                <TaskIcon />
                <PinkDot />
              </View>
            ) : (
              <View style={styles.tabIconStyle}>
                <TaskIn />
              </View>
            ));
          } else if (route.name === 'Messages') {
            return (iconName = focused ? (
              <View style={styles.tabIconStyle}>
                <ChatIcon />
                <PinkDot />
              </View>
            ) : (
              <View style={styles.tabIconStyle}>
                <ChatIn />
              </View>
            ));
          }
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          alignItems:'center',
          justifyContent:'center',
          paddingVertical:16,
          elevation: 0,
          backgroundColor: '#fff',
          borderColor: '#fff',
          borderRadius: 40,
          height: '12%',
          // ...styles.shadow,
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Work" component={JobsScreen} />
      <Tab.Screen
        name="Plus"
        component={AddScreen}
        options={{
          tabBarIcon: ({focused, size}) => (
            // <Image source={plus} style={{ width: size, height: size }} />
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
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen name="Tasks" component={TasksScreen} />
      <Tab.Screen name="Messages" component={Chat} />
    </Tab.Navigator>
  );
};

export default BottomBar;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: appColors.black,
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  tabIconStyle: {
    height: 40,
    marginTop: 20,
    alignItems: 'center',
    gap: 6,
    paddingTop: 14,
  },
});
