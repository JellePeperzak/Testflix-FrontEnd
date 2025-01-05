'use client'

import CarouselLayout from "../layouts/carouselLayout"
import { useEffect } from "react"
import { usePageContext } from "@/app/context/PageTypeContext"

export default function TestFlixHomePage() {
  const {pageType, setPageType} = usePageContext()

  useEffect(() => {
    if (pageType != "TV Shows") 
      {setPageType("TV Shows")}      
  }, [])

  return (
        <CarouselLayout contentType={"TV Shows"}/>
  )
}