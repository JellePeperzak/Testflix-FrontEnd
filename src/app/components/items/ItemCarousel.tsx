'use client'

import Item, { ItemProps } from './ItemCard';
import useResponsiveJumpDistance from '@/app/hooks/useResponsiveJumpDistance';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';

export interface CarouselProps {
    item_type: string;
    genre: string;
    items: ItemProps[];
};

const Carousel: React.FC<CarouselProps> = ({ item_type, genre, items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [carouselFinished, setCarouselFinished] = useState(false);
    const [carouselStart, setCarouselStart] = useState(true);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);  // Track the hovered item index

    const jumpDistance: number = useResponsiveJumpDistance();

    const transitionStyles: { transition: string, transform: string } = {
        transition: 'transform .54s cubic-bezier(.5,0,.1,1) 0s',
        transform: `translate(-${currentIndex * 100}%)`
    }

    const zIndexState: number[] = useMemo(() => {
        return items.map((_, index) => (index === hoveredIndex ? 50 : 0)); // Only set z-index to 30 when hovered
    }, [hoveredIndex, items]); // Recompute when hoveredIndex changes

    const timersRef = useRef<(NodeJS.Timeout | null)[]>(new Array(items.length).fill(null)); // Store individual timers for each item

    useEffect(() => {
        // Cleanup all timers when the component unmounts or updates
        return () => {
            timersRef.current.forEach(timer => {
                if (timer) {
                    clearTimeout(timer);
                }
            });
        };
    }, []);

    // Memoize mouse enter event handler
    const handleMouseEnter = useCallback((index: number) => {
        // Clear any existing timer for this item
        if (timersRef.current[index]) {
            clearTimeout(timersRef.current[index]);
        }

        // Set a timeout to update the hovered index after 400ms
        timersRef.current[index] = setTimeout(() => {
            setHoveredIndex(index);  // Set the hovered index to apply the z-index change
        }, 400);
    }, []);

    // Memoize mouse leave event handler
    const handleMouseLeave = useCallback((index: number) => {
        if (timersRef.current[index]) {
            clearTimeout(timersRef.current[index]); // Clear existing timeout
        }

        // Set a timeout to reset the z-index after 300ms for the hovered item
        timersRef.current[index] = setTimeout(() => {
            if (hoveredIndex === index) {
                setHoveredIndex(null);  // Reset hovered index after 300ms
            }
        }, 300);
    }, [hoveredIndex]);

    // Update the useResponsiveWidth function so that it returns all information needed
    // to determine whether position of items needs to be readjusted after window resizing.
    const handleClick = (direction: string) => {
        switch(direction) {
            case 'left': 
                setCarouselFinished(false);
                if (currentIndex - jumpDistance <= 0) {
                    setCurrentIndex(0);
                    setCarouselStart(true);
                } else {
                    setCurrentIndex(currentIndex - jumpDistance);
                }                
                break;
            case 'right':
                setCarouselStart(false);
                if (currentIndex + jumpDistance >= (items.length - jumpDistance)) {
                    setCurrentIndex(items.length - jumpDistance);
                    setCarouselFinished(true);
                } else {
                    setCurrentIndex(currentIndex + jumpDistance);
                }  
                break;
            default:
                console.log("Neither left nor right was called");
        }
    }
    
    return (
            <div className="my-[3vw]">
                <h1 className='px-[4%] tracking-tighter font-[500] font-["Verdana"]'>{genre} {item_type}</h1>
                <div className="box-border p-0">
                    <div className="z-2 m-0 px-[4%] relative">
                        {/* CONDITIONAL LEFT NAVIGATION COLUMN */}
                        {!carouselStart && (
                            <span className="sliderHandle handleLeft" tabIndex={0} role="button" aria-label="See more titles" onClick={() => handleClick('left')}>
                                PREV
                            </span>
                        )}
                        
                        <div className="overflow-x-visible pb-px">
                            <div className="whitespace-nowrap relative">
                                {items.map((item, index) => (
                                    <div 
                                        className={`carousel-item box-border inline-block px-[0.2vw] relative align-top whitespace-normal ${index === 0 ? 'pl-0' : ''}`}
                                        key={index}
                                        onMouseEnter={() => handleMouseEnter(index)}  // Set hovered item index on hover
                                        onMouseLeave={() => handleMouseLeave(index)}  // Reset hovered item index on leave
                                        style={{
                                            ...transitionStyles,
                                            zIndex: zIndexState[index] // Dynamically apply z-index
                                        }}
                                    >
                                        <Item 
                                            key={`${item['tvdb_id']}${index}`} 
                                            imdb_id={item['imdb_id']}
                                            tvdb_id={item["tvdb_id"]} 
                                            item_type={item["item_type"]} 
                                            title={item["title"]} 
                                            year={item["year"]} 
                                            genres={item["genres"]} 
                                            runtime={item["runtime"]} 
                                            actors={item["actors"]} 
                                            pg_rating={item["pg_rating"]}
                                            image_type={item['image_type']}
                                            season_count={item["season_count"]} 
                                            originTransform={index === currentIndex ? 'left' : index === (currentIndex + (jumpDistance-1)) ? 'right' : null}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* CONDITIONAL RIGHT NAVIGATION COLUMN */}
                        {!carouselFinished && (
                            <span className="sliderHandle handleRight" tabIndex={0} role="button" aria-label="See more titles" onClick={() => handleClick('right')}>
                                NEXT
                            </span>
                        )}
                        
                    </div>
                </div>

            </div>      
    );
};


export default Carousel;