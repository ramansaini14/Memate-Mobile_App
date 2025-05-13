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
import { SafeAreaView } from 'react-native-safe-area-context';

const Conditions = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.containerStyle}>
            <View style={styles.headerStyle}>
                <View style={{ height: 40, width: 40 }} >
                    <WhiteBackIcon onPress={() => navigation.goBack()} />
                </View>
                <Text style={styles.usernameStyle}>Terms and Conditions</Text>
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

                <Text style={styles.headStyle}>Terms and Conditions</Text>
                <Text style={styles.textStyle2}>Conditions of use</Text>
                <Text style={styles.textStyle}>By using this website, you certify that you haveread and reviewed this Agreement and that you agree to comply with its terms.If you do not want to be bound by the terms of this Agreement, you are advisedto stop using the website accordingly. [company name] only grants use andaccess of this website, its products, and its services to those who haveaccepted its terms.</Text>
                <Text style={styles.textStyle2}>Privacy policy</Text>
                <Text style={styles.textStyle}>Beforeyou continue using our website,we advise you to read our privacy policy [link to privacy policy] regarding ouruser data collection. It will help you better understand our practices.</Text>
            </ScrollView >

        </SafeAreaView >
    );
};

export default Conditions;

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
    headStyle: {
        fontSize: 20,
        fontWeight: '600',
        color: appColors.black,
        marginBottom: 15
    },
    textStyle: {
        fontSize: 14,
        color: appColors.black,
        marginBottom: 15,
        letterSpacing: .2
    },
    textStyle2: {
        fontSize: 16,
        fontWeight: '600',
        color: appColors.black,
        marginBottom: 10
    },
});
