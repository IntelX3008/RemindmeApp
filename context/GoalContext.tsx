// context/GoalContext.tsx
import React, { createContext, useState, useContext } from 'react';

// Define the shape of a single goal
export type Goal = {
    progress: any;
    id: string;
    title: string;
    completed: boolean;
};

// Define the shape of the context value
type GoalContextType = {
    goals: Goal[];
    addGoal: (title: string) => void;
    toggleCompletion: (id: string) => void;
    deleteGoal: (id: string) => void;
};

const initialGoals: Goal[] = [
    {
        id: '1', title: 'Workout 3 times this week', completed: true,
        progress: undefined
    },
    {
        id: '2', title: 'Drink 8 glasses of water daily', completed: false,
        progress: undefined
    },
];

// Create the context with a default value
export const GoalContext = createContext<GoalContextType>({
    goals: initialGoals,
    addGoal: () => {},
    toggleCompletion: () => {},
    deleteGoal: () => {},
});

// Create and export the custom hook for easy access
export const useGoals = () => useContext(GoalContext);

// Create the provider component that will wrap your app
export const GoalProvider = ({ children }: { children: React.ReactNode }) => {
    const [goals, setGoals] = useState<Goal[]>(initialGoals);

    const addGoal = (title: string) => {
        const newGoalObject: Goal = {
            id: Date.now().toString(),
            title: title,
            completed: false,
            progress: undefined
        };
        setGoals([newGoalObject, ...goals]);
    };

    const toggleCompletion = (id: string) => {
        setGoals(
            goals.map(goal =>
                goal.id === id ? { ...goal, completed: !goal.completed } : goal
            )
        );
    };

    const deleteGoal = (id: string) => {
        setGoals(goals.filter(goal => goal.id !== id));
    };

    return (
        <GoalContext.Provider value={{ goals, addGoal, toggleCompletion, deleteGoal }}>
            {children}
        </GoalContext.Provider>
    );
};
