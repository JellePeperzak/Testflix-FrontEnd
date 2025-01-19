import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

import { usePersistentState } from '../hooks/usePersistentState';

interface TaskContextType {
    taskOrder: number[];
    currentTaskIndex: number;
    taskInitialized: boolean;
    setTaskOrder: (taskOrder: number[]) => void;
    setCurrentTaskIndex: (currentTaskIndex: number) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [taskOrder, setTaskOrder] = usePersistentState<number[]>('taskOrder', []);
    const [currentTaskIndex, setCurrentTaskIndex] = usePersistentState<number>('currentTaskIndex', 0);
    const [taskInitialized, setTaskInitialized] = useState<boolean>(false);

    useEffect(() => {
        if (taskOrder.length > 0 && currentTaskIndex !== undefined) {
            setTaskInitialized(true);
        }
    }, [taskOrder, currentTaskIndex])


    return (
        <TaskContext.Provider value={{ taskOrder, currentTaskIndex, taskInitialized, setTaskOrder, setCurrentTaskIndex }}>
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