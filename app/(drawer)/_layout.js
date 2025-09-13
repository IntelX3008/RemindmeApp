// app/(drawer)/_layout.js
import { Drawer } from 'expo-router/drawer';
import { View, Text } from 'react-native';
import { HomeIcon, CalendarIcon, GoalsIcon, SettingsIcon } from '../../components/SvgIcons';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

// Custom Drawer Header
const DrawerHeader = () => (
    <StyledView className="p-4 bg-white dark:bg-gray-800">
        <StyledText className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            ReMindMe
        </StyledText>
    </StyledView>
);

export default function DrawerLayout() {
  return (
    <Drawer drawerContent={(props) => <DrawerHeader {...props} />}>
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: 'Dashboard',
          title: 'Dashboard',
          drawerIcon: ({ color, size }) => <HomeIcon color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="calendar"
        options={{
          drawerLabel: 'Calendar',
          title: 'Calendar',
          drawerIcon: ({ color, size }) => <CalendarIcon color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="goals"
        options={{
          drawerLabel: 'Goals',
          title: 'Goals',
          drawerIcon: ({ color, size }) => <GoalsIcon color={color} size={size} />,
        }}
      />
       <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: 'Settings',
          title: 'Settings',
          drawerIcon: ({ color, size }) => <SettingsIcon color={color} size={size} />,
        }}
      />
    </Drawer>
  );
}