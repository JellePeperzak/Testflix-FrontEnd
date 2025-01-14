import { createContext, useContext, useState, ReactNode } from 'react';

interface TaskContextType {
    taskOrder: number[];
    currentTaskIndex: number;
    setTaskOrder: (taskOrder: number[]) => void;
    setCurrentTaskIndex: (currentTaskIndex: number) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [taskOrder, setTaskOrder] = useState<number[]>([]);
    const [currentTaskIndex, setCurrentTaskIndex] = useState<number>(0);

    return (
        <TaskContext.Provider value={{ taskOrder, currentTaskIndex, setTaskOrder, setCurrentTaskIndex }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = (): TaskContextType => {
    const context = useContext(TaskContext)
    if (!context) {
        throw new Error('useTaskContext must be used within a TaskProvider')
    }
    return context;
};