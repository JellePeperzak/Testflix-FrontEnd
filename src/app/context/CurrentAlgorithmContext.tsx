import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

import { usePersistentState } from '../hooks/usePersistentState';

// Define the type for the context value
type CurrentAlgorithmContextType = {
  currentAlgorithmIndex: number;
  algorithmOrder: number[];
  algorithmInitialized: boolean;
  setCurrentAlgorithmIndex: (currentAlgorithmIndex: number) => void;
  setAlgorithmOrder: (algorithmOrder: number[]) => void;
};

// Create the context with a default value
const CurrentAlgorithmContext = createContext<CurrentAlgorithmContextType | undefined>(undefined);

// Create a provider component
export const CurrentAlgorithmProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentAlgorithmIndex, setCurrentAlgorithmIndex] = usePersistentState<number>('currentAlgorithmIndex', 0); // You can initialize the digit as needed (e.g., 0)
  const [algorithmOrder, setAlgorithmOrder] = usePersistentState<number[]>('algorithmOrder', []);
  const [algorithmInitialized, setAlgorithmInitialized] = useState<boolean>(false);

  useEffect(() => {
    if (algorithmOrder.length > 0 && currentAlgorithmIndex !== undefined) {
      setAlgorithmInitialized(true);
    }
  }, [algorithmOrder, currentAlgorithmIndex])

  return (
    <CurrentAlgorithmContext.Provider value={{ currentAlgorithmIndex, algorithmOrder, algorithmInitialized, setCurrentAlgorithmIndex, setAlgorithmOrder }}>
      {children}
    </CurrentAlgorithmContext.Provider>
  );
};

// Create a custom hook to use the context
export const useCurrentAlgorithmContext = (): CurrentAlgorithmContextType => {
  const context = useContext(CurrentAlgorithmContext);
  if (!context) {
    throw new Error('useCurrentAlgorithm must be used within a CurrentAlgorithmProvider');
  }
  return context;
};