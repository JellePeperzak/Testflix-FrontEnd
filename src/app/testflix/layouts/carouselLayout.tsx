'use client'
import { useState, useEffect } from 'react';

import { useAlgorithm3Context } from '@/app/context/Algorithm3Context';
import Carousel, { CarouselProps } from '@/app/components/items/ItemCarousel';

interface CarouselLayoutProps {
    contentType: string;
}

export default function CarouselLayout({ contentType }: CarouselLayoutProps) {
    const [filteredData, setFilteredData] = useState<CarouselProps[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true)
    const { carouselObjects3 } = useAlgorithm3Context()

    useEffect(() => {
        switch(contentType) {
            case "Home":
                setFilteredData(carouselObjects3['home_carousels'])
                setLoading(false)
                break;
            case "TV Shows":
                setFilteredData(carouselObjects3['series_carousels'])
                setLoading(false)
                break;
            case "Movies":
                setFilteredData(carouselObjects3['movie_carousels'])
                setLoading(false)
                break;
            default:
                setFilteredData(null);
                setLoading(false)
                break;
        }
    }, [])

    return (
      <div>
        {loading ? (
            <p>The page is being loaded..</p>
        ) : (
            <>
                {!filteredData ? (
                    <>
                        <p>Error loading data - no data available</p>
                    </>
                ) : (
                    <>
                        {filteredData.map((carouselObject) => (
                            <Carousel
                                key={`${carouselObject.item_type}${carouselObject.genre}`}
                                item_type={carouselObject.item_type}
                                genre={carouselObject.genre}
                                rank={carouselObject.rank}
                                items={carouselObject.items}
                            />
                        ))}
                    </>
                )}
            </>
        )}
        <div className="h-[8rem]"></div>
      </div>
      
    );
  }
