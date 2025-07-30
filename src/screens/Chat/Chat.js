import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {appColors} from '../../utils/appColors';
import WhiteBackIcon from '../../assets/svg/WhiteBackIcon';
import CalenderIcon from '../../assets/svg/CalenderIcon';
import MenuIcon from '../../assets/svg/MenuIcon';
import FrameBoy from '../../assets/svg/FrameBoy';
import DoubleTick from '../../assets/svg/DoubleTick';
import ModalCreateChat from '../../components/ModalCreateChat';
import {useSelector} from 'react-redux';
import {
  emitSocket,
  emitSocketWithoutCallback,
  onSocket,
} from '../../socketService';
import DummyUserIcon from '../../assets/svg/DummyUserIcon';
import ProfilePictureIcon from '../../assets/svg/ProfilePictureIcon';
import {useIsFocused} from '@react-navigation/native';
import {SwipeListView} from 'react-native-swipe-list-view';
import BagIcon from '../../assets/svg/BagIcon';
import BagIconTrans from '../../assets/svg/BagIconTrans';

const Chat = ({navigation}) => {
  const globallyOrgData = useSelector(
    state => state.globalReducer.globallyOrgData,
  );

  const [managers, setManagers] = useState([]);

  const [selectedChat, setSelectedChat] = useState(0);

  const [orgData, setOrgData] = useState(null);
  const [name, setName] = useState('');
  const [chatData, setChatData] = useState([]);
  const [chatGroups, setChatGroups] = useState('');
  const [createChatGroup, setCreateChatGroup] = useState(null);
  const [selectUser, setSelectUser] = useState(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    console.log('Chat Groups ===> ', chatData);
    if (chatData.status == 'success') {
      setChatGroups(chatData.chat_groups);
    }
  }, [chatData]);

  useEffect(() => {
    if (isFocused) {
      console.log('globallyOrgData managers===> ', globallyOrgData.managers);
      const orgPayload = {
        user_id: globallyOrgData.appuser_id,
        organization_id: globallyOrgData.id,
      };

      emitSocket('get_organization_users_mobile', orgPayload, setOrgData);

      onSocket('create_chat_group_response', response => {
        console.log('create_chat_group_response ===> ', response);
      });
    }
    emitSocket(
      'get_user_chat_groups',
      {user_id: globallyOrgData.appuser_id},
      setChatData,
    );
  }, [isFocused]);

  const [visibleModal, setVisibleModal] = useState(false);
  const onCloseClick = () => {
    setVisibleModal(false);
  };
  const onCreateChatClick = () => {
    setVisibleModal(true);
  };

  const onCreateClick = item => {
    const payload = {
      user_id: globallyOrgData.appuser_id,
      name: '',
      participants: [item.id],
      organization_id: globallyOrgData.id,
      project_id: '',
      task_id: '',
    };
    console.log('Payload ===> ', payload);
    emitSocket('create_chat_group', payload, setCreateChatGroup);
    setSelectUser(item);
    // emitSocketWithoutCallback('create_chat_group', payload);
    setVisibleModal(false);
  };

  useEffect(() => {
    console.log('CreateChatGroup ===> ', createChatGroup);
    if (createChatGroup != null && createChatGroup.status === 'success') {
      navigation.navigate('MainChatRoom', {
        userId: globallyOrgData.appuser_id,
        groupId: createChatGroup.chat_group_id,
        name: selectUser?.first_name + ' ' + selectUser?.last_name,
        image: selectUser?.avatar,
        isGroup: false,
      });
      setCreateChatGroup(null);
    }
  }, [createChatGroup]);

  // const chatData = [
  //   {
  //     id: '1',
  //     title: 'Business Plan Template',
  //     subtitle: 'THE-JB-113-234998',
  //     time: '17:32',
  //     badge: 2,
  //     avatars: [
  //       'https://picsum.photos/200/300',
  //       'https://picsum.photos/200/300',
  //       'https://picsum.photos/200/300',
  //     ],
  //     more: 4,
  //   },
  //   {
  //     id: '2',
  //     title: 'SMM theAd Templates',
  //     subtitle: 'THE-JB-113-234998',
  //     time: '17:32',
  //     avatars: [
  //       'https://picsum.photos/200/300',
  //       'https://picsum.photos/200/300',
  //       'https://picsum.photos/200/300',
  //     ],
  //     more: 0,
  //   },
  //   {
  //     id: '3',
  //     title: 'SMM theAd Templates',
  //     subtitle: 'THE-JB-113-234998',
  //     time: '17:32',
  //     avatars: [
  //       'https://picsum.photos/200/300',
  //       'https://picsum.photos/200/300',
  //       'https://picsum.photos/200/300',
  //     ],
  //     more: 0,
  //   },
  // ];

  const renderItem = ({item}) => (
    console.log('Item ===> ', item),
    (
      <View style={styles.rowFront}>
        <View style={styles.leftIcon}>
          <View style={styles.circleIcon}>
            <BagIconTrans />
          </View>
          <View style={styles.middleContent}>
            <Text style={styles.title} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.subtitle}>{item.job_number}</Text>
            <View style={styles.avatarsRow}>
              {item.participants.map((item1, index) => (
                <Image
                  key={index}
                  source={{
                    uri: 'https://dev.memate.com.au/media/' + item1.photo,
                  }}
                  style={styles.avatar}
                />
              ))}
              {item.more > 0 && (
                <Text style={styles.moreText}>+{item.more}</Text>
              )}
            </View>
          </View>
        </View>

        <View style={styles.rightInfo}>
          <Text style={styles.time}>{item.time}</Text>
          {item.badge > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.badge}</Text>
            </View>
          )}
        </View>
      </View>
    )
  );

  const renderHiddenItem = () => (
    <View style={styles.rowBack}>
      <TouchableOpacity style={styles.archiveButton}>
        <Text style={{color: '#fff'}}>Archive</Text>
      </TouchableOpacity>
    </View>
  );

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
      <View style={{flex: 1, paddingHorizontal: 16, marginTop: 8}}>
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
            flex: 1,
          }}>
          {orgData != null && (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={orgData.users}
              keyExtractor={(item, index) =>
                item.id?.toString() ?? index.toString()
              }
              renderItem={({item}) =>
                item.last_message && (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.chatCard}
                    onPress={() =>
                      navigation.navigate('MainChatRoom', {
                        userId: globallyOrgData.appuser_id,
                        groupId: item.last_message.chat_group,
                        name: item.full_name,
                        image: item?.avatar,
                        isGroup: false,
                      })
                    }>
                    {item.avatar ? (
                      <Image
                        source={{
                          uri: 'https://dev.memate.com.au/media/' + item.avatar,
                        }}
                        style={styles.avatar_}
                        resizeMode="contain"
                      />
                    ) : (
                      <ProfilePictureIcon height={60} width={60} />
                    )}
                    <View style={{flex: 1, paddingHorizontal: 8}}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '600',
                          color: appColors.homeBlack,
                        }}>
                        {item.first_name} {item.last_name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: appColors.placeholderColor,
                        }}>
                        {item.role}
                      </Text>
                      <Text style={{fontSize: 13, color: appColors.homeBlack}}>
                        {item.last_message.message}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'column'}}>
                      <Text style={{fontSize: 10}}>09 APR</Text>
                      {item.unread_count > 0 && (
                        <View
                          style={{
                            height: 24,
                            width: 24,
                            borderRadius: 12,
                            backgroundColor: appColors.yellow,
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignSelf: 'flex-end',
                            marginTop: 8,
                          }}>
                          <Text style={{fontSize: 10}}>
                            {item.unread_count}
                          </Text>
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                )
              }
            />
          )}
        </View>
      </View>
      <Text style={styles.personalStyle}>Job Chats</Text>
      <View
        style={{
          borderRadius: 24,
          borderWidth: 1,
          borderColor: appColors.lightGrey,
          flexDirection: 'row',
          marginTop: 16,
        }}>
        <Text
          style={{
            fontSize: 14,
            color: selectedChat == 0 ? appColors.white : appColors.black,
            fontWeight: '600',
            backgroundColor:
              selectedChat == 0 ? appColors.black : appColors.white,
            padding: 12,
            borderRadius: 24,
            flex: 1,
            textAlign: 'center',
          }}
          onPress={() => setSelectedChat(0)}>
          Active
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: selectedChat == 1 ? appColors.white : appColors.black,
            fontWeight: '600',
            backgroundColor:
              selectedChat == 1 ? appColors.black : appColors.white,
            padding: 12,
            borderRadius: 24,
            flex: 1,
            textAlign: 'center',
          }}
          onPress={() => setSelectedChat(1)}>
          Archive
        </Text>
      </View>
      <ScrollView style={{flex: 1}} nestedScrollEnabled={true}>
        <SwipeListView
          data={chatGroups}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-80}
          keyExtractor={item => item.id}
        />
      </ScrollView>
      {orgData && (
        <ModalCreateChat
          modalVisible={visibleModal}
          onCloseClick={onCloseClick}
          onCreateClick={onCreateClick}
          managers={orgData.users}
          name={name}
          setName={setName}
        />
      )}
    </SafeAreaView>
  );
};

export default Chat;

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
  chatCard: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
  avatar_: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },

  rowFront: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#222',
    flex: 1,
    justifyContent: 'flex-end',
    paddingRight: 20,
    flexDirection: 'row',
  },
  archiveButton: {
    width: 70,
    height: 50,
    backgroundColor: '#222',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftIcon: {
    marginRight: 12,
    flexDirection: 'row',
  },
  circleIcon: {
    backgroundColor: '#FDE68A',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleContent: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    color: '#888',
  },
  avatarsRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fff',
    position: 'relative',
    marginLeft: 5,
  },
  moreText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
    alignSelf: 'center',
  },
  rightInfo: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 50,
  },
  time: {
    fontSize: 12,
    color: '#666',
  },
  badge: {
    backgroundColor: '#FACC15',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 12,
    color: '#000',
    fontWeight: 'bold',
  },
});
