import React, { use, useState } from 'react';
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
} from 'react-native';
import {appColors} from '../utils/appColors';
import { Manager } from 'socket.io-client';
import ManagersDropDown from './ManagersDropDown';

const ModalCreateChat = ({
  modalVisible,
  onCloseClick,
  onCreateClick,
  managers,
}) => {
  const [loading, setLoading] = useState(true);

  console.log("Modal Managers ===> ", managers);

  const onCreate = () => {
    const payload = {
      user_id: 1, // Replace with actual user ID
      name: 'New Chat', // Replace with actual chat name
      participants:[],
      organization_id: 1, // Replace with actual organization ID
      project_id: 1, // Replace with actual project ID
      task_id: 1, // Replace with actual task ID
    }
    onCreateClick(payload);
  }

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
            <View style={{flex:1}}>

            <ManagersDropDown managers={managers}/>
            </View>

            {/* Close Button */}
            <TouchableOpacity
              onPress={() => onCloseClick()}
              style={styles.closeButton}>
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
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    height:"50%",
  },
  modalContent: {
    flex:1,
    width: '100%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
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
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ModalCreateChat;
