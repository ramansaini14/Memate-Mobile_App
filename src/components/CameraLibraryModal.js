import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';

const CameraLibraryModal = ({ visible, onClose, onSelect }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.option}
            onPress={() => onSelect('camera')}
          >
            <Text style={styles.text}>📷 Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => onSelect('library')}
          >
            <Text style={styles.text}>🖼️ Choose from Library</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.cancel}>
            <Text style={[styles.text, { color: 'red' }]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  option: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  cancel: {
    marginTop: 10,
    paddingVertical: 15,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  text: {
    fontSize: 18,
  },
});

export default CameraLibraryModal;
