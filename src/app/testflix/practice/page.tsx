'use client'
import { useEffect } from "react"

import { usePageContext } from "@/app/context/PageTypeContext"
import { useTaskContext } from "@/app/context/TaskContext"

import Carousel from "@/app/components/items/ItemCarousel"

import preferenceItems from "@/app/data/preferences"

export default function TestflixPractice() {
    const {pageType, setPageType} = usePageContext();
    const {practiceTask, setPracticeTask} = useTaskContext();

    useEffect(() => {
        if (pageType !== "Home") {
            setPageType("Home")
        }
        if (practiceTask !== true) {
            setPracticeTask(true)
        }
    }, [pageType, setPageType, practiceTask, setPracticeTask]);

    return (
        <div className="mt-[18rem]">
            <Carousel
                item_type=""
                genre=""
                items={preferenceItems.slice(-18).reverse()}
            />
            <div className="h-[8rem]"/>
        </div>
    )
}