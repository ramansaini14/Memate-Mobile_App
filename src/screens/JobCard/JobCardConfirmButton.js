import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React from 'react';
import { appColors } from '../../utils/appColors';
import WhiteBackIcon from '../../assets/svg/WhiteBackIcon';
import CalenderIcon from '../../assets/svg/CalenderIcon';
import MenuIcon from '../../assets/svg/MenuIcon';
import NotificationIcon from '../../assets/svg/NotificationIcon';
import CopyIcon from '../../assets/svg/CopyIcon';
import Map2 from '../../assets/svg/Map2';
import DocumentIcon from '../../assets/svg/DocumentIcon';
import ConfirmIcon from '../../assets/svg/ConfirmIcon';
import { SafeAreaView } from 'react-native-safe-area-context';

const JobCardConfirmButton = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.containerStyle}>
            <View style={styles.headerStyle}>
                <View style={{ height: 40, width: 40 }} >
                    <WhiteBackIcon onPress={() => navigation.goBack()} />
                </View>
                <Text style={styles.usernameStyle}>Job Card</Text>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <TouchableOpacity style={{ marginRight: 5 }}>
                        <NotificationIcon />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginHorizontal: 8 }}>
                        <CalenderIcon />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Menu')} >
                        <MenuIcon />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

                <Text style={styles.startJobButton} onPress={() => navigation.navigate('JobCardSwipeJob')}>Start the Job</Text>

                <View style={styles.headerViewStyle}>
                    <View
                        style={{
                            flexDirection: 'row',
                            backgroundColor: appColors.yellow,
                            alignItems: 'center',
                            borderRadius: 16,
                        }}>
                        <Text
                            style={{
                                backgroundColor: appColors.yellow,
                                paddingLeft: 8,
                                paddingVertical: 3,
                                color: appColors.black,
                                borderRadius: 16,
                                fontSize: 12,
                            }}>
                            Time Frame
                        </Text>
                        <Text
                            style={{
                                backgroundColor: appColors.white,
                                marginLeft: 4,
                                marginRight: 4,
                                borderTopRightRadius: 8,
                                borderBottomRightRadius: 8,
                                paddingHorizontal: 4,
                                fontSize: 12,
                            }}>
                            Hours
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                        }}>
                        <ConfirmIcon width={20} height={20} />
                        <Text style={styles.headerTextStyle}>Confirmed</Text>
                    </View>
                </View>

                <Text
                    style={{
                        color: appColors.black,
                        fontSize: 12,
                        fontFamily: 'SF-Pro',
                        fontWeight: '600',
                        marginBottom: 10
                    }}>
                    THE-JB-113-134568
                </Text>

                <Text style={styles.headStyle}>Create logo for our new brand</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15, marginBottom: 20 }}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontSize: 12, marginLeft: 5 }}>Start date:</Text>
                        <Text
                            style={{
                                marginTop: 4,
                                paddingVertical: 4,
                                backgroundColor: appColors.lightGrey,
                                paddingHorizontal: 8,
                                borderRadius: 16,
                                color: appColors.black,
                                fontWeight: '600',
                                fontSize: 12,
                            }}>
                            09.04.2024 {'  '}
                            <Text style={{ color: appColors.placeholderColor }}>09:32</Text>
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontSize: 12, marginLeft: 5 }}>Finish date:</Text>
                        <Text
                            style={{
                                marginTop: 4,
                                paddingVertical: 4,
                                backgroundColor: appColors.lightGrey,
                                paddingHorizontal: 8,
                                borderRadius: 16,
                                color: appColors.black,
                                fontWeight: '600',
                                fontSize: 12,
                            }}>
                            09.04.2024 {'  '}
                            <Text style={{ color: appColors.placeholderColor }}>09:32</Text>
                        </Text>
                    </View>
                </View>

                <View style={styles.blackCardStyle}>
                    <View>
                        <Text style={styles.timePaymentStyle}>Time</Text>
                        <Text style={styles.cardHoursStyle}>20h</Text>
                    </View>
                    <View>
                        <Text style={styles.timePaymentStyle}>Payment</Text>
                        <Text style={styles.cardHoursStyle}>$400.00</Text>
                    </View>
                    <View>
                        <Text style={styles.timePaymentStyle}>Variations</Text>
                        <Text style={styles.cardHoursStyle}>$50.00</Text>
                    </View>
                </View>

                <View style={styles.descriptionCardStyle}>
                    <Text style={{ marginBottom: 4 }}>Description:</Text>
                    <Text style={{ color: appColors.black, fontSize: 16 }}>Create a new logo for one of our clients. We want to create a logo that has a premium look. The brief of the logo you can find here included.</Text>
                    <View style={{ marginTop: 10, alignItems: 'flex-end' }}>
                        <CopyIcon width={16} height={16} />
                    </View>
                </View>

                <Text>Location:</Text>
                <Text style={{ color: appColors.black, marginTop: 4 }}>9/89-97 Jones St, Ultimo NSW 2007, Australia</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6, marginBottom: 16 }}>
                    <Map2 width={14} height={14} />
                    <Text style={{ color: appColors.black, fontSize: 16, borderBottomWidth: 2, borderColor: appColors.grey, paddingBottom: 4 }}>Open in Maps</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text>Documents Attached </Text>
                    <Text style={{ backgroundColor: appColors.grey, paddingHorizontal: 5, color: appColors.white, borderRadius: 50, marginLeft: 4 }}>1</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 4, marginTop: 12, paddingBottom: 15, borderColor: appColors.lightGrey, borderBottomWidth: 1 }}>
                    <DocumentIcon width={18} height={18} />
                    <Text style={{ color: appColors.black, }}>Brief.pdf</Text>
                </View>

                <View style={{ alignItems: 'flex-end', marginBottom: 20 }}>
                    <Text style={{ marginTop: 4, borderBottomWidth: 1, borderColor: appColors.black, color: appColors.black }}>History Log</Text>
                </View>

            </ScrollView >
        </SafeAreaView >
    );
};

