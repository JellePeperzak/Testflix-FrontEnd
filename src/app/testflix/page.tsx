'use client'

import CarouselLayout from "./layouts/carouselLayout"
import { useEffect } from "react"
import { usePageContext } from "../context/PageTypeContext"

// IMPORTANT - On first load of the home page, if there is no available 
// data in the data context yet, the front end should request data from the
// back end to base the items and their order on.

// ALSO IMPORTANT - To make the idea above work, there should be a data
// context, and maybe instead of loading the data on the first load of the 
// home page, there could be an intermediary loading page that has the user 
// wait until the data is fetched.
export default function TestFlixHomePage() {
  const {pageType, setPageType} = usePageContext()

  useEffect(() => {
    if (pageType != "Home") 
      {setPageType("Home")}      
  }, [pageType])

  return (
        <CarouselLayout contentType={"Home"}/>
  )
}