import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { appColors } from '../utils/appColors'
import WhiteBackIcon from '../assets/svg/WhiteBackIcon'
import NotificationIcon from '../assets/svg/NotificationIcon'
import CalenderIcon from '../assets/svg/CalenderIcon'
import MenuIcon from '../assets/svg/MenuIcon'

const Header = ({ navigation }) => {
    let avaatar = `https://img.freepik.com/free-psd/3d-rendering-avatar_23-2150833554.jpg?w=740&t=st=1724240107~exp=1724240707~hmac=aed3d66e6ea8f5e6bfd9f277ff46d0d132e97455217597cb94635458eca272be`
    return (
        <View style={styles.headerStyle}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Image source={{ uri: avaatar }} style={styles.avatar_} resizeMode='contain' />
                <View>
                    <Text style={styles.usernameStyle}>Anmol Singh</Text>
                    <Text style={styles.proff}>Designer</Text>
                </View>
            </View>
            {/* <View style={{ height: 40, width: 40 }} >
                <WhiteBackIcon onPress={() => navigation.goBack()} />
            </View>
            <Text style={styles.usernameStyle}>Username</Text> */}
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
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
    )
}

export default Header

const styles = StyleSheet.create({
    headerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50
    },
    usernameStyle: {
        color: appColors.black,
        fontFamily: 'SF-Pro',
        fontWeight: '700',
        fontSize: 14
    },
    proff: {
        color: appColors.grey,
        fontFamily: 'SF-Pro',
        fontWeight: '700',
        fontSize: 12
    },
    avatar_: {
        width: 40,
        height: 40,
        borderRadius: 30
    }
})