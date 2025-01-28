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
    const [consumptionValue, setConsumptionValue] = useState<string>("");
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
    }, [pageType, setPageType])

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
                setConsumptionValue(e.target.value);
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
        if (!["Dutch", "German", "Belgian", "NA"].includes(nationalityValue) && customNationality === "") {
            setErrorObject({
                location: 'nationality',
                message: "Please provide a nationality."
            });
            return;
        } else if (!["Dutch", "German", "Belgian", "NA"].includes(nationalityValue)) {
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

        // Validate consumption
        const consumptionElement = document.querySelector('input[name="consumption"]:checked') as HTMLInputElement;
        if (!consumptionElement) {
            setConsumptionValue("");
            setErrorObject({
                location: 'consumption',
                message: 'Please declare how much you use video streaming services.'
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
                        {errorObject.location === 'gender' && <p className="text-red-500">{errorObject.message}</p>}
                    </div>
                    <div className="flex flex-col w-fit items-center">
                        <p>What is your nationality?</p>
                        <div className="flex flex-col w-fit items-start">
                            <div className="layout-radio-horizontal">
                                <input type="radio" name="nationality" id="NA" value="NA" onChange={handleInputChange}/><label htmlFor="NA">Prefer not to say</label>
                            </div>
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
                        <p>How many hours do you spend using video streaming services on average per week?</p>
                        <div className="flex w-full justify-between items-center mt-[1em]">
                            <div className="flex flex-col">
                                <div className="layout-radio-horizontal">
                                    <input type="radio" name="consumption" id="<3" value="<3>" onChange={handleInputChange} /><label htmlFor="<3">Less than 3 hours per week</label>
                                </div>
                                <div className="layout-radio-horizontal">
                                    <input type="radio" name="consumption" id="3-6" value="3-6" onChange={handleInputChange} /><label htmlFor="3-6">Between 3 and 6 hours per week</label>
                                </div>
                                <div className="layout-radio-horizontal">
                                    <input type="radio" name="consumption" id="6-9" value="6-9" onChange={handleInputChange} /><label htmlFor="6-9">Between 6 and 9 hours per week</label>
                                </div>
                                <div className="layout-radio-horizontal">
                                    <input type="radio" name="consumption" id="9-12" value="9-12" onChange={handleInputChange} /><label htmlFor="9-12">Between 9 and 12 hours per week</label>
                                </div>
                                <div className="layout-radio-horizontal">
                                    <input type="radio" name="consumption" id=">12" value=">12" onChange={handleInputChange} /><label htmlFor=">12">More than 12 hours per week</label>
                                </div>
                            </div>
                            <div className="grid grid-rows-6 w-fit border-2 rounded-t-lg">
                                <div className="border-b">
                                    <p className="text-center">Estimated amounts</p>
                                </div>
                                <div className="grid grid-cols-3 border-b border-dashed">
                                    <div className="px-[0.5em]">
                                        <p className="text-center">Hours</p>
                                    </div>
                                    <div className="px-[0.5em]">
                                        <p className="text-center">Movies</p>
                                    </div>
                                    <div className="px-[0.5em]">
                                        <p className="text-center">Episodes</p>
                                    </div>
                                </div>
                                
                                <EstimationRow hours='3' movies='2' episodes='6' lastRow={false}/>
                                <EstimationRow hours='6' movies='4' episodes='12' lastRow={false}/>
                                <EstimationRow hours='9' movies='6' episodes='18' lastRow={false}/>
                                <EstimationRow hours='12' movies='8' episodes='24' lastRow={true}/>
                            </div>
                        </div>
                        {errorObject.location === 'consumption' && <p className="text-red-500">{errorObject.message}</p>}
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

interface estimationRowProps {
    hours: number | string;
    movies: number | string;
    episodes: number | string;
    lastRow: boolean;
}


function EstimationRow({hours, movies, episodes, lastRow}: estimationRowProps) {

    return (
        <div className={`grid grid-cols-3 ${!lastRow && "border-b border-dotted border-[#5d5d5d]"}`}>
            <div className="px-[0.5em]">
                <p className="text-center">{hours}</p>
            </div>
            <div className="px-[0.5em]">
                <p className="text-center">{movies}</p>
            </div>
            <div className="px-[0.5em]">
                <p className="text-center">{episodes}</p>
            </div>
        </div>
    )
}

<div className="flex justify-around border-b border-dashed">
                                    <div className="px-[0.5em]">
                                        <p className="text-center">Hours</p>
                                    </div>
                                    <div className="px-[0.5em]">
                                        <p className="text-center">Movies</p>
                                    </div>
                                    <div className="px-[0.5em]">
                                        <p className="text-center">Episodes</p>
                                    </div>
                                </div>