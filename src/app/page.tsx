'use client'
import React, { useEffect, useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

import LayoutResearch from "./research/layout/LayoutResearch";

import { usePageContext } from "./context/PageTypeContext";
import { useBackendDataContext } from "./context/BackendDataContext";



// Participantnumber needs to be validated
export default function Home () {
  const [consentGiven, setConsentGiven] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>();

  const {pageType, setPageType} = usePageContext();
  const {setDataToStore} = useBackendDataContext();

  const router = useRouter();

  useEffect(() => {
      if (pageType != "Research") 
        {setPageType("Research")}      
  }, [])

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConsentGiven(e.target.checked);
  };

  const handleButtonClick = () => {
    if (!consentGiven) {
      setErrorMessage("Please tick the checkbox before you continue.")
      return
    }
    const currentTime = Date.now()
    setDataToStore({
      time_start: currentTime
    })
    router.push("/research/demographics")
  }

  return (
    <LayoutResearch title="Welcome to Testflix!">
      <div className="flex flex-col">
        <p className="text-center">
          Welcome! Thank you for considering participating in my study. Before you start, please read the information below and consent to 
          participating in the study.
        </p>

        <div className="section-text-research">
          <h2>IMPORTANT - What do I need to participate in the study?</h2>
          <p>
            In order to participate in this study, you need the following things:
          </p>
          <ul>
            <li>A laptop or desktop to perform the tasks with {"("}i.e. NO phones or tablets{")"}</li>
            <li>Enough time to complete the full study in one go {"("}See <i>"What can I expect while participating in the study?" </i> for estimated duration of participation{")"}</li>
          </ul>
          
        </div>

        <div className="section-text-research">
          <h2>What is the goal of this study?</h2>
          <p>
            Watching series and movies on video streaming services such as Netflix and Disney+ has quickly become a popular way for people to spend 
            their free time. While a lot of research has gone into developing objective evaluation methods to determine the quality of these services,
            there are very few studies that include the experience of the user in these evaluation methods. 
            My study aims to improve the understanding of the relationship between user experience and the quality of service in the context of 
            video streaming services. 
            <span className="text-pink-500">Will mentioning something about specifically looking at the influence of recommender quality influence 
            the validity of test results?</span>
          </p>
        </div>
        
        <div className="section-text-research">
          <h2>What can I expect while participating in the study?</h2>
          <p>
            During the study you will perform three tasks while navigating a web page that resembles a video streaming service. 
            After each task you will be asked to respond to a list of statements. Participation will take about <span className="text-pink-500">XX</span> minutes. 
          </p>
        </div>

        <div className="section-text-research">
          <h2>What happens to the data I provide?</h2>
          <p>
            If you consent to participating in the study, the data you provide will be analysed and stored anonymously in a secure database. 
            This anonymous data may be made available after the completion of the study to researchers and other research users upon request via a 
            secured data repository. 
          </p>
        </div>

        <div className="section-text-research">
          <h2>What happens if I decide to stop my participation during the study?</h2>
          <p>
            Participation is voluntary. I am only allowed to collect your data for my study if you consent to this. 
            If you decide not to participate, you do not have to take any further action. 
            If you do decide to participate, you can always change your mind and stop participating at any time, including during the study. 
            If you decide to stop participating during the study, the data collected up to the point of dropping out will be deleted.
          </p>
        </div>

        <div className="section-text-research">
          <h2>How can I contact the researcher?</h2>
          <p>
            If you have any questions or concerns about this research, please contact me at <a className="text-cyan-500" href="mailto:j.peperzak@students.uu.nl">j.peperzak@students.uu.nl</a>, 
            or my supervisor Dr. A. Chatzimparmpas at <a className="text-cyan-500" href="mailto:a.chatzimparmpas@uu.nl">a.chatzimparmpas@uu.nl</a>.
          </p>
        </div>

        <div className="section-text-research">
          <h2>I want to participate! What do I do now?</h2>
          <p>
            That is amazing! To start your participation, tick the checkbox below and click on the Participate button.
          </p>
          <div className="flex flex-col my-[0.5rem]">
            <div className="flex items-center gap-[0.5em]">
              <input 
                type="checkbox" 
                id="consent" 
                name="consent" 
                value="consent" 
                className="w-[1.2em] h-[1.2em]"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="consent" className="leading-8">
                Yes, I have read and understood the information provided above and I consent to my answers being used for the purposes of 
                scientific research as described above.
              </label>
            </div>
            {errorMessage && <p className="text-red-500 text-center mt-[1em]">{errorMessage}</p>}
            <button 
              onClick={handleButtonClick}
              className="w-fit self-center bg-black text-[#E50914] text-[125%] font-bold px-[1em] py-[0.5em] mt-[1em] rounded-lg"
            >
              PARTICIPATE
            </button>
          </div> 
        </div> 
      </div>            
    </LayoutResearch>
        
  )
}