'use client'
import {Fragment, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useTaskContext } from "@/app/context/TaskContext";
import { useCurrentAlgorithmContext } from "@/app/context/CurrentAlgorithmContext";
import { usePageContext } from "@/app/context/PageTypeContext";
import { useBackendDataContext } from '@/app/context/BackendDataContext';

import { DataToStoreProps } from "@/app/components/interfaces/backendDataObject";

interface statementsProps {
    [key: number]: string;
}

interface statementObject {
    statements: statementsProps;
    statementType: 'grat' | 'eval';
    statementSubType: 'Service' | 'Interface' | 'Programmes' | 'Social';
}

export default function QuestionnaireExperience() {
    const [responses, setResponses] = useState<DataToStoreProps>({});
    const [responseCheck, setResponseCheck] = useState(true);

    const {taskOrder, currentTaskIndex, setCurrentTaskIndex} = useTaskContext();
    const {currentAlgorithmIndex, algorithmOrder, setCurrentAlgorithmIndex} = useCurrentAlgorithmContext();
    const {dataToStore, setDataToStore, participantNumber} = useBackendDataContext();
    const {pageType, setPageType} = usePageContext();

    const router = useRouter();

    const cnStatements: statementObject = {
        statements: {
            1: "I was able to navigate and filter contents",
            2: "The interface allowed me to watch a wide variety of programmes.",
            3: "The interface allowed me to browse freely.",
            4: "I feel that the interface displayed personalized content to me.",
            5: "I feel that the service was personalized for my usage.",
            6: "The interface allowed me to search for videos that I’m interested in",
            7: "The content offered by the interface was personalised", 
        },
        statementType: 'grat',
        statementSubType: 'Interface'
    };

    const enStatements: statementObject = {
        statements: {
            8: "Exciting",
            9: "Boring",
            10: "Amusing",
            11: "Engaging",
        },
        statementType: 'grat',
        statementSubType: 'Programmes'
    }

    const seStatements: statementObject = {
        statements: {
            12: "This streaming service would allow me to connect with others",
            13: "This streaming service could allow me to expand my social network"
        },
        statementType: 'grat',
        statementSubType: 'Social'
    }

    const evalStatements: statementObject = {
        statements: {
            1: "The interface gave me some really good recommendations",
            2: "I found the interface easy to use",
            3: "The interface was competent to help me effectively find movies and series I really like",
            4: "I found my visit to the interface enjoyable",
            5: "I am confident that the item I just selected is really the best choice for me",
            6: "I easily found the information I was looking for",
            7: "Looking for a product using this interface required too much effort",
            8: "I trust the recommended items since they were consistent with my preferences",
            9: "My overall satisfaction with the interface is high",
            10: "I would watch the item I just chose if given the opportunity"
        },
        statementType: 'eval',
        statementSubType: 'Service'
    };

    useEffect(() => {
        if (pageType !== "Research") {
          setPageType("Research")
        }
    }, [pageType, setPageType]);

    const handleResponseChange = (name: string, value: number) => {
        setResponses({
            ...responses,
            [name]: value,
        });
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
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
        try {
            // Update the dataToStore object with questionnaire data to prepare it for the database
            // Set value of task- and algorithm-related exploration variables to false if they don't exist yet
            const taskKeyNameMovie = `task${taskOrder[currentTaskIndex]}_movie`
            const taskKeyNameSearch = `task${taskOrder[currentTaskIndex]}_search`
            const taskKeyNameSeries = `task${taskOrder[currentTaskIndex]}_series`
            const algorithmKeyNameMovie = `algorithm${algorithmOrder[currentAlgorithmIndex]}_movie`
            const algorithmKeyNameSearch = `algorithm${algorithmOrder[currentAlgorithmIndex]}_search`
            const algorithmKeyNameSeries = `algorithm${algorithmOrder[currentAlgorithmIndex]}_series`
            const keyCheckList = [taskKeyNameMovie, taskKeyNameSearch, taskKeyNameSeries, algorithmKeyNameMovie, algorithmKeyNameSearch, algorithmKeyNameSeries]
            let missingKeysObject = {}
            for (const k in keyCheckList) {
                if (!Object.keys(dataToStore).includes(keyCheckList[k])) {
                    missingKeysObject = {
                        ...missingKeysObject,
                        [keyCheckList[k]]: false
                    }
                }
            }

            if (currentTaskIndex === 2) {
                const currentTime = Date.now()
                missingKeysObject = {
                    ...missingKeysObject,
                    time_finish: currentTime
                }
            }

            const completeDataToStoreObject: DataToStoreProps = {
                ...dataToStore,
                ...responses,
                ...missingKeysObject,
            }

            // API call to trigger data storage
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/update-database', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'participant_number': participantNumber,
                    'data': completeDataToStoreObject
                })
            })
            
            if (!response.ok) {
                throw new Error(`Failed to fetch algorithm data`)
            }
            
            const data = await response.json()

            if (data.success) {
                // MOVE ON TO THE NEXT TASK WITH THE NEXT ALGORITHM
                if (currentTaskIndex + 1 === taskOrder.length) {
                    router.push('/research/thankyou')
                    return
                } else {
                    setCurrentTaskIndex(currentTaskIndex + 1);
                    setCurrentAlgorithmIndex(currentAlgorithmIndex + 1);
                    setDataToStore({})
                    
                    router.push('/research/task');
                } 
            } else {
                console.error("Data storage failed:", data.error || "Unknown error")
            };

        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    return (
        <div className="layout-research">
            <div className="fixed bg-[#141414] bg-gradient-header-menu w-full h-fit pb-[1em] z-10">
                <h1 className="text-[#E50914] font-bold">What do you think?</h1>
                <p className="text-center">Below you will find 23 statements. Please respond to them based on the task you have just performed.</p>
                {!responseCheck && <p className="text-red-500 text-center">Please respond to all statements before continuing</p>}
            </div>
            <form className="flex flex-col mt-[10rem]" onSubmit={handleFormSubmit}>
                <QuestionList statementObject={cnStatements} handleResponseChange={handleResponseChange} />
                <QuestionList statementObject={enStatements} handleResponseChange={handleResponseChange} />
                <QuestionList statementObject={seStatements} handleResponseChange={handleResponseChange} />
                <QuestionList statementObject={evalStatements} handleResponseChange={handleResponseChange} />
                <button
                    type="submit"
                    className="w-fit self-center bg-black text-[#E50914] text-[125%] font-bold px-[1em] py-[0.5em] mt-[1em] mb-[2em] rounded-lg"
                >
                    CONTINUE
                </button>
            </form>
        </div>
    );
};




