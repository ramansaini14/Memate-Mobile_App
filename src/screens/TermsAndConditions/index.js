/* eslint-disable react-native/no-inline-styles */
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, TextInput} from 'react-native';
import {appColors} from '../../utils/appColors';
import BackIcon from '../../assets/svg/BackIcon';
import {useDispatch, useSelector} from 'react-redux';
import {hitAppTerms} from '../../redux/GetAppTermsSlice';
import {
  clearAcceptDeclineTerms,
  hitAcceptDeclineTerms,
} from '../../redux/AcceptDeclineTermSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RenderHtml from 'react-native-render-html';
import {useWindowDimensions} from 'react-native';

const TermsAndConditions = ({navigation, route}) => {
  const {from, id} = route.params;
  const dispatch = useDispatch();
  const responseTerms = useSelector(state => state.getAppTermsReducer.data);

  const {width} = useWindowDimensions();

  const responseAcceptDecline = useSelector(
    state => state.acceptDeclineTermsReducer.data,
  );

  const [terms, setTerms] = useState(null);

  const handleClick = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'ChooseOrganization'}],
    });
  };

  useEffect(() => {
    const payload = {
      orgId: id,
    };
    dispatch(hitAppTerms(payload));
  }, []);

  useEffect(() => {
    console.log('responseTerms ===> ', responseTerms);
    if (responseTerms != null && responseTerms.status == 'OK') {
      setTerms(responseTerms);
    }
  }, [responseTerms]);

  const onDeclineClick = () => {
    if (from == 'org') {
      navigation.reset({
        index: 0,
        routes: [{name: 'ChooseOrganization'}],
      });
    } else {
      navigation.navigate('SignInWithEmail', {from: 2});
    }
  };

  const onAcceptClick = async () => {
    if (from == 'org') {
      const payload = {
        accept: 'accept',
        id: id,
      };
      dispatch(hitAcceptDeclineTerms(payload));
    } else {
      await AsyncStorage.setItem('isAppTerm', 'true');
      navigation.navigate('RequireDetails');
    }
  };

  useEffect(() => {
    if (responseAcceptDecline != null) {
      // navigation.reset({
      //   index: 0,
      //   routes: [{name: 'BottomBar'}],
      // });
      navigation.goBack();
      // navigation.navigate('BottomBar');
      dispatch(clearAcceptDeclineTerms());
    }
  }, [responseAcceptDecline]);

  return (
    <SafeAreaView style={styles.appDesign}>
      <View style={styles.headerView}>
        <TouchableOpacity onPress={handleClick}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerText}>Terms and Conditions</Text>
      </View>
      <ScrollView style={{padding: 16,marginBottom:16}} showsVerticalScrollIndicator={false}>
        {terms != null && (
          <RenderHtml
            contentWidth={width}
            source={{html: terms.text}}
            baseStyle={{color: appColors.white}}
          />
        )}
      </ScrollView>
      {/* <View>
        <Text style={styles.fontColor}>Terms and Conditions</Text>
      </View>
      <Text style={styles.textStyle}>Conditions of use</Text>
      <Text style={styles.paragraphStyles}>
        By using this website, you certify that you have read and reviewed this
        Agreement and that you agree to comply with its terms.If you do not want
        to be bound by the terms of this Agreement, you are advised to stop
        using the website accordingly. [company name] only grants use and access
        of this website, its products, and its services to those who have
        accepted its terms.
      </Text>
      <Text style={styles.textStyle}>Privacy policy</Text>
      <Text style={styles.paragraphStyles}>
        Before you continue using our website,we advise you to read our privacy
        policy [link to privacy policy] regarding our user data collection. It
        will help you better understand our practices.
      </Text> */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.blackBtn}
          onPress={() => onDeclineClick()}>
          <Text
            style={{
              color: appColors.white,
              fontWeight: '600',
              fontSize: 16,
              paddingVertical: 14,
       
            }}>
            Decline
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.whiteBtn}
          onPress={() => onAcceptClick()}>
          <Text
            style={{
              color: appColors.black,
              fontWeight: '600',
              fontSize: 16,
              padding: 14,
              textAlign: 'center',
              flex: 1,
            }}>
            Accept
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TermsAndConditions;

const styles = StyleSheet.create({
  appDesign: {
    backgroundColor: 'black',
    height: '100%',
  },
  backButton: {
    backgroundColor: 'white',
    padding: 32,
    borderRadius: 32,
  },
  headerText: {
    color: 'white',
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
    fontWeight: '700',
    padding: 16,
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  fontColor: {
    color: 'white',
    fontSize: 26,
    padding: 16,
    paddingTop: 16,
    fontWeight: 600,
  },
  textStyle: {
    fontSize: 17,
    padding: 9,
    paddingLeft: 16,
    color: 'white',
    fontWeight: '600',
  },
  whiteBtn: {
    color: appColors.black,
    backgroundColor: appColors.white,
    borderRadius: 24,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
    flex: 1,
  },
  blackBtn: {
    color: appColors.white,
    backgroundColor: appColors.black,
    borderRadius: 24,
    alignItems: 'center',
    paddingHorizontal: 16,
    // paddingVertical: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: appColors.white,
    flex:1
  },
  paragraphStyles: {
    color: 'white',
    fontSize: 16,
    lineHeight: 22,
    padding: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
  inputViewStyle: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: appColors.borderLightGrey,
    marginTop: 8,
    padding: 2,
    flexDirection: 'row',
    backgroundColor: appColors.inputBackground,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 40,
    gap: 10,
  },
});
