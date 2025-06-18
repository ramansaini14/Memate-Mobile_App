import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import {appColors} from '../../utils/appColors';
  import WhiteCalenderIcon from '../../assets/svg/WhiteCalenderIcon';
  import WhiteMenuIcon from '../../assets/svg/WhiteMenuIcon';
  import WhiteBackIcon from '../../assets/svg/WhiteBackIcon';
  import {SafeAreaView} from 'react-native-safe-area-context';
  import {useDispatch, useSelector} from 'react-redux';
  import {hitDeleteProfile} from '../../redux/DeleteProfileSlice';
  
  const DeleteAccount = ({navigation}) => {
    const dispatch = useDispatch();
  
    const {statusCode, error, isLoading, data} = useSelector(
      state => state.verifyEmailReducer,
    );
  
    const onPressConfirm = () => {
      dispatch(hitDeleteProfile());
    //   navigation.navigate('StartScreen');
    };
  
    const clearToken = async () => {
      await AsyncStorage.clear();
      navigation.reset({
        index: 0,
        routes: [{name: 'StartScreen'}],
      });
    };
  
    useEffect(() => {
      if (data && data.status === 200) {
        clearToken();
      }
    }, [data]);
    return (
      <SafeAreaView style={styles.containerStyle}>
        <View style={styles.headerStyle}>
          <View style={{height: 40, width: 40}}>
            <WhiteBackIcon onPress={() => navigation.goBack()} />
          </View>
          <Text style={styles.usernameStyle}>Delete account</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity style={{marginHorizontal: 8}}>
              <WhiteCalenderIcon />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
              <WhiteMenuIcon />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 10,
          }}>
          <Text style={styles.confirmStyle}>Confirm account deletion?</Text>
  
          <Text
            style={{
              color: appColors.lightRed,
              fontSize: 15,
              marginBottom: 15,
              fontSize: 17,
              fontWeight: '700',
            }}>
            Account Deletion Disclaimer
          </Text>
          <View style={{flex: 1}}>
            <Text
              style={{color: appColors.white, fontSize: 17, fontWeight: '700'}}>
              {`By deleting your account, all associated data, including your personal information, settings, and any saved content, will be permanently removed from our system. This action is irreversible. If you wish to retain any data, please ensure you back it up before proceeding with account deletion. Please note that after your account is deleted, any services associated with your account will no longer be accessible. Additionally, any subscriptions or payments will be terminated, and refunds will not be issued for unused portions of subscriptions.
    
    If you wish to recover your account after deletion, you may need to contact our support team within 30 days. Recovery is not guaranteed and may be subject to additional fees. By confirming the deletion of your account, you acknowledge and accept these terms.`}
            </Text>
          </View>
  
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.editButton} onPress={() => navigation.goBack()}>
              <Text style={{color:appColors.white,textAlign:'center'}}>Decline</Text>
            </TouchableOpacity>
  
            <TouchableOpacity style={styles.saveChangeButton} onPress={() => onPressConfirm()}>
              <Text style={{color:appColors.black,textAlign:'center'}}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  };
  
  export default DeleteAccount;
  
  const styles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      backgroundColor: appColors.black,
      paddingHorizontal: 16,
    },
    headerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    usernameStyle: {
      color: appColors.white,
      fontFamily: 'SF-Pro',
      fontWeight: '700',
      fontSize: 16,
    },
    confirmStyle: {
      color: appColors.white,
      fontFamily: 'SF-Pro',
      fontWeight: '600',
      fontSize: 20,
      marginTop: 5,
      marginBottom: 10,
      letterSpacing: 0.5,
    },
    editButton: {
      color: appColors.white,
      borderWidth: 1,
      paddingVertical: 10,
      borderColor: appColors.grey,
      paddingHorizontal: 15,
      fontFamily: 'SF-Pro',
      fontWeight: '600',
      borderRadius: 20,
      textAlign: 'center',
      flex: 1,
      marginRight: 8,
    },
    saveChangeButton: {
      color: appColors.black,
      backgroundColor: appColors.lightRed,
      borderWidth: 1,
      paddingVertical: 10,
      paddingHorizontal: 15,
      fontFamily: 'SF-Pro',
      borderRadius: 20,
      textAlign: 'center',
      fontWeight: '600',
      flex: 1,
      marginLeft: 8,
    },
  });