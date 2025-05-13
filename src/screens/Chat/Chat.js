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
import FrameBoy from '../../assets/svg/FrameBoy';
import DoubleTick from '../../assets/svg/DoubleTick';
import SingleTick from '../../assets/svg/SingleTick';
import BagIcon from '../../assets/svg/BagIcon';
import GirlFrame from '../../assets/svg/GirlFrame';
import YellowBagIcon from '../../assets/svg/YellowBagIcon';
import { SafeAreaView } from 'react-native-safe-area-context';


const Chat = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.containerStyle}>
            <View style={styles.headerStyle}>
                <View style={{ height: 40, width: 40 }} >
                    <WhiteBackIcon onPress={() => navigation.goBack()} />
                </View>
                <Text style={styles.usernameStyle}>Chat</Text>
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

                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, color: appColors.black, fontWeight: '600', flex: 1 }}>Chat</Text>
                        <View>
                            <Text style={styles.newChatButton} onPress={() => navigation.navigate('BellaMeillenia')} >+  New Chat</Text>
                        </View>
                    </View>
                </View>

                <Text style={styles.personalStyle}>Personal Chat</Text>

                <View style={{ paddingBottom: 20, borderColor: appColors.lightGrey, borderBottomWidth: 1 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('BellaMeillenia')}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }} >
                            <FrameBoy width={55} height={55} />
                            <View style={{ flexDirection: 'column', flex: 1 }}>
                                <Text style={{ color: appColors.black }}>Imran Molla</Text>
                                <Text>Organisation Name</Text>
                                <Text style={{ color: appColors.black, width: 150 }} numberOfLines={1} ellipsizeMode="tail">Of course, let me know if you're on your way</Text>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text>17:32</Text>
                                <Text style={styles.notificationStyle}>2</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('BellaMeillenia')}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }} >
                            <FrameBoy width={55} height={55} />
                            <View style={{ flexDirection: 'column', flex: 1 }}>
                                <Text style={{ color: appColors.black }}>Imran Molla</Text>
                                <Text>Organisation Name</Text>
                                <Text style={{ color: appColors.black, width: 150 }} numberOfLines={1} ellipsizeMode="tail">Of course, let me know if you're on your way</Text>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text>17:32</Text>
                                <Text style={styles.notificationStyle}>2</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ paddingBottom: 20, borderColor: appColors.lightGrey, borderBottomWidth: 1 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('BellaMeillenia')}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }} >
                            <FrameBoy width={55} height={55} />
                            <View style={{ flexDirection: 'column', flex: 1 }}>
                                <Text style={{ color: appColors.black }}>Imran Molla</Text>
                                <Text>Organisation Name</Text>
                                <Text style={{ color: appColors.black, width: 150 }} numberOfLines={1} ellipsizeMode="tail">Of course, let me know if you're on your way</Text>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text>09 APR</Text>
                                <View style={{ alignItems: 'center', marginTop: 10 }}>
                                    <DoubleTick width={16} height={16} />
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('BellaMeillenia')}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }} >
                            <FrameBoy width={55} height={55} />
                            <View style={{ flexDirection: 'column', flex: 1 }}>
                                <Text style={{ color: appColors.black }}>Imran Molla</Text>
                                <Text>Organisation Name</Text>
                                <Text style={{ color: appColors.black, width: 150 }} numberOfLines={1} ellipsizeMode="tail">Of course, let me know if you're on your way</Text>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text>09 APR</Text>
                                <View style={{ alignItems: 'center', marginTop: 10 }}>
                                    <SingleTick width={16} height={16} />
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: 15 }}>
                    <Text style={{ fontSize: 18, color: appColors.black, fontWeight: '600', }}>Group Job chats</Text>

                    <TouchableOpacity onPress={() => navigation.navigate('BellaMeillenia')}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 20 }}>
                            <BagIcon width={55} height={55} />
                            <View style={{ flexDirection: 'column', flex: 1 }}>
                                <Text style={{ color: appColors.black, width: 150, marginTop: 5 }} numberOfLines={1} ellipsizeMode="tail">Business Plan Template (Elite Life Finance)</Text>
                                <Text>THE-JB-113-234998 </Text>
                                <View style={{ flexDirection: 'row', marginTop: 10, gap: 8, alignItems: 'center' }}>
                                    <GirlFrame width={30} height={30} />
                                    <GirlFrame width={30} height={30} />
                                    <GirlFrame width={30} height={30} />
                                    <GirlFrame width={30} height={30} />
                                    <Text style={{ fontWeight: '600' }}> + 4</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text>17:32</Text>
                                <Text style={styles.notificationStyle}>2</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('BellaMeillenia')}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 20 }}>
                            <YellowBagIcon width={55} height={55} />
                            <View style={{ flexDirection: 'column', flex: 1 }}>
                                <Text style={{ color: appColors.black, width: 150, marginTop: 5 }} numberOfLines={1} ellipsizeMode="tail">Business Plan Template (Elite Life Finance)</Text>
                                <Text>THE-JB-113-234998 </Text>
                                <View style={{ flexDirection: 'row', marginTop: 10, gap: 8, alignItems: 'center' }}>
                                    <GirlFrame width={30} height={30} />
                                    <GirlFrame width={30} height={30} />
                                    <GirlFrame width={30} height={30} />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text>17:32</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

            </ScrollView >
        </SafeAreaView >
    );
};

export default Chat;

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
    newChatButton: {
        backgroundColor: appColors.black,
        color: appColors.white,
        fontWeight: '600',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        overflow: 'hidden'
    },
    personalStyle: {
        color: appColors.black,
        fontSize: 16,
        fontWeight: '600',
        marginTop: 15
    },
    notificationStyle: {
        backgroundColor: '#FAF48D',
        padding: 6,
        alignItems: 'center',
        borderRadius: 50,
        textAlign: 'center',
        marginTop: 5,
        fontWeight: '600',
        fontSize: 12,
    },
});
