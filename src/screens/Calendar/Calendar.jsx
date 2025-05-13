import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Calendar, Agenda } from 'react-native-calendars';
// import { Ionicons } from '@expo/vector-icons';
import moment from 'moment'; // For date manipulation
import { SafeAreaView } from 'react-native-safe-area-context'
import ArrowRight from '../../assets/svg/ArrowRight';
import ArrowLeft from '../../assets/svg/ArrowLeft';
import DummyUserIcon from '../../assets/svg/DummyUserIcon';
import NotificationIcon from '../../assets/svg/NotificationIcon';
import CalenderIcon from '../../assets/svg/CalenderIcon';
import MenuIcon from '../../assets/svg/MenuIcon';
import { appColors } from '../../utils/appColors';
import WhiteBackIcon from '../../assets/svg/WhiteBackIcon';






const CalendarPage = ({ navigation }) => {
    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
    const [selectedView, setSelectedView] = useState('Day');
    const [agendaItems, setAgendaItems] = useState({});

    const items = {
        '2024-08-20': [{ name: 'Design Stationary and Company profile and brochure', time: '08:00 - 09:00', }, { name: 'Edit logo and tidy up deliverables', time: '15:00 - 16:00', }],
        '2024-08-21': [{ name: 'Team Meeting', time: '09:00 - 10:00', }, { name: 'Client Presentation', time: '14:00 - 15:00', }],
        '2024-08-22': [],
        '2024-08-23': [{ name: 'item 1 - any js object' }],
        '2024-08-26': [{ name: 'item 2 - any js object', }],
        '2024-08-27': [],
        '2024-09-01': [{ name: 'item 3 - any js object' }, { name: 'any js object' }]
    }

    useEffect(() => {
        setAgendaItems(items);
    }, []);

    const handlePrev = () => {
        if (selectedView === 'Day') {
            setSelectedDate(moment(selectedDate).subtract(1, 'days').format('YYYY-MM-DD'));
        } else if (selectedView === 'Week') {
            setSelectedDate(moment(selectedDate).subtract(1, 'weeks').format('YYYY-MM-DD'));
        } else if (selectedView === 'Month') {
            setSelectedDate(moment(selectedDate).subtract(1, 'months').format('YYYY-MM-DD'));
        }
    };

    const handleNext = () => {
        if (selectedView === 'Day') {
            setSelectedDate(moment(selectedDate).add(1, 'days').format('YYYY-MM-DD'));
        } else if (selectedView === 'Week') {
            setSelectedDate(moment(selectedDate).add(1, 'weeks').format('YYYY-MM-DD'));
        } else if (selectedView === 'Month') {
            setSelectedDate(moment(selectedDate).add(1, 'months').format('YYYY-MM-DD'));
        }
    };

    const renderContent = () => {
        return (
            <View style={{ flex: 1, backgroundColor: appColors.white, width: '100%' }}>

                <Agenda
                    items={agendaItems}
                    loadItemsForMonth={month => {
                        console.log('trigger items loading', { month });
                    }}
                    onDayPress={day => {
                        // console.log('day pressed', day);
                    }}
                    onDayChange={day => {
                        // console.log('day changed', day);
                    }}
                    selected={selectedDate}
                    renderItem={(item, firstItemInDay) => {
                        return (
                            <View style={{
                                backgroundColor: firstItemInDay ? '#DAFD90' : '#EECBFF',
                                padding: 10,
                                borderRadius: 10
                            }}>
                                <Text style={styles.time_}>{item.time}</Text>
                                <Text style={styles.desc_}>{item.name}</Text>
                            </View>
                        )
                    }}
                    renderEmptyDate={(day) => {
                        console.log('day data==>', day);

                        return (
                            <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center', width: '55%', }}>
                                <Text style={styles.notFound_}>There is nothing planned for this date.</Text>
                            </View>
                        )
                    }}
                    rowHasChanged={(r1, r2) => r1.name !== r2.name}
                    theme={{
                        agendaDayTextColor: appColors.black,  // Customize other agenda styles here
                        agendaDayNumColor: appColors.black,
                        // agendaTodayColor: appColors.lightRed,
                        agendaKnobColor: appColors.grey,
                    }}
                />
            </View>

        );
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: appColors.white }}>
            <View style={{ flex: 1, marginHorizontal: 20, }}>



                <View style={styles.headerStyle}>
                    <View style={{ height: 40, width: 40 }} >
                        <WhiteBackIcon onPress={() => navigation.goBack()} />
                    </View>
                    <Text style={styles.usernameStyle}>Calendar</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <TouchableOpacity style={{ marginRight: 5 }}>
                            <NotificationIcon />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('Menu')} >
                            <MenuIcon />
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={styles.content_}>
                    <TouchableOpacity onPress={() => setSelectedView('Day')} style={[styles.tab__, selectedView === 'Day' && { backgroundColor: appColors.black }]}>
                        <Text style={selectedView === 'Day' ? { color: appColors.white, fontWeight: 'bold' } : { color: appColors.black }}>Day</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSelectedView('Week')} style={[styles.tab__, selectedView === 'Week' && { backgroundColor: appColors.black }]}>
                        <Text style={selectedView === 'Week' ? { color: appColors.white, fontWeight: 'bold' } : { color: appColors.black }}>Week</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSelectedView('Month')} style={[styles.tab__, selectedView === 'Month' && { backgroundColor: appColors.black }]}>
                        <Text style={selectedView === 'Month' ? { color: appColors.white, fontWeight: 'bold' } : { color: appColors.black, fontSize: 13 }}>Month</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                    <TouchableOpacity onPress={handlePrev}>
                        <ArrowLeft />
                    </TouchableOpacity>
                    <Text>{moment(selectedDate).format('DD MMMM YYYY')}</Text>
                    <TouchableOpacity onPress={handleNext}>
                        <ArrowRight />
                    </TouchableOpacity>
                </View>


                {renderContent()}

                <View style={{ padding: 10, alignItems: 'center', }}>
                    <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('NewDateAdd')}>
                        <Text style={{ color: 'white', fontSize: 13, fontWeight: '600' }}>+ Add Unavailability</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default CalendarPage

const styles = StyleSheet.create({
    content_: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 1,
        height: 40,
        borderRadius: 40,
        borderColor: appColors.grey,
        width: '100%'
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
    },
    smallTextStyle: {
        fontSize: 12,
        color: appColors.grey,
    },
    tab__: {
        width: '33%',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        borderRadius: 20
    },
    time_: {
        fontSize: 13,
        color: appColors.black,
        fontWeight: '600'
    },
    desc_: {
        fontSize: 12,
        color: appColors.black
    },
    notFound_: {
        fontSize: 13,
        color: appColors.black,
        fontWeight: '400',
        textAlign: 'center'
    },
    addButton: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
        width: '50%'
    },
})