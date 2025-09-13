// components/GoalTabs.js
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

export default function GoalTabs({ categories, activeCategory, onTabPress }) {
    return (
        <StyledView className="border-b border-gray-200 dark:border-gray-700">
            <StyledScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map(category => {
                    const isActive = category === activeCategory;
                    return (
                        <StyledTouchableOpacity
                            key={category}
                            onPress={() => onTabPress(category)}
                            className={`py-3 px-4 border-b-2 ${
                                isActive 
                                ? 'border-indigo-500' 
                                : 'border-transparent'
                            }`}
                        >
                            <StyledText className={`font-medium capitalize ${
                                isActive 
                                ? 'text-indigo-600 dark:text-indigo-400' 
                                : 'text-gray-500 dark:text-gray-400'
                            }`}>
                                {category}
                            </StyledText>
                        </StyledTouchableOpacity>
                    );
                })}
            </StyledScrollView>
        </StyledView>
    );
}