export default JobCardConfirmButton;

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: appColors.white,
        paddingHorizontal: 16,
    },
    headerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16
    },
    usernameStyle: {
        color: appColors.black,
        fontFamily: 'SF-Pro',
        fontWeight: '700',
        fontSize: 16
    },
    startJobButton: {
        backgroundColor: appColors.black,
        padding: 16,
        textAlign: 'center',
        borderRadius: 24,
        color: appColors.white,
        fontWeight: '600',
        fontSize: 16,
        marginBottom: 10
    },
    headerViewStyle: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 15,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerTextStyle: {
        fontSize: 12,
        fontWeight: '700',
        color: appColors.black,
        fontFamily: 'SF-Pro',
    },
    headStyle: {
        fontSize: 20,
        fontWeight: '600',
        color: appColors.black,
        marginBottom: 15
    },
    blackCardStyle: {
        backgroundColor: appColors.black,
        padding: 20,
        borderRadius: 24,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    timePaymentStyle: {
        color: appColors.grey,
        marginBottom: 5
    },
    cardHoursStyle: {
        fontSize: 18,
        color: appColors.white,
    },
    descriptionCardStyle: {
        borderWidth: 1,
        borderColor: appColors.grey,
        padding: 20,
        borderRadius: 24,
        marginBottom: 20
    },
    confirmButton: {
        backgroundColor: appColors.black,
        color: appColors.white,
        fontSize: 16,
        fontWeight: '600',
        borderWidth: 1,
        borderColor: appColors.black,
        flex: 1,
        textAlign: 'center',
        padding: 12,
        borderRadius: 30
    },
    declineButton: {
        backgroundColor: appColors.white,
        color: appColors.black,
        fontSize: 16,
        borderWidth: 1,
        fontWeight: '600',
        borderColor: appColors.black,
        flex: 1,
        textAlign: 'center',
        padding: 12,
        borderRadius: 30
    },
});
