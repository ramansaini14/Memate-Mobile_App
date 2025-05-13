import { FlatList, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { appColors } from '../../utils/appColors';
import WhiteBackIcon from '../../assets/svg/WhiteBackIcon';
import DoubleTick from '../../assets/svg/DoubleTick';
import SingleTick from '../../assets/svg/SingleTick';
import ChatGirl from '../../assets/svg/ChatGirl';
import AddCircle from '../../assets/svg/AddCircle';
import SendIcon from '../../assets/svg/SendIcon';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChatBubble = ({ item }) => {
    return (
        <View style={[item?.isSender ? styles.sender : styles.receiver]}>
            <Text style={item?.isSender ? styles.receiverMessage : styles.senderMessage}>{item?.text}</Text>
            <View style={styles.metaData}>
                <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'stretch', }}>
                    {item?.isSender && <View style={{ marginTop: 2 }}>
                        {item?.seen ? <DoubleTick width={18} height={18} /> : <SingleTick width={18} height={18} />}
                    </View>}
                    <Text style={styles.timestamp}>{item?.timestamp}</Text>
                </View>
            </View>
        </View>
    );
};

const BellaMeillenia = ({ navigation }) => {
    const [message, setMessage] = useState('');
    const messages = [
        { id: '1', text: "I'm great, thanks for asking. I wanted to touch base with you about the project deadline. Are you on track to complete your tasks by the end of the week?", isSender: false, timestamp: '18:46' },
        { id: '2', text: "I'm great, thanks for asking. I wanted to touch base with you about the project deadline. Are you on track to complete your tasks by the end of the week?", isSender: true, timestamp: '18:51', seen: true },
        { id: '3', text: 'ok', isSender: false, timestamp: '18:52' },
        { id: '4', text: "Are you on track to complete your tasks.", isSender: true, timestamp: '18:53', seen: true },
        { id: '5', text: 'yes!', isSender: false, timestamp: '18:55' },
        { id: '6', text: "great, keep it up!", isSender: true, timestamp: '18:59', seen: false },
    ];

    return (
        <SafeAreaView style={styles.containerStyle}>
            <View style={styles.headerStyle}>
                <View style={{ height: 40, width: 40 }} >
                    <WhiteBackIcon onPress={() => navigation.goBack()} />
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: appColors.black, fontWeight: '600' }}>Bella Meillenia</Text>
                    <Text style={{ fontSize: 12 }}>Organisation Name</Text>
                </View>
                <ChatGirl width={40} height={40} />
            </View>

            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                    <FlatList
                        data={messages}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => <ChatBubble item={item} />}
                        style={{ paddingHorizontal: 10, }}
                        contentContainerStyle={{ paddingBottom: 60, }} // Ensures content is not covered by the chatBox
                    />
                </TouchableWithoutFeedback>

                <View style={styles.chatBox}>
                    <AddCircle width={25} height={25} />
                    <TextInput
                        style={styles.input}
                        placeholder="Type a message"
                        placeholderTextColor={appColors.placeholderColor}
                        value={message}
                        onChangeText={setMessage}
                    />
                    <TouchableOpacity style={{}} onPress={() => console.log(`send "${message}" message success!`,)}>
                        <SendIcon width={40} height={40} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default BellaMeillenia;

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
        marginBottom: 16,
    },
    chatBox: {
        backgroundColor: appColors.white,
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // bottom: 0
    },
    input: {
        padding: 10,
        backgroundColor: appColors.offWhite,
        fontSize: 14,
        marginHorizontal: 16,
        color: appColors.black,
        borderRadius: 8,
        flex: 1, // Allows the input field to expand based on available space
    },
    container: {
        flex: 1,
        backgroundColor: appColors.offWhite,

    },
    sender: {
        alignSelf: 'flex-end',
        backgroundColor: appColors.white,
        maxWidth: '80%',
        padding: 10,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        marginVertical: 5,
    },
    receiver: {
        alignSelf: 'flex-start',
        backgroundColor: appColors.black,
        maxWidth: '80%',
        padding: 10,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        marginVertical: 5,
    },
    senderMessage: {
        fontSize: 13,
        lineHeight: 17,
        color: appColors.white,
    },
    receiverMessage: {
        fontSize: 13,
        lineHeight: 17,
        color: appColors.black,
    },
    metaData: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 5,
    },
    timestamp: {
        fontSize: 11,
        color: appColors.grey,
    },
});