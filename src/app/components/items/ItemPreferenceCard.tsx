'use client'

import { useState, useEffect } from "react";
import Image from "next/image";
import '@fortawesome/fontawesome-free/css/all.css';

export interface PreferenceItemProps {
    imdb_id: string;
    title: string;
    image_type: string;
    handleItemClick: (itemData: string[]) => void;
    selectedItems: string[][];
    [key: string]: any;
}

const ItemPreferenceCard: React.FC<PreferenceItemProps> = ({ imdb_id, title, image_type, handleItemClick, selectedItems }) => {
    const [itemIsHovered, setItemIsHovered] = useState<boolean>(false);
    const [iconIsHovered, setIconIsHovered] = useState<boolean>(false);
    const [selected, setSelected] = useState<boolean>(false);

    useEffect(() => {
        const isSelected = selectedItems.some(
            (item) =>
                item[0] === imdb_id &&
                item[1] === title &&
                item[2] === image_type
        );
        setSelected(isSelected);
    }, [selectedItems, image_type, imdb_id, title])


    return (
        <div className={`relative w-fit h-auto rounded bg-[#242424] transition-all duration-300`}
            onMouseLeave={() => setItemIsHovered(false)}
            onMouseEnter={() => setItemIsHovered(true)}
            onClick={() => {
                if (!selected) {
                    handleItemClick([imdb_id, title, image_type]);
                }
            }}
        >
            <Image
                src={`https://thesis.streamwebsite.nl/thumbnails/${imdb_id}.${image_type}`}
                width={1920}
                height={1080}
                alt={`${title}`}
                className={`rounded ${!selected && 'cursor-pointer'}`}
                loading='lazy'
            />
            {(itemIsHovered && !selected) && (
                <div className="bg-black absolute bottom-0 left-0 w-full h-fit bg-opacity-70">
                    <p className="text-center">{title}</p>
                </div>
            )}

            {selected && (
                <div className="flex absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 rounded items-center justify-center">
                    <div 
                        className={`flex h-[3rem] w-[3rem] ${iconIsHovered ? 'bg-[#b20811] border-[#b20811]' : 'bg-[#E50914] border-[#E50914]'} border-[0.13em] rounded-full items-center justify-center cursor-pointer transition-colors`}
                        onMouseLeave={() => setIconIsHovered(false)}
                        onMouseEnter={() => setIconIsHovered(true)}
                        onClick={() => handleItemClick([imdb_id, title, image_type])}
                    >
                        <i className={`fas ${iconIsHovered ? 'fa-x' : 'fa-check'}`}/>
                    </div>
                </div>
            )}
            
        </div>  
    );
};

export default ItemPreferenceCard;