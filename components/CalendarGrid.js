// components/CalendarGrid.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function CalendarGrid({ currentDate, events, onDayPress, selectedDate }) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();

    const renderGrid = () => {
        const grid = [];
        // Add day labels
        daysOfWeek.forEach(day => grid.push(<StyledText key={day} className="flex-1 text-center font-semibold text-gray-600 dark:text-gray-400">{day}</StyledText>));

        // Add empty cells for the start of the month
        for (let i = 0; i < firstDay; i++) {
            grid.push(<StyledView key={`empty-${i}`} className="flex-1 p-2 m-1" />);
        }

        // Add day cells
        for (let i = 1; i <= daysInMonth; i++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            const isToday = i === today.getDate() && month === today.getMonth() && year === today.getFullYear();
            const isSelected = dateStr === selectedDate;
            const hasEvents = events.some(e => e.date === dateStr);

            grid.push(
                <StyledTouchableOpacity
                    key={i}
                    className={`flex-1 p-2 m-1 rounded-full items-center justify-center 
                        ${isToday ? 'bg-indigo-600' : ''}
                        ${isSelected ? 'border-2 border-indigo-400' : ''}
                    `}
                    onPress={() => onDayPress(dateStr)}
                >
                    <StyledText className={`font-medium ${isToday ? 'text-white' : 'text-gray-800 dark:text-gray-200'}`}>{i}</StyledText>
                    {hasEvents && <StyledView className="h-1.5 w-1.5 bg-red-500 rounded-full absolute bottom-1" />}
                </StyledTouchableOpacity>
            );
        }
        return grid;
    };

    return (
        <StyledView className="flex-row flex-wrap">
            {renderGrid()}
        </StyledView>
    );
}