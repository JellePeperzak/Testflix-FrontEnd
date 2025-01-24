'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useTaskContext } from "@/app/context/TaskContext"
import { useBackendDataContext } from "@/app/context/BackendDataContext"
import { usePageContext } from "@/app/context/PageTypeContext";

import LayoutResearch from "../layout/LayoutResearch";

export default function TaskPage() {
    const {taskOrder, currentTaskIndex, taskDescriptions} = useTaskContext();
    const {dataToStore, setDataToStore} = useBackendDataContext();
    const {pageType, setPageType} = usePageContext();

    const router = useRouter();

    useEffect(() => {
        if (pageType !== "Research") {
            setPageType("Research")
        }
    }, [pageType, setPageType]);

    const handleButtonClick = () => {
        const currentTime = Date.now()
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
                <p>Please read the task below. When you're ready to start the task, click on the "Start Task" button</p>
                <div className="border-y-[1px] pb-[1em] my-[3em]">
                    <p className="text-center font-bold text-[1.4rem] pb-[0.5em] pt-[0.5em]">Task {currentTaskIndex + 1} ({currentTaskIndex + 1}/3)</p>
                    <p className="mx-[2em] font-bold text-[1.2rem]">{taskDescriptions[taskOrder[currentTaskIndex]]}</p>
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