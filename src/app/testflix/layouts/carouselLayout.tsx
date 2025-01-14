'use client'
import { useState, useEffect } from 'react';
import { useAlgorithm1Context } from '@/app/context/Algorithm1Context';
import { useAlgorithm2Context } from '@/app/context/Algorithm2Context';
import { useAlgorithm3Context } from '@/app/context/Algorithm3Context';
import { useCurrentAlgorithmContext } from '@/app/context/CurrentAlgorithmContext';

import Carousel, { CarouselProps } from '@/app/components/items/ItemCarousel';

interface CarouselLayoutProps {
    contentType: string;
}

interface CarouselObjects {
    home_carousels: CarouselProps[];       
    movie_carousels: CarouselProps[];      
    series_carousels: CarouselProps[];     
  }

export default function CarouselLayout({ contentType }: CarouselLayoutProps) {
    const [filteredData, setFilteredData] = useState<CarouselProps[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true)

    const { carouselObjects1 } = useAlgorithm1Context()
    const { carouselObjects2 } = useAlgorithm2Context()
    const { carouselObjects3 } = useAlgorithm3Context()
    const { currentAlgorithmIndex, algorithmOrder } = useCurrentAlgorithmContext();


    useEffect(() => {
        function generatePage(carouselObject:CarouselObjects) {
            switch(contentType) {
                case "Home":
                    setFilteredData(carouselObject['home_carousels'])
                    setLoading(false)
                    break;
                case "TV Shows":
                    setFilteredData(carouselObject['series_carousels'])
                    setLoading(false)
                    break;
                case "Movies":
                    setFilteredData(carouselObject['movie_carousels'])
                    setLoading(false)
                    break;
                default:
                    setFilteredData(null);
                    setLoading(false)
                    break;
            }
        }

        switch(algorithmOrder[currentAlgorithmIndex]) {
            case 1:
                generatePage(carouselObjects1)
                break;
            case 2:
                generatePage(carouselObjects2)
                break;
            case 3:
                generatePage(carouselObjects3)
                break;
            default:
                setFilteredData(null);
                setLoading(false)
                break;
          }
    }, [currentAlgorithmIndex])

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
