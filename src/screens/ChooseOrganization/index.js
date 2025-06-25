import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {appColors} from '../../utils/appColors';
import OrganizationComponent from '../../components/OrganizationComponent';
import RateStar from '../../assets/svg/RateStar';
import {useDispatch, useSelector} from 'react-redux';
import {
  getOrganization,
  getOrganizationClear,
} from '../../redux/getOrganizationSlice';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setGloballyOrgData } from '../../redux/GlobalSlice';
import CalenderIcon from '../../assets/svg/CalenderIcon';
import SimpleCalenderIcon from '../../assets/svg/SimpleCalenderIcon';

const ChooseOrganization = ({navigation}) => {
  const dispatch = useDispatch();

  const responseOrg = useSelector(state => state.getOrganizationReducer.data);
  const [orgData, setOrgData] = useState(null);

  const onNextClick = async itemData => {
    console.log('ORG ID ===> ', JSON.stringify(itemData.id));

    // await AsyncStorage.setItem('orgId', JSON.stringify(itemData.id));

    dispatch(setGloballyOrgData(itemData));

    if (itemData.terms) navigation.navigate('BottomBar', {orgId: itemData.id});
    else
      navigation.navigate('TermsAndConditions', {from: 'org', id: itemData.id});
  };

  useEffect(() => {
    dispatch(getOrganization());
  }, []);

  useEffect(() => {
    console.log('responseOrg ===> ', responseOrg);
    if (responseOrg != null) {
      setOrgData(responseOrg);
      // dispatch(getOrganizationClear())
    }
  }, [responseOrg]);

  return (
    <SafeAreaView style={styles.containerStyle}>
      <Text style={[styles.textStyle, {marginBottom: 20}]}>
        Choose Organization
      </Text>
      {orgData != null &&
        orgData.map(item => (
          <OrganizationComponent
            onNextClick={onNextClick}
            itemData={item}
            from={1}
          />
        ))}

        <TouchableOpacity style={styles.calenderButton} onPress={() => navigation.navigate('Unavailability')}>
        <SimpleCalenderIcon />
        <Text style={{fontSize:16,fontWeight:'700',marginLeft:8}}>Calender</Text>
        </TouchableOpacity>

      <View style={{justifyContent: 'flex-end', flex: 1}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('BottomBar')}
          style={{
            backgroundColor: appColors.black,
            marginHorizontal: 16,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            paddingVertical: 16,
          }}>
          <RateStar />
          <Text style={styles.rateTextStyle}>Rate MeMate</Text>
        </TouchableOpacity>
        <Text
          style={styles.termsStyle}
          onPress={() => navigation.navigate('Conditions')}>
          Terms and Conditions
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ChooseOrganization;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  textStyle: {
    fontFamily: 'SF-Pro',
    textAlign: 'center',
    fontWeight: '700',
    color: appColors.black,
    marginTop: 16,
    fontSize: 16,
  },
  rateTextStyle: {
    color: appColors.white,
    marginLeft: 8,
    fontFamily: 'SF-Pro',
    fontWeight: '700',
    fontSize: 16,
  },
  termsStyle: {
    textAlign: 'center',
    color: appColors.black,
    marginVertical: 16,
    fontFamily: 'SF-Pro',
    fontWeight: '700',
  },
  calenderButton:{
    backgroundColor: appColors.white,
    paddingHorizontal: 24,
    paddingVertical:16,
    borderRadius: 8,
    flexDirection:'row',
    borderRadius: 32,
    marginHorizontal: 32,
    alignItems: 'center',
    justifyContent:'center',
    borderWidth:1,
    borderColor: appColors.lightGrey,
    marginTop:32
  }
});
