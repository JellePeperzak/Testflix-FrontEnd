'use client'
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

import { useBackendDataContext } from "@/app/context/BackendDataContext"
import { usePageContext } from "@/app/context/PageTypeContext"

import ItemPreferenceCard from "@/app/components/items/ItemPreferenceCard"

import preferenceItems from "@/app/data/preferences"


export default function PreferencePage() {
    const [selectedItems, setSelectedItems] = useState<string[][]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const {setPreferenceIDs} = useBackendDataContext();
    const { pageType, setPageType } = usePageContext();

    const router = useRouter();

    useEffect(() => {
        if (pageType !== "Research") {
          setPageType("Research")
        }
    }, [pageType, setPageType]);

    // itemData should be a list of format [imdb_id, title, image_type]
    const handleItemClick = (itemData: string[]) => {
        setErrorMessage(null)
        const isSelected = selectedItems.some(
            (item) =>
                item[0] === itemData[0] &&
                item[1] === itemData[1] &&
                item[2] === itemData[2]
        );
        if (isSelected){
            const newItems = selectedItems.filter(
                (item) =>
                    item[0] !== itemData[0] ||
                    item[1] !== itemData[1] ||
                    item[2] !== itemData[2]
            );
            setSelectedItems(newItems)
        } else if (selectedItems.length === 5){
            setErrorMessage("You have already selected five programmes. Please deselect one before you select another.")
        } else {
            setSelectedItems([...selectedItems, itemData])
        }
    }

    const handlePreferenceConfirmation = () => {
        setErrorMessage(null)
        if (selectedItems.length < 3) {
            setErrorMessage("Please select at least three programmes before trying to continue.")
        } else {
            const preference_ids = selectedItems.map((itemData) => itemData[0])
            setPreferenceIDs(preference_ids)
            router.push("/research/loading")
        }
    }

    return (
        <div className="layout-research">
            <div className="fixed bg-[#141414] bg-gradient-header-menu w-full h-fit pb-[1em] z-10">
                <h1 className="text-[#E50914] font-bold">Give your Preference</h1>
                <p className="text-center">Below you see a selection of 36 programmes. Please select the 3 to 5 programmes that you like best from this selection.</p>
                {errorMessage && <p className="text-red-500 text-center mt-[1em]">{errorMessage}</p>}
            </div>
            
            <div className="mt-[10rem] mx-0 mb-0 pt-[2%] min-h-[65px] pb-[0%]">
                    <PreferenceGrid selectedItems={selectedItems} handleItemClick={handleItemClick}/>
            </div>
            
            <div className="mx-[4%]">
                <h2 className="ml-[2em] text-research-subheader">Your Selected Items{selectedItems.length !== 0 && ` (${selectedItems.length})`}</h2>
                <div className="grid overflow-hidden gap-y-[1vw] gap-x-0 mt-[10px] mb-[3rem] leading-[1.6] grid-search-media-dependend">
                    {selectedItems && selectedItems.map((itemData, index) => (
                        <div className={`box-border inline-block px-[0.2vw] relative align-top whitespace-normal ${index === 0 ? 'pl-0' : ''}`}
                            key={index}>
                            <ItemPreferenceCard 
                                key={`${itemData[0]}${index}`} 
                                imdb_id={itemData[0]} 
                                title={itemData[1]} 
                                image_type={itemData[2]}
                                selectedItems={selectedItems}
                                handleItemClick={handleItemClick}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <button 
                className="w-fit self-center bg-black text-[#E50914] text-[125%] font-bold px-[1em] py-[0.5em] mt-[1em] mb-[3em] rounded-lg"
                onClick={handlePreferenceConfirmation}
            >
                CONFIRM PREFERENCES
            </button>
        </div>
    )
}

interface PreferenceGridProps {
    selectedItems: string[][];
    handleItemClick: (itemData: string[]) => void;
}

function PreferenceGrid({ selectedItems, handleItemClick }: PreferenceGridProps) {
    
    return (
        <div className="grid overflow-hidden gap-y-[1vw] gap-x-0 mt-[10px] mx-[4%] mb-[3rem] leading-[1.6] grid-search-media-dependend">
            {preferenceItems.map((item, index) => (
                <div className={`box-border inline-block px-[0.2vw] relative align-top whitespace-normal ${index === 0 ? 'pl-0' : ''}`}
                    key={index}>
                    <ItemPreferenceCard 
                        key={`${item['tvdb_id']}${index}`} 
                        imdb_id={item['imdb_id']} 
                        title={item['title']} 
                        image_type={item['image_type']}
                        selectedItems={selectedItems}
                        handleItemClick={handleItemClick}
                    />
                </div>
            ))}
        </div>
    )
}