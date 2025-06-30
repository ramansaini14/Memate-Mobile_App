import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {appColors} from '../../utils/appColors';
import WhiteBackIcon from '../../assets/svg/WhiteBackIcon';
import CalenderIcon from '../../assets/svg/CalenderIcon';
import MenuIcon from '../../assets/svg/MenuIcon';
import FrameBoy from '../../assets/svg/FrameBoy';
import DoubleTick from '../../assets/svg/DoubleTick';
import SingleTick from '../../assets/svg/SingleTick';
import BagIcon from '../../assets/svg/BagIcon';
import GirlFrame from '../../assets/svg/GirlFrame';
import YellowBagIcon from '../../assets/svg/YellowBagIcon';
import {SafeAreaView} from 'react-native-safe-area-context';
import {io} from 'socket.io-client';
import {useSocket} from '../../components/useSocket';
import ModalCreateChat from '../../components/ModalCreateChat';
import { useSelector } from 'react-redux';
import { emitSocket } from '../../socketService';

const Chat = ({navigation}) => {

  const globallyOrgData = useSelector(
    state => state.globalReducer.globallyOrgData,
  );

  const [managers, setManagers] = useState([]);

  useEffect(()=>{
    console.log('globallyOrgData managers===> ', globallyOrgData.managers);
    setManagers(globallyOrgData.managers || []);
  },[])
  const [visibleModal, setVisibleModal] = useState(false);
  const onCloseClick = () => {
    setVisibleModal(false);
  }
  const onCreateChatClick = () => {
    setVisibleModal(true);
  }

  const onCreateClick = (payload) => {
    emitSocket(create_chat_group, payload);
    setVisibleModal(false);
  }

  return (
    <SafeAreaView style={styles.containerStyle}>
      <View style={styles.headerStyle}>
        <View style={{height: 40, width: 40}}>
          <WhiteBackIcon onPress={() => navigation.goBack()} />
        </View>
        <Text style={styles.usernameStyle}>Chat</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity style={{marginHorizontal: 8}}>
            <CalenderIcon />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
            <MenuIcon />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 20,
                color: appColors.black,
                fontWeight: '600',
                flex: 1,
              }}>
              Chat
            </Text>
            <TouchableOpacity>
              <Text
                style={styles.newChatButton}
                onPress={() => setVisibleModal(true)}>
                + New Chat
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.personalStyle}>Organisation Chat</Text>

        <View
          style={{
            paddingBottom: 20,
            borderColor: appColors.lightGrey,
            borderBottomWidth: 1,
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('MainChatRoom')}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <FrameBoy width={55} height={55} />
              <View style={{flexDirection: 'column', flex: 1}}>
                <Text style={{color: appColors.black}}>Imran Molla</Text>
                <Text>Organisation Name</Text>
                <Text
                  style={{color: appColors.black, width: 150}}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  Of course, let me know if you're on your way
                </Text>
              </View>
              <View style={{flexDirection: 'column'}}>
                <Text>09 APR</Text>
                <View style={{alignItems: 'center', marginTop: 10}}>
                  <DoubleTick width={16} height={16} />
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('MainChatRoom')}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <FrameBoy width={55} height={55} />
              <View style={{flexDirection: 'column', flex: 1}}>
                <Text style={{color: appColors.black}}>Imran Molla</Text>
                <Text>Organisation Name</Text>
                <Text
                  style={{color: appColors.black, width: 150}}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  Of course, let me know if you're on your way
                </Text>
              </View>
              <View style={{flexDirection: 'column'}}>
                <Text>09 APR</Text>
                <View style={{alignItems: 'center', marginTop: 10}}>
                  <SingleTick width={16} height={16} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <ModalCreateChat modalVisible={visibleModal} onCloseClick={onCloseClick} onCreateClick={onCreateClick} managers={managers}/>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: appColors.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
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
  newChatButton: {
    backgroundColor: appColors.black,
    color: appColors.white,
    fontWeight: '600',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  personalStyle: {
    color: appColors.black,
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
  },
  notificationStyle: {
    backgroundColor: '#FAF48D',
    padding: 6,
    alignItems: 'center',
    borderRadius: 50,
    textAlign: 'center',
    marginTop: 5,
    fontWeight: '600',
    fontSize: 12,
  },
});