interface QuestionListProps {
    statementObject: statementObject; // This should be an array of statementObjects
}

function QuestionList({ statementObject, handleResponseChange }: QuestionListProps & { handleResponseChange: (name: string, value: number) => void }) {
    const {currentAlgorithmIndex, algorithmOrder} = useCurrentAlgorithmContext();

    return (
        <div className="grid border-b-2 my-[2rem] mx-[30rem]">
            {/* CATEGORY TITLE + description */}
            <div className="grid grid-cols-3 w-full">
                <div className="border-b-2" />
                <p className="text-[1.5em] font-bold text-center border-x-2 border-t-2 rounded-t pt-[0.2em]">{statementObject.statementSubType}</p>
                <div className="border-b-2" />
            </div>

            {statementObject.statementSubType === 'Programmes' && (
                <div className='w-full border-x-2 pt-[1em]'>
                    <p className="text-center">For every word below, declare how well you think they finish the following statement:</p>
                    <p className="text-center italic">"The programmes I encountered seemed ..."</p>
                </div>
            )}

            {/* STATEMENTS */}
            <div className="grid grid-cols-[fit-content(100%)_1fr] auto-rows-[minmax(0,_1fr)] gap-5 pt-[1.5em] pb-[1em] px-[1em] border-x-2">
                <div />
                <div className="flex w-full justify-between">
                    <div><p>Strongly disagree</p></div>
                    <div><p>Strongly agree</p></div>
                </div>

                {/* GRATIFICATION STATEMENT ROWS */}
                {statementObject && Object.keys(statementObject.statements).map((statementNumber) => (
                    <Fragment key={`div-${statementObject.statementType}${statementNumber}`}>
                        <div 
                            className="flex items-center min-w-[20em]"    
                        >
                            <p className="text-center">{statementObject.statements[parseInt(statementNumber)]}</p>
                        </div>
                        <LikertInput 
                            inputName={`${statementObject.statementType}_${statementNumber}_${algorithmOrder[currentAlgorithmIndex]}`} 
                            size={5} 
                            handleResponseChange={handleResponseChange}
                        />
                    </Fragment>
                ))}
            </div>
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