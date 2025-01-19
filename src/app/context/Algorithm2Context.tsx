import React, { createContext, useContext, ReactNode } from 'react';
import { CarouselProps } from '../components/items/ItemCarousel';

import { usePersistentState } from '../hooks/usePersistentState';

// Define types for the context values
interface CarouselObjects2 {
  home_carousels: CarouselProps[];       
  movie_carousels: CarouselProps[];      
  series_carousels: CarouselProps[];     
}

interface Algorithm2ContextType {
  carouselObjects2: CarouselObjects2;   // Update the type to match the expected structure
  itemObjectList2: any[];                // 'item_object_list' remains an array
  setCarouselObjects2: (carousel_objects: CarouselObjects2) => void; // Update the type to match the expected structure
  setItemObjectList2: (item_object_list: any[]) => void;
}

// Create the context with a default value (empty object and empty array)
const Algorithm2Context = createContext<Algorithm2ContextType | undefined>(undefined);

// Create a provider component that will wrap your app or components
interface Algorithm2ProviderProps {
  children: ReactNode;
}

export const Algorithm2Provider: React.FC<Algorithm2ProviderProps> = ({ children }) => {
  const [carouselObjects2, setCarouselObjects2] = usePersistentState<CarouselObjects2>('carouselObjects2', {
    home_carousels: [],  // Initialize with empty arrays
    movie_carousels: [],
    series_carousels: [],
  });
  const [itemObjectList2, setItemObjectList2] = usePersistentState<any[]>('itemObjectList2', []);

  return (
    <Algorithm2Context.Provider value={{ carouselObjects2, itemObjectList2, setCarouselObjects2, setItemObjectList2 }}>
      {children}
    </Algorithm2Context.Provider>
  );
};

// Create a custom hook to easily access the context
export const useAlgorithm2Context = (): Algorithm2ContextType => {
  const context = useContext(Algorithm2Context);
  if (!context) {
    throw new Error('useAlgorithm2Context must be used within an Algorithm2Provider');
  }
  return context;
};
