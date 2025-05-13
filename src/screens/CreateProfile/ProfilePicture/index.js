import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {appColors} from '../../../utils/appColors';
import BackIcon from '../../../assets/svg/BackIcon';
import ProfilePictureIcon from '../../../assets/svg/ProfilePictureIcon';
import NextArrow from '../../../assets/svg/NextArrow';
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch } from 'react-redux';
import { hitUpdateProfile } from '../../../redux/UpdateProfileSlice';

const ProfilePicture = ({navigation, route}) => {
  const {profileData} = route.params;
  const [image, setImage] = useState(null);

  console.log('ProfileData ===> ', profileData);

  const dispatch = useDispatch()

  function pickImage() {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      cropperToolbarTitle: 'Crop your profile picture',
      cropperCircleOverlay: true,
      aspectRatio: 1,
      // hideBottomControls: true,
    }).then(img => {
      setImage(img);
      // setVisible(true);
    });
  }

  // useEffect(()=>{
  //   console.log("Image ===> ",image)
  // },[image])

  const onNextClick = () =>{
    const payload = {
      image : image,
      profileData : profileData
    }

    dispatch(hitUpdateProfile(payload))

  }

  return (
    <SafeAreaView style={styles.containerStyle}>
      <View style={styles.headerView}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {image == null ? <BackIcon /> : <Image source={{uri: image}} />}
        </TouchableOpacity>
        <Text style={styles.headerText}>Profile - Address</Text>
      </View>
      <View style={styles.mainViewStyle}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'sf-pro-text-semibold',
            color: appColors.white,
          }}>
          Profile Picture
        </Text>
        <TouchableOpacity
          style={{alignItems: 'center', marginVertical: 64,width: 120, height: 120,alignSelf:'center'}}
          onPress={pickImage}>
          {image == null ? (
            <ProfilePictureIcon />
          ) : (
            <Image
              source={{uri: image.path}}
              style={{width: 120, height: 120, borderRadius: 60}}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => onNextClick()}>
          <Text
            style={{
              color: appColors.black,
              fontWeight: '600',
              fontSize: 16,
              padding: 16,
              fontFamily: 'SF-Pro-Display-Bold',
              textAlign: 'center',
              flex: 1,
            }}>
            Next
          </Text>
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
  buttonStyle: {
    color: appColors.black,
    backgroundColor: appColors.white,
    borderRadius: 24,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
});
