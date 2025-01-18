'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useTaskContext } from "@/app/context/TaskContext"
import { useBackendDataContext } from "@/app/context/BackendDataContext"
import { usePageContext } from "@/app/context/PageTypeContext";

import LayoutResearch from "../layout/LayoutResearch";

export default function TaskPage() {
    const {taskOrder, currentTaskIndex} = useTaskContext();
    const {dataToStore, setDataToStore, participantNumber} = useBackendDataContext();
    const {pageType, setPageType} = usePageContext();

    const router = useRouter();

    useEffect(() => {
        if (pageType !== "Research") {
            setPageType("Research")
        }
    }, []);

    const tasks: { [key: number]: string } = {
        1: "This is the description of task 1. Please execute this task as well as you possibly can.",
        2: "This is the description of task 2. Please execute this task as well as you possibly can.",
        3: "This is the description of task 3. Please execute this task as well as you possibly can."
    };

    const handleButtonClick = () => {
        const currentTime = Date.now()
        switch (taskOrder[currentTaskIndex]) {
            case 1:
                setPageType("Testflix")
                setDataToStore({
                    ...dataToStore,
                    task1_start: currentTime
                })
                router.push('/testflix')
                break;
            case 2: 
                setPageType("Testflix")
                setDataToStore({
                    ...dataToStore,
                    task2_start: currentTime
                })
                router.push('/testflix')
                break;
            case 3: 
                setPageType("Testflix")
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
                <p>{tasks[taskOrder[currentTaskIndex]]}</p>
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