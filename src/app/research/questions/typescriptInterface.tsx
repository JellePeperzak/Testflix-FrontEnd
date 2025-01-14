'use client'

import LayoutResearch from "../layout/LayoutResearch";

interface QuestionnaireExperienceProps {
    algorithm: number;
    task: number;
}

const QuestionnaireExperience: React.FC<QuestionnaireExperienceProps> = ({ algorithm, task }) => {
    

    return (
        <LayoutResearch title="What do you think?">
            <div className="flex flex-col w-full items-center px-[15rem]">
                <p>Please respond to the statements below, thinking about the task you just finished.</p>
            </div>
        </LayoutResearch>
    )
}

export default QuestionnaireExperience;