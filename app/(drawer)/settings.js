// app/(drawer)/settings.js
import React, { useState } from 'react';
import { View, Text, ScrollView, Switch } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);

const SettingRow = ({ label, description, children }) => (
    <StyledView className="flex-row justify-between items-center py-4 border-b border-gray-200 dark:border-gray-700">
        <StyledView className="flex-1 pr-4">
            <StyledText className="font-medium text-gray-700 dark:text-gray-300">{label}</StyledText>
            {description && <StyledText className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</StyledText>}
        </StyledView>
        {children}
    </StyledView>
);

export default function SettingsScreen() {
    const [focusMode, setFocusMode] = useState(false);
    const [emailNotifs, setEmailNotifs] = useState(false);
    const [smsNotifs, setSmsNotifs] = useState(false);

    return (
        <StyledScrollView className="flex-1 bg-gray-100 dark:bg-gray-900">
            <StyledView className="p-6">
                <StyledText className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">Settings</StyledText>
                <StyledView className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <StyledText className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Preferences</StyledText>
                    <SettingRow
                        label="Focus Mode"
                        description="Makes critical reminders harder to dismiss."
                    >
                        <Switch
                            value={focusMode}
                            onValueChange={setFocusMode}
                            trackColor={{ false: '#767577', true: '#818cf8' }}
                            thumbColor={focusMode ? '#4f46e5' : '#f4f3f4'}
                        />
                    </SettingRow>
                     <SettingRow label="Email Notifications">
                        <Switch
                            value={emailNotifs}
                            onValueChange={setEmailNotifs}
                        />
                    </SettingRow>
                    <SettingRow label="SMS Notifications">
                        <Switch
                            value={smsNotifs}
                            onValueChange={setSmsNotifs}
                        />
                    </SettingRow>
                </StyledView>
            </StyledView>
        </StyledScrollView>
    );
}