// App.tsx
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, Image } from 'react-native';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { GoalProvider } from './context/GoalContext';
import { EventProvider } from './context/EventContext';

import DashboardScreen from './screens/DashboardScreen';
import CalendarScreen from './screens/CalendarScreen';
import GoalsScreen from './screens/GoalsScreen';
import SettingsScreen from './screens/SettingsScreen';

const Tab = createBottomTabNavigator();

type TabBarIconProps = {
    name: string;
    focused: boolean;
};

const TabBarIcon: React.FC<TabBarIconProps> = ({ name, focused }) => {
    let icon;
    if (name === 'Dashboard') icon = '📊';
    else if (name === 'Calendar') icon = '📅';
    else if (name === 'Goals') icon = '🎯';
    else if (name === 'Settings') icon = '⚙️';
    return <Text style={{ fontSize: 28, opacity: focused ? 1 : 0.5 }}>{icon}</Text>;
};

function SplashScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#4F46E5' }}>
            <Image source={require('./assets/ReMindMe Logo Black 0.png')} style={{ width: 120, height: 120, marginBottom: 24, resizeMode: 'contain' }} />
            <Text style={{ color: '#fff', fontSize: 32, fontWeight: 'bold' }}>ReMindMe</Text>
        </View>
    );
}

function AppContent() {
    const { isDark } = useTheme();

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ focused }) => <TabBarIcon name={route.name} focused={focused} />,
                    tabBarActiveTintColor: '#4F46E5',
                    tabBarInactiveTintColor: '#6B7280',
                    tabBarStyle: {
                        backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                        borderTopColor: isDark ? '#374151' : '#E5E7EB',
                    },
                })}
            >
                <Tab.Screen name="Dashboard" component={DashboardScreen} />
                <Tab.Screen name="Calendar" component={CalendarScreen} />
                <Tab.Screen name="Goals" component={GoalsScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default function App() {
    const [showSplash, setShowSplash] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => setShowSplash(false), 1800);
        return () => clearTimeout(timer);
    }, []);
    if (showSplash) return <SplashScreen />;
    return (
        <ThemeProvider>
            <GoalProvider>
                <EventProvider>
                    <AppContent />
                </EventProvider>
            </GoalProvider>
        </ThemeProvider>
    );
}