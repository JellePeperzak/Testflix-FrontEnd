'use client'

import CarouselLayout from "../layouts/carouselLayout"
import { useEffect } from "react"
import { usePageContext } from "@/app/context/PageTypeContext"

export default function TestFlixHomePage() {
  const {pageType, setPageType} = usePageContext()

  useEffect(() => {
    if (pageType != "Movies") 
      {setPageType("Movies")}      
  }, [])

  return (
        <CarouselLayout contentType={"Movies"}/>
  )
}