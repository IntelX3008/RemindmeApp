// screens/CalendarScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useEvents } from '../context/EventContext';
import { holidays, culturalHolidays } from '../holidays';
import AddEventModal from '../components/AddEventModal';

const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function CalendarScreen() {
    const { isDark } = useTheme();
    const styles = screenStyles(isDark);
    const { events, addEvent } = useEvents();
    const [currentDate, setCurrentDate] = useState(new Date('2025-01-01'));
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const monthYear = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarGrid = [];
    for (let i = 0; i < firstDay; i++) {
        calendarGrid.push({ key: `empty-${i}`, isEmpty: true });
    }
    for (let i = 1; i <= daysInMonth; i++) {
        calendarGrid.push({ key: i, day: i });
    }

    const goToPreviousMonth = () => {
        setSelectedDate('');
        setCurrentDate(new Date(year, month - 1, 1));
    };
    const goToNextMonth = () => {
        setSelectedDate('');
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const handleDayPress = (day: number | undefined) => {
        if (!day) return;
        const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        setSelectedDate(dateString);
    };

    const openAddEventModal = (day: number | undefined) => {
        if (!day) return;
        const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        setSelectedDate(dateString);
        setModalVisible(true);
    };

    const handleAddEvent = (title: any) => {
        addEvent({ date: selectedDate, title });
    };

    const eventsForSelectedDay = events.filter(e => e.date === selectedDate);
    const selectedDayHoliday = holidays[selectedDate];
    const selectedDayCulturalHoliday = culturalHolidays[selectedDate];

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.headerRow}>
                    <Text style={styles.header}>Calendar</Text>
                    <TouchableOpacity style={styles.addEventButton} onPress={() => openAddEventModal(new Date(currentDate).getDate())}>
                        <Text style={styles.addEventButtonText}>Add Event</Text>
                    </TouchableOpacity>
                    {/* Instruction removed as requested */}
                </View>
                <View style={styles.card}>
                    <View style={styles.monthNavigator}>
                        <TouchableOpacity onPress={goToPreviousMonth}><Text style={styles.navButton}>‹</Text></TouchableOpacity>
                        <Text style={styles.cardTitle}>{monthYear}</Text>
                        <TouchableOpacity onPress={goToNextMonth}><Text style={styles.navButton}>›</Text></TouchableOpacity>
                    </View>
                    <View style={styles.weekHeader}>
                        {daysOfWeek.map((day, index) => (
                            <Text key={index} style={styles.weekDayText}>{day}</Text>
                        ))}
                    </View>
                    <View style={styles.gridContainer}>
                        {calendarGrid.map((item) => {
                            if (item.isEmpty) return <View key={item.key} style={styles.dayCell} />;
                            
                            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(item.day).padStart(2, '0')}`;
                            const isHoliday = holidays[dateString];
                            const isCulturalHoliday = culturalHolidays[dateString];
                            const hasEvent = events.some(e => e.date === dateString);
                            const isSelected = dateString === selectedDate;

                            return (
                                <TouchableOpacity 
                                    key={item.key} 
                                    style={[styles.dayCell, isSelected && styles.selectedDay, isHoliday && styles.holiday, isCulturalHoliday && styles.culturalHoliday]} 
                                    onPress={() => handleDayPress(item.day)}
                                    onLongPress={() => openAddEventModal(item.day)}
                                >
                                    <Text style={styles.dayText}>{item.day}</Text>
                                    {hasEvent && <View style={styles.eventDot} />}
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                {selectedDate ? (
                    <View style={[styles.card, { marginTop: 24 }]}>
                        <Text style={styles.cardTitle}>
                            Schedule for {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                        </Text>
                        {selectedDayHoliday && <Text style={styles.holidayText}>{selectedDayHoliday}</Text>}
                        {selectedDayCulturalHoliday && <Text style={styles.culturalHolidayText}>{selectedDayCulturalHoliday}</Text>}
                        
                        {eventsForSelectedDay.length > 0 ? (
                            eventsForSelectedDay.map(event => (
                                <View key={event.id} style={styles.eventRow}>
                                    <View style={styles.eventListDot} />
                                    <Text style={styles.eventText}>{event.title}</Text>
                                </View>
                            ))
                        ) : (
                            !selectedDayHoliday && !selectedDayCulturalHoliday && <Text style={styles.placeholderText}>No events scheduled.</Text>
                        )}
                    </View>
                ) : null}

            </ScrollView>
            <AddEventModal
                isVisible={isModalVisible}
                onClose={() => setModalVisible(false)}
                onAddEvent={handleAddEvent}
            />
        </SafeAreaView>
    );
}

const screenStyles = (isDark: boolean) => StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: isDark ? '#111827' : '#F3F4F6' },
    container: { paddingHorizontal: 16, paddingBottom: 24 },
    headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, paddingTop: 24, paddingHorizontal: 8 },
    header: { fontSize: 30, fontWeight: 'bold', color: isDark ? '#F9FAFB' : '#1F2937' },
    instructions: { fontSize: 12, color: isDark ? '#9CA3AF' : '#6B7280' },
    card: { backgroundColor: isDark ? '#1F2937' : '#FFFFFF', padding: 8, borderRadius: 8 },
    monthNavigator: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingHorizontal: 8 },
    cardTitle: { fontSize: 20, fontWeight: '600', color: isDark ? '#F9FAFB' : '#1F2937' },
    navButton: { fontSize: 28, fontWeight: 'bold', color: '#4F46E5' },
    weekHeader: { flexDirection: 'row' },
    weekDayText: { textAlign: 'center', fontWeight: 'bold', color: isDark ? '#9CA3AF' : '#6B7280', width: `${100/7}%` },
    gridContainer: { flexDirection: 'row', flexWrap: 'wrap' },
    dayCell: { width: `${100/7}%`, aspectRatio: 1, alignItems: 'center', justifyContent: 'center' },
    dayText: { color: isDark ? '#F9FAFB' : '#1F2937' },
    selectedDay: { borderWidth: 2, borderColor: '#4F46E5', borderRadius: 4 },
    holiday: { backgroundColor: 'rgba(16, 185, 129, 0.2)', borderRadius: 4 },
    culturalHoliday: { backgroundColor: 'rgba(59, 130, 246, 0.2)', borderRadius: 4 },
    eventDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#EF4444', marginTop: 4 },
    placeholderText: { color: '#6B7280', padding: 16, textAlign: 'center' },
    eventRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: isDark ? '#374151' : '#F3F4F6', padding: 12, borderRadius: 6, marginBottom: 8 },
    eventListDot: { width: 8, height: 8, borderRadius: 4, marginRight: 8, backgroundColor: '#4F46E5' },
    eventText: { color: isDark ? '#D1D5DB' : '#374151'},
    holidayText: { color: '#059669', fontWeight: 'bold', padding: 12 },
    culturalHolidayText: { color: '#2563EB', fontWeight: 'bold', padding: 12 },
    addEventButton: {
        backgroundColor: '#4F46E5',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        marginLeft: 8,
    },
    addEventButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});