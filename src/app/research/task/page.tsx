'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import '@fortawesome/fontawesome-free/css/all.css';

import { useTaskContext } from "@/app/context/TaskContext"
import { useBackendDataContext } from "@/app/context/BackendDataContext"
import { usePageContext } from "@/app/context/PageTypeContext";
import { useSearchQueryContext } from "@/app/context/SearchQueryContext";

import LayoutResearch from "../layout/LayoutResearch";

export default function TaskPage() {
    const {taskOrder, currentTaskIndex, taskDescriptions, practiceTask, setPracticeTask} = useTaskContext();
    const {dataToStore, setDataToStore} = useBackendDataContext();
    const {pageType, setPageType} = usePageContext();
    const {setSearchQuery} = useSearchQueryContext();

    const router = useRouter();

    useEffect(() => {
        if (pageType !== "Research") {
            setPageType("Research")
        }

        if (practiceTask === true) {
            setPracticeTask(false)
        }
    }, [pageType, practiceTask, setPageType, setPracticeTask]);

    const handleButtonClick = () => {
        const currentTime = Date.now()
        setSearchQuery('')
        switch (taskOrder[currentTaskIndex]) {
            case 1:
                setPageType("Home")
                setDataToStore({
                    ...dataToStore,
                    task1_start: currentTime
                })
                router.push('/testflix')
                break;
            case 2: 
                setPageType("Home")
                setDataToStore({
                    ...dataToStore,
                    task2_start: currentTime
                })
                router.push('/testflix')
                break;
            case 3: 
                setPageType("Home")
                setDataToStore({
                    ...dataToStore,
                    task3_start: currentTime
                })
                router.push('/testflix')
                break;
            default:
                throw new Error(`Current task number could not be identified and stored in the dataToStore context`)
        }
    }

    return (
        <LayoutResearch title="This Is Your Task">
            <div className="flex flex-col w-full items-center px-[15rem]">
                <div className="border-y-[1px] pb-[1em] mt-[3em]">
                    <p className="text-center font-bold text-[1.4rem] pb-[0.5em] pt-[0.5em]">Task {currentTaskIndex + 1} ({currentTaskIndex + 1}/3)</p>
                    <p className="mx-[2em] font-bold text-[1.2rem]">{taskDescriptions[taskOrder[currentTaskIndex]]}</p>
                </div>
                <div className="w-fit my-[1em]">
                    <p> To select a series or a movie, click on the play button <button 
                        className="button-size-variable inline-flex bg-[#ededed] text-[#000000] rounded-full flex items-center justify-center self-center cursor-default"
                    ><i className="fas fa-play icon-size-variable ml-[0.1em] scale-x-110" /></button>, which you will see upon hovering over the picture.
                    </p>
                </div>
                <button 
                    className="w-fit self-center bg-black text-[#E50914] text-[125%] font-bold px-[1em] py-[0.5em] mt-[1em] rounded-lg"
                    onClick={handleButtonClick}
                >
                    START TASK
                </button>
            </div>
        </LayoutResearch>
    )
}