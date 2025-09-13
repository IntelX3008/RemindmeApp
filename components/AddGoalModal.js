// components/AddGoalModal.js
import React, { useState, useContext } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, Picker } from 'react-native';
import { styled } from 'nativewind';
import { AppContext } from '../context/AppContext';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledPicker = styled(Picker);

export default function AddGoalModal({ isVisible, onClose, categories }) {
    const { addGoal } = useContext(AppContext);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState(categories[0]);

    const handleSave = () => {
        if (title && category) {
            addGoal({ id: Date.now(), title, completed: false }, category);
            setTitle('');
            onClose();
        }
    };

    return (
         <Modal visible={isVisible} transparent={true} animationType="slide">
            <StyledView className="flex-1 justify-center items-center bg-black/50">
                <StyledView className="w-11/12 bg-white dark:bg-gray-800 rounded-lg p-6">
                    <StyledText className="text-lg font-bold mb-4 text-center text-gray-900 dark:text-gray-200">Add New Goal</StyledText>
                     <StyledTextInput
                        placeholder="Goal Title"
                        placeholderTextColor="#9CA3AF"
                        className="mb-3 px-3 py-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md w-full"
                        value={title}
                        onChangeText={setTitle}
                    />
                    {/* Note: Picker needs a library on Android for better styling, but this works for basic functionality */}
                    <StyledView className="border border-gray-300 dark:border-gray-600 rounded-md mb-4">
                        <StyledPicker
                            selectedValue={category}
                            onValueChange={(itemValue) => setCategory(itemValue)}
                            itemStyle={{color: 'black'}} // Basic styling
                        >
                            {categories.map(cat => <Picker.Item key={cat} label={cat.charAt(0).toUpperCase() + cat.slice(1)} value={cat} />)}
                        </StyledPicker>
                    </StyledView>

                     <StyledTouchableOpacity
                        className="px-4 py-3 bg-indigo-500 rounded-md w-full items-center mb-2"
                        onPress={handleSave}
                    >
                        <StyledText className="text-white font-semibold">Save Goal</StyledText>
                    </StyledTouchableOpacity>
                    <StyledTouchableOpacity
                        className="px-4 py-3 bg-gray-200 dark:bg-gray-600 rounded-md w-full items-center"
                        onPress={onClose}
                    >
                        <StyledText className="text-gray-800 dark:text-gray-200 font-semibold">Cancel</StyledText>
                    </StyledTouchableOpacity>
                </StyledView>
            </StyledView>
        </Modal>
    );
}