// components/ReminderPopup.js
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { AppContext } from '../context/AppContext';
import { BellIcon } from './SvgIcons';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function ReminderPopup() {
    const { activeReminder, completeReminder } = useContext(AppContext);
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        if (activeReminder) {
            setTimeLeft(activeReminder.duration);
            const interval = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [activeReminder]);

    if (!activeReminder) {
        return null;
    }

    const borderColorClass = `border-${activeReminder.color}-500`;

    return (
        <StyledView className={`absolute top-16 right-5 w-11/12 max-w-sm bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border-l-4 ${borderColorClass}`}>
            <StyledView className="flex-row items-start">
                <BellIcon color={activeReminder.color === 'red' ? '#EF4444' : (activeReminder.color === 'blue' ? '#3B82F6' : '#22C55E')} size={28} />
                <StyledView className="flex-1 ml-3">
                    <StyledText className="font-semibold text-gray-800 dark:text-gray-200">{activeReminder.text}</StyledText>
                    <StyledText className={`text-sm mt-1 ${timeLeft > 0 ? 'text-gray-600 dark:text-gray-400' : 'text-red-500 font-bold'}`}>
                        {timeLeft > 0 ? `Time left: ${timeLeft}s` : 'Overdue!'}
                    </StyledText>
                </StyledView>
            </StyledView>
            <StyledTouchableOpacity 
                className="mt-4 w-full bg-green-500 py-2 rounded-md items-center"
                onPress={completeReminder}
            >
                <StyledText className="text-white font-bold">Mark as Complete</StyledText>
            </StyledTouchableOpacity>
        </StyledView>
    );
}