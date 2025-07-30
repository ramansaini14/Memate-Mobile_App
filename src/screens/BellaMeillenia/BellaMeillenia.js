import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {appColors} from '../../utils/appColors';
import WhiteBackIcon from '../../assets/svg/WhiteBackIcon';
import DoubleTick from '../../assets/svg/DoubleTick';
import SingleTick from '../../assets/svg/SingleTick';
import ChatGirl from '../../assets/svg/ChatGirl';
import AddCircle from '../../assets/svg/AddCircle';
import SendIcon from '../../assets/svg/SendIcon';
import {SafeAreaView} from 'react-native-safe-area-context';
import {emitSocket, getSocket, onSocket} from '../../socketService';

const ChatBubble = ({item, userId}) => {
  return (
    <View>
      <View style={[item?.sender == userId ? styles.sender : styles.receiver]}>
        <Text
          style={
            item?.sender == userId
              ? styles.receiverMessage
              : styles.senderMessage
          }>
          {item?.message}
        </Text>
      </View>
      <View style={styles.metaData}>
        {item?.sender == userId && (
          <View style={{flexDirection: 'row', alignItems: 'stretch'}}>
            <View style={{marginTop: 2}}>
              {item?.read_by?.length > 1 ? (
                <DoubleTick width={18} height={18} />
              ) : item?.delivered_to?.length > 1 ? (
                <DoubleTick width={18} height={18} fill={'#75808A'} />
              ) : (
                <SingleTick width={18} height={18} />
              )}
            </View>

            <Text style={styles.timestamp}>11:00</Text>
          </View>
        )}
      </View>
    </View>
  );
};
const ChatBubbleGroup = ({item, userId}) => {
  return (
    <View>
      <View style={[item?.sender == userId ? styles.sender : styles.receiver]}>
        <Text
          style={
            item?.sender == userId
              ? styles.receiverMessage
              : styles.senderMessage
          }>
          {item?.message}
        </Text>
      </View>
      <View style={styles.metaData}>
        {item?.sender == userId && (
          <View style={{flexDirection: 'row', alignItems: 'stretch'}}>
            {/* {item?.isSender && (
            <View style={{marginTop: 2}}>
              {item?.seen ? ( */}
            <DoubleTick width={18} height={18} />
            {/* ) : (
                <SingleTick width={18} height={18} />
              )}
            </View>
          )} */}
            <Text style={styles.timestamp}>11:00</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const MainChatRoom = ({navigation, route}) => {
  const {userId, groupId, name, image, isGroup} = route.params;

  const flatListRef = useRef();

  const [chatResponse, setChatResponse] = useState(null);
  const [message, setMessage] = useState('');

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const payload = {
      user_id: userId,
      group_id: groupId,
    };
    console.log('Payload ===> ', payload);
    emitSocket('get_group_messages', payload, setChatResponse);

    onSocket('new_message', response => {
      console.log('new_message ===> ', response);

      if (response.group_id === groupId) {
        setMessages(prevData => [response, ...prevData]);
        emitSocketWithoutCallback('message_read', {
          message_id: response.id,
          user_id: userId,
        });
      }
    });
  }, []);

  useEffect(() => {
    console.log('Messages ===> ', messages);
    if (chatResponse !== null && chatResponse.status === 'success') {
      setMessages(chatResponse.messages);
    }
  }, [chatResponse]);

  // useEffect(() => {
  //   // Scroll to bottom whenever messages change
  //   if (messages.length > 0) {
  //     flatListRef.current.scrollToEnd({animated: false});
  //   }
  // }, [messages]);

  const onSendMessage = () => {
    if (message.trim() === '') {
      // Check if the message is not empty
      return;
    }

    const payload = {
      user_id: userId, // your OrganizationUser.id
      chat_group_id: groupId, // the group you’re chatting in
      message: message, // your message text
      reply_to_id: null, // or the ID of the message you’re replying to
      file_url: null, // or a presigned-upload URL
      file_type: null, // e.g. "image/png"
    };

    emitSocket('send_message', payload, response => {
      console.log('Message sent successfully:', response);
      setMessages(prevData => [response.sent_message, ...prevData]);
    });

    setMessage(''); // Clear the input field after sending
  };

  return (
    <SafeAreaView style={styles.containerStyle}>
      <View style={styles.headerStyle}>
        <View style={{height: 40, width: 40}}>
          <WhiteBackIcon onPress={() => navigation.goBack()} />
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: appColors.black, fontWeight: '600'}}>
            {name}
          </Text>
          <Text style={{fontSize: 12}}>Organisation Name</Text>
        </View>
        <Image
          source={{
            uri: 'https://dev.memate.com.au/media/' + image,
          }}
          style={styles.avatar_}
          resizeMode="contain"
        />
        {/* <ChatGirl width={40} height={40} /> */}
      </View>

      {/* <KeyboardAvoidingView
        style={styles.container}
        // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
      <View style={styles.container}>
        <FlatList
          // ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <ChatBubble item={item} userId={userId} />}
          style={{paddingHorizontal: 10}}
          contentContainerStyle={{paddingBottom: 16}} // Ensures content is not covered by the chatBox
          inverted
        />
      </View>
      {/* </TouchableWithoutFeedback>
              </KeyboardAvoidingView> */}

      <View style={styles.chatBox}>
        <AddCircle width={25} height={25} />
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          placeholderTextColor={appColors.placeholderColor}
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity onPress={() => onSendMessage()}>
          <SendIcon width={40} height={40} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MainChatRoom;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: appColors.white,
    paddingTop: 16,
  },
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginHorizontal: 16,
  },
  chatBox: {
    backgroundColor: appColors.white,
    width: '100%',
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    // bottom: 0
  },
  input: {
    padding: 10,
    backgroundColor: appColors.offWhite,
    fontSize: 14,
    marginHorizontal: 16,
    color: appColors.black,
    borderRadius: 8,
    flex: 1, // Allows the input field to expand based on available space
  },
  container: {
    flex: 1,
    backgroundColor: appColors.offWhite,
  },
  sender: {
    alignSelf: 'flex-end',
    backgroundColor: appColors.white,
    maxWidth: '80%',
    padding: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    marginTop: 5,
  },
  receiver: {
    alignSelf: 'flex-start',
    backgroundColor: appColors.black,
    maxWidth: '80%',
    padding: 10,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginVertical: 5,
  },
  senderMessage: {
    fontSize: 13,
    lineHeight: 17,
    color: appColors.white,
  },
  receiverMessage: {
    fontSize: 13,
    lineHeight: 17,
    color: appColors.black,
  },
  metaData: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 5,
  },
  timestamp: {
    fontSize: 11,
    color: appColors.grey,
  },
  avatar_: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
