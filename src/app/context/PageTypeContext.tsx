import { createContext, useContext, useState, ReactNode } from "react";

interface PageContextProps {
    pageType: string;
    setPageType: React.Dispatch<React.SetStateAction<string>>;
}
  
const PageContext = createContext<PageContextProps | undefined>(undefined);

export const PageProvider: React.FC<{ children: ReactNode}> = ({ children }) => {
    const [pageType, setPageType] = useState<string>("Research");

    return (
        <PageContext.Provider value={{ pageType, setPageType }}>
            {children}
        </PageContext.Provider>
    );
};

export const usePageContext = () => {
    const context = useContext(PageContext);
    if (!context) {
        throw new Error("usePageContext must be used within a PageProvider");
    }
    return context;
};