import React, { createContext, useContext, ReactNode } from 'react';
import { CarouselProps } from '../components/items/ItemCarousel';
import { usePersistentState } from '../hooks/usePersistentState';

// Define types for the context values
interface CarouselObjects1 {
  home_carousels: CarouselProps[];       
  movie_carousels: CarouselProps[];      
  series_carousels: CarouselProps[];     
}

interface Algorithm1ContextType {
  carouselObjects1: CarouselObjects1;   // Update the type to match the expected structure
  itemObjectList1: any[];                // 'item_object_list' remains an array
  setCarouselObjects1: (carousel_objects: CarouselObjects1) => void; // Update the type to match the expected structure
  setItemObjectList1: (item_object_list: any[]) => void;
}

// Create the context with a default value (empty object and empty array)
const Algorithm1Context = createContext<Algorithm1ContextType | undefined>(undefined);

// Create a provider component that will wrap your app or components
interface Algorithm1ProviderProps {
  children: ReactNode;
}

export const Algorithm1Provider: React.FC<Algorithm1ProviderProps> = ({ children }) => {
  const [carouselObjects1, setCarouselObjects1] = usePersistentState<CarouselObjects1>('carouselObjects1', {
    home_carousels: [],  // Initialize with empty arrays
    movie_carousels: [],
    series_carousels: [],
  });
  const [itemObjectList1, setItemObjectList1] = usePersistentState<any[]>('itemObjectList1', []);

  return (
    <Algorithm1Context.Provider value={{ carouselObjects1, itemObjectList1, setCarouselObjects1, setItemObjectList1 }}>
      {children}
    </Algorithm1Context.Provider>
  );
};

// Create a custom hook to easily access the context
export const useAlgorithm1Context = (): Algorithm1ContextType => {
  const context = useContext(Algorithm1Context);
  if (!context) {
    throw new Error('useAlgorithm1Context must be used within an Algorithm1Provider');
  }
  return context;
};
