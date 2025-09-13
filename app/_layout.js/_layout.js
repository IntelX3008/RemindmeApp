// app/_layout.js
import { Slot } from 'expo-router';
import { AppProvider } from '../context/AppContext';
import { useColorScheme } from 'react-native';
import { styled } from 'nativewind';
import { View } from 'react-native';
import ReminderPopup from '../components/ReminderPopup';

const StyledView = styled(View);

export default function RootLayout() {
  const colorScheme = useColorScheme(); // 'light' or 'dark'

  return (
    <AppProvider>
        {/* We use a StyledView to apply dark mode classes to the entire app */}
        <StyledView className={`flex-1 ${colorScheme === 'dark' ? 'dark' : ''}`}>
            <Slot />
            <ReminderPopup />
        </StyledView>
    </AppProvider>
  );
}