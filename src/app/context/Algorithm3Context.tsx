import React, { createContext, useContext, ReactNode } from 'react';
import { CarouselProps } from '../components/items/ItemCarousel';

import { usePersistentState } from '../hooks/usePersistentState';

// Define types for the context values
interface CarouselObjects3 {
  home_carousels: CarouselProps[];       
  movie_carousels: CarouselProps[];      
  series_carousels: CarouselProps[];     
}

interface Algorithm3ContextType {
  carouselObjects3: CarouselObjects3;   // Update the type to match the expected structure
  itemObjectList3: any[];                // 'item_object_list' remains an array
  setCarouselObjects3: (carousel_objects: CarouselObjects3) => void; // Update the type to match the expected structure
  setItemObjectList3: (item_object_list: any[]) => void;
}

// Create the context with a default value (empty object and empty array)
const Algorithm3Context = createContext<Algorithm3ContextType | undefined>(undefined);

// Create a provider component that will wrap your app or components
interface Algorithm3ProviderProps {
  children: ReactNode;
}

export const Algorithm3Provider: React.FC<Algorithm3ProviderProps> = ({ children }) => {
  const [carouselObjects3, setCarouselObjects3] = usePersistentState<CarouselObjects3>('carouselObjects3', {
    home_carousels: [],  // Initialize with empty arrays
    movie_carousels: [],
    series_carousels: [],
  });
  const [itemObjectList3, setItemObjectList3] = usePersistentState<any[]>('itemObjectList3', []);

  return (
    <Algorithm3Context.Provider value={{ carouselObjects3, itemObjectList3, setCarouselObjects3, setItemObjectList3 }}>
      {children}
    </Algorithm3Context.Provider>
  );
};

// Create a custom hook to easily access the context
export const useAlgorithm3Context = (): Algorithm3ContextType => {
  const context = useContext(Algorithm3Context);
  if (!context) {
    throw new Error('useAlgorithm3Context must be used within an Algorithm3Provider');
  }
  return context;
};
