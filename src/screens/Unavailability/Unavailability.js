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
import CalendarUnavailability from '../../assets/svg/CalendarUnavailability';
import HolidayCalendar from '../../assets/svg/HolidayCalendar';
import SickLeaveIcon from '../../assets/svg/SickLeaveIcon';
import { SafeAreaView } from 'react-native-safe-area-context';


const Unavailability = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.containerStyle}>
            <View style={styles.headerStyle}>
                <View style={{ height: 40, width: 40 }} >
                    <WhiteBackIcon onPress={() => navigation.goBack()} />
                </View>
                <Text style={styles.usernameStyle}>Unavailability</Text>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <TouchableOpacity style={{ marginHorizontal: 8 }}>
                        <CalenderIcon />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Menu')} >
                        <MenuIcon />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <Text style={styles.confirmStyle}>Add Unavailability</Text>

                <View style={{ marginBottom: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('NewDateAdd')}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={styles.calendarStyle} onPress={() => navigation.navigate('NewDateAdd')} >
                                <View style={{ width: 30, height: 30, marginRight: 10 }}>
                                    <CalendarUnavailability />
                                </View>
                                <Text style={styles.summaryStyle}>Unavailability</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ marginBottom: 20 }}>
                    <TouchableOpacity>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={styles.calendarStyle}>
                                <View style={{ width: 30, height: 30, marginRight: 10 }}>
                                    <HolidayCalendar />
                                </View>
                                <Text style={styles.summaryStyle}>Holliday</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.calendarStyle} >
                            <View style={{ width: 30, height: 30, marginRight: 10 }}>
                                <SickLeaveIcon />
                            </View>
                            <Text style={styles.summaryStyle}>Sick Leave</Text>
                        </View>
                    </View>
                </TouchableOpacity>

            </ScrollView >
        </SafeAreaView >
    );
};

export default Unavailability;

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
    confirmStyle: {
        color: appColors.black,
        fontFamily: 'SF-Pro',
        fontWeight: '700',
        fontSize: 19,
        marginTop: 5,
        marginBottom: 30,
        letterSpacing: .5,
        textAlign: 'center'
    },
    calendarStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: appColors.lightGrey,
        paddingHorizontal: 15,
        paddingVertical: 10,
        justifyContent: 'center',
        borderRadius: 25,
        width: '60%'
    },
    summaryStyle: {
        color: appColors.black,
        fontFamily: 'SF-Pro',
        fontWeight: '700',
        fontSize: 15,
    },
});
