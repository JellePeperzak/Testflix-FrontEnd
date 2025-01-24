'use client'

import CarouselLayout from "../layouts/carouselLayout"
import { useEffect } from "react"
import { usePageContext } from "@/app/context/PageTypeContext"
import { useBackendDataContext } from "@/app/context/BackendDataContext"
import { useTaskContext } from "@/app/context/TaskContext"
import { useCurrentAlgorithmContext } from "@/app/context/CurrentAlgorithmContext"


export default function TestFlixHomePage() {
  const {pageType, setPageType} = usePageContext()
  const {dataToStore, setDataToStore} = useBackendDataContext();
  const {taskOrder, currentTaskIndex} = useTaskContext();
  const {algorithmOrder, currentAlgorithmIndex} = useCurrentAlgorithmContext();


  useEffect(() => {
    if (pageType != "TV Shows") {
      setPageType("TV Shows")
    }
    // Track whether user used this page for the task
    const taskKeyName = `task${taskOrder[currentTaskIndex]}_series`
    const algorithmKeyName = `algorithm${algorithmOrder[currentAlgorithmIndex]}_series`

    let keyDataObject = {}
    
    if (!Object.keys(dataToStore).includes(taskKeyName)) {
      keyDataObject = {
        ...keyDataObject,
        [taskKeyName]: true
      }
    }

    if (!Object.keys(dataToStore).includes(algorithmKeyName)) {
      keyDataObject = {
        ...keyDataObject,
        [algorithmKeyName]: true
      }
    }
    
    if (Object.keys(keyDataObject).length > 0) {
      setDataToStore({
        ...dataToStore,
        ...keyDataObject
      })
    }
  }, [currentTaskIndex, currentAlgorithmIndex, pageType, algorithmOrder, dataToStore, setDataToStore, setPageType, taskOrder])

  return (
        <CarouselLayout contentType={"TV Shows"}/>
  )
}