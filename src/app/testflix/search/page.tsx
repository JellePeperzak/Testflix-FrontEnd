'use client'

import { useEffect } from "react"
import { usePageContext } from "@/app/context/PageTypeContext"

export default function TestFlixHomePage() {
  const {pageType, setPageType} = usePageContext()

  useEffect(() => {
    if (pageType != "Search") 
      {setPageType("Search")}      
  }, [])

  return (
        <p>hey</p>
  )
}