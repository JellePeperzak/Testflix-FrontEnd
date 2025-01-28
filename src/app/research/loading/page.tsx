'use client'

import { useEffect } from "react"

import { usePageContext } from "@/app/context/PageTypeContext"
import { useAlgorithm1Context } from "@/app/context/Algorithm1Context"
import { useAlgorithm2Context } from "@/app/context/Algorithm2Context"
import { useAlgorithm3Context } from "@/app/context/Algorithm3Context"
import { useCurrentAlgorithmContext } from "@/app/context/CurrentAlgorithmContext"
import { useTaskContext } from "@/app/context/TaskContext"
import { useBackendDataContext } from "@/app/context/BackendDataContext"

import LayoutResearch from "../layout/LayoutResearch"

import { useRouter } from "next/navigation"

export default function LoadingPage() {
  const {pageType, setPageType} = usePageContext()
  const { setCarouselObjects1, setItemObjectList1 } = useAlgorithm1Context()
  const { setCarouselObjects2, setItemObjectList2 } = useAlgorithm2Context()
  const { setCarouselObjects3, setItemObjectList3 } = useAlgorithm3Context()
  const { setCurrentAlgorithmIndex, setAlgorithmOrder } = useCurrentAlgorithmContext();
  const { setTaskOrder, setCurrentTaskIndex } = useTaskContext();
  const { setParticipantNumber, dataToStore, setDataToStore, preferenceIDs} = useBackendDataContext();

  const router = useRouter()

  useEffect(() => {
    if (pageType !== "Research") {
      setPageType("Research")
    }
  }, [pageType, setPageType])

  useEffect(() => {
    const createDataContext = async () => {
      try {
        // API call to trigger data storage and catalogue generation on the server
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/generate-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'data': dataToStore,
            'preferenceIDs': preferenceIDs
          })
        })
        
        if (!response.ok) {
          throw new Error(`Failed to fetch algorithm data`)
        }
        
        const data = await response.json()
        if (data.success) {
            // Initialize the movie and series data
            setCarouselObjects1(data.algorithm1['carousel_objects'])
            setItemObjectList1(data.algorithm1['item_object_list'])
            setCarouselObjects2(data.algorithm2['carousel_objects'])
            setItemObjectList2(data.algorithm2['item_object_list'])
            setCarouselObjects3(data.algorithm3['carousel_objects'])
            setItemObjectList3(data.algorithm3['item_object_list'])

            // Initialize the Task- and algorithm order data
            console.log(`task order: ${data.task_order}`)
            console.log(`task order type: ${typeof data.task_order}`)
            console.log(`algorithm order: ${data.algorithm_order}`)
            console.log(`algorithm order type: ${typeof data.algorithm_order}`)

            setTaskOrder(data.task_order);
            setCurrentTaskIndex(0);
            setAlgorithmOrder(data.algorithm_order);
            setCurrentAlgorithmIndex(0);

            // Update the participant number for future database updates
            setParticipantNumber(data.participant_number);

            // Prepare a new dataObject to send on the next fetch request to the backend
            const newDataToStore = {
              condition_id: data.condition_id,
              first_task: data.task_order[0],
              second_task: data.task_order[1],
              third_task: data.task_order[2],
              first_algorithm: data.algorithm_order[0],
              second_algorithm: data.algorithm_order[1],
              third_algorithm: data.algorithm_order[2]
            };
            setDataToStore(newDataToStore)
            
            router.push('/research/practice') // Redirect to the next page after successful fetch
        } else {
            console.error("File generation failed:", data.error || "Unknown error")
        }

      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    createDataContext()

  }, [router, dataToStore, preferenceIDs, setAlgorithmOrder, setCarouselObjects1, setCarouselObjects2, setCarouselObjects3, 
    setCurrentAlgorithmIndex, setCurrentTaskIndex, setDataToStore, setItemObjectList1, setItemObjectList2, setItemObjectList3,
    setParticipantNumber, setTaskOrder]);

  return (
    <LayoutResearch title="Loading data..">
      <p className="text-center">Please wait a minute while your Testflix is being generated..</p>
    </LayoutResearch>
        
  )
}