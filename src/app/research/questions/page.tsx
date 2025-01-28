'use client'
import {Fragment, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useTaskContext } from "@/app/context/TaskContext";
import { useCurrentAlgorithmContext } from "@/app/context/CurrentAlgorithmContext";
import { usePageContext } from "@/app/context/PageTypeContext";
import { useBackendDataContext } from '@/app/context/BackendDataContext';

import { DataToStoreProps } from "@/app/components/interfaces/backendDataObject";


interface statementProps {
    statement: string;
    statementType: string;
    statementNumber: number;
}

export default function QuestionnaireExperience() {
    const [responses, setResponses] = useState<DataToStoreProps>({});
    const [responseCheck, setResponseCheck] = useState(true);

    const {taskOrder, currentTaskIndex, setCurrentTaskIndex} = useTaskContext();
    const {currentAlgorithmIndex, algorithmOrder, setCurrentAlgorithmIndex} = useCurrentAlgorithmContext();
    const {dataToStore, setDataToStore, participantNumber} = useBackendDataContext();
    const {pageType, setPageType} = usePageContext();

    const router = useRouter();

    const statements: statementProps[] = [
        {statement: "I would watch the programme I chose if given the opportunity.", statementType:"eval", statementNumber: 1},
        {statement: "I was able to find a wide variety of programmes I could consider watching in addition to the one I chose.", statementType:"cn", statementNumber: 1},
        {statement: "I was able to navigate the displayed programmes easily.", statementType:"cn", statementNumber: 2},
        {statement: "I was able to look for programmes I like without too much effort.", statementType:"eval", statementNumber: 2},
        {statement: "The displayed programmes were personalized based on the initial preferences I submitted.", statementType:"eval", statementNumber: 3},
        {statement: "The displayed programmes were interesting enough to find more information about them.", statementType:"en", statementNumber: 1},
        {statement: "The displayed programmes were interesting enough to discuss them with other people.", statementType:"se", statementNumber: 1},
    ];

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
        const allAnswered = Object.keys(responses).length === 7;

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
                <p className="text-center">Below you will find 7 statements. Please respond to them based on the task you have just performed.</p>
                {!responseCheck && <p className="text-red-500 text-center">Please respond to all statements before continuing</p>}
            </div>
            <form className="flex flex-col mt-[10rem]" onSubmit={handleFormSubmit}>
                <QuestionList statementList={statements} handleResponseChange={handleResponseChange} />
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
    statementList: statementProps[]; // This should be an array of statementObjects
}

function QuestionList({ statementList, handleResponseChange }: QuestionListProps & { handleResponseChange: (name: string, value: number) => void }) {
    const {currentAlgorithmIndex, algorithmOrder} = useCurrentAlgorithmContext();

    return (
        <div className="grid my-[2rem]">
            {/* CATEGORY TITLE + description */}
            {/*<div className="grid grid-cols-3 w-full">
                <div className="border-b-2" />
                <p className="text-[1.5em] font-bold text-center border-x-2 border-t-2 rounded-t pt-[0.2em]">{statementObject.statementSubType}</p>
                <div className="border-b-2" />
            </div>*/}

            {/* STATEMENTS */}
            <div className="grid grid-cols-[fit-content(66%)_1fr] auto-rows-[minmax(0,_1fr)] gap-5 pt-[1.5em] pb-[1em] px-[1em] border-2 mx-[15rem]">
                <div />
                <div className="flex justify-between">
                    <div className="inline-flex"><p>Strongly disagree</p></div>
                    <div className="inline-flex ml-auto"><p>Strongly agree</p></div>
                </div>

                {/* GRATIFICATION STATEMENT ROWS */}
                {statementList.map((statementObject) => (
                    <Fragment key={`div-${statementObject.statementType}${statementObject.statementNumber}`}>
                        <div 
                            className="flex items-center min-w-[20em]"    
                        >
                            <p>{statementObject.statement}</p>
                        </div>
                        <LikertInput 
                            inputName={`${statementObject.statementType}_${statementObject.statementNumber}_${algorithmOrder[currentAlgorithmIndex]}`} 
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