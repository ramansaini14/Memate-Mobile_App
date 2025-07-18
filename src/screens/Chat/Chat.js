import {
  FlatList,
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
import {emitSocket, emitSocketWithoutCallback, onSocket} from '../../socketService';
import {Image} from 'react-native-svg';
import DummyUserIcon from '../../assets/svg/DummyUserIcon';
import ProfilePictureIcon from '../../assets/svg/ProfilePictureIcon';

const Chat = ({navigation}) => {
  const globallyOrgData = useSelector(
    state => state.globalReducer.globallyOrgData,
  );

  const [managers, setManagers] = useState([]);

  const [orgData, setOrgData] = useState(null);
  const [name,setName] = useState('')
  const [chatGroups,setChatGroups] = useState('')

  useEffect(()=>{
    console.log("Chat Groups ===> ",chatGroups)
  },[chatGroups])

  useEffect(() => {
    console.log('globallyOrgData managers===> ', globallyOrgData.managers);
    setManagers(globallyOrgData.managers || []);
    const orgPayload = {
      user_id: globallyOrgData.appuser_id,
      organization_id: globallyOrgData.id,
    };

    emitSocket('get_organization_users', orgPayload, setOrgData);
    emitSocket('get_user_chat_groups', {user_id:globallyOrgData.appuser_id}, setChatGroups);
    
    onSocket("create_chat_group_response",(response)=>{
      console.log("create_chat_group_response ===> ",response)
    })

  }, []);
  const [visibleModal, setVisibleModal] = useState(false);
  const onCloseClick = () => {
    setVisibleModal(false);
  };
  const onCreateChatClick = () => {
    setVisibleModal(true);
  };

  const onCreateClick = value => {
    const payload = {
      user_id: globallyOrgData.appuser_id,
      name: name,
      participants: ["abc","xyz"],
      organization_id: globallyOrgData.id,
      project_id: '',
      task_id: ''
    }
    console.log("Payload ===> ",payload)
    emitSocketWithoutCallback('create_chat_group', payload);
    setVisibleModal(false);
  };

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
      <View style={{flex: 1, padding: 16}}>
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
              renderItem={({item}) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.chatCard}
                  onPress={() => navigation.navigate('JobCard', {data: item})}>
                  {/* <Image
                    source={{uri: item.avatar}}
                    style={styles.avatar_}
                    resizeMode="contain"
                  /> */}
                  <ProfilePictureIcon height={60} width={60}/>
                  <View style={{flex: 1,paddingHorizontal:8}}>
                    <Text style={{fontSize:14,fontWeight:'600',color:appColors.homeBlack}}>{item.first_name} {item.last_name}</Text>
                    <Text style={{fontSize:12,color:appColors.placeholderColor}}>Position</Text>
                    <Text style={{fontSize:13,color:appColors.homeBlack}}>Please Send me the Contract details.</Text>
                  </View>
                  <View style={{flexDirection: 'column'}}>
                    <Text style={{fontSize: 10}}>09 APR</Text>
                    <View
                      style={{
                        height: 24,
                        width: 24,
                        borderRadius: 12,
                        backgroundColor: appColors.yellow,
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf:'flex-end',
                        marginTop:8
                      }}>
                      <Text style={{fontSize:10}}>2</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              //  onEndReached={() => {
              //    if (!loadingMore) {
              //      if (!nextUrl) {
              //        return; // No more data to load
              //      }
              //      setLoadingMore(true);
              //      // fetchJobs(page + 1);
              //      const payload = {
              //        url:nextUrl
              //      }
              //      console.log('payload ===> ', payload);
              //      dispatch(getJobs(payload));
              //    }
              //  }}
              //  onEndReachedThreshold={0.5}
              //  ListFooterComponent={() =>
              //    loadingMore ? <ActivityIndicator size="small" color={appColors.primary} style={{marginVertical: 16}} /> : null
              //  }
            />
          )}
        </View>
      </View>
      <ModalCreateChat
        modalVisible={visibleModal}
        onCloseClick={onCloseClick}
        onCreateClick={onCreateClick}
        managers={managers}
        name={name}
        setName={setName}
      />
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
    padding: 16,
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
    alignItems:'center'
  },
  avatar_: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});
