import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput
} from 'react-native';
import React, { useState } from 'react';
import { appColors } from '../../utils/appColors';
import WhiteBackIcon from '../../assets/svg/WhiteBackIcon';
import CalenderIcon from '../../assets/svg/CalenderIcon';
import MenuIcon from '../../assets/svg/MenuIcon';
import NotificationIcon from '../../assets/svg/NotificationIcon';
import CopyIcon from '../../assets/svg/CopyIcon';
import Map2 from '../../assets/svg/Map2';
import DocumentIcon from '../../assets/svg/DocumentIcon';
import WorkIcon from '../../assets/svg/WorkIcon';
import AddCircle from '../../assets/svg/AddCircle';
import SendIcon from '../../assets/svg/SendIcon';
import StarIcon from '../../assets/svg/StarIcon';
import { SafeAreaView } from 'react-native-safe-area-context';

const ApprovedJob = ({ navigation }) => {

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
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                        }} onPress={() => navigation.navigate('EditionWork')} >
                        <StarIcon width={20} height={20} />
                        <Text style={styles.headerTextStyle} >Done. Approved</Text>
                    </TouchableOpacity>
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

                <View style={{ alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row', flex: 1 }}>
                    <Text style={{ color: appColors.white, marginLeft: 6, borderRadius: 24, paddingHorizontal: 20, paddingVertical: 12, backgroundColor: appColors.black, marginBottom: 10, marginTop: 16 }}>
                        Start Chat
                    </Text>
                </View>

                <Text style={{ color: appColors.black, fontWeight: '600', fontSize: 18, marginBottom: 10 }}>Notes</Text>

                <View style={{ marginBottom: 4 }}>
                    <View style={styles.noteCardStyle}>
                        <Text style={{ color: appColors.black, fontWeight: '600', marginBottom: 4 }}>The work is complete. I am sending a photo, please look and evaluate the result</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <WorkIcon width={32} height={32} />
                            <Text style={{ color: appColors.black, marginLeft: 10 }}>Completed work.jpg</Text>
                        </View>
                    </View>
                    <Text style={{ fontSize: 12, fontWeight: '600', textAlign: 'right', marginTop: 10 }}>18:51</Text>
                </View>

                <View style={styles.chatBox}>
                    <AddCircle width={25} height={25} />
                    <TextInput
                        style={{
                            padding: 10,
                            backgroundColor: appColors.offWhite,
                            fontSize: 14,
                            marginHorizontal: 16,
                            color: appColors.black,
                            borderRadius: 8,
                            width: "70%"
                        }}
                        placeholder="Good morning"
                        placeholderTextColor={appColors.black}
                    />
                    <SendIcon width={40} height={40} />
                </View>

                <View style={{ alignItems: 'flex-end', marginTop: 6 }}>
                    <Text style={{ marginTop: 4, borderBottomWidth: 1, borderColor: appColors.black, color: appColors.black }}>History Log</Text>
                </View>

            </ScrollView >
        </SafeAreaView >
    );
};

export default ApprovedJob;

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
    swipeButton: {
        backgroundColor: appColors.black,
        padding: 0,
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        width: '70%'
    },
    arrowContainer: {
        backgroundColor: '#DAFD90',
        padding: 10,
        borderRadius: 35,
        marginRight: 20,
    },
    arrow: {
        fontSize: 26,
        marginBottom: 6,
        paddingHorizontal: 6,
        fontWeight: 'bold',
        color: appColors.black,
    },
    text: {
        color: '#FFF',
        fontSize: 16,
    },
    headerViewStyle: {
        flexDirection: 'row',
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
    tamingStyle: {
        borderWidth: 1,
        borderColor: appColors.black,
        paddingHorizontal: 8,
        paddingVertical: 2,
        fontSize: 10,
        fontWeight: '600',
        borderRadius: 24,
        marginLeft: 6,
        color: appColors.black
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
    noteCardStyle: {
        backgroundColor: appColors.lightGrey,
        padding: 14,
        borderRadius: 24,
        borderBottomRightRadius: 0
    },
    chatBox: {
        paddingTop: 20,
        paddingBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: appColors.lightGrey,
        justifyContent: 'space-between'
    },
});
