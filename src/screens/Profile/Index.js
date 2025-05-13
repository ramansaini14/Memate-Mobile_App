import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useState } from 'react';
import { appColors } from '../../utils/appColors';
import WhiteCalenderIcon from '../../assets/svg/WhiteCalenderIcon';
import WhiteMenuIcon from '../../assets/svg/WhiteMenuIcon';
import UserIcon from '../../assets/svg/UserIcon';
import WhiteBackIcon from '../../assets/svg/WhiteBackIcon';
import { SafeAreaView } from 'react-native-safe-area-context';

// const { height, width } = Dimensions.get("window");

const Profile = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.containerStyle}>
            <View style={styles.headerStyle}>
                <View style={{ height: 40, width: 40 }} >
                    <WhiteBackIcon onPress={() => navigation.navigate('Menu')} />
                </View>
                <Text style={styles.usernameStyle}>Profile</Text>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <TouchableOpacity style={{ marginHorizontal: 8 }}>
                        <WhiteCalenderIcon />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Menu')} >
                        <WhiteMenuIcon />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={{ flex: 1 }} >
                <View style={{ alignItems: 'center' }}>
                    <View style={{ marginVertical: 15 }}>
                        <UserIcon />
                    </View>
                    <Text style={styles.userName}>Username Lastname</Text>
                    <Text style={{ color: appColors.grey, marginBottom: 5 }}>Designer</Text>
                    <Text style={styles.ratingNumber}>Rating: <Text style={{ color: appColors.yellow }}>367</Text></Text>
                </View>
                <View style={{ paddingBottom: 15, borderColor: appColors.grey, borderBottomWidth: 2 }}>
                    <Text style={styles.userDetailStyle}>User Details</Text>
                    <View style={{ marginBottom: 8 }}>
                        <Text style={{ color: appColors.grey, fontSize: 13 }}>Email</Text>
                        <Text style={{ color: appColors.white, fontSize: 15 }}>email@gmail.com</Text>
                    </View>
                    <View style={{ marginBottom: 8 }}>
                        <Text style={{ color: appColors.grey, fontSize: 13 }}>Phone</Text>
                        <Text style={{ color: appColors.white, fontSize: 15 }}>+61234567235</Text>
                    </View>
                    <View style={{ marginBottom: 8 }}>
                        <Text style={{ color: appColors.grey, fontSize: 13 }}>DOB</Text>
                        <Text style={{ color: appColors.white, fontSize: 15 }}>1986-11-25</Text>
                    </View>
                    <View style={{ marginBottom: 8 }}>
                        <Text style={{ color: appColors.grey, fontSize: 13 }}>ABN</Text>
                        <Text style={{ color: appColors.white, fontSize: 15 }}>51 824 753 556</Text>
                    </View>
                    <View style={{ marginBottom: 8 }}>
                        <Text style={{ color: appColors.grey, fontSize: 13 }}>Address</Text>
                        <Text style={{ color: appColors.white, fontSize: 15 }}>9/89-97 Jones St, Ultimo NSW 2007, Australia</Text>
                    </View>
                </View>
                <View style={{ marginTop: 15 }}>
                    <Text style={[styles.userDetailStyle, { marginBottom: 10 }]}>Emergency Contact</Text>
                    <View style={{ marginBottom: 8 }}>
                        <Text style={{ color: appColors.grey, fontSize: 13 }}>Contact Name</Text>
                        <Text style={{ color: appColors.white, fontSize: 15, marginBottom: 8 }}>Andika Fitra</Text>
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ color: appColors.grey, fontSize: 13 }}>Phone</Text>
                        <Text style={{ color: appColors.white, fontSize: 15 }}>+61234567235</Text>
                    </View>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.editButton} onPress={() => navigation.navigate('EditProfile')} >Edit Profile</Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: appColors.black,
        padding: 16,
    },
    headerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16
    },
    usernameStyle: {
        color: appColors.white,
        fontFamily: 'SF-Pro',
        fontWeight: '700',
        fontSize: 16
    },
    userName: {
        color: appColors.white,
        fontFamily: 'SF-Pro',
        fontWeight: '700',
        fontSize: 22,
    },
    ratingNumber: {
        color: appColors.white,
        fontFamily: 'SF-Pro',
        fontWeight: '700',
        fontSize: 17,
        marginBottom: 15
    },
    userDetailStyle: {
        color: appColors.white,
        fontFamily: 'SF-Pro',
        fontWeight: '700',
        fontSize: 19,
        marginBottom: 10
    },
    editButton: {
        color: appColors.white,
        borderWidth: 1,
        paddingVertical: 10,
        borderColor: appColors.grey,
        paddingHorizontal: 15,
        fontFamily: 'SF-Pro',
        fontWeight: '700',
        borderRadius: 25,
        textAlign: 'center',

    },
    inputStyle: {
        borderRadius: 8,
        backgroundColor: appColors.inputBackground,
        borderWidth: 1,
        marginTop: 5,
        paddingHorizontal: 16,
    },
});
