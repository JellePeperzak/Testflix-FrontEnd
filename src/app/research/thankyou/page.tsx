'use client'

import React, { useEffect, useState} from "react";

import { usePageContext } from "@/app/context/PageTypeContext";
import { useBackendDataContext } from "@/app/context/BackendDataContext";

import LayoutResearch from "../layout/LayoutResearch";

export default function ThankyouPage() {
    const [feedback, setFeedback] = useState<string>("");
    const [success, setSuccess] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const {pageType, setPageType} = usePageContext();
    const { participantNumber } = useBackendDataContext();

    useEffect(() => {
        if (pageType != "Research") 
            {setPageType("Research")}      
    }, [pageType, setPageType])

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFeedback(e.target.value)
    }

    const handleFeedbackSubmit = async () => {
        setErrorMessage("");
        setSuccess(false);
        if (feedback.length === 0) {
            setErrorMessage("Please provide some text in the field above before submitting.")
            return
        }

        try {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/update-database', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'participant_number': participantNumber,
                    'data': {
                        feedback: feedback
                    }
                })
            })
            
            if (!response.ok) {
                throw new Error(`Failed to fetch algorithm data`)
            }
            
            const data = await response.json()

            if (data.success) {
                setSuccess(true);
                setFeedback("");
            } else {
                console.error("Data storage failed:", data.error || "Unknown error")
            };
        } catch (error) {
            console.error('Error storing feedback data:', error)
        }
    }

    return (
        <LayoutResearch title="Thank you!">
            <div className="flex flex-col gap-5">
                <p className="text-center mx-[5em]">
                    And that's it! <span className="font-bold">Thank you so much</span> for participating in my study. In the sections below you can read more 
                    about the specific details of my study and you'll have the opportunity to leave feedback or comment on 
                    any issues that you ran into during the experiment. If you have no feedback or comments, you are free to 
                    leave this page by closing the brower tab or window. If you do have feedback or comments, make sure to 
                    leave them in the input bar on the page and press "Submit".
                </p>

                <div className="section-text-research">
                    <h2>What is my study about, exactly?</h2>
                    <p>
                    As mentioned in the introduction, our study aims to improve the understanding of the relationship between user experience and 
                    the quality of service in the context of video streaming services. More specifically, our study explores how the 
                    quality of recommendations, as perceived by the user, affects different factors that contribute towards their user experience. 
                    The reason why you were asked to perform three tasks is because there were three different recommender algorithms that each 
                    generated recommendations in a drastically different way. Through your responses to the statements we measured not only how 
                    satisfied you were with the recommendations for each task, but also to what degree different factors of your user experience 
                    were satisfied. 
                    </p>
                </div>

                <div className="section-text-research">
                    <h2>Feedback or Comments?</h2>
                    <p>
                        Do you have any further questions about the study, or did you run into some issues during the experiment 
                        that I should know about (e.g. You didn't understand a statement or a task)? Make sure to let me know, either 
                        by contacting me at <a className="text-cyan-500" href="mailto:j.peperzak@students.uu.nl">j.peperzak@students.uu.nl</a> or
                        by filling in the field below and clicking on "Submit".
                    </p>
                    <div className="flex flex-col items-center my-[2em]">
                        <textarea
                            className="text-black w-[30em] h-[12em] px-[0.2em]"
                            value={feedback}
                            onChange={handleTextAreaChange}
                            maxLength={1000}
                            placeholder="Type your feedback here..."
                        />
                        <p>Characters remaining: {1000 - feedback.length}</p>
                        {success && (<p className="mt-[1em]">Your feedback has been received. Thank you!</p>)}
                        {errorMessage && (<p className="text-red-500 text-center mt-[1em]">{errorMessage}</p>)}
                        <button 
                            className="w-fit bg-black text-[#E50914] text-[125%] font-bold px-[1em] py-[0.5em] mt-[1em] rounded-lg"
                            onClick={handleFeedbackSubmit}
                        >
                            CONTINUE
                        </button>
                    </div>
                    
                </div>
            </div>
        </LayoutResearch>
        
    )
}