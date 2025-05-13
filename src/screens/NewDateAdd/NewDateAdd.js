import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Switch, TextInput } from 'react-native';
import React, { useState } from 'react';
import { appColors } from '../../utils/appColors';
import WhiteBackIcon from '../../assets/svg/WhiteBackIcon';
import CalenderIcon from '../../assets/svg/CalenderIcon';
import MenuIcon from '../../assets/svg/MenuIcon';
import Clock from '../../assets/svg/Clock';
import AddCalendar from '../../assets/svg/AddCalendar';
import AddedDateCalendar from '../../assets/svg/AddedDateCalendar';
import EditIcon from '../../assets/svg/EditIcon';
import AddedDateDeleteIcon from '../../assets/svg/AddedDateDeleteIcon';
import ClockIcon from '../../assets/svg/ClockIcon';
import RNPickerSelect from 'react-native-picker-select';
import DownIcon from '../../assets/svg/DownIcon';
import WhiteDownIcon from '../../assets/svg/WhiteDownIcon';
import { SafeAreaView } from 'react-native-safe-area-context';


const NewDateAdd = ({ navigation }) => {

    const [active, setInActive] = useState(0);
    const [darkActive, setDarkInActive] = useState(0);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [selectedWeekValue2, setSelectedWeekValue2] = useState('2 Month');


    return (
        <SafeAreaView style={styles.containerStyle}>
            <View style={styles.headerStyle}>
                <View style={{ height: 40, width: 40 }} >
                    <WhiteBackIcon onPress={() => navigation.goBack()} />
                </View>
                <Text style={styles.usernameStyle}>Unavailability</Text>
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
                    <TouchableOpacity onPress={() => setInActive(0)} style={[styles.tabButton, { backgroundColor: active === 0 ? appColors.black : appColors.white, }]}>
                        <Text style={{ color: active === 0 ? appColors.white : appColors.grey, textAlign: 'center', fontWeight: '500' }}> New Date</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setInActive(1)} style={[styles.tabButton, { backgroundColor: active === 1 ? appColors.black : appColors.white, }]}>
                        <Text style={{ color: active === 1 ? appColors.white : appColors.grey, textAlign: 'center', fontWeight: '500' }}>Added Dates </Text>
                    </TouchableOpacity>
                </View>

                {active === 0 ?
                    <View>
                        <View style={{
                            flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20,
                        }}>
                            <Text style={styles.dayStyle}>All Day</Text>
                            <Switch
                                trackColor={{ false: '#E9EBEE', true: '#000' }}
                                thumbColor={isEnabled ? '#fff' : '#fff'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>

                        <View style={{ paddingBottom: 25, borderColor: appColors.lightGrey, borderBottomWidth: 1 }}>
                            <View style={styles.clockCalendarStyle}>
                                <View style={styles.addDateCalendarStyle}>
                                    <View style={{ width: 24, height: 24, marginRight: 5 }}>
                                        <AddCalendar />
                                    </View>
                                    <Text style={{ fontSize: 14, color: appColors.black }}>Saturday, 12 April</Text>
                                </View>
                                <View style={styles.borderStyle}></View>
                                <View style={styles.addDateCalendarStyle}>
                                    <View style={{ width: 24, height: 24, marginRight: 5 }}>
                                        <Clock />
                                    </View>
                                    <Text style={{ fontSize: 14, color: appColors.black }}>18:33</Text>
                                </View>
                            </View>

                            <View style={styles.clockCalendarStyle}>
                                <View style={styles.addDateCalendarStyle}>
                                    <View style={{ width: 24, height: 24, marginRight: 5 }}>
                                        <AddCalendar />
                                    </View>
                                    <Text style={{ fontSize: 15, color: appColors.black }}>Saturday, 12 April</Text>
                                </View>
                                <View style={styles.borderStyle}></View>
                                <View style={styles.addDateCalendarStyle}>
                                    <View style={{ width: 24, height: 24, marginRight: 5 }}>
                                        <Clock />
                                    </View>
                                    <Text style={{ fontSize: 15, color: appColors.black }}>18:33</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{
                            flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 15,
                        }}>
                            <Text style={styles.dayStyle}>Repeats</Text>
                            <Switch
                                trackColor={{ false: '#E9EBEE', true: '#000' }}
                                thumbColor={isEnabled ? '#fff' : '#fff'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'space-between' }}>
                            <Text style={{ color: appColors.black, fontSize: 15, }}>Every</Text>

                            <View style={styles.pickerContainerBlack}>
                                <RNPickerSelect
                                    items={[
                                        { label: 'Week', value: 'Week' },
                                        { label: 'Week 1', value: 'Week 1' },
                                    ]}
                                    onValueChange={(value) => setSelectedWeekValue2(value)}
                                    value={selectedWeekValue2}
                                    style={{
                                        inputAndroid: styles.pickerColor,
                                        inputIOS: styles.iOSPickerColor,
                                        iconContainer: styles.iconContainer,
                                    }}
                                    useNativeAndroidPickerStyle={false}
                                    placeholder={{}}
                                    Icon={() => null}
                                />
                                <WhiteDownIcon width={20} height={20} style={{ marginTop: 10 }} />
                            </View>
                        </View>

                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View style={styles.weekMonthButton}>
                                <Text onPress={() => setDarkInActive(0)}
                                    style={{
                                        backgroundColor: darkActive === 0 ? appColors.grey : appColors.white,
                                        color: darkActive === 0 ? appColors.white : appColors.grey,
                                        borderRadius: darkActive === 0 ? 25 : 25,
                                        paddingHorizontal: darkActive === 0 ? 15 : 15,
                                        paddingVertical: darkActive === 0 ? 10 : 10,
                                        borderWidth: darkActive === 1 ? 1 : 1,
                                        borderColor: darkActive === 1 ? appColors.lightGrey : appColors.white,
                                        textAlign: 'center',
                                        marginRight: 5,
                                        width: 100
                                    }}
                                >
                                    Week
                                </Text>
                                <Text onPress={() => setDarkInActive(1)}
                                    style={{
                                        backgroundColor: darkActive === 1 ? appColors.grey : appColors.white,
                                        color: darkActive === 1 ? appColors.white : appColors.grey,
                                        borderRadius: darkActive === 1 ? 25 : 25,
                                        paddingHorizontal: darkActive === 1 ? 15 : 15,
                                        paddingVertical: darkActive === 1 ? 10 : 10,
                                        borderWidth: darkActive === 1 ? 1 : 1,
                                        borderColor: darkActive === 1 ? appColors.grey : appColors.lightGrey,
                                        textAlign: 'center',
                                        marginRight: 5,
                                        width: 100
                                    }}
                                >
                                    2 Week
                                </Text>

                                <Text onPress={() => setDarkInActive(2)}
                                    style={{
                                        backgroundColor: darkActive === 2 ? appColors.grey : appColors.white,
                                        color: darkActive === 2 ? appColors.white : appColors.grey,
                                        borderRadius: darkActive === 2 ? 25 : 25,
                                        paddingHorizontal: darkActive === 2 ? 15 : 15,
                                        paddingVertical: darkActive === 2 ? 10 : 10,
                                        borderWidth: darkActive === 2 ? 1 : 1,
                                        borderColor: darkActive === 2 ? appColors.grey : appColors.lightGrey,
                                        textAlign: 'center',
                                        marginRight: 5,
                                        width: 100
                                    }}
                                >
                                    4 Week
                                </Text>

                                <Text onPress={() => setDarkInActive(3)}
                                    style={{
                                        backgroundColor: darkActive === 3 ? appColors.grey : appColors.white,
                                        color: darkActive === 3 ? appColors.white : appColors.grey,
                                        borderRadius: darkActive === 3 ? 25 : 25,
                                        paddingHorizontal: darkActive === 3 ? 15 : 15,
                                        paddingVertical: darkActive === 3 ? 10 : 10,
                                        borderWidth: darkActive === 3 ? 1 : 1,
                                        borderColor: darkActive === 3 ? appColors.grey : appColors.lightGrey,
                                        textAlign: 'center',
                                        marginRight: 5,
                                        width: 100
                                    }}
                                >
                                    Month
                                </Text>
                            </View>
                        </ScrollView>

                        <View style={{ paddingBottom: 20, borderColor: appColors.lightGrey, borderBottomWidth: 1 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'space-between' }}>
                                <Text style={{ color: appColors.black, fontSize: 15, }}>On</Text>

                                <View style={styles.pickerContainer}>
                                    <RNPickerSelect
                                        onValueChange={(value) => setSelectedWeekValue2(value)}
                                        items={[
                                            { label: 'Fri', value: 'Fri' },
                                            { label: 'Mon', value: 'Mon' },
                                        ]}
                                        value={selectedWeekValue2}
                                        style={{
                                            inputAndroid: styles.picker,
                                            inputIOS: styles.picker,
                                            iconContainer: styles.iconContainer,
                                        }}
                                        useNativeAndroidPickerStyle={false}
                                        placeholder={{}}
                                        Icon={() => null}
                                    />
                                    <DownIcon width={20} height={20} style={{ marginTop: 10 }} />
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'space-between' }}>
                                <Text style={{ color: appColors.black, fontSize: 15, }}>End</Text>

                                <View style={styles.pickerContainer}>
                                    <RNPickerSelect
                                        onValueChange={(value) => setSelectedWeekValue2(value)}
                                        items={[
                                            { label: '2 Month', value: '2 Month' },
                                            { label: '3 Month', value: '3 Month' },
                                        ]}
                                        value={selectedWeekValue2}
                                        style={{
                                            inputAndroid: styles.picker,
                                            inputIOS: styles.picker,
                                            iconContainer: styles.iconContainer,
                                        }}
                                        useNativeAndroidPickerStyle={false}
                                        placeholder={{}}
                                        Icon={() => null}
                                    />
                                    <DownIcon width={20} height={20} style={{ marginTop: 8 }} />
                                </View>
                            </View>
                        </View>

                        <View style={{ marginTop: 15 }}>
                            <Text style={styles.dayStyle}>Reason for Unavailability</Text>
                            <TextInput
                                height={100}
                                placeholder='Reason for Unavailability'
                                style={styles.reasonInputStyle}
                                multiline
                            />
                        </View>

                        <Text style={styles.addUnavailabilityButton} >Add Unavailability</Text>

                    </View>
                    : ""
                }

                {active === 1 ?
                    <View>
                        <View style={
                            styles.addedDateStyle
                        }>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: 25, height: 25, marginRight: 5 }}>
                                        <AddedDateCalendar />
                                    </View>
                                    <Text style={{ fontSize: 16, color: appColors.black, fontWeight: '600' }}>12 April</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    < View style={{ width: 40, height: 40, marginRight: 5 }}>
                                        <AddedDateDeleteIcon />
                                    </View>
                                    <View style={{ width: 40, height: 40, marginLeft: 5 }}>
                                        <EditIcon />
                                    </View>
                                </View>
                            </View>

                            <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                <View style={{ marginRight: 10 }}>
                                    <ClockIcon width={20} height={20} />
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ color: appColors.black, fontWeight: '600' }}>09:30</Text>
                                    <Text style={{ color: appColors.black, fontWeight: '600' }}> - </Text>
                                    <Text style={{ color: appColors.black, fontWeight: '600' }}>10:30</Text>
                                </View>
                            </View>

                            <View style={{ marginTop: 10 }}>
                                <Text>Reason:</Text>
                            </View>

                            <View style={{ marginTop: 5 }}>
                                <Text style={{ color: appColors.black, fontWeight: '600' }}>Trip out of town</Text>
                            </View>
                        </View>

                        <View style={
                            styles.addedDateStyle
                        }>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: 25, height: 25, marginRight: 5 }}>
                                        <AddedDateCalendar />
                                    </View>
                                    <Text style={{ fontSize: 16, color: appColors.black, fontWeight: '600' }}>12 April</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    < View style={{ width: 40, height: 40, marginRight: 5 }}>
                                        <AddedDateDeleteIcon />
                                    </View>
                                    <View style={{ width: 40, height: 40, marginLeft: 5 }}>
                                        <EditIcon />
                                    </View>
                                </View>
                            </View>

                            <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                <View style={{ marginRight: 10 }}>
                                    <ClockIcon width={20} height={20} />
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ color: appColors.black, fontWeight: '600' }}>09:30</Text>
                                    <Text style={{ color: appColors.black, fontWeight: '600' }}> - </Text>
                                    <Text style={{ color: appColors.black, fontWeight: '600' }}>10:30</Text>
                                </View>
                            </View>

                            <View style={{ marginTop: 10 }}>
                                <Text>Reason:</Text>
                            </View>

                            <View style={{ marginTop: 5 }}>
                                <Text style={{ color: appColors.black, fontWeight: '600' }}>Trip out of town</Text>
                            </View>

                        </View>

                    </View >
                    : ""
                }

            </ScrollView >
        </SafeAreaView >
    );
};

