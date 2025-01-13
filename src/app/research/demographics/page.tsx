'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

import { usePageContext } from "@/app/context/PageTypeContext";

import LayoutResearch from "../layout/LayoutResearch";

export default function QuestionnaireDemographic() {
    const [selectedNationality, setSelectedNationality] = useState("");
    const [customNationality, setCustomNationality] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [genderSelected, setGenderSelected] = useState(true);
    const [experienceSelected, setExperienceSelected] = useState(true);

    const {setPageType} = usePageContext();

    const router = useRouter();

    const handleNationalityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedNationality(e.target.value);
    };

    const handleNationalityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomNationality(e.target.value);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");

        // Validate nationality
        if (!["Dutch", "German", "Belgian"].includes(selectedNationality) && customNationality === "") {
            setErrorMessage("Please provide a nationality");
            return;
        };

        const genderValid = document.querySelector('input[name="dem-gender"]:checked');
        if (!genderValid) {
            setGenderSelected(false);
            return;
        } else {
            setGenderSelected(true);
        }

        const experienceValid = document.querySelector('input[name="dem-experience"]:checked');
        if (!experienceValid) {
            setExperienceSelected(false);
            return;
        } else {
            setExperienceSelected(true);
        }

        setPageType("Loading");
        router.push("/research/loading")
    };

    return (
        <LayoutResearch title="Before we begin..">
            <div className="flex flex-col w-full items-center px-[15rem]">
                <p>Before you begin, please fill in the questions below</p>
                <form 
                    className="flex flex-col gap-[2em] w-[55rem] items-center p-[1em] border rounded"
                    onSubmit={handleFormSubmit}
                >
                    <div className="flex flex-col w-fit items-center">
                        <p>What is your age?</p>
                        <input type="number" name="dem-age" min="10" max="100" step="1" required/>
                    </div>
                    <div className="flex flex-col w-fit items-center">
                        <p>What gender do you identify as?</p>
                        {!genderSelected && <p className="text-red-500">Please select a gender</p>}
                        <div className="flex flex-col w-full items-start">
                            <div className="layout-radio-horizontal">
                                <input type="radio" name="dem-gender" id="NA" value="NA" /><label htmlFor="NA">Prefer not to say</label>
                            </div>
                            <div className="layout-radio-horizontal">
                                <input type="radio" name="dem-gender" id="Male" value="Male" /><label htmlFor="Male">Male</label>
                            </div>
                            <div className="layout-radio-horizontal">
                                <input type="radio" name="dem-gender" id="Female" value="Female" /><label htmlFor="Female">Female</label>
                            </div>
                            <div className="layout-radio-horizontal">
                                <input type="radio" name="dem-gender" id="Nonbinary" value="Nonbinary" /><label htmlFor="Nonbinary">Nonbinary</label>
                            </div>
                            <div className="layout-radio-horizontal">
                                <input type="radio" name="dem-gender" id="Agender" value="Agender" /><label htmlFor="Agender">Agender</label>
                            </div>
                            
                        </div>
                    </div>
                    <div className="flex flex-col w-fit items-center">
                        <p>What is your nationality?</p>
                        <div className="flex flex-col w-fit items-start">
                            <div className="layout-radio-horizontal">
                                <input type="radio" name="dem-nationality" id="Dutch" value="Dutch" onChange={handleNationalityChange}/><label htmlFor="Dutch">Dutch</label>
                            </div>
                            <div className="layout-radio-horizontal">
                                <input type="radio" name="dem-nationality" id="Belgian" value="Belgian" onChange={handleNationalityChange}/><label htmlFor="Belgian">Belgian</label>
                            </div>
                            <div className="layout-radio-horizontal">
                                <input type="radio" name="dem-nationality" id="German" value="German" onChange={handleNationalityChange}/><label htmlFor="German">German</label>
                            </div>
                            <div className="layout-radio-horizontal">
                                <input type="radio" name="dem-nationality" id="Other" value={customNationality} onChange={handleNationalityChange}/><label htmlFor="Other">Other, namely:</label>
                                    <input 
                                        type="text"
                                        placeholder="Enter your nationality"
                                        style={{ minWidth: '12em' }}
                                        onDurationChange={handleNationalityInputChange}
                                    />
                            </div>
                        </div>
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    </div>
                    <div>
                        <p>How experienced are you at using video streaming services such as Netflix, Disney+, HBO Max, etc.?</p>
                        {!experienceSelected && <p className="text-red-500 text-center">Please select your experience level</p>}
                        <div>
                            <div className="flex w-full justify-between">
                                <div><p>Extremely Inexperienced</p></div>
                                <div><p>Extremely Experienced</p></div>
                            </div>
                            <div className="flex w-full justify-around">
                                {Array.from({ length: 5}).map((_, index) => (
                                    <input 
                                        key={index}
                                        type="radio"
                                        name="dem-experience"
                                        value={index + 1}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-fit items-center">
                        <p>
                            Over the past month, how many hours have you consumed video streaming services on average per week?
                            Please round to a whole number.
                        </p>
                        <input type="number" name="dem-consumption" min="0" step="1" required/>
                    </div>
                    <button 
                        type="submit"
                        className="w-fit self-center bg-black text-[#E50914] text-[125%] font-bold px-[1em] py-[0.5em] mt-[1em] rounded-lg"
                        >
                        CONTINUE
                    </button>
                </form>
            </div>
        </LayoutResearch>
    );
};