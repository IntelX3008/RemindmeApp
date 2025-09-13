// components/AddEventModal.tsx
import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet, useColorScheme, KeyboardAvoidingView, Platform } from 'react-native';

export default function AddEventModal({ isVisible, onClose, onAddEvent }) {
    const colorScheme = useColorScheme();
    const styles = modalStyles(colorScheme);
    const [title, setTitle] = useState('');

    const handleSave = () => {
        if (title.trim()) {
            onAddEvent(title);
            setTitle('');
            onClose();
        }
    };

    return (
        <Modal visible={isVisible} transparent={true} animationType="slide" onRequestClose={onClose}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.centeredView}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Add New Event</Text>
                    <TextInput
                        placeholder="Event Title"
                        placeholderTextColor="#9CA3AF"
                        style={styles.input}
                        value={title}
                        onChangeText={setTitle}
                    />
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.buttonText}>Save Event</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}

const modalStyles = (theme) => StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        width: '85%',
        backgroundColor: theme === 'dark' ? '#1F2937' : 'white',
        borderRadius: 12,
        padding: 24,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: theme === 'dark' ? '#F9FAFB' : '#1F2937',
    },
    input: {
        width: '100%',
        backgroundColor: theme === 'dark' ? '#374151' : '#F3F4F6',
        padding: 12,
        borderRadius: 8,
        color: theme === 'dark' ? '#F9FAFB' : '#1F2937',
        marginBottom: 20,
    },
    saveButton: {
        backgroundColor: '#4F46E5',
        borderRadius: 8,
        paddingVertical: 12,
        width: '100%',
        marginBottom: 10,
    },
    cancelButton: {
        backgroundColor: theme === 'dark' ? '#374151' : '#E5E7EB',
        borderRadius: 8,
        paddingVertical: 12,
        width: '100%',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cancelButtonText: {
        color: theme === 'dark' ? '#F9FAFB' : '#1F2937',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});