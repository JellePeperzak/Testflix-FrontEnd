import { ReactNode } from "react";

import HeaderMenu from "./header-menu/HeaderMenu";

import { usePageContext } from "../context/PageTypeContext";


interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { pageType } = usePageContext();

    // Testflix-related pages should have their own pageType identifier so that the header menu
    // knows what menu option to highlight
    const testflixPages = ['Home', 'Movies', 'TV Shows', 'Search']

    return (
      <>
        {testflixPages.includes(pageType) && (
            <HeaderMenu />
        )}
        <main className="z-0">{children}</main>
      </>
    );
  };
  
export default Layout;