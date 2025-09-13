// app/(drawer)/goals.js
import React, { useState, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { styled } from 'nativewind';
import { AppContext } from '../../context/AppContext';
import GoalTabs from '../../components/GoalTabs';
import AddGoalModal from '../../components/AddGoalModal';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function GoalsScreen() {
    const { goals, toggleGoal, deleteGoal } = useContext(AppContext);
    const [activeCategory, setActiveCategory] = useState('health');
    const [isModalVisible, setModalVisible] = useState(false);
    
    const categories = Object.keys(goals);
    const activeGoals = goals[activeCategory] || [];

    return (
        <StyledScrollView className="flex-1 bg-gray-100 dark:bg-gray-900">
             <StyledView className="p-6">
                <StyledView className="flex-row justify-between items-center mb-6">
                    <StyledText className="text-3xl font-bold text-gray-800 dark:text-gray-200">Life Goals</StyledText>
                     <StyledTouchableOpacity
                        className="bg-indigo-600 px-4 py-2 rounded-md"
                        onPress={() => setModalVisible(true)}
                    >
                        <StyledText className="text-white font-semibold">Add Goal</StyledText>
                    </StyledTouchableOpacity>
                </StyledView>
                 <StyledView className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <GoalTabs 
                        categories={categories} 
                        activeCategory={activeCategory} 
                        onTabPress={setActiveCategory} 
                    />
                    <StyledView className="mt-4">
                        {activeGoals.map(goal => (
                            <StyledView key={goal.id} className="flex-row items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md mb-2">
                                <StyledView className="flex-row items-center flex-1">
                                    <Switch
                                        value={goal.completed}
                                        onValueChange={() => toggleGoal(goal.id, activeCategory)}
                                        trackColor={{ false: '#767577', true: '#818cf8' }}
                                        thumbColor={goal.completed ? '#4f46e5' : '#f4f3f4'}
                                    />
                                    <StyledText className={`ml-3 ${goal.completed ? 'line-through text-gray-500' : 'text-gray-800 dark:text-gray-200'}`}>
                                        {goal.title}
                                    </StyledText>
                                </StyledView>
                                 <StyledTouchableOpacity onPress={() => deleteGoal(goal.id, activeCategory)}>
                                    <StyledText className="text-red-500 font-semibold">Delete</StyledText>
                                </StyledTouchableOpacity>
                            </StyledView>
                        ))}
                    </StyledView>
                </StyledView>
            </StyledView>
            <AddGoalModal 
                isVisible={isModalVisible} 
                onClose={() => setModalVisible(false)} 
                categories={categories}
            />
        </StyledScrollView>
    );
}