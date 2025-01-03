import React, { useState } from 'react';
import { Text,View, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

// Dummy data for demonstration
const events: Record<string, Array<{ name: string; time: string }>> = {
  '2023-05-15': [{name: 'Team Meeting', time: '10:00 AM'}, {name: 'Project Deadline', time: '5:00 PM'}],
  '2023-05-16': [{name: 'Dentist Appointment', time: '2:00 PM'}],
  '2023-05-18': [{name: 'Birthday Party', time: '7:00 PM'}],
};

export default function DatePickerInSheet() {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const selectedDateString = formatDate(date);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.calendarContainer}>
        <Text style={styles.dateText}>{date.toDateString()}</Text>
        <TouchableOpacity onPress={showDatepicker} style={styles.dateButton}>
          <Text style={styles.dateButtonText}>Select Date</Text>
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
      <View style={styles.eventContainer}>
        <Text style={styles.eventTitle}>Events for {selectedDateString}</Text>
        <ScrollView>
          {events[selectedDateString]?.map((event, index) => (
            <View key={index} style={styles.eventItem}>
              <Ionicons name="calendar-outline" size={24} color="#50cebb" />
              <View style={styles.eventDetails}>
                <Text style={styles.eventName}>{event.name}</Text>
                <Text style={styles.eventTime}>{event.time}</Text>
              </View>
            </View>
          ))}
          {!events[selectedDateString] && (
            <Text style={styles.noEvents}>No events scheduled for this day.</Text>
          )}
        </ScrollView>
      </View>
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => alert('Add event functionality to be implemented')}
      >
        <Ionicons name="add" size={24} color="#ffffff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendarContainer: {
    padding: 20,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dateButton: {
    backgroundColor: '#50cebb',
    padding: 10,
    borderRadius: 5,
  },
  dateButtonText: {
    fontSize: 16,
  },
  eventContainer: {
    flex: 1,
    padding: 20,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  eventDetails: {
    marginLeft: 10,
  },
  eventName: {
    fontSize: 16,
    fontWeight: '500',
  },
  eventTime: {
    fontSize: 14,
  },
  noEvents: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#50cebb',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});