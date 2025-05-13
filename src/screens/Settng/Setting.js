import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Switch
} from 'react-native';
import React, { useState } from 'react';
import { appColors } from '../../utils/appColors';
import WhiteBackIcon from '../../assets/svg/WhiteBackIcon';
import CalenderIcon from '../../assets/svg/CalenderIcon';
import MenuIcon from '../../assets/svg/MenuIcon';
import { SafeAreaView } from 'react-native-safe-area-context';


const Setting = ({ navigation }) => {

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <SafeAreaView style={styles.containerStyle}>
            <View style={styles.headerStyle}>
                <View style={{ height: 40, width: 40 }} >
                    <WhiteBackIcon onPress={() => navigation.goBack()} />
                </View>
                <Text style={styles.usernameStyle}>Settings</Text>
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
            <ScrollView style={{ flex: 1 }} >
                <Text style={styles.confirmStyle}>Notifications</Text>

                <View style={{ paddingBottom: 15, borderColor: appColors.lightGrey, borderBottomWidth: 1 }}>
                    <Text style={styles.summaryStyle}>Weekly Summary</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 15 }}>Email Notifications</Text>
                        <Switch
                            trackColor={{ false: '#E9EBEE', true: '#000' }}
                            thumbColor={isEnabled ? '#fff' : '#fff'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                </View>

                <View style={{ paddingBottom: 15, marginTop: 20, borderColor: appColors.lightGrey, borderBottomWidth: 1 }}>
                    <Text style={styles.summaryStyle}>Job Confirmation Request</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 15 }}>Email Notifications</Text>
                        <Switch
                            trackColor={{ false: '#E9EBEE', true: '#000' }}
                            thumbColor={isEnabled ? '#fff' : '#fff'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                </View>

                <View style={{ paddingBottom: 15, marginTop: 20, borderColor: appColors.lightGrey, borderBottomWidth: 1 }}>
                    <Text style={styles.summaryStyle}>Job Approved</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 15 }}>Email Notifications</Text>
                        <Switch
                            trackColor={{ false: '#E9EBEE', true: '#000' }}
                            thumbColor={isEnabled ? '#fff' : '#fff'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                </View>

                <View style={{ paddingBottom: 15, marginTop: 20 }}>
                    <Text style={styles.confirmStyle}>Synchronize</Text>
                    <Text style={styles.summaryStyle}>Synchronize Your calendar</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 15 }}>Synchronize</Text>
                        <Switch
                            trackColor={{ false: '#E9EBEE', true: '#000' }}
                            thumbColor={isEnabled ? '#fff' : '#fff'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                </View>
            </ScrollView >
        </SafeAreaView >
    );
};

export default Setting;

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
        marginBottom: 15,
        letterSpacing: .5
    },
    summaryStyle: {
        color: appColors.black,
        fontSize: 17,
        marginBottom: 10
    },
});
