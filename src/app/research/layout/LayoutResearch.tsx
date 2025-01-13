import { ReactNode } from "react";

interface LayoutResearchProps {
    title: string;
    children: ReactNode;
}

const LayoutResearch: React.FC<LayoutResearchProps> = ({ title, children }) => {

    return (
      <div className="layout-research">
        <div className="title-research bg-gradient-header-menu">
            <h1 className="text-[#E50914] font-bold">{title}</h1>
        </div>
        <div className="content-research">
            {children}
        </div>
      </div>
    );
  };
  
export default LayoutResearch;