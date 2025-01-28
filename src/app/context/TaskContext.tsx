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
    practiceTask: boolean;
    practiceError: string | false;
    setTaskOrder: (taskOrder: number[]) => void;
    setCurrentTaskIndex: (currentTaskIndex: number) => void;
    setPracticeTask: (practiceTask: boolean) => void;
    setPracticeError: (practiceError: string | false) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [taskOrder, setTaskOrder] = usePersistentState<number[]>('taskOrder', []);
    const [currentTaskIndex, setCurrentTaskIndex] = usePersistentState<number>('currentTaskIndex', 0);
    const [taskInitialized, setTaskInitialized] = useState<boolean>(false);
    const [practiceTask, setPracticeTask] = useState<boolean>(false);
    const [practiceError, setPracticeError] = useState<string | false>(false);
    const [taskDescriptions, setTaskDescriptions] = useState<TaskDescriptionsProps>({
        0: "Browse the list of programmes and select the movie 'Guardians of the Galaxy'",
        1: "You are looking for a movie to watch tonight. Use the Testflix platform to select a movie.",
        2: "You have finished watching your current TV show and are looking for a new show to watch. Use the Testflix platform to select a show.",
        3: "You have a free evening and decide you want to watch something. Use the Testflix platform to select a movie or show."
    });

    useEffect(() => {
        if (taskOrder.length > 0 && currentTaskIndex !== undefined) {
            setTaskInitialized(true);
        }
    }, [taskOrder, currentTaskIndex])


    return (
        <TaskContext.Provider value={{ taskOrder, currentTaskIndex, taskInitialized, taskDescriptions, practiceTask, practiceError, setTaskOrder, setCurrentTaskIndex, setPracticeTask, setPracticeError }}>
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