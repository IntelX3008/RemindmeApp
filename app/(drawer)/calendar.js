// app/(drawer)/calendar.js
import React, { useState, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { AppContext } from '../../context/AppContext';
import CalendarGrid from '../../components/CalendarGrid';
import AddEventModal from '../../components/AddEventModal';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function CalendarScreen() {
    const { events } = useContext(AppContext);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null); // e.g., '2025-08-25'
    const [isModalVisible, setModalVisible] = useState(false);
    
    const monthYear = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

    const goToPreviousMonth = () => {
        setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
    };

    const selectedDayEvents = events.filter(e => e.date === selectedDate);
    const selectedDateObj = selectedDate ? new Date(selectedDate + 'T00:00:00') : null;

    return (
        <StyledScrollView className="flex-1 bg-gray-100 dark:bg-gray-900">
            <StyledView className="p-6">
                <StyledView className="flex-row justify-between items-center mb-6">
                    <StyledText className="text-3xl font-bold text-gray-800 dark:text-gray-200">Calendar</StyledText>
                    <StyledTouchableOpacity
                        className="bg-indigo-600 px-4 py-2 rounded-md"
                        onPress={() => setModalVisible(true)}
                    >
                        <StyledText className="text-white font-semibold">Add Event</StyledText>
                    </StyledTouchableOpacity>
                </StyledView>

                <StyledView className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <StyledView className="flex-row justify-between items-center mb-4">
                        <StyledTouchableOpacity onPress={goToPreviousMonth} className="p-2">
                            <StyledText className="text-lg font-bold text-gray-700 dark:text-gray-300">{'<'}</StyledText>
                        </StyledTouchableOpacity>
                        <StyledText className="text-xl font-semibold text-gray-800 dark:text-gray-200">{monthYear}</StyledText>
                        <StyledTouchableOpacity onPress={goToNextMonth} className="p-2">
                            <StyledText className="text-lg font-bold text-gray-700 dark:text-gray-300">{'>'}</StyledText>
                        </StyledTouchableOpacity>
                    </StyledView>
                    <CalendarGrid 
                        currentDate={currentDate} 
                        events={events}
                        onDayPress={setSelectedDate}
                        selectedDate={selectedDate}
                    />
                </StyledView>
                
                {selectedDate && (
                     <StyledView className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <StyledText className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                            Events for {selectedDateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                        </StyledText>
                        {selectedDayEvents.length > 0 ? (
                            selectedDayEvents.map((event, index) => (
                                <StyledText key={index} className="text-gray-600 dark:text-gray-400 mb-1">
                                    {event.time} - {event.title}
                                </StyledText>
                            ))
                        ) : (
                            <StyledText className="text-gray-500">No events for this day.</StyledText>
                        )}
                     </StyledView>
                )}
            </StyledView>
            <AddEventModal isVisible={isModalVisible} onClose={() => setModalVisible(false)} />
        </StyledScrollView>
    );
}