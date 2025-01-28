import { createContext, useContext, ReactNode } from "react";

import { usePersistentState } from "../hooks/usePersistentState";

interface SearchQueryProps {
    searchQuery: string;
    initialUrl: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    setInitialUrl: React.Dispatch<React.SetStateAction<string>>;
}
  
const SearchQueryContext = createContext<SearchQueryProps | undefined>(undefined);

export const SearchQueryProvider: React.FC<{ children: ReactNode}> = ({ children }) => {
    const [searchQuery, setSearchQuery] = usePersistentState<string>('searchQuery', "");
    const [initialUrl, setInitialUrl] = usePersistentState<string>('initialUrl', '/testflix');

    return (
        <SearchQueryContext.Provider value={{ searchQuery, initialUrl, setSearchQuery, setInitialUrl }}>
            {children}
        </SearchQueryContext.Provider>
    );
};

export const useSearchQueryContext = () => {
    const context = useContext(SearchQueryContext);
    if (!context) {
        throw new Error("useSearchQueryContext must be used within a SearchQueryProvider");
    }
    return context;
};