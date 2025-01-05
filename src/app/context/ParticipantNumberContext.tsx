'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ParticipantNumberContextType {
  participantNumber: string | null;
  setParticipantNumber: (number: string) => void;
}

const ParticipantNumberContext = createContext<ParticipantNumberContextType | undefined>(undefined);

interface ParticipantNumberProviderProps {
  children: ReactNode; // Specify the type for the children prop
}

export const ParticipantNumberProvider: React.FC<ParticipantNumberProviderProps> = ({ children }) => {
  const [participantNumber, setParticipantNumber] = useState<string | null>(null);

  return (
    <ParticipantNumberContext.Provider value={{ participantNumber, setParticipantNumber }}>
      {children}
    </ParticipantNumberContext.Provider>
  );
};

// Custom hook to use participant number context
export const useParticipantNumberContext = (): ParticipantNumberContextType => {
  const context = useContext(ParticipantNumberContext);
  if (!context) {
    throw new Error('useParticipantNumberContext must be used within a ParticipantNumberProvider');
  }
  return context;
};