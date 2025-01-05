import { ReactNode } from "react";

import HeaderMenu from "./header-menu/HeaderMenu";

import { usePageContext } from "../context/PageTypeContext";


interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { pageType, setPageType } = usePageContext();

    return (
      <>
        {["Home", "Movies", "TV Shows", "Search"].includes(pageType) && (
            <HeaderMenu />
        )}
        <main>{children}</main>
      </>
    );
  };
  
export default Layout;