// screens/GoalsScreen.tsx
import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text, View, TextInput, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useGoals } from '../context/GoalContext'; // Correctly import the hook

type Goal = {
    id: string;
    title: string;
    completed: boolean;
};

export default function GoalsScreen() {
    const { isDark } = useTheme();
    const { goals, addGoal, toggleCompletion, deleteGoal } = useGoals();
    const styles = screenStyles(isDark);
    const [newGoal, setNewGoal] = useState('');

    const handleAddGoal = () => {
        if (newGoal.trim() === '') return;
        addGoal(newGoal);
        setNewGoal('');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.header}>Life Goals</Text>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Add a New Goal</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your goal"
                        value={newGoal}
                        onChangeText={setNewGoal}
                        placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleAddGoal}>
                        <Text style={styles.buttonText}>Add Goal</Text>
                    </TouchableOpacity>
                </View>

                {/* This View was misplaced in your original code, it's now corrected */}
                <View style={{ marginTop: 24 }}>
                    {goals.map((item: Goal) => (
                        <View key={item.id} style={styles.goalItem}>
                            <Text style={[styles.goalText, item.completed && styles.completedText]}>{item.title}</Text>
                            <Switch
                                value={item.completed}
                                onValueChange={() => toggleCompletion(item.id)}
                            />
                            <TouchableOpacity onPress={() => deleteGoal(item.id)} style={{ marginLeft: 8, padding: 8 }}>
                                <Text style={{ color: '#EF4444', fontWeight: 'bold' }}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

// Styles remain the same
const screenStyles = (isDark: boolean) => StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: isDark ? '#111827' : '#F3F4F6',
    },
    container: {
        padding: 24,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 24,
        color: isDark ? '#F9FAFB' : '#1F2937',
    },
    card: {
        backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
        padding: 24,
        borderRadius: 8,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 16,
        color: isDark ? '#F9FAFB' : '#1F2937',
    },
    input: {
        backgroundColor: isDark ? '#374151' : '#F3F4F6',
        padding: 12,
        borderRadius: 8,
        color: isDark ? '#F9FAFB' : '#1F2937',
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#4F46E5',
        paddingVertical: 12,
        borderRadius: 8,
    },
    buttonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: '600',
    },
    goalItem: {
        backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
        padding: 16,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    goalText: {
        color: isDark ? '#F9FAFB' : '#1F2937',
        flex: 1,
        marginRight: 8,
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: '#6B7280',
    },
});