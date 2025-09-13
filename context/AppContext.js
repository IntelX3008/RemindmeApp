// context/AppContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

// Mock data from your original file
const initialGoals = {
    health: [
        { id: 1, title: 'Workout 3 times this week', completed: true },
        { id: 2, title: 'Drink 8 glasses of water daily', completed: false },
    ],
    financial: [{ id: 3, title: 'Save $500 this month', completed: false }],
    relationships: [],
    creativity: [{ id: 4, title: 'Finish painting', completed: false }],
};

const initialNotifications = [
    { id: 1, text: "Take your medication", time: 3, color: 'red', duration: 30 },
    { id: 2, text: "Drink a glass of water", time: 8, color: 'blue', duration: 15 },
    { id: 3, text: "Stand up and stretch", time: 15, color: 'green', duration: 20 },
];

export const AppProvider = ({ children }) => {
    const [theme, setTheme] = useState('light'); // 'light' or 'dark'
    const [events, setEvents] = useState([]);
    const [goals, setGoals] = useState(initialGoals);
    const [notifications, setNotifications] = useState(initialNotifications);
    const [activeReminder, setActiveReminder] = useState(null); // { text, color, duration }

    // This function will trigger the reminder popup
    const triggerReminder = (reminder) => {
        setActiveReminder(reminder);
    };

    const completeReminder = () => {
        setActiveReminder(null);
    };

    // This effect handles the scheduling of notifications
    useEffect(() => {
        const timeouts = notifications.map(notif => 
            setTimeout(() => {
                triggerReminder(notif);
            }, notif.time * 1000)
        );
        // Cleanup timeouts when component unmounts or notifications change
        return () => timeouts.forEach(clearTimeout);
    }, [notifications]);

    const addEvent = (event) => {
        setEvents(prev => [...prev, event]);
    };
    
    const addGoal = (goal, category) => {
        setGoals(prev => ({
            ...prev,
            [category]: [...prev[category], goal]
        }));
    };

    const toggleGoal = (goalId, category) => {
        setGoals(prev => ({
            ...prev,
            [category]: prev[category].map(g => 
                g.id === goalId ? { ...g, completed: !g.completed } : g
            ),
        }));
    };

    const deleteGoal = (goalId, category) => {
         setGoals(prev => ({
            ...prev,
            [category]: prev[category].filter(g => g.id !== goalId),
        }));
    };
    
    // Add more functions here to add/edit/delete notifications if needed

    const value = {
        theme,
        setTheme,
        events,
        addEvent,
        goals,
        addGoal,
        toggleGoal,
        deleteGoal,
        notifications,
        setNotifications,
        activeReminder,
        completeReminder,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};