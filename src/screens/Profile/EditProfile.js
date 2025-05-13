import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useState } from 'react';
import { appColors } from '../../utils/appColors';
import WhiteCalenderIcon from '../../assets/svg/WhiteCalenderIcon';
import WhiteMenuIcon from '../../assets/svg/WhiteMenuIcon';
import UserIcon from '../../assets/svg/UserIcon';
import WhiteBackIcon from '../../assets/svg/WhiteBackIcon';
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';
import FormCalender from '../../assets/svg/FormCalender';
import { Picker } from '@react-native-picker/picker';
import KeyIcon from '../../assets/svg/KeyIcon';
import DeleteIcon from '../../assets/svg/DeleteIcon';
import DatePicker from 'react-native-date-picker';
import { SafeAreaView } from 'react-native-safe-area-context';


const EditProfile = ({ navigation }) => {

    const [phoneNumber, setPhoneNumber] = useState('1');
    const [countryCode, setCountryCode] = useState('US'); // Assuming default country is US

    const [countryPickerVisible, setCountryPickerVisible] = useState(false);

    const toggleCountryPicker = () => {
        setCountryPickerVisible(!countryPickerVisible);
    };

    const onSelectCountry = country => {
        setCountryCode(country.cca2);
        const callingCode = country.callingCode[0];
        setPhoneNumber(callingCode);
        setCountryPickerVisible(false);
    };

    const [selectedValue, setSelectedValue] = useState('Australia');
    const [selectedValue1, setSelectedValue1] = useState('Sydney');
    const [selectedValue2, setSelectedValue2] = useState('NSW');
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    return (
        <SafeAreaView style={styles.containerStyle}>
            <View style={styles.headerStyle}>
                <View style={{ height: 40, width: 40 }} >
                    <WhiteBackIcon onPress={() => navigation.goBack()} />
                </View>
                <Text style={styles.usernameStyle}>Edit Profile</Text>
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
                <View style={{ paddingBottom: 15, borderColor: appColors.borderLightGrey, borderBottomWidth: 1 }}>
                    <Text style={styles.userDetailStyle}>User Details</Text>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ color: appColors.grey, fontSize: 13 }}>Email</Text>
                        <TextInput
                            style={{
                                backgroundColor: '#212528',
                                color: appColors.white,
                                paddingHorizontal: 15,
                                paddingVertical: 10,
                                borderRadius: 8,
                                marginTop: 5,
                            }}
                            placeholder="Email"
                            placeholderTextColor={appColors.placeholderColor}
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ color: appColors.grey, fontSize: 13 }}>Phone</Text>
                        <View
                            style={{
                                backgroundColor: '#212528',
                                padding: 15,
                                borderRadius: 8,
                                marginTop: 5,
                            }}>
                            <PhoneInput
                                onPressFlag={toggleCountryPicker}
                                initialCountry={countryCode}
                                initialValue={phoneNumber}
                                value={phoneNumber}
                                onChangePhoneNumber={number => setPhoneNumber(number)}
                                textStyle={{ color: 'white' }}
                            />
                        </View>

                        {countryPickerVisible && (
                            <CountryPicker
                                withFilter
                                withFlagButton={false}
                                withCountryNameButton={false}
                                onSelect={onSelectCountry}
                                onClose={() => setCountryPickerVisible(false)}
                                visible={countryPickerVisible}
                                containerButtonStyle={styles.countryPickerButton}
                                closeButtonImageStyle={styles.countryPickerCloseButton}
                            />
                        )}
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ color: appColors.grey, fontSize: 13 }}>DOB</Text>
                        <View style={{ flex: 1, marginTop: 5, borderRadius: 8, flexDirection: 'row', backgroundColor: '#212528', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                style={{
                                    color: appColors.white,
                                    paddingHorizontal: 15,
                                    paddingVertical: 10,
                                    flex: 1
                                }}
                                placeholder="1986-11-25"
                                placeholderTextColor={appColors.placeholderColor}
                            />
                            <View style={{ height: 30, width: 30 }}>
                                <FormCalender onPress={() => setOpen(true)} />

                                <DatePicker
                                    modal
                                    open={open}
                                    date={date}
                                    mode="date"
                                    onConfirm={(date) => {
                                        setOpen(false);
                                        setDate(date);
                                    }}
                                    onCancel={() => {
                                        setOpen(false);
                                    }}
                                />
                            </View>

                        </View>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ color: appColors.grey, fontSize: 13 }}>ABN</Text>
                        <TextInput
                            style={{
                                backgroundColor: '#212528',
                                color: appColors.white,
                                paddingHorizontal: 15,
                                paddingVertical: 10,
                                borderRadius: 8,
                                marginTop: 5,
                            }}
                            placeholder="Number"
                            placeholderTextColor={appColors.placeholderColor}
                        />
                    </View>
                </View>

                <View style={{ marginTop: 15 }}>
                    <View style={{ paddingBottom: 10, borderColor: appColors.borderLightGrey, borderBottomWidth: 1 }}>
                        <Text style={[styles.addressStyle, { marginBottom: 10 }]}>Address</Text>
                        <View>
                            <Text style={{ color: appColors.grey, fontSize: 13 }}>Country</Text>
                            <View style={{
                                marginTop: 5, backgroundColor: '#212528',
                                borderRadius: 8
                            }}>
                                <Picker
                                    selectedValue={selectedValue}
                                    onValueChange={(itemValue) => setSelectedValue(itemValue)}
                                    style={{
                                        color: appColors.white,
                                    }}
                                    dropdownIconColor="#fff" // Set the dropdown icon color to white

                                >
                                    <Picker.Item label="Australia" value="Australia" style={{
                                        fontSize: 14
                                    }} />
                                    <Picker.Item label="Canada" value="Canada" style={{
                                        fontSize: 14
                                    }} />
                                    <Picker.Item label="America" value="America" style={{
                                        fontSize: 14
                                    }} />
                                </Picker>
                            </View>
                            <Text style={{ fontSize: 14 }}> {selectedValue}</Text>
                        </View>
                        <View>
                            <Text style={{ color: appColors.grey, fontSize: 13 }}>City</Text>
                            <View style={{
                                marginTop: 5, backgroundColor: '#212528',
                                borderRadius: 8
                            }}>
                                <Picker
                                    selectedValue={selectedValue1}
                                    onValueChange={(itemValue) => setSelectedValue1(itemValue)}
                                    style={{
                                        color: appColors.white,
                                    }}
                                    dropdownIconColor="#fff" // Set the dropdown icon color to white

                                >
                                    <Picker.Item label="Sydney" value="Sydney" style={{
                                        fontSize: 14
                                    }} />
                                    <Picker.Item label="Sydney" value="Sydney" style={{
                                        fontSize: 14
                                    }} />
                                    <Picker.Item label="Sydney" value="Sydney" style={{
                                        fontSize: 14
                                    }} />
                                </Picker>
                            </View>
                            <Text style={{ fontSize: 14 }}> {selectedValue1}</Text>
                        </View>
                        <View>
                            <Text style={{ color: appColors.grey, fontSize: 13 }}>State</Text>
                            <View style={{
                                marginTop: 5, backgroundColor: '#212528',
                                borderRadius: 8
                            }}>
                                <Picker
                                    selectedValue={selectedValue2}
                                    onValueChange={(itemValue) => setSelectedValue2(itemValue)}
                                    style={{
                                        color: appColors.white,
                                    }}
                                    dropdownIconColor="#fff" // Set the dropdown icon color to white

                                >
                                    <Picker.Item label="NSW" value="NSW" style={{
                                        fontSize: 14
                                    }} />
                                    <Picker.Item label="NSW" value="NSW" style={{
                                        fontSize: 14
                                    }} />
                                    <Picker.Item label="NSW" value="NSW" style={{
                                        fontSize: 14
                                    }} />
                                </Picker>
                            </View>
                            <Text style={{ fontSize: 14 }}> {selectedValue2}</Text>
                        </View>
                        <View style={{ marginBottom: 15 }}>
                            <Text style={{ color: appColors.grey, fontSize: 13 }}>Street Address</Text>
                            <TextInput
                                style={{
                                    backgroundColor: '#212528',
                                    color: appColors.white,
                                    paddingHorizontal: 15,
                                    paddingVertical: 10,
                                    borderRadius: 8,
                                    marginTop: 5,
                                }}
                                placeholder="Number"
                                placeholderTextColor={appColors.placeholderColor}
                            />
                        </View>
                        <View style={{ marginBottom: 15 }}>
                            <Text style={{ color: appColors.grey, fontSize: 13 }}>Postcode</Text>
                            <TextInput
                                style={{
                                    backgroundColor: '#212528',
                                    color: appColors.white,
                                    paddingHorizontal: 15,
                                    paddingVertical: 10,
                                    borderRadius: 8,
                                    marginTop: 5,
                                }}
                                placeholder="Number"
                                placeholderTextColor={appColors.placeholderColor}
                            />
                        </View>
                    </View>
                </View>

                <View style={{ marginTop: 15 }}>
                    <View style={{ paddingBottom: 15, borderColor: appColors.borderLightGrey, borderBottomWidth: 1 }}>
                        <Text style={[styles.addressStyle, { marginBottom: 10 }]}>Emergency Contact</Text>
                        <View style={{ marginBottom: 15 }}>
                            <Text style={{ color: appColors.grey, fontSize: 13 }}>Contact Name</Text>
                            <TextInput
                                style={{
                                    backgroundColor: '#212528',
                                    color: appColors.white,
                                    paddingHorizontal: 15,
                                    paddingVertical: 10,
                                    borderRadius: 8,
                                    marginTop: 5,
                                }}
                                placeholder="Number"
                                placeholderTextColor={appColors.placeholderColor}
                            />
                        </View>
                        <View style={{ marginBottom: 8 }}>
                            <Text style={{ color: appColors.grey, fontSize: 13 }}>Phone</Text>
                            <View
                                style={{
                                    backgroundColor: '#212528',
                                    padding: 15,
                                    borderRadius: 8,
                                    marginTop: 5,
                                }}>
                                <PhoneInput
                                    onPressFlag={toggleCountryPicker}
                                    initialCountry={countryCode}
                                    initialValue={phoneNumber}
                                    value={phoneNumber}
                                    onChangePhoneNumber={number => setPhoneNumber(number)}
                                    textStyle={{ color: 'white' }}
                                />
                            </View>

                            {countryPickerVisible && (
                                <CountryPicker
                                    withFilter
                                    withFlagButton={false}
                                    withCountryNameButton={false}
                                    onSelect={onSelectCountry}
                                    onClose={() => setCountryPickerVisible(false)}
                                    visible={countryPickerVisible}
                                    containerButtonStyle={styles.countryPickerButton}
                                    closeButtonImageStyle={styles.countryPickerCloseButton}
                                />
                            )}
                        </View>
                    </View>
                </View>

                <View style={{ marginTop: 20, marginBottom: 25 }}>
                    <View style={{ paddingBottom: 20, borderColor: appColors.borderLightGrey, borderBottomWidth: 1 }}>

                        <Text style={styles.addressStyle}>Security Options</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: 30, height: 30 }}>
                                <KeyIcon />
                            </View>
                            <Text style={{ color: appColors.white, fontSize: 16 }}>Reset the Password</Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={{ flexDirection: 'row', marginBottom: 10 }} onPress={() => navigation.navigate('DeleteAccount')}>
                    <View style={{ width: 30, height: 30 }}>
                        <DeleteIcon />
                    </View>
                    <View>
                        <Text style={{ color: appColors.lightRed, fontSize: 15 }}>Delete the Account</Text>
                    </View>
                </TouchableOpacity>

                <View style={{ alignItems: 'center', flex: 1 }}>
                    <Text style={styles.saveChangeButton}>Save changes</Text>
                </View>

            </ScrollView >
        </SafeAreaView >
    );
};

export default EditProfile;

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
    addressStyle: {
        color: appColors.white,
        fontFamily: 'SF-Pro',
        fontWeight: '700',
        fontSize: 18,
        marginBottom: 10
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
        borderRadius: 25,
        textAlign: 'center',

        marginBottom: 10
    },
    countryPickerButton: {
        borderRadius: 5,
        backgroundColor: '#fff',
        marginBottom: 20,
    },
    countryPickerCloseButton: {
        width: 20,
        height: 20,
    },
});