export default NewDateAdd;

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
        borderRadius: 45 / 2,
        // padding: 1,
        flexDirection: 'row',
        alignItems: 'center',
        width: "100%",
        height: 45,
        overflow: 'hidden'
    },
    dayStyle: {
        fontSize: 18,
        color: appColors.black,
        fontWeight: '600'
    },
    clockCalendarStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        justifyContent: 'space-between'
    },
    addDateCalendarStyle: {
        flexDirection: 'row',
        backgroundColor: appColors.offWhite,
        paddingHorizontal: 15,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 25,
    },
    borderStyle: {
        width: 25,
        backgroundColor: appColors.lightGrey,
        height: 2,
        marginHorizontal: 8,
    },
    tabButton: {
        borderRadius: 45 / 2,
        height: '100%',
        width: "50%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    addedDateStyle: {
        borderWidth: 1,
        borderColor: appColors.lightGrey,
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginTop: 20,
        borderRadius: 15
    },
    weekMonthButton: {
        borderRadius: 25,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'scroll',
        marginTop: 10,
    },
    reasonInputStyle: {
        borderWidth: 1,
        borderColor: appColors.grey,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginTop: 15,
        marginBottom: 10,
        textAlignVertical: 'top',
    },
    addUnavailabilityButton: {
        backgroundColor: appColors.black,
        color: appColors.white,
        borderRadius: 20,
        paddingVertical: 15,
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 10,
        fontWeight: '600',
    },
    pickerContainer: {
        marginTop: 5,
        backgroundColor: appColors.offWhite,
        borderRadius: 50,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pickerContainerBlack: {
        marginTop: 5,
        backgroundColor: appColors.black,
        borderRadius: 50,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    picker: {
        color: appColors.black,
        fontSize: 14,
        paddingRight: 30, // Ensure there's enough space for the dropdown icon
    },
    pickerColor: {
        color: appColors.white,
        fontSize: 14,
        paddingRight: 30,
        backgroundColor: 'red'
    },
    iOSPickerColor: {
        color: appColors.white,
        fontSize: 14,
        paddingRight: 30,
        backgroundColor: 'red'
    },
    iconContainer: {
        top: 10, // Adjust the position of the icon if necessary
        right: 12,
    },
});
