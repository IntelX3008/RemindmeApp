// screens/SettingsScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Switch } from 'react-native';
import { useTheme } from '../context/ThemeContext';

type SettingRowProps = {
    label: string;
    children: React.ReactNode;
};

const SettingRow = ({ label, children }: SettingRowProps) => {
    const { isDark } = useTheme();
    const styles = screenStyles(isDark);
    return (
        <View style={styles.row}>
            <Text style={styles.rowLabel}>{label}</Text>
            {children}
        </View>
    );
};

export default function SettingsScreen() {
    const { isDark, setIsDark } = useTheme();
    const styles = screenStyles(isDark);
    
    // State for the remaining settings
    const [emailNotifs, setEmailNotifs] = useState(true);
    const [smsNotifs, setSmsNotifs] = useState(false);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.header}>Settings</Text>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Preferences</Text>
                    
                    {/* Theme Toggle Switch */}
                    <SettingRow label={`Theme: ${isDark ? 'Dark' : 'Light'}`}>
                        <Switch
                            value={isDark}
                            onValueChange={setIsDark}
                            trackColor={{ false: '#767577', true: '#818cf8' }}
                            thumbColor={isDark ? '#4f46e5' : '#f4f3f4'}
                        />
                    </SettingRow>

                    {/* Notification Toggles */}
                    <SettingRow label="Email Notifications">
                        <Switch
                            value={emailNotifs}
                            onValueChange={setEmailNotifs}
                            trackColor={{ false: '#767577', true: '#818cf8' }}
                            thumbColor={emailNotifs ? '#4f46e5' : '#f4f3f4'}
                        />
                    </SettingRow>
                    <SettingRow label="SMS Notifications">
                        <Switch
                            value={smsNotifs}
                            onValueChange={setSmsNotifs}
                            trackColor={{ false: '#767577', true: '#818cf8' }}
                            thumbColor={smsNotifs ? '#4f46e5' : '#f4f3f4'}
                        />
                    </SettingRow>
                </View>
            </View>
        </SafeAreaView>
    );
}

const screenStyles = (isDark: boolean) => StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: isDark ? '#111827' : '#F3F4F6' },
    container: { padding: 24 },
    header: { fontSize: 30, fontWeight: 'bold', marginBottom: 24, color: isDark ? '#F9FAFB' : '#1F2937' },
    card: { backgroundColor: isDark ? '#1F2937' : '#FFFFFF', paddingHorizontal: 24, borderRadius: 8 },
    cardTitle: {
        fontSize: 20,
        fontWeight: '600',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: isDark ? '#374151' : '#E5E7EB',
        color: isDark ? '#F9FAFB' : '#1F2937',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    rowLabel: {
        fontSize: 16,
        color: isDark ? '#F9FAFB' : '#1F2937',
    },
});