import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {appColors} from '../../../utils/appColors';
import BackIcon from '../../../assets/svg/BackIcon';
import ProfilePictureIcon from '../../../assets/svg/ProfilePictureIcon';
import NextArrow from '../../../assets/svg/NextArrow';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import {hitUpdateProfile} from '../../../redux/UpdateProfileSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfilePicture = ({navigation, route}) => {
  const {profileData} = route.params;
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const {statusCode,data} = useSelector((state)=>state.updateProfileReducer)

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);
        return Object.values(granted).every(val => val === 'granted');
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Please grant permission to continue');
      return;
    }

    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      cropperToolbarTitle: 'Crop your profile picture',
      cropperCircleOverlay: true,
      compressImageFormat: 'jpg',
      compressImageQuality: 0.8,
      mediaType: 'photo',
    })
      .then(img => {
        console.log('Selected image: ', img);
        setImage(img);
      })
      .catch(err => {
        if (err.code !== 'E_PICKER_CANCELLED') {
          Alert.alert('Error', 'Failed to pick image');
          console.error('Image picker error: ', err);
        }
      });
  };

  const onNextClick = () => {
    if (!image) {
      Alert.alert('Required', 'Please select an image');
      return;
    }

    const payload = {
      image,
      profileData,
    };

    dispatch(hitUpdateProfile(payload));
  };

  const clearAysnc = async () =>{
    await AsyncStorage.removeItem("isPinCreate")
    await AsyncStorage.removeItem("isRequired")
    await AsyncStorage.removeItem("isAppTerm")
    await AsyncStorage.removeItem("isNew")
    navigation.reset({
      index: 0,
      routes: [{name: 'ChooseOrganization'}],
    });
    // navigation.navigate('ChooseOrganization');
  }

  useEffect(()=>{
    if(statusCode==200){
      clearAysnc()
    }
  },[statusCode])

  return (
    <SafeAreaView style={styles.containerStyle}>
      <View style={styles.headerView}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerText}>Profile - Address</Text>
      </View>

      <View style={styles.mainViewStyle}>
        <Text style={styles.title}>Profile Picture</Text>

        <TouchableOpacity
          style={styles.imageWrapper}
          onPress={pickImage}>
          {image ? (
            <Image
              source={{uri: image.path}}
              style={styles.profileImage}
            />
          ) : (
            <ProfilePictureIcon />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={onNextClick}>
          <Text style={styles.buttonText}>Next</Text>
          <NextArrow />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfilePicture;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    padding: 16,
    backgroundColor: appColors.black,
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  headerText: {
    color: appColors.white,
    fontSize: 16,
    fontFamily: 'SF-Pro-Display-Bold',
    flex: 1,
    textAlign: 'center',
    fontWeight: '700',
  },
  mainViewStyle: {
    marginHorizontal: 32,
    marginVertical: 24,
  },
  title: {
    fontSize: 20,
    fontFamily: 'sf-pro-text-semibold',
    color: appColors.white,
    textAlign: 'center',
  },
  imageWrapper: {
    alignItems: 'center',
    marginVertical: 64,
    width: 120,
    height: 120,
    alignSelf: 'center',
    borderRadius: 60,
    overflow: 'hidden',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  buttonStyle: {
    backgroundColor: appColors.white,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  buttonText: {
    color: appColors.black,
    fontWeight: '600',
    fontSize: 16,
    padding: 16,
    fontFamily: 'SF-Pro-Display-Bold',
    flex: 1,
    textAlign: 'center',
  },
});