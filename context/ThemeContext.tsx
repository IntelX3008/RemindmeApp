// context/ThemeContext.tsx
import React, { createContext, useState, useContext } from 'react';
import { useColorScheme } from 'react-native';

// Define the shape of the context value
type ThemeContextType = {
    isDark: boolean;
    setIsDark: (isDark: boolean) => void;
};

// Create the context with a default value
export const ThemeContext = createContext<ThemeContextType>({
    isDark: false,
    setIsDark: () => {},
});

// Create the custom hook for easy access
export const useTheme = () => useContext(ThemeContext);

// Create the provider component
import { ReactNode } from 'react';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const systemTheme = useColorScheme();
    const [isDark, setIsDark] = useState(systemTheme === 'dark');

    return (
        <ThemeContext.Provider value={{ isDark, setIsDark }}>
            {children}
        </ThemeContext.Provider>
    );
};