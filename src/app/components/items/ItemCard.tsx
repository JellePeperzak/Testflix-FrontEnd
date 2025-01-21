'use client'

import Image from 'next/image';
import '@fortawesome/fontawesome-free/css/all.css';
import { useState, useRef, useEffect } from 'react';

import { usePageContext } from '@/app/context/PageTypeContext';
import { useRouter } from 'next/navigation';
import { useTaskContext } from '@/app/context/TaskContext';
import { useBackendDataContext } from '@/app/context/BackendDataContext';

export interface ItemProps {
    tvdb_id?: string
    item_type: string
    title: string
    year?: string
    genres: string
    runtime: string
    actors?: string
    pg_rating: string
    banner_url: string
    file_id: string
    season_count: string
    score?: number
    drive_id?: string
};

const Item: React.FC<ItemProps & { originTransform?: string | null}> = ({ banner_url, file_id, item_type, title, pg_rating, genres, runtime, season_count, originTransform=null}) => {
    const [isDelayedHovered, setIsDelayedHovered] = useState(false);
    const [runtimeFormatted, setRuntimeFormatted] = useState(`${runtime}m`)
    const timeoutId = useRef<NodeJS.Timeout | null>(null);
    const pgIconPath = `/icons/pg-icons/PG${pg_rating}.png`;
    
    const {taskOrder, currentTaskIndex} = useTaskContext();
    const {dataToStore, setDataToStore} = useBackendDataContext();
    const { setPageType } = usePageContext();

    const router = useRouter();

    useEffect(() => {
        const runtimeNumber = parseInt(runtime, 10)
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
        setIsDelayedHovered(false);
    }

    const handleChoiceSubmit = () => {
        // FUNCTION THAT TRIGGERS WHEN THE USER CONFIRMS THEIR SELECTION OF AN ITEM
        const currentTime = Date.now()
        switch (taskOrder[currentTaskIndex]) {
            case 1:
                setPageType("Research")
                setDataToStore({
                    ...dataToStore,
                    task1_finish: currentTime
                })
                router.push('/research/questions')
                break;
            case 2: 
                setPageType("Research")
                setDataToStore({
                    ...dataToStore,
                    task2_finish: currentTime
                })
                router.push('/research/questions')
                break;
            case 3:
                setPageType("Research") 
                setDataToStore({
                    ...dataToStore,
                    task3_finish: currentTime
                })
                router.push('/research/questions')
                break;
            default:
                throw new Error(`Current task number could not be identified and stored in the dataToStore context`)
        }
    }
    
    return (
        <div className={`relative w-fit h-auto rounded bg-[#242424] transition-all duration-300 ${isDelayedHovered && 'translate-y-[-60%] scale-[1.4]  h-[calc(200%)] card-shaded-top'} ${originTransform && `origin-${originTransform}`}`}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => {
                handleMouseEnter();
            }}
        >
            <Image
                src={`https://drive.google.com/uc?id=${file_id}`}
                width={1920}
                height={1080}
                alt={`${title}`}
                className={isDelayedHovered ? 'rounded-t' : 'rounded cursor-pointer'}
                loading='lazy'
                
            />
            <div className={`absolute card-grid-container w-full h-fit top-full -mt-1 left-0 bg-[#181818] p-[16px] rounded-b card-shaded-bottom transition-opacity ${isDelayedHovered ? 'opacity-1' : 'opacity-0 pointer-events-none'}`}>
                <div className="flex gap-x-[6px]">
                    <button 
                        className="button-size-variable bg-[#ededed] text-[#000000] rounded-full flex items-center justify-center"
                        onClick={handleChoiceSubmit}
                    >
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
                    {pg_rating != 'UNAVAILABLE' ? (
                        <Image
                        src={pgIconPath}
                        alt={`PG${pg_rating} icon`}
                        width={24}
                        height={24}
                        className={"mr-[8px]"}
                        />
                    ) : (
                        <div className="w-[24px] h-[24px] mr-[8px]" />
                    )}
                    
                    <div className="self-center">
                        <p className="text-[11px] leading-[11px] text-[#B0B0B0]">{item_type == 'movie' ? runtimeFormatted : `${season_count} Seasons`}</p>
                    </div>
                </div>
                <div className='flex flex-wrap text-[11px] leading-[11px] '>
                    {genres.split(',').map((genre, index) => (
                        <div key={`${genre}${index}`} className="flex">
                            {index != 0 && (<span className="interpunct">&middot;</span>)}
                            <p>{genre}</p>
                        </div> 
                    ))}
                </div>                
            </div>
        </div>        
    );
};

export default Item;