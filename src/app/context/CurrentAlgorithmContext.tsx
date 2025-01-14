import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for the context value
type CurrentAlgorithmContextType = {
  currentAlgorithmIndex: number;
  algorithmOrder: number[];
  setCurrentAlgorithmIndex: (currentAlgorithmIndex: number) => void;
  setAlgorithmOrder: (algorithmOrder: number[]) => void;
};

// Create the context with a default value
const CurrentAlgorithmContext = createContext<CurrentAlgorithmContextType | undefined>(undefined);

// Create a provider component
export const CurrentAlgorithmProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentAlgorithmIndex, setCurrentAlgorithmIndex] = useState<number>(0); // You can initialize the digit as needed (e.g., 0)
  const [algorithmOrder, setAlgorithmOrder] = useState<number[]>([]);

  return (
    <CurrentAlgorithmContext.Provider value={{ currentAlgorithmIndex, algorithmOrder, setCurrentAlgorithmIndex, setAlgorithmOrder }}>
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