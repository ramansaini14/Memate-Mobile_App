import React, {useState} from 'react';
import {
  Modal,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {appColors} from '../utils/appColors';
import CheckBox from '@react-native-community/checkbox';
import CrossCloseIcon from '../assets/svg/CrossCloseIcon';

const JobFilterModal = ({visible, onClose, filters, onItemSelect,selectedFilter}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  console.log('Filters ====> ', filters);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}>
      <SafeAreaView style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* To add blur over background of modal we can use npm i @react-native-community/blur */}
          <Text style={{color: 'white', fontSize: 24, marginBottom: 10, marginTop: 10, fontWeight: '600'}}>
            Filter
          </Text>
          <View style={styles.checkBoxContainer}>
            {filters.map((item, index) => (
              <View style={styles.row__} key={index}>
                <CheckBox
                  disabled={false}
                  value={selectedFilter.includes(index) && true}
                  boxType="square"
                  lineWidth={1.5}
                  onCheckColor={appColors.black} 
                  onFillColor={appColors.white} 
                  tintColor={appColors.borderLightGrey} 
                  onTintColor={appColors.black} 
                  onValueChange={newValue => onItemSelect(index)}
                  style={{width: 20, height: 20, borderRadius: 8, padding: 2}}
                />

                <Text onPress={() => onItemSelect(index)}>
                  <Text style={{
                    color: selectedFilter.includes(index) ? appColors.white : appColors.grey, 
                    fontSize: 16
                  }}>
                    {item.name}
                  </Text>
                </Text>
              </View>
            ))}
          </View>
            <TouchableOpacity style={styles.applyButtonStyle}>
              <Text style={{color: appColors.black, fontFamily: '', fontSize: 16, fontWeight: '600'}}>
                Apply
              </Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: appColors.white,
            height: 40,
            width: 40,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 24,
          }}
          onPress={onClose}>
          <Text style={styles.crossIconStyles}><CrossCloseIcon/></Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};

export default JobFilterModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  modalContainer: {
    width: '90%',
    backgroundColor: appColors.black,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
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
  row__: {
    // backgroundColor:appColors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginVertical: 9,
    
  },
  applyButtonStyle: {
    backgroundColor: appColors.white,
    borderRadius: 24,
    paddingVertical: 12,
    marginTop: 24,
    marginBottom: 16,
    paddingHorizontal: 64,
    marginVertical: 14,
  },
  checkBoxContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  }, 
  crossIconStyles: {
    justifyContent:'center',
    alignItems: 'center',
  }
});
