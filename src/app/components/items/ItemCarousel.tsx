'use client'

import Item, { ItemProps } from './ItemCard';
import useResponsiveWidth from '@/app/hooks/useResponsiveWidth';
import { useState } from 'react';

export interface CarouselProps {
    item_type: string;
    genre: string;
    rank: number;
    items: ItemProps[];
};

const Carousel: React.FC<CarouselProps> = ({ item_type, genre, rank, items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [carouselFinished, setCarouselFinished] = useState(false);
    const [carouselStart, setCarouselStart] = useState(true);

    const width: number  = useResponsiveWidth();

    const transitionStyles: { transition: string, transform: string } = {
        transition: 'transform .54s cubic-bezier(.5,0,.1,1) 0s',
        transform: `translate(-${currentIndex * 100}%)`
    }

    // Update the useResponsiveWidth function so that it returns all information needed
    // to determine whether position of items needs to be readjusted after window resizing.
    const handleClick = (direction: string) => {
        let jumpDistance: number;

        if (width < 500) {
            jumpDistance = 2
        } else if (width < 800) {
            jumpDistance = 3
        } else if (width < 1100) {
            jumpDistance = 4
        } else if (width < 1400) {
            jumpDistance = 5
        } else {
            jumpDistance = 6
        }

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
                                    <div className={`carousel-item box-border inline-block px-[0.2vw] relative align-top whitespace-normal ${index === 0 ? 'pl-0' : ''} group hover:z-10 z-1`}
                                        key={index}
                                        style={transitionStyles}>
                                        <Item key={`${item['tvdb_id']}${index}`} tvdb_id={item["tvdb_id"]} item_type={item["item_type"]} title={item["title"]} year={item["year"]} genres={item["genres"]} runtime={item["runtime"]} actors={item["actors"]} pg_rating={item["pg_rating"]} banner_url={item["banner_url"]} season_count={item["season_count"]} />
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