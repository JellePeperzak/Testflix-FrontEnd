import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

import { usePersistentState } from '../hooks/usePersistentState';

interface TaskDescriptionsProps {
    [key: number]: string;
}

interface TaskContextType {
    taskOrder: number[];
    currentTaskIndex: number;
    taskInitialized: boolean;
    taskDescriptions: TaskDescriptionsProps;
    setTaskOrder: (taskOrder: number[]) => void;
    setCurrentTaskIndex: (currentTaskIndex: number) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [taskOrder, setTaskOrder] = usePersistentState<number[]>('taskOrder', []);
    const [currentTaskIndex, setCurrentTaskIndex] = usePersistentState<number>('currentTaskIndex', 0);
    const [taskInitialized, setTaskInitialized] = useState<boolean>(false);
    const [taskDescriptions, setTaskDescriptions] = useState<TaskDescriptionsProps>({
        1: "You are looking for a movie to watch tonight. Select a movie offered by Testflix that you would watch.",
        2: "You have finished watching your current TV show and are looking for a new series to watch. Select a series offered by Testflix that you would watch next.",
        3: "You have a free evening and decide you want to watch something new. Select a series or movie offered by Testflix that you would watch."
    });

    useEffect(() => {
        if (taskOrder.length > 0 && currentTaskIndex !== undefined) {
            setTaskInitialized(true);
        }
    }, [taskOrder, currentTaskIndex])


    return (
        <TaskContext.Provider value={{ taskOrder, currentTaskIndex, taskInitialized, taskDescriptions, setTaskOrder, setCurrentTaskIndex }}>
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