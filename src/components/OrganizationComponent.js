import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {appColors} from '../utils/appColors';
import OrgIcon from '../assets/svg/OrgIcon';
import ListIcon from '../assets/svg/ListIcon';
import FrameIcon from '../assets/svg/Frame';
import ArrowRight from '../assets/svg/ArrowRight';
import JobsListIcon from '../assets/svg/JobsListIcon';
import BlackIconOrgSelection from '../assets/svg/BlackIconOrgSelection';
import BlackListIcon from '../assets/svg/BlackListIcon';
import BlackChatIcon from '../assets/svg/BlackChatIcon';
import GreenTick from '../assets/svg/GreenTick';
import LinearGradient from 'react-native-linear-gradient';

const OrganizationComponent = ({onNextClick, itemData, from}) => {
  const [isActive, setIsActive] = useState(true);

  console.log('From ===> ', itemData);
  return (
    // <LinearGradient
    //   colors={['#1AB2FF', '#FFB258']}
    //   start={{x: 0.2, y: 0.1}}
    //   end={{x: 0.5, y: 1}}
    //   style={[styles.containerStyle]}>
      <View
        style={[
          styles.innerContainerStyle,
          {backgroundColor: from == 1 ? appColors.offWhite : appColors.white},
        ]}>
        <View style={styles.viewStyle}>
          {/* <OrgIcon /> */}
          <Image
            source={{uri: itemData.logo!=null?(itemData.logo).replace('http://', 'https://'):""}}
            style={{width: 80, height: 36}}
            resizeMode="center"
          />
          <View style={styles.valueStyle}>
           <BlackIconOrgSelection />

            <Text
              style={[
                styles.textStyle,
                {
                  color:
                    itemData.jobs == 0
                      ? appColors.placeholderColor
                      : appColors.black,
                },
              ]}>
              {itemData.jobs}
            </Text>
            <BlackListIcon />
            <Text
              style={[
                styles.textStyle,
                {
                  color:
                    itemData.tasks == 0
                      ? appColors.placeholderColor
                      : appColors.black,
                },
              ]}>
              {itemData.tasks}
            </Text>
           <BlackChatIcon />
            <Text
              style={[
                styles.textStyle,
                {
                  color:
                    itemData.messages == 0
                      ? appColors.placeholderColor
                      : appColors.black,
                },
              ]}>
              {itemData.messages}
            </Text>
          </View>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: appColors.lightGrey,
            marginHorizontal: 16,
          }}
        />
        <TouchableOpacity
          style={styles.viewStyle}
          onPress={() => onNextClick(itemData)}>

          <Text style={styles.titleStyle}>{itemData.name}</Text>
          <ArrowRight />
        </TouchableOpacity>
      </View>
    // </LinearGradient>
  );
};

export default OrganizationComponent;

const styles = StyleSheet.create({
  containerStyle: {
    // backgroundColor: appColors.offWhite,
    margin: 16,
    borderRadius: 16,
  },
  innerContainerStyle: {
    backgroundColor: appColors.white,
    marginTop: 16,
    borderRadius: 16,
    marginHorizontal: 16,
  },
  viewStyle: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  valueStyle: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textStyle: {
    color: appColors.black,
    marginHorizontal: 8,
  },
  titleStyle: {
    color: appColors.black,
    fontFamily: 'SF-Pro',
    fontSize: 14,
    flex: 1,
    fontWeight:'600'
  },
  greenTick: {
    borderWidth: 2,
  },
});
