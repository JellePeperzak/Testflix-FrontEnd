import { createContext, useContext, ReactNode } from "react";

import { DataToStoreProps } from "../components/interfaces/backendDataObject";

import { usePersistentState } from "../hooks/usePersistentState";

interface BackendDataContextType {
    participantNumber: number | false;          // Either holds the participantNumber, or 'false' if it's the first request to store data
    dataToStore: DataToStoreProps;
    preferenceIDs: string[];
    setParticipantNumber: (participantNumber: number | false) => void;
    setDataToStore: (dataToStore: DataToStoreProps) => void;
    setPreferenceIDs: (preferenceIDs: string[]) => void;
};

const BackendDataContext = createContext<BackendDataContextType | undefined>(undefined);

export const BackendDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [participantNumber, setParticipantNumber] = usePersistentState<number | false>('participantNumber', false);
    const [dataToStore, setDataToStore] = usePersistentState<DataToStoreProps>('dataToStore', {});
    const [preferenceIDs, setPreferenceIDs] = usePersistentState<string[]>('preferenceIDs', []);

    return (
        <BackendDataContext.Provider value={{ participantNumber, dataToStore, preferenceIDs, setParticipantNumber, setDataToStore, setPreferenceIDs }}>
            {children}
        </BackendDataContext.Provider>
    );
};

export const useBackendDataContext = (): BackendDataContextType => {
    const context = useContext(BackendDataContext)
    if (!context) {
        throw new Error('BackendDataContext must be used within a TaskProvider')
    }
    return context;
};