'use client'
import { useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

import { useTaskContext } from "@/app/context/TaskContext";
import { useCurrentAlgorithmContext } from "@/app/context/CurrentAlgorithmContext";
import { usePageContext } from "@/app/context/PageTypeContext";

import LayoutResearch from "../layout/LayoutResearch";

interface statementObject {
    statements: string[];
    statementType: 'grat' | 'eval';
}

export default function QuestionnaireExperience() {
    const [responses, setResponses] = useState<{ [key: string]: number}>({});
    const [responseCheck, setResponseCheck] = useState(true);

    const {taskOrder, currentTaskIndex, setCurrentTaskIndex} = useTaskContext();
    const {currentAlgorithmIndex, algorithmOrder, setCurrentAlgorithmIndex} = useCurrentAlgorithmContext();
    const {setPageType} = usePageContext();

    const router = useRouter();

    const gratStatements: statementObject = {
        statements: [
            "1. I was able to navigate and filter contents",
            "2. The interface allowed me to watch a wide variety of programmes.",
            "3. The interface allowed me to browse freely.",
            "4. I feel that the interface displayed personalized content to me.",
            "5. I feel that the service is personalized for my usage.",
            "6. It allows me to search for videos that I’m interested in",
            "7. Content offered by them are personalized",
            "8. The programmes I encountered seemed exciting",
            "9. The programmes I encountered seemed thrilling",
            "10. The programmes I encountered seemed amusing",
            "11. The programmes I encountered seemed engaging",
            "12. This streaming service would allow me to connect with others",
            "13. This streaming service could allow me to expand my social network"
            ],
        statementType: 'grat'
    };

    const evalStatements: statementObject = {
        statements: [
            "14. This interface gave me some really good recommendations",
            "15. I find this interface easy to use",
            "16. This interface is competent to help me effectively find movies and series I really like",
            "17. I found my visit to this interface enjoyable",
            "18. I am confident that the item I just selected is really the best choice for me",
            "19. I easily found the information I was looking for",
            "20. Looking for a product using this interface required too much effort",
            "21. I trust the recommended items since they were consistent with my preferences",
            "22. My overall satisfaction with the interface is high",
            "23. I would watch the item I just chose if given the opportunity"
            ],
        statementType: 'eval'
    };

    const handleResponseChange = (name: string, value: number) => {
        setResponses((prevResponses) => ({
            ...prevResponses,
            [name]: value,
        }));
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // IF THE AMOUNT OF STATEMENTS CHANGES, THE NUMBER SHOULD CHANGE AS WELL
        const allAnswered = Object.keys(responses).length === 23;

        if (allAnswered) {
            setResponseCheck(true)
        } else {
            setResponseCheck(false)
            return;
        }

        // SEND A REQUEST TO THE BACK-END TO STORE THE RESPONSES IN THE DATABASE

        // MOVE ON TO THE NEXT TASK WITH THE NEXT ALGORITHM
        if (currentTaskIndex + 1 === taskOrder.length) {
            router.push('/research/thankyou')
            return
        }

        setCurrentTaskIndex(currentTaskIndex + 1);
        setCurrentAlgorithmIndex(currentAlgorithmIndex + 1);

        setPageType('Home');
        router.push('/testflix');
    }

    return (
        <LayoutResearch title="What do you think?">
            <div className="flex flex-col w-fit items-center mx-auto">
                <p>Below you will find 23 statements. Please respond to them based on the task you have just performed.</p>
            </div>
            <form className="flex flex-col" onSubmit={handleFormSubmit}>
                <QuestionList statementObjects={[gratStatements, evalStatements]} handleResponseChange={handleResponseChange} />
                {!responseCheck && <p className="text-red-500 text-center">Please respond to all statements before continuing</p>}
                <button
                    type="submit"
                    className="w-fit self-center bg-black text-[#E50914] text-[125%] font-bold px-[1em] py-[0.5em] mt-[1em] mb-[2em] rounded-lg"
                >
                    CONTINUE
                </button>
            </form>
        </LayoutResearch>
    );
};




interface QuestionListProps {
    statementObjects: statementObject[]; // This should be an array of statementObjects
}

function QuestionList({ statementObjects, handleResponseChange }: QuestionListProps & { handleResponseChange: (name: string, value: number) => void }) {
    const {currentAlgorithmIndex, algorithmOrder} = useCurrentAlgorithmContext();
    return (
        <div className="grid grid-cols-[fit-content(100%)_1fr] auto-rows-[minmax(0,_1fr)] gap-5 border-y-2 my-[1rem] py-[1rem] mx-[30rem]">
            {/* HEADER ROW */}
            <div/>
            <div className="flex w-full justify-between">
                <div><p>Strongly disagree</p></div>
                <div><p>Strongly agree</p></div>
            </div>

            {/* GRATIFICATION STATEMENT ROWS */}
            {statementObjects && statementObjects[0]['statements'].map((statement, index) => (
                <>
                    <div 
                        key={`div-${statementObjects[0]['statementType']}${index+1}`}
                        className="flex items-center "    
                    >
                        <p>{statement}</p>
                    </div>
                    <LikertInput 
                        key={`likertinput-${statementObjects[0]['statementType']}${index+1}`} 
                        inputName={`${statementObjects[0]['statementType']}${index+1}-${algorithmOrder[currentAlgorithmIndex]}`} 
                        size={5} 
                        handleResponseChange={handleResponseChange}
                    />
                </>
            ))}

            {/* GRATIFICATION STATEMENT ROWS */}
            {statementObjects && statementObjects[1]['statements'].map((statement, index) => (
                <>
                    <div key={`div-${statementObjects[1]['statementType']}${index+1}`}>
                        <p>{statement}</p>
                    </div>
                    <LikertInput 
                        key={`likertinput-${statementObjects[1]['statementType']}${index+1}`} 
                        inputName={`${statementObjects[1]['statementType']}${index+1}-${algorithmOrder[currentAlgorithmIndex]}`} 
                        size={5} 
                        handleResponseChange={handleResponseChange}
                    />
                </>
            ))}

        </div>
    )
}

interface LikertInputProps {
    inputName: string;
    size: number;
}

function LikertInput({ inputName, size=5, handleResponseChange }: LikertInputProps & { handleResponseChange: (name: string, value: number) => void }) {
    return (
        <div className="flex w-full justify-around content-center">
            {Array.from({ length: size}).map((_, index) => (
                <label key={`${inputName}-${index}`} className="flex items-center cursor-pointer">
                    <input 
                        type="radio"
                        name={inputName}
                        value={index + 1}
                        className="peer hidden"
                        onChange={() => handleResponseChange(inputName, index + 1)}
                    />
                    <div className="w-[1.2em] h-[1.2em] rounded-full border-2 border-gray-400 peer-checked:border-[#B9040D] peer-checked:bg-[#B9040D]"></div>
                </label>
                
            ))}
        </div>
    );
};