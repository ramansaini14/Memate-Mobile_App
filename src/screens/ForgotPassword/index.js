import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, { useEffect, useRef, useState } from 'react';
  import { appColors } from '../../utils/appColors';
  import LogoIcon from '../../assets/svg/LogoIcon';
  import CheckBox from '@react-native-community/checkbox';
  import { useDispatch, useSelector } from 'react-redux';
  import { loginUser } from '../../redux/loginSlice';
  import axios from 'axios';
  import { SafeAreaView } from 'react-native-safe-area-context';
  import { ApiBaseUrl, BASE_URL, verifyEmail } from '../../utils/Constants';
  import _fetch from '../../utils/_fetch';
  import MainLogo from '../../assets/svg/MainLogo';
  import { clearVerifyEmailSlice, hitVerifyEmail } from '../../redux/VerifyEmailSlice';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import BackIcon from '../../assets/svg/BackIcon';
import { clearForgotSlice, hitForgotApi } from '../../redux/ForgotSlice';
  
  const ForgotPassword = ({ navigation,route }) => {
    const dispatch = useDispatch();
    
    // console.log("From ===> ",from)
  
    // const loginResponse = useSelector(state => state.profileReducer.data);
  
    const inputEmailRef = useRef(null);
    const inputPassRef = useRef(null);
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(false);
  
    const forgotSuccess = useSelector(state => state.forgotReducer.data);
     const {statusCode, error, isLoading,data } = useSelector(state => state.forgotReducer);
  
    const onLoginClick = async () => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const isValidEmail = emailRegex.test(email);
      setIsValid(isValidEmail);
  
      if(isValidEmail){
          const payload = {
            email:email
          }
          dispatch(hitForgotApi(payload))
        // 
      }
      else{
        Alert.alert("MeMate","Please enter valid email")
      }
    };
  
    const handleEmailChange = e => {
      setEmail(e);
    };
  
    const saveEmail = async() =>{
      await AsyncStorage.setItem("email",email)
    }
  
    useEffect(() => {
     
      if (forgotSuccess != null && statusCode == 200) {
        console.log('forgotSuccess ===>', forgotSuccess);
        navigation.navigate("VerifyForgotEmail",{email:email})
        dispatch(clearForgotSlice());
        // navigation('/ChooseOrganization');
          // Alert.alert("MeMate",responseVerifyEmail.message)
      } else if (forgotSuccess != null) {
        // alert('Invalid credentials!');
      }
    }, [forgotSuccess]);
  
    useEffect(() => { 
      console.log('error Error ===>', error);
      if(error!=null){
        if (error?.error) {
          Alert.alert('MeMate', error.error);
        } else if (error?.detail) {
          Alert.alert('MeMate', error.detail);
        } 
        dispatch(clearForgotSlice());
      }
    }, [error]);
  
    // Function to handle focus change
    const handleFocusChange = () => {
      setIsInputFocused(inputEmailRef.current.isFocused());
    };
    const handlePasswordFocusChange = () => {
      setIsPassInputFocused(inputPassRef.current.isFocused());
    };
  
    return (
      <SafeAreaView style={styles.containerStyle}>
         <View style={styles.textView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon />
          </TouchableOpacity>
          <Text style={styles.headerTextStyle}>Forgot Password- Email</Text>
        </View>
        <View style={styles.logoStyle}>
          <MainLogo width={200} />
        </View>
        <View style={styles.viewStyle}>
          <TextInput
            style={styles.inputStyle}
            placeholder="email@email.com"
            placeholderTextColor={appColors.placeholderColor}
            onChangeText={e => { handleEmailChange(e); }}
            keyboardType='email-address'
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.buttonStyle} onPress={() => { onLoginClick(); }}>
            <Text style={{ color: appColors.black, fontWeight: '700',fontSize:16 }}> Verify Email</Text>
          </TouchableOpacity>
        </View>
         {/* {from!=2&&<TouchableOpacity
                style={styles.signInStyle}
                onPress={() => {
                  navigation.navigate('SignIn');
                }}>
                <Text style={{color: appColors.white, fontWeight: '700', fontSize: 16}}>
                  Sign in with Phone
                </Text>
              </TouchableOpacity>} */}
      </SafeAreaView>
    );
  };
  
  export default ForgotPassword;
  
  const styles = StyleSheet.create({
    containerStyle: {
      backgroundColor: appColors.black,
      flex: 1,
    },
    logoStyle: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    viewStyle: {
      flex: 3,
    },
    inputStyle: {
      marginHorizontal: 16,
      borderRadius: 8,
      borderWidth:1,
      borderColor:appColors.borderLightGrey,
      backgroundColor: appColors.inputBackground,
      paddingHorizontal: 10,
      padding:20,
      fontSize:16,
      color:appColors.white
    },
    row_between: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 20,
      marginHorizontal: 16,
    },
    row__: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10
    },
    buttonStyle: {
      color: appColors.black,
      backgroundColor: appColors.white,
      marginHorizontal: 16,
      borderRadius: 30,
      marginTop: 24,
      alignItems: 'center',
      justifyContent: 'center',
      padding:20
    },
    textStyle: {
      color: appColors.white,
      fontWeight: '600',
    },
    signInStyle: {
      marginHorizontal: 16,
      borderRadius: 30,
      borderColor: appColors.grey,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding:20,
      marginBottom:24
    },
    headerTextStyle: {
      color: appColors.white,
      fontWeight: '700',
      fontSize: 16,
      textAlign: 'center',
      marginRight: 'auto',
      marginLeft: 'auto',
    },
    textView: {
      alignItems: 'center',
      marginTop: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginRight: 22,
      marginLeft: 8,
    },
  });
  