// app/(drawer)/index.js
import React, { useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, useColorScheme } from 'react-native';
import { AppContext } from '../../context/AppContext';

// This is the new way of styling
const GoalProgressBar = ({ category, goals }) => {
    const colorScheme = useColorScheme();
    const styles = goalStyles(colorScheme);

    if (goals.length === 0) return null;
    
    const completed = goals.filter(g => g.completed).length;
    const progress = (completed / goals.length) * 100;

    return (
        <View style={styles.goalContainer}>
            <View style={styles.goalTextRow}>
                <Text style={styles.goalCategoryText}>{category}</Text>
                <Text style={styles.goalProgressText}>{`${completed}/${goals.length}`}</Text>
            </View>
            <View style={styles.progressBarBackground}>
                <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
            </View>
        </View>
    );
};

export default function DashboardScreen() {
    const { goals, notifications } = useContext(AppContext);
    const colorScheme = useColorScheme();
    // Pass the color scheme to our styles function
    const styles = screenStyles(colorScheme);

    return (
        <ScrollView style={styles.screen}>
            <Text style={styles.header}>Dashboard</Text>
            
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Today's Schedule</Text>
                <Text style={styles.placeholderText}>No events scheduled for today.</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Goal Progress</Text>
                {Object.keys(goals).map(key => (
                    <GoalProgressBar key={key} category={key} goals={goals[key]} />
                ))}
            </View>
            
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Active Notifications</Text>
                {notifications.map(notif => (
                    <View key={notif.id} style={styles.notificationRow}>
                        <View style={[styles.notificationDot, { backgroundColor: notif.color }]} />
                        <Text style={styles.notificationText}>{notif.text}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

// Function to create dynamic styles for the screen
const screenStyles = (theme) => StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
        backgroundColor: theme === 'dark' ? '#111827' : '#F3F4F6',
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 24,
        color: theme === 'dark' ? '#F9FAFB' : '#1F2937',
    },
    card: {
        backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
        padding: 24,
        borderRadius: 8,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 16,
        color: theme === 'dark' ? '#F9FAFB' : '#1F2937',
    },
    placeholderText: {
        color: '#6B7280',
    },
    notificationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    notificationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 8,
    },
    notificationText: {
        color: theme === 'dark' ? '#D1D5DB' : '#374151',
    },
});

// Styles specific to the goal progress bar
const goalStyles = (theme) => StyleSheet.create({
    goalContainer: {
        marginBottom: 16,
    },
    goalTextRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    goalCategoryText: {
        textTransform: 'capitalize',
        color: theme === 'dark' ? '#D1D5DB' : '#374151',
        fontWeight: '500',
    },
    goalProgressText: {
        color: theme === 'dark' ? '#9CA3AF' : '#6B7280',
    },
    progressBarBackground: {
        height: 8,
        backgroundColor: theme === 'dark' ? '#374151' : '#E5E7EB',
        borderRadius: 4,
    },
    progressBarFill: {
        height: 8,
        backgroundColor: '#4F46E5',
        borderRadius: 4,
    },
});