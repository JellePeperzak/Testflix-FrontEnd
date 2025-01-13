import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for the context value
type CurrentAlgorithmContextType = {
  currentAlgorithm: number;
  setCurrentAlgorithm: (currentAlgorithm: number) => void;
};

// Create the context with a default value
const CurrentAlgorithmContext = createContext<CurrentAlgorithmContextType | undefined>(undefined);

// Create a provider component
export const CurrentAlgorithmProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentAlgorithm, setCurrentAlgorithm] = useState<number>(0); // You can initialize the digit as needed (e.g., 0)

  return (
    <CurrentAlgorithmContext.Provider value={{ currentAlgorithm, setCurrentAlgorithm }}>
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