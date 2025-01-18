'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { usePageContext } from "@/app/context/PageTypeContext";
import { useBackendDataContext } from "@/app/context/BackendDataContext";

import LayoutResearch from "../layout/LayoutResearch";

import { ErrorMessageType } from "@/app/components/interfaces/errorMessage";

export default function QuestionnaireDemographic() {
    const [ageValue, setAgeValue] = useState<number | undefined>();
    const [genderValue, setGenderValue] = useState<string>("");
    const [experienceValue, setExperienceValue] = useState<number | undefined>();
    const [consumptionValue, setConsumptionValue] = useState<number | undefined>();
    const [nationalityValue, setNationalityValue] = useState<string>("");
    const [customNationality, setCustomNationality] = useState<string>("");
    const [errorObject, setErrorObject] = useState<ErrorMessageType>({
        location: null,
        message: null
    });

    const { pageType, setPageType } = usePageContext();
    const {dataToStore, setDataToStore} = useBackendDataContext();

    const router = useRouter();

    useEffect(() => {
          if (pageType != "Research") 
            {setPageType("Research")}      
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch(e.target.getAttribute('name')) {
            case 'age':
                setAgeValue(e.target.value ? parseInt(e.target.value, 10) : undefined);
                break;
            case 'gender':
                setGenderValue(e.target.value);
                break;
            case 'nationality':
                setNationalityValue(e.target.value);
                break;
            case 'experience':
                setExperienceValue(e.target.value ? parseInt(e.target.value, 10) : undefined);
                break;
            case 'consumption':
                setConsumptionValue(e.target.value ? parseInt(e.target.value, 10) : undefined);
                break;
            default:
                throw new Error(`handleInputChange did not identify the correct case for e.target.getAttribute('name')`)
        }
    };

    const handleNationalityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomNationality(e.target.value);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrorObject({
            location: null,
            message: null
        });

        // VALIDATE RADIO INPUT SEGMENTS FOR VALID INPUT
        // Validate gender
        const genderElement = document.querySelector('input[name="gender"]:checked') as HTMLInputElement;
        if (!genderElement) {
            setGenderValue("");
            setErrorObject({
                location: 'gender',
                message: 'Please select one of the gender options.'
            })
            return;
        }

        // Validate nationality
        let finalNationalityValue: string;
        if (!["Dutch", "German", "Belgian"].includes(nationalityValue) && customNationality === "") {
            setErrorObject({
                location: 'nationality',
                message: "Please provide a nationality."
            });
            return;
        } else if (!["Dutch", "German", "Belgian"].includes(nationalityValue)) {
            // If nationality is valid, determine whether to take the value from the radio input or from the Others input bar
            finalNationalityValue = customNationality;
        } else {
            finalNationalityValue = nationalityValue;
        };

        // Validate experience
        const experienceElement = document.querySelector('input[name="experience"]:checked') as HTMLInputElement;
        if (!experienceElement) {
            setExperienceValue(undefined);
            setErrorObject({
                location: 'experience',
                message: 'Please declare how experienced you are with video streaming services.'
            })
            return;
        }

        // Final check if all values are provided. If so, store them in context and move to the next page.
        const dataList = [ageValue, genderValue, finalNationalityValue, experienceValue, consumptionValue]
        const allHaveValues = dataList.every(v => v != undefined);
        if (allHaveValues) {
            setDataToStore({
                ...dataToStore,
                age: ageValue,
                gender: genderValue,
                nationality: finalNationalityValue,
                experience: experienceValue,
                consumption: consumptionValue
            })
            router.push("/research/preference")
        } else {
            setErrorObject({
                location: 'general',
                message: "Not all data has been provided. Please provide an answer to all questions"
            })
        }; 
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
                        <input type="number" name="age" min="10" max="100" step="1" onChange={handleInputChange} required/>
                    </div>
                    <div className="flex flex-col w-fit items-center">
                        <p>What gender do you identify as?</p>
                        {errorObject.location === 'gender' && <p className="text-red-500">{errorObject.message}</p>}
                        <div className="flex flex-col w-full items-start">
                            <div className="layout-radio-horizontal">
                                <input type="radio" name="gender" id="NA" value="NA" onChange={handleInputChange} /><label htmlFor="NA">Prefer not to say</label>
                            </div>
                            <div className="layout-radio-horizontal">
                                <input type="radio" name="gender" id="Male" value="Male" onChange={handleInputChange} /><label htmlFor="Male">Male</label>
                            </div>
                            <div className="layout-radio-horizontal">
                                <input type="radio" name="gender" id="Female" value="Female" onChange={handleInputChange} /><label htmlFor="Female">Female</label>
                            </div>
                            <div className="layout-radio-horizontal">
                                <input type="radio" name="gender" id="Nonbinary" value="Nonbinary" onChange={handleInputChange} /><label htmlFor="Nonbinary">Nonbinary</label>
                            </div>
                            <div className="layout-radio-horizontal">
                                <input type="radio" name="gender" id="Agender" value="Agender" onChange={handleInputChange} /><label htmlFor="Agender">Agender</label>
                            </div>
                            
                        </div>
                    </div>
                    <div className="flex flex-col w-fit items-center">
                        <p>What is your nationality?</p>
                        <div className="flex flex-col w-fit items-start">
                            <div className="layout-radio-horizontal">
                                <input type="radio" name="nationality" id="Dutch" value="Dutch" onChange={handleInputChange}/><label htmlFor="Dutch">Dutch</label>
                            </div>
                            <div className="layout-radio-horizontal">
                                <input type="radio" name="nationality" id="Belgian" value="Belgian" onChange={handleInputChange}/><label htmlFor="Belgian">Belgian</label>
                            </div>
                            <div className="layout-radio-horizontal">
                                <input type="radio" name="nationality" id="German" value="German" onChange={handleInputChange}/><label htmlFor="German">German</label>
                            </div>
                            <div className="layout-radio-horizontal">
                                <input type="radio" name="nationality" id="Other" value={customNationality} onChange={handleInputChange}/><label htmlFor="Other">Other, namely:</label>
                                    <input 
                                        type="text"
                                        placeholder="Enter your nationality"
                                        style={{ minWidth: '12em' }}
                                        onChange={handleNationalityInputChange}
                                    />
                            </div>
                        </div>
                        {errorObject.location === 'nationality' && <p className="text-red-500">{errorObject.message}</p>}
                    </div>
                    <div>
                        <p>How experienced are you at using video streaming services such as Netflix, Disney+, HBO Max, etc.?</p>
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
                                        name="experience"
                                        value={index + 1}
                                        onChange={handleInputChange}
                                    />
                                ))}
                            </div>
                            {errorObject.location === 'experience' && <p className="text-red-500 text-center">{errorObject.message}</p>}
                        </div>
                    </div>
                    <div className="flex flex-col w-fit items-center">
                        <p>
                            Over the past month, how many hours have you consumed video streaming services on average per week?
                            Please round to a whole number.
                        </p>
                        <input type="number" name="consumption" min="0" step="1" onChange={handleInputChange} required/>
                    </div>
                    {errorObject.location === 'general' && <p className="text-red-500 text-center">{errorObject.message}</p>}
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