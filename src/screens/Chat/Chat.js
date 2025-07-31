import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {use, useEffect, useRef, useState} from 'react';
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
  offSocket,
  onSocket,
} from '../../socketService';
import DummyUserIcon from '../../assets/svg/DummyUserIcon';
import ProfilePictureIcon from '../../assets/svg/ProfilePictureIcon';
import {useIsFocused} from '@react-navigation/native';
import {SwipeListView} from 'react-native-swipe-list-view';
import BagIcon from '../../assets/svg/BagIcon';
import BagIconTrans from '../../assets/svg/BagIconTrans';
import ArchiveIcon from '../../assets/svg/ArchiveIcon';
import {getTimeAgo} from '../../utils/utility';

const Chat = ({navigation}) => {
  const globallyOrgData = useSelector(
    state => state.globalReducer.globallyOrgData,
  );

  const swipeListViewRef = useRef(null);

  const [managers, setManagers] = useState([]);

  const [onlineUsers, setOnlineUsers] = useState([]);

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
    console.log('Org Data User Chat ===> ', orgData);
  }, [orgData]);

  useEffect(() => {
    if (isFocused) {
      console.log('globallyOrgData managers===> ', globallyOrgData.managers);

      onSocket('presence_list', response => {
        console.log('presence_list ===> ', response);
        setOnlineUsers(response.online);
      });

      onSocket('presence_update', response => {
        console.log('presence_update ===> ', response);
        if (response.status == 'online') {
          setOnlineUsers(prev => [...prev, response.user_id]);
        } else {
          setOnlineUsers(prev => prev.filter(id => id !== response.user_id));
        }
      });

      onSocket('create_chat_group_response', response => {
        console.log('create_chat_group_response ===> ', response);
      });

      const orgPayload = {
        user_id: globallyOrgData.appuser_id,
        organization_id: globallyOrgData.id,
      };

      emitSocket('get_organization_users_mobile', orgPayload, setOrgData);

      emitSocket(
        'get_user_chat_groups',
        {user_id: globallyOrgData.appuser_id},
        setChatData,
      );
      emitSocketWithoutCallback('get_online_users', {
        org_id: globallyOrgData.id,
      });
    }

    return () => {
      offSocket('presence_list');
      offSocket('presence_update');
      offSocket('create_chat_group_response');
    };
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

  const onGroupClick = item => {
    console.log('Group Clicked ===> ', item);
    navigation.navigate('MainChatRoom', {
      userId: globallyOrgData.appuser_id,
      groupId: item.id,
      name: item.name,
      image: null,
      isGroup: true,
    });
  };

  const onArchiveClick = item => {
    swipeListViewRef.current?.closeAllOpenRows();
    console.log('Archive Clicked ===> ', item);
    const payload = {
      group_id: item.item.id,
      user_id: globallyOrgData.appuser_id,
    };
    emitSocket('archive_chat_group', payload, response => {
      if (response.status === 'success') {
        emitSocket(
          'get_user_chat_groups',
          {user_id: globallyOrgData.appuser_id},
          setChatData,
        );
      }
    });
  };

  const onUnarchiveClick = item => {
    swipeListViewRef.current?.closeAllOpenRows();
    console.log('Archive Clicked ===> ', item);
    const payload = {
      group_id: item.item.id,
      user_id: globallyOrgData.appuser_id,
    };
    emitSocket('unarchive_chat_group', payload, response => {
      if (response.status === 'success') {
        emitSocket(
          'get_user_chat_groups',
          {user_id: globallyOrgData.appuser_id},
          setChatData,
        );
      }
    });
  };

  const renderItem = ({item}) => (
    <View>
      {!item.archived_by.includes(globallyOrgData.appuser_id) && (
        <View style={styles.rowFront}>
          <TouchableOpacity
            style={styles.leftIcon}
            onPress={() => onGroupClick(item)}>
            <View style={styles.circleIcon}>
              <BagIconTrans />
            </View>
            <View style={styles.middleContent}>
              <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                {item.name}
              </Text>
              <Text style={styles.subtitle}>{item.job_number}</Text>
              <View style={styles.avatarsRow}>
                {item.participants.map(
                  (item, index) =>
                    index < 4 && (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'flex-end',
                          gap: 4,
                        }}
                        key={index}>
                        <Image
                          key={index}
                          source={{
                            uri: 'https://dev.memate.com.au' + item.photo,
                          }}
                          style={styles.avatar}
                        />
                        {onlineUsers.includes(item.id) && (
                          <View
                            style={{
                              height: 10,
                              width: 10,
                              backgroundColor: appColors.white,
                              borderRadius: 4,
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginLeft: -10,
                            }}>
                            <View
                              style={{
                                height: 6,
                                width: 6,
                                backgroundColor: appColors.tickGreen,
                                borderRadius: 3,
                              }}
                            />
                          </View>
                        )}
                      </View>
                    ),
                )}
                {item.participants.length > 4 && (
                  <Text style={styles.moreText}>+4</Text>
                )}
              </View>
            </View>
            {item.last_message && (
              <View style={styles.rightInfo}>
                <Text style={styles.time}>
                  {getTimeAgo(item.last_message.sent_at)}
                </Text>
                {item.unread_count > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.unread_count}</Text>
                  </View>
                )}
              </View>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
  const renderArchiveItem = ({item}) => (
    <View>
      {item.archived_by.includes(globallyOrgData.appuser_id) && (
        <View style={styles.rowFront}>
          <TouchableOpacity
            style={styles.leftIcon}
            onPress={() => onGroupClick(item)}>
            <View
              style={[
                styles.circleIcon,
                {
                  backgroundColor:
                    item.job_time_type == '1'
                      ? appColors.lightGreen
                      : item.job_time_type == 'T'
                      ? appColors.yellow
                      : appColors.lightPurple,
                },
              ]}>
              <BagIconTrans />
            </View>
            <View style={styles.middleContent}>
              <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                {item.name}
              </Text>
              <Text style={styles.subtitle}>{item.job_number}</Text>
              <View style={styles.avatarsRow}>
                {item.participants.map(
                  (item, index) =>
                    index < 4 && (
                      <Image
                        key={index}
                        source={{
                          uri: 'https://dev.memate.com.au' + item.photo,
                        }}
                        style={styles.avatar}
                      />
                    ),
                )}
                {item.participants.length > 4 && (
                  <Text style={styles.moreText}>+4</Text>
                )}
              </View>
            </View>
            {item.last_message && (
              <View style={styles.rightInfo}>
                <Text style={styles.time}>
                  {getTimeAgo(item.last_message.sent_at)}
                </Text>
                {item.unread_count > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.unread_count}</Text>
                  </View>
                )}
              </View>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const renderHiddenItem = item => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={styles.archiveButton}
        onPress={() =>
          selectedChat == 0 ? onArchiveClick(item) : onUnarchiveClick(item)
        }>
        <ArchiveIcon />
        <Text style={{color: '#fff', fontSize: 12}}>
          {selectedChat == 0 ? 'Archive' : 'Unarchived'}
        </Text>
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
      <ScrollView
        style={{flex: 1, paddingHorizontal: 16, marginTop: 8}}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}>
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
            maxHeight: 220,
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
                    {onlineUsers.includes(item.id) && (
                      <View
                        style={{
                          height: 10,
                          width: 10,
                          backgroundColor: appColors.white,
                          borderRadius: 4,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginTop: 40,
                          marginLeft: -10,
                        }}>
                        <View
                          style={{
                            height: 6,
                            width: 6,
                            backgroundColor: appColors.tickGreen,
                            borderRadius: 3,
                          }}
                        />
                      </View>
                    )}
                    <View style={{flex: 1, paddingHorizontal: 8}}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '600',
                          color: appColors.homeBlack,
                        }}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {item.first_name} {item.last_name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: appColors.placeholderColor,
                        }}>
                        {item.role}
                      </Text>
                      <Text
                        style={{fontSize: 13, color: appColors.homeBlack}}
                        numberOfLines={1}
                        ellipsizeMode="tail">
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
        <View style={{flex: 1, paddingBottom: Platform.OS === 'ios' ? 0 : 100}}>
          <SwipeListView
            ref={swipeListViewRef}
            data={chatGroups}
            showsVerticalScrollIndicator={false}
            renderItem={selectedChat == 0 ? renderItem : renderArchiveItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-100}
            keyExtractor={item => item.id}
            disableRightSwipe={true}
            nestedScrollEnabled={true}
          />
        </View>
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
    backgroundColor: '#fff',
    padding: 12,
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: appColors.white,
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10,
    flexDirection: 'row',
  },
  archiveButton: {
    backgroundColor: '#222',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  leftIcon: {
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
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 2,
    color: appColors.black,
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
    width: 32,
    height: 32,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#fff',
    position: 'relative',
    gap: 4,
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
