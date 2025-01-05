'use client'

import { usePageContext } from "./context/PageTypeContext";
import { useParticipantNumberContext } from "./context/ParticipantNumberContext";
import React, { useEffect, useState } from "react";
import Link from "next/link";

// Participantnumber needs to be validated
export default function Home () {
  const [inputValue, setInputValue] = useState("");

  const {pageType, setPageType} = usePageContext();
  const { setParticipantNumber } = useParticipantNumberContext();

  useEffect(() => {
      if (pageType != "Intro") 
        {setPageType("Intro")}      
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const handleLinkClick = () => {
    setParticipantNumber(inputValue);
    setPageType("Loading");
  }

  return (
    <>
        <p>Insert Participant Number:</p>
        <div className="flex">
          <input 
            type="text" 
            placeholder="Participant Number"
            value={inputValue}
            onChange={handleInputChange}
            className="text-black"
          />
          <Link
            href="/research/loading"
            onClick={handleLinkClick}
          >
            <button>Testflix</button>
          </Link>
        </div>
        
    </>
  )
}