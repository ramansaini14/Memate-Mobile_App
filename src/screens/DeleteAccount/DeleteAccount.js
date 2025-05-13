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
import WhiteBackIcon from '../../assets/svg/WhiteBackIcon';
import { SafeAreaView } from 'react-native-safe-area-context';


const DeleteAccount = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.containerStyle}>
            <View style={styles.headerStyle}>
                <View style={{ height: 40, width: 40 }} >
                    <WhiteBackIcon onPress={() => navigation.goBack()} />
                </View>
                <Text style={styles.usernameStyle}>Delete account</Text>
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
            <View style={{
                flex: 1, paddingHorizontal: 10,
            }} >
                <Text style={styles.confirmStyle}>Confirm account deletion?</Text>

                <Text style={{ color: appColors.lightRed, fontSize: 15, marginBottom: 15 }}>Disclaimer</Text>
                <View style={{ flex: 1 }}>
                    <Text style={{ color: appColors.white, marginBottom: 15 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget magna fermentum iaculis eu. Aliquam etiam erat velit scelerisque in dictum non. Gravida in fermentum et sollicitudin. </Text>
                    <Text style={{ color: appColors.white }}>Enim ut sem viverra aliquet eget sit. Enim ut sem viverra aliquet. Sem et tortor consequat id porta nibh venenatis. Eget nullam non nisi est sit amet facilisis magna etiam. Faucibus et molestie ac feugiat sed lectus vestibulum mattis.</Text>

                </View>

                <View style={{ flexDirection: 'row' }}>

                    <Text style={styles.editButton} onPress={() => navigation.goBack()} >Decline</Text>

                    <Text style={styles.saveChangeButton}>Confirm</Text>

                </View>
            </View >
        </SafeAreaView >
    );
};

export default DeleteAccount;

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: appColors.black,
        paddingHorizontal: 16,
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
    confirmStyle: {
        color: appColors.white,
        fontFamily: 'SF-Pro',
        fontWeight: '600',
        fontSize: 20,
        marginTop: 5,
        marginBottom: 10,
        letterSpacing: .5
    },
    editButton: {
        color: appColors.white,
        borderWidth: 1,
        paddingVertical: 10,
        borderColor: appColors.grey,
        paddingHorizontal: 15,
        fontFamily: 'SF-Pro',
        fontWeight: '700',
        borderRadius: 20,
        textAlign: 'center',
        flex: 1,
        marginRight: 8
    },
    saveChangeButton: {
        color: appColors.black,
        backgroundColor: appColors.white,
        borderWidth: 1,
        paddingVertical: 10,
        borderColor: appColors.grey,
        paddingHorizontal: 15,
        fontFamily: 'SF-Pro',
        fontWeight: '700',
        borderRadius: 20,
        textAlign: 'center',
        flex: 1,
        marginLeft: 8,
        overflow: 'hidden'
    },
});
