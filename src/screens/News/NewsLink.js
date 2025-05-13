import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useState } from 'react';
import { appColors } from '../../utils/appColors';
import WhiteBackIcon from '../../assets/svg/WhiteBackIcon';
import CalenderIcon from '../../assets/svg/CalenderIcon';
import MenuIcon from '../../assets/svg/MenuIcon';
import Laptop from '../../assets/svg/Laptop';
import { SafeAreaView } from 'react-native-safe-area-context';


const NewsLink = ({ navigation }) => {


    return (
        <SafeAreaView style={styles.containerStyle}>
            <View style={styles.headerStyle}>
                <View style={{ height: 40, width: 40 }} >
                    <WhiteBackIcon onPress={() => navigation.goBack()} />
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Menu')} >
                        <MenuIcon />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={{ flex: 1, marginBottom: 10 }} showsVerticalScrollIndicator={false}>
                <View style={{ width: "100%", height: 257, marginBottom: 15, borderRadius: "26px" }}>
                    <Laptop />
                </View>
                <View style={{ paddingHorizontal: 20 }}>
                    <Text style={{ fontSize: 16, textAlign: 'justify', color: appColors.black, fontWeight: '600' }}>Meta opens its Quest OS to third-party headsets including Asus and Lenovo</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15, marginBottom: 10 }}>
                        <Text>Organisation Name</Text>
                        <Text>9 Apr 2024 </Text>
                    </View>
                    <Text style={{ fontWeight: '600', marginBottom: 10, color: appColors.black, fontSize: 15 }}>Meta has been competing in the augmented reality hardware market for years. But now it wants to dominate the software side of the space.</Text>
                    <Text style={{ color: appColors.black, marginBottom: 10 }}>The tech giant said on Monday that it's rebranded its VR OS, the operating system that powers its Meta Quest headsets, to Meta Horizon OS. The company also said that the new operating system will now be available to third-party hardware makers, allowing them to power their mixed-reality headsets with Meta's software.</Text>
                    <Text style={{ color: appColors.black }}>"We chose this name to reflect our vision of a computing platform built around people and connection - and the shared social fabric that makes this possible," Meta wrote in a blog post. "Meta Horizon OS combines the core technologies powering today's mixed reality experiences with a suite of features that put social presence at the center of the platform."</Text>
                </View>
            </ScrollView >

        </SafeAreaView >
    );
};

export default NewsLink;

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        paddingHorizontal: 16,
    },
    headerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    usernameStyle: {
        color: appColors.black,
        fontFamily: 'SF-Pro',
        fontWeight: '700',
        fontSize: 16
    },
});
