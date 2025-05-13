import {
    PanResponder,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useState } from 'react';
import { appColors } from '../../../utils/appColors';
import WhiteBackIcon from '../../../assets/svg/WhiteBackIcon';
import CalenderIcon from '../../../assets/svg/CalenderIcon';
import MenuIcon from '../../../assets/svg/MenuIcon';
import NotificationIcon from '../../../assets/svg/NotificationIcon';
import TrueIcon from '../../../assets/svg/TrueIcon';
import { SafeAreaView } from 'react-native-safe-area-context';

const CompleteTask = () => {

    return (
        <SafeAreaView style={styles.containerStyle}>
            <View style={styles.headerStyle}>
                <View style={{ height: 40, width: 40 }} >
                    <WhiteBackIcon onPress={() => navigation.goBack()} />
                </View>
                <Text style={styles.usernameStyle}>Tasks</Text>
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

                <View style={{ flexDirection: "row" }}>
                    <Text style={{ color: appColors.black, fontWeight: '600', marginBottom: 4, fontSize: 12, backgroundColor: appColors.yellow, paddingHorizontal: 10, paddingVertical: 2, borderRadius: 14, }}>Complete</Text>
                </View>
                <Text style={{ color: appColors.black, marginTop: 10, fontSize: 16, letterSpacing: .3, fontWeight: '600', fontSize: 22 }}>Convert a layout from Ai format to PDF format</Text>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'column', marginTop: 10, gap: 6 }}>
                        <Text style={{ color: appColors.grey, fontSize: 12, fontWeight: '600' }}>Created:</Text>
                        <Text
                            style={{
                                paddingVertical: 4,
                                backgroundColor: appColors.lightGrey,
                                paddingHorizontal: 8,
                                borderRadius: 16,
                                color: appColors.black,
                                fontWeight: '600',
                                fontSize: 12,
                            }}>
                            09.04.2024
                        </Text>
                    </View>
                </View>

                <View style={styles.descriptionCardStyle}>
                    <Text style={{ marginBottom: 4 }}>Description:</Text>
                    <Text style={{ color: appColors.black, fontSize: 16 }}>Convert a layout from Ai format to PDF format</Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('CompleteJob')} style={{ backgroundColor: appColors.yellow, paddingVertical: 16, width: '90%', borderRadius: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <TrueIcon width={25} height={25} />
                        <Text style={{ color: appColors.black, fontWeight: '600', fontSize: 16, marginLeft: 10 }}>Done</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView >
        </SafeAreaView >
    );
};

export default CompleteTask;

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
    descriptionCardStyle: {
        borderWidth: 1,
        borderColor: appColors.grey,
        padding: 20,
        borderRadius: 24,
        marginVertical: 20
    },
});
