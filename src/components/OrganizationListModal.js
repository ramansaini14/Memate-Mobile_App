import React, {useState} from 'react';
import {
  Modal,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import OrganizationComponent from './OrganizationComponent'; // Ensure the correct path
import {appColors} from '../utils/appColors';
import DeleteIcon from '../../src/assets/svg/DeleteIcon';
import DownIcon from '../assets/svg/DownIcon';
import NotificationIcon from '../assets/svg/NotificationIcon';
import CalenderIcon from '../assets/svg/CalenderIcon';
import MenuIcon from '../assets/svg/MenuIcon';
import ClockIcon from '../assets/svg/ClockIcon';
import CrossCloseIcon from '../assets/svg/CrossCloseIcon';
import {BlurView} from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';

const OrganizationListModal = ({
  visible,
  onClose,
  organizations,
  onItemSelect,
  navigation,
  selectedOrg,
  setOrgVisible,
}) => {
  const [isActive, setIsActive] = useState(true)
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <BlurView
        blurType="light"
        blurAmount={45}
        style={styles.absoluteFillObject}
        // backgroundColor='black'
      />
      <SafeAreaView style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.headerStyle}>
            {/* <DummyUserIcon /> */}
            {selectedOrg != null && (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => setOrgVisible(false)}>
                  <DownIcon hieght={16} width={16} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setOrgVisible(false)}>
                  <Image
                    source={{uri: selectedOrg.logo}}
                    style={{width: 80, height: 40}}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setOrgVisible(false)}>
                  <Text
                    style={[styles.smallTextStyleHeader, {width: 120}]}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {selectedOrg.name}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.right_}>
              <TouchableOpacity onPress={() => onClose()}>
                <NotificationIcon />
              </TouchableOpacity>

              <TouchableOpacity
                style={{marginHorizontal: 8}}
                onPress={() => {
                  navigation.navigate('Calendar');
                  onClose();
                }}>
                <CalenderIcon />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Menu');
                  onClose();
                }}>
                <MenuIcon />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <FlatList
              data={organizations}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <OrganizationComponent
                  itemData={item}
                  onNextClick={onItemSelect}
                  from={0}
                />
              )}
            />
          </View>
          {/* <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity> */}
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: appColors.white,
            height: 40,
            width: 40,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={onClose}>
          {/* <Text style={{color: appColors.black, fontSize: 20}}></Text> */}
          <CrossCloseIcon />
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};

export default OrganizationListModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    // backgroundColor: 'rgba(218, 216, 216, 0.98)',

    // justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    // backgroundColor: appColors.white,
    borderRadius: 16,
    // padding: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: appColors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: appColors.black,
    fontWeight: 'bold',
  },
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  right_: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  absoluteFillObject: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // backgroundColor: 'rgba(218, 216, 216, 0.98)'
  },
});
