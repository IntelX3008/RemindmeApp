// screens/DashboardScreen.tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useGoals } from '../context/GoalContext';
import { useEvents } from '../context/EventContext';
import { holidays } from '../holidays';

type GoalProgressBarProps = {
    goals: Array<{ completed: boolean }>;
    isDark: boolean;
};

const GoalProgressBar: React.FC<GoalProgressBarProps> = ({ goals, isDark }) => {
    const styles = goalStyles(isDark);
    if (!goals || goals.length === 0) {
        return <Text style={styles.placeholderText}>No goals set yet. Add one in the Goals tab!</Text>;
    }

    const completed = goals.filter(g => g.completed).length;
    const progress = goals.length > 0 ? (completed / goals.length) * 100 : 0;

    return (
        <View>
            <View style={styles.goalTextRow}>
                <Text style={styles.goalCategoryText}>Overall Progress</Text>
                <Text style={styles.goalProgressText}>{`${completed} of ${goals.length} completed`}</Text>
            </View>
            <View style={styles.progressBarBackground}>
                <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.percentageText}>{`${Math.round(progress)}%`}</Text>
        </View>
    );
};

// Removed duplicate DashboardScreen implementation

// Removed duplicate screenStyles declaration

const goalStyles = (isDark: any) => StyleSheet.create({
    goalTextRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
    goalCategoryText: { color: isDark ? '#D1D5DB' : '#374151', fontWeight: '500' },
    goalProgressText: { color: isDark ? '#9CA3AF' : '#6B7280', fontStyle: 'italic' },
    progressBarBackground: { height: 12, backgroundColor: isDark ? '#374151' : '#E5E7EB', borderRadius: 6, marginTop: 4 },
    progressBarFill: { height: 12, backgroundColor: '#4F46E5', borderRadius: 6 },
    placeholderText: { color: '#6B7280' },
    percentageText: {
        marginTop: 8,
        textAlign: 'right',
        fontWeight: 'bold',
        color: isDark ? '#A5B4FC' : '#4F46E5',
    },
});

export default function DashboardScreen() {
    const { isDark } = useTheme();
    const { goals } = useGoals();
    const { events } = useEvents(); // Get events from global context
    const styles = screenStyles(isDark);

    const now = new Date();
    const upcomingEvents = events
        .filter(e => new Date(e.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const nextEvent = upcomingEvents[0];
    const nextEventHoliday = nextEvent ? holidays[nextEvent.date] : undefined;
    const allEventsSorted = events
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.header}>Dashboard</Text>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Upcoming Event</Text>
                    {nextEvent ? (
                        <>
                            {nextEventHoliday && (
                                <View style={styles.notificationRow}>
                                    <View style={[styles.notificationDot, { backgroundColor: '#16B981' }]} />
                                    <Text style={[styles.notificationText, { fontWeight: 'bold' }]}>Holiday: {nextEventHoliday}</Text>
                                </View>
                            )}
                            <View style={styles.notificationRow}>
                                <View style={[styles.notificationDot, { backgroundColor: '#4F46E5' }]} />
                                <Text style={styles.notificationText}>{nextEvent.title}</Text>
                                <Text style={[styles.notificationText, { marginLeft: 8, fontSize: 12 }]}>{nextEvent.date}</Text>
                            </View>
                        </>
                    ) : (
                        <Text style={styles.placeholderText}>No upcoming events scheduled.</Text>
                    )}
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Goal Progress</Text>
                    <GoalProgressBar goals={goals} isDark={isDark} />
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Scheduled Events</Text>
                    {allEventsSorted.length > 0 ? (
                        allEventsSorted.map(event => {
                            const eventHoliday = holidays[event.date];
                            return (
                                <View key={event.id} style={styles.notificationRow}>
                                    <View style={[styles.notificationDot, { backgroundColor: '#4F46E5' }]} />
                                    <Text style={styles.notificationText}>{event.title}</Text>
                                    <Text style={[styles.notificationText, { marginLeft: 8, fontSize: 12 }]}>{event.date}</Text>
                                    {eventHoliday && (
                                        <Text style={[styles.notificationText, { marginLeft: 8, color: '#16B981', fontWeight: 'bold' }]}>Holiday: {eventHoliday}</Text>
                                    )}
                                </View>
                            );
                        })
                    ) : (
                        <Text style={styles.placeholderText}>No scheduled events.</Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const screenStyles = (isDark: boolean) => StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: isDark ? '#111827' : '#F3F4F6' },
    container: { padding: 24 },
    header: { fontSize: 30, fontWeight: 'bold', marginBottom: 24, color: isDark ? '#F9FAFB' : '#1F2937' },
    card: { backgroundColor: isDark ? '#1F2937' : '#FFFFFF', padding: 24, borderRadius: 8, marginBottom: 24 },
    cardTitle: { fontSize: 20, fontWeight: '600', marginBottom: 16, color: isDark ? '#F9FAFB' : '#1F2937' },
    placeholderText: { color: '#6B7280' },
    notificationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    notificationDot: { width: 8, height: 8, borderRadius: 4, marginRight: 8 },
    notificationText: { color: isDark ? '#D1D5DB' : '#374151' },
});

