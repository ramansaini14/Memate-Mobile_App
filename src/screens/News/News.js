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


const News = ({ navigation }) => {

    const [active, setInActive] = useState(0);

    return (
        <SafeAreaView style={styles.containerStyle}>
            <View style={styles.headerStyle}>
                <View style={{ height: 40, width: 40 }} >
                    <WhiteBackIcon onPress={() => navigation.goBack()} />
                </View>
                <Text style={styles.usernameStyle}>News</Text>
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

                <View style={styles.dateAddButton}>
                    <Text onPress={() => setInActive(0)}
                        style={{
                            backgroundColor: active === 0 ? appColors.black : appColors.white,
                            color: active === 0 ? appColors.white : appColors.grey,
                            borderRadius: active === 0 ? 25 : 0,
                            paddingHorizontal: active === 0 ? 15 : 15,
                            paddingVertical: active === 0 ? 10 : 10,
                            textAlign: 'center',
                            width: "50%"
                        }}
                    >
                        News
                    </Text>

                    <Text onPress={() => setInActive(1)}
                        style={{
                            backgroundColor: active === 1 ? appColors.black : appColors.white,
                            color: active === 1 ? appColors.white : appColors.grey,
                            borderRadius: active === 1 ? 25 : 0,
                            paddingHorizontal: active === 1 ? 15 : 15,
                            paddingVertical: active === 1 ? 10 : 10,
                            textAlign: 'center',
                            width: "50%"
                        }}
                    >
                        Updates
                    </Text>
                </View>


                {active === 0 ?
                    <View>
                        <Text style={{ fontSize: 20, color: appColors.black, fontWeight: '600', marginVertical: 15 }} >News</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('NewsLink')} >
                            <View style={{ borderWidth: 1, borderColor: appColors.lightGrey, borderRadius: 26 }}>
                                <View style={{ width: "100%", height: 257, marginBottom: 6, borderRadius: "26px" }}>
                                    <Laptop onPress={() => navigation.navigate('NewLink')} />
                                </View>
                                <View style={{ padding: 15 }}>
                                    <Text style={{ fontSize: 16, color: appColors.black }}>7 iPad Pro features I want to see Apple announce during its May event</Text>

                                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15, marginBottom: 10 }}>
                                        <Text>Organisation Name</Text>
                                        <Text>9 Apr 2024 </Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    : ""
                }

                {active === 1 ?
                    <View>
                        <Text style={{ fontSize: 20, color: appColors.black, fontWeight: '600', marginVertical: 15 }}>News</Text>
                        <View style={{ borderWidth: 1, borderColor: appColors.lightGrey, borderRadius: 26 }}>
                            <View style={{ width: "100%", height: 257, marginBottom: 6, borderRadius: "26px" }}>
                                <Laptop />
                            </View>
                            <View style={{ padding: 15 }}>
                                <Text style={{ fontSize: 16, color: appColors.black }}>7 iPad Pro features I want to see Apple announce during its May event</Text>

                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15, marginBottom: 10 }}>
                                    <Text>Organisation Name</Text>
                                    <Text>9 Apr 2024 </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    : ""
                }
            </ScrollView >
        </SafeAreaView >
    );
};

export default News;

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
    dateAddButton: {
        borderWidth: 1,
        borderColor: appColors.lightGrey,
        borderRadius: 25,
        padding: 2,
        flexDirection: 'row',
        alignItems: 'center',
        width: "100%"
    },
});
