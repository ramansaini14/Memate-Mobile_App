import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { appColors } from '../utils/appColors';
import { formatDate } from '../utils/Constants';

const CalenderModal = ({
    modalVisible,
    setModalVisible,
    selectedDate,
    setSelectedDate

}) => {
    const currentDate = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    return (
        <View style={styles.container}>
            {/* Button to Open Modal */}
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
                <Text style={styles.buttonText}>{selectedDate || 'Select Date'}</Text>
            </TouchableOpacity>

            {/* Modal with Calendar */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>D.O.B</Text>

                        {/* Calendar Component */}
                        <Calendar
                            onDayPress={(day) => {
                                setSelectedDate(formatDate(day.dateString));
                                setModalVisible(false); // Close modal after selection
                            }}
                            theme={{
                                backgroundColor: '#ffffff',
                                calendarBackground: '#ffffff',
                                textSectionTitleColor: appColors.black,
                                selectedDayTextColor: '#ffffff',
                                todayTextColor: appColors.black,
                                dayTextColor: '#2d4150',
                                textDisabledColor: appColors.grey,
                                arrowColor:appColors.black,

                                
                              }}
                            maxDate={currentDate}
                            markedDates={{
                                [selectedDate]: {
                                    selected: true,
                                    disableTouchEvent: true,
                                    selectedDotColor: appColors.black,
                                    selectedColor: appColors.black, // Highlight selected date
                                },
                            }}
                        />

                        {/* Close Button */}
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={styles.closeButton}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: appColors.black,
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    closeButton: {
        marginTop: 10,
        backgroundColor: appColors.black,
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default CalenderModal;
