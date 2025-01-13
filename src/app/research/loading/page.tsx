'use client'

import { useEffect } from "react"

import { usePageContext } from "@/app/context/PageTypeContext"
import { useParticipantNumberContext } from "@/app/context/ParticipantNumberContext"
import { useAlgorithm1Context } from "@/app/context/Algorithm1Context"
import { useAlgorithm2Context } from "@/app/context/Algorithm2Context"
import { useAlgorithm3Context } from "@/app/context/Algorithm3Context"
import { useCurrentAlgorithmContext } from "@/app/context/CurrentAlgorithmContext"

import { useRouter } from "next/navigation"

export default function LoadingPage() {
  const {pageType, setPageType} = usePageContext()
  const { participantNumber } = useParticipantNumberContext()
  const { setCarouselObjects1, setItemObjectList1 } = useAlgorithm1Context()
  const { setCarouselObjects2, setItemObjectList2 } = useAlgorithm2Context()
  const { setCarouselObjects3, setItemObjectList3 } = useAlgorithm3Context()
  const { setCurrentAlgorithm } = useCurrentAlgorithmContext();

  const router = useRouter()

  useEffect(() => {
    if (pageType !== "Loading") {
      setPageType("Loading")
    }

    const createDataContext = async () => {
      try {
        // API call to trigger file generation on the server
        //const tempRequestData = ['tt9184994', 'tt8504014', 'tt8690918', 'tt7767422', 'tt0106220']
        const tempRequestData = ['tt0120082', 'tt0134084', 'tt9859436', 'tt9018736', 'tt9110170']
        const tempCurrentAlgorithm = 1
        const response = await fetch('http://127.0.0.1:5000/api/generate-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'likedItems': tempRequestData
          })
        })
        
        if (!response.ok) {
          throw new Error(`Failed to fetch CSV data`)
        }
        
        const data = await response.json()
        if (data.success) {
            setCarouselObjects1(data.algorithm1['carousel_objects'])
            setItemObjectList1(data.algorithm1['item_object_list'])
            setCarouselObjects2(data.algorithm2['carousel_objects'])
            setItemObjectList2(data.algorithm2['item_object_list'])
            setCarouselObjects3(data.algorithm3['carousel_objects'])
            setItemObjectList3(data.algorithm3['item_object_list'])
            setCurrentAlgorithm(tempCurrentAlgorithm)
            router.push('/testflix') // Redirect to the next page after successful fetch
        } else {
            console.error("File generation failed:", data.error || "Unknown error")
        }

      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    createDataContext()

  }, [participantNumber, router]);

  return (
        <p>Please wait a minute while your Testflix is being generated..</p>
  )
}