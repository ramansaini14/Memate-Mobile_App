import React, {use, useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Image,
} from 'react-native';
import {appColors} from '../utils/appColors';
import {Manager} from 'socket.io-client';
import ManagersDropDown from './ManagersDropDown';
import ProfilePictureIcon from '../assets/svg/ProfilePictureIcon';

const ModalCreateChat = ({
  modalVisible,
  onCloseClick,
  onCreateClick,
  managers,
  name,
  setName,
}) => {
  const [loading, setLoading] = useState(true);

  console.log('Modal Managers ===> ', managers);

  const onCreate = () => {
    const payload = {
      user_id: 1, // Replace with actual user ID
      name: 'New Chat', // Replace with actual chat name
      participants: [],
      organization_id: 1, // Replace with actual organization ID
      project_id: 1, // Replace with actual project ID
      task_id: 1, // Replace with actual task ID
    };
    onCreateClick(payload);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => onCloseClick()}>
      <View style={styles.modalOverlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create Chat</Text>
            <View style={{flex: 1}}>
              {managers != null && (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={managers}
                  keyExtractor={(item, index) =>
                    item.id?.toString() ?? index.toString()
                  }
                  renderItem={({item}) =>
                    item.last_message == null && (
                      <TouchableOpacity
                        key={item.id}
                        style={styles.chatCard}
                        onPress={() =>
                          navigation.navigate('JobCard', {data: item})
                        }>
                        {item.avatar ? (
                          <Image
                            source={{
                              uri:
                                'https://dev.memate.com.au/media/' +
                                item.avatar,
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
                            Position
                          </Text>
                        </View>
                        <View style={{flexDirection: 'column'}}>
                          <TouchableOpacity
                            onPress={() => onCreateClick(item)}
                            style={styles.startButton}>
                            <Text style={styles.closeButtonText}>Start</Text>
                          </TouchableOpacity>
                        </View>
                      </TouchableOpacity>
                    )
                  }
                />
              )}
            </View>

            {/* Close Button */}
            <TouchableOpacity
              onPress={() => onCloseClick()}
              style={[styles.closeButton, {marginBottom: 16}]}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    height: '80%',
  },
  modalContent: {
    flex: 1,
    backgroundColor: appColors.white,
    width: '100%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  scrollContainer: {
    width: '100%',
    backgroundColor: appColors.yellow,
  },
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
    alignItems: 'center',
  },
  listItemText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: appColors.black,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  startButton: {
    backgroundColor: appColors.black,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  avatar_: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  chatCard: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
});

export default ModalCreateChat;
