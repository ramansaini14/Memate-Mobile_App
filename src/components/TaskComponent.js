import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {appColors} from '../utils/appColors';
import ClockIcon from '../assets/svg/ClockIcon';
import MapMarkerIcon from '../assets/svg/MapMarkerIcon';
import StatusIcon from '../assets/svg/StatusIcon';
import moment from 'moment';

const TaskComponent = ({itemData}) => {

  const breakText = (text, maxLength) => {
    if (!text) return '';
    const regex = new RegExp(`.{1,${maxLength}}`, 'g');
    return text.match(regex).join('\n');
  };

  return (
    <View style={styles.shiftCard}>
      <View style={styles.viewStyle}>
        <View style={styles.headerViewStyle}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: appColors.lightGreen,
              alignItems: 'center',
              borderRadius: 16,
              borderRadius: 16,
              marginTop: 8,
            }}>
            <Text
              style={{
                paddingLeft: 8,
                paddingVertical: 3,
                color: appColors.black,
                fontFamily: 'SF-Pro-Text-Semibold',
                borderRadius: 16,
                fontSize: 11,
                fontWeight: '600',
              }}>
              {itemData.time_type_text}
            </Text>
            <View
              style={{
                backgroundColor: appColors.white,
                marginLeft: 4,
                marginRight: 1,
                borderTopRightRadius: 8,
                borderBottomRightRadius: 8,
                paddingVertical: 2,
                paddingHorizontal: 6,
              }}>
              <Text
                style={{
                  fontSize: 11,
                  fontFamily: 'SF-Pro-Text-Semibold',
                  fontWeight: '600',
                }}>
                {itemData.type_text}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <View style={{marginRight: 4}}>
              <ClockIcon />
            </View>
            <Text style={styles.headerTextStyle}>{itemData.duration}h</Text>
            <Text style={[styles.headerTextStyle, {marginLeft: 8}]}>
              ${itemData.cost}
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
        <View style={{padding: 16}}>
          <Text
            style={{
              color: appColors.black,
              fontSize: 10,
              fontFamily: 'SF-Pro-Text-Semibold',
              fontWeight: '600',
            }}>
            {itemData.number}
          </Text>
          <Text style={[styles.headerTextStyle, {marginTop: 8}]}>
            {itemData.short_description}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 8,
              alignItems: 'center',
            }}>
            <MapMarkerIcon />
            <Text
              style={{
                color: appColors.placeholderColor,
                fontFamily: 'SF-Pro-Text-Semibold',
                fontWeight: '600',
                fontSize: 11,
                flex:1
              }}>
              {breakText(itemData.address, 50)}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                borderRadius: 12,
                backgroundColor: appColors.white,
                marginTop: 8,
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  paddingVertical: 4,
                  paddingHorizontal: 8,
                  color: appColors.black,
                  fontWeight: '600',
                  fontFamily: 'SF-Pro-Text-Semibold',
                  fontSize: 11,
                }}>
                {moment
                  .unix(parseInt(itemData.start_date, 10))
                  .format('DD.MM.YYYY')}
              </Text>
              <Text
                style={{
                  paddingVertical: 4,
                  paddingRight: 8,
                  color: appColors.placeholderColor,
                  fontWeight: '600',
                  fontFamily: 'SF-Pro-Text-Semibold',
                  fontSize: 11,
                }}>
                {moment.unix(parseInt(itemData.start_date, 10)).format('HH:mm')}
              </Text>
            </View>
            <View
              style={{
                width: 10,
                backgroundColor: appColors.placeholderColor,
                height: 1,
                marginHorizontal: 5,
                marginTop: 8,
              }}
            />
            <View
              style={{
                borderRadius: 12,
                backgroundColor: appColors.white,
                marginTop: 8,
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  paddingVertical: 4,
                  paddingHorizontal: 8,
                  color: appColors.black,
                  fontWeight: '600',
                  fontFamily: 'SF-Pro-Text-Semibold',
                  fontSize: 12,
                }}>
                {moment
                  .unix(parseInt(itemData.end_date, 10))
                  .format('DD.MM.YYYY')}
              </Text>
              <Text
                style={{
                  paddingVertical: 4,
                  paddingRight: 8,
                  color: appColors.placeholderColor,
                  fontWeight: '600',
                  fontFamily: 'SF-Pro-Text-Semibold',
                  fontSize: 11,
                }}>
                {moment.unix(parseInt(itemData.end_date, 10)).format('HH:mm')}
              </Text>
            </View>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: appColors.lightGrey,
              marginTop: 16,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              marginTop: 16,
              alignItems: 'center',
            }}>
            <StatusIcon />
            <Text
              style={{
                marginLeft: 8,
                color: appColors.black,
                fontFamily: 'SF-Pro-Text-Semibold',
                fontSize: 12,
                fontWeight: '600',
              }}>
              {itemData.status_text}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TaskComponent;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: appColors.white,
    paddingBottom: 16,
  },
  titleStyle: {
    color: appColors.black,
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'SF-Pro',
  },
  viewStyle: {
    backgroundColor: appColors.offWhite,
    borderRadius: 16,
    marginTop: 16,
    paddingHorizontal: 8,
  },
  headerViewStyle: {
    flexDirection: 'row',
    margin: 10,
  },
  headerTextStyle: {
    fontSize: 16,
    fontWeight: '600',
    color: appColors.black,
    fontFamily: 'SF-Pro',
  },
  shiftCard: {
    flex: 1,
    backgroundColor: appColors.white,
  },
});
