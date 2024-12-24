'use client'

import Image from 'next/image';
import '@fortawesome/fontawesome-free/css/all.css';
import { useState, useRef, useEffect } from 'react';

interface ItemProps {
    imgURL: string
    contentType: string
    itemName: string
    pgRating: string
    genres: string[]
    runtime_minutes: string
    season_count: string
};

const Item: React.FC<ItemProps> = ({ imgURL, contentType, itemName, pgRating, genres, runtime_minutes, season_count}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isDelayedHovered, setIsDelayedHovered] = useState(false);
    const [runtimeFormatted, setRuntimeFormatted] = useState(`${runtime_minutes}m`)
    const timeoutId = useRef<NodeJS.Timeout | null>(null);
    const pgIconPath = `/icons/pg-icons/PG${pgRating}.png`;

    useEffect(() => {
        const runtimeNumber = parseInt(runtime_minutes, 10)
        if (runtimeNumber >= 60) {
            const hours = Math.floor(runtimeNumber / 60);
            const minutes = runtimeNumber % 60;
            setRuntimeFormatted(`${hours}h ${minutes}m`)
        }
    }, []);

    const handleMouseEnter = () => {
        timeoutId.current = setTimeout(() => {
            setIsDelayedHovered(true);
        }, 400)
    };

    const handleMouseLeave = () => {
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }
        setIsHovered(false);
        setIsDelayedHovered(false);
    }
    
    return (
        <div className={`relative w-fit h-auto rounded bg-[#242424] transition-all duration-300 ${isDelayedHovered ? 'translate-y-[-60%] scale-[1.4]  h-[calc(200%)] z-100 card-shaded-top' : 'z-10'}`}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => {
                setIsHovered(true);
                handleMouseEnter();
            }}
        >
            <Image
                src={imgURL}
                width={1920}
                height={1080}
                alt={`${itemName}`}
                className={isDelayedHovered ? 'rounded-t' : 'rounded cursor-pointer'}
                
            />
            <div className={`absolute card-grid-container w-full h-fit top-full -mt-1 left-0 bg-[#181818] p-[16px] rounded-b card-shaded-bottom transition-opacity ${isDelayedHovered ? 'opacity-1' : 'opacity-0 pointer-events-none'}`}>
                <div className="flex gap-x-[6px]">
                    <button className="button-size-variable bg-[#ededed] text-[#000000] rounded-full flex items-center justify-center">
                        <i className="fas fa-play icon-size-variable ml-[0.1em] scale-x-110"></i>
                    </button>
                    <button className="button-size-variable bg-[#232323] text-[#181818] border-[0.13em] border-[#757575] rounded-full flex items-center justify-center">
                        <i className="fas fa-plus text-white icon-size-variable-small"></i>
                    </button>
                    <button className="button-size-variable bg-[#232323] text-[#181818] border-[0.13em] border-[#757575]  rounded-full flex items-center justify-center">
                        <i className="fas fa-thumbs-up text-white icon-size-variable-small scale-90"></i>
                    </button>
                </div>
                <div className="flex py-[10px] ml-[6px]">
                    <Image
                        src={pgIconPath}
                        alt={`PG${pgRating} icon`}
                        width={24}
                        height={24}
                        className={"mr-[8px]"}
                    />
                    <div className="self-center">
                        <p className="text-[11px] leading-[11px] text-[#B0B0B0]">{contentType == 'movie' ? runtimeFormatted : `${season_count} Seasons`}</p>
                    </div>
                </div>
                <div className='flex flex-wrap text-[11px] leading-[11px] '>
                    <p>{genres[0]}</p>
                    {genres.length > 1 && (
                        <div className="flex">
                            <span className="interpunct">&middot;</span>
                            <p>{genres[1]}</p>
                        </div>            
                    )}
                    {genres.length > 2 && (
                        <div className="flex">
                            <span className="interpunct">&middot;</span>
                            <p>{genres[2]}</p>
                        </div>   
                    )}
                </div>                
            </div>
        </div>        
    );
};

export default Item;