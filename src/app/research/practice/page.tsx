'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import '@fortawesome/fontawesome-free/css/all.css';

import { useTaskContext } from "@/app/context/TaskContext"
import { usePageContext } from "@/app/context/PageTypeContext";

import LayoutResearch from "../layout/LayoutResearch";

export default function PracticeTaskPage() {
    const {taskDescriptions, practiceTask, setPracticeTask} = useTaskContext();
    const {pageType, setPageType} = usePageContext();

    const router = useRouter();

    useEffect(() => {
        if (pageType !== "Research") {
            setPageType("Research")
        }
        if (practiceTask !== true) {
            setPracticeTask(true)
        }
    }, [pageType, setPageType, practiceTask, setPracticeTask]);

    const handleButtonClick = () => {
        setPageType("Home")
        router.push('/testflix/practice')
    }

    return (
        <LayoutResearch title="Let's Practise">
            <div className="flex flex-col w-full items-center px-[15rem]">
                <div className="w-fit mt-[3em] mb-[1em]">
                    <p>Before starting the real tasks you can get familiar with the Testflix interface by performing the task below.</p>
                </div>
                <div className="border-y-[1px] pb-[1em] my-[1em]">
                    <p className="text-center font-bold text-[1.4rem] pb-[0.5em] pt-[0.5em]">Practice Task</p>
                    <p className="mx-[2em] font-bold text-[1.2rem]">{taskDescriptions[0]}</p>
                </div>
                <div className="w-fit my-[1em]">
                    <p> To select a series or a movie, click on the play button <button 
                        className="button-size-variable inline-flex bg-[#ededed] text-[#000000] rounded-full flex items-center justify-center self-center cursor-default"
                    ><i className="fas fa-play icon-size-variable ml-[0.1em] scale-x-110" /></button>, which you will see upon hovering over the programme's picture.
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