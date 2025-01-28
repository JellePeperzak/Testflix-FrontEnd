'use client'

import { useEffect, useState, useRef, useMemo, useCallback, Suspense } from "react"
import { usePageContext } from "@/app/context/PageTypeContext"
import { useSearchParams } from "next/navigation";
import { useCurrentAlgorithmContext } from "@/app/context/CurrentAlgorithmContext";
import { useAlgorithm1Context } from '@/app/context/Algorithm1Context';
import { useAlgorithm2Context } from '@/app/context/Algorithm2Context';
import { useAlgorithm3Context } from '@/app/context/Algorithm3Context';
import { useBackendDataContext } from "@/app/context/BackendDataContext"
import { useTaskContext } from "@/app/context/TaskContext"
import { useSearchQueryContext } from "@/app/context/SearchQueryContext";
import useResponsiveJumpDistance from "@/app/hooks/useResponsiveJumpDistance";

import Item, { ItemProps } from "@/app/components/items/ItemCard";

interface SearchGridProps {
  filteredData: ItemProps[];
  searchQuery: string | null;
}

export default function TestFlixSearchPage() {
  const {pageType, setPageType} = usePageContext();
  const {dataToStore, setDataToStore} = useBackendDataContext();
  const {taskOrder, currentTaskIndex} = useTaskContext();
  const {algorithmOrder, currentAlgorithmIndex} = useCurrentAlgorithmContext();
  
  
  useEffect(() => {
    if (pageType != "Search") {
      setPageType("Search")
    }    

    // Track whether user used this page for the task
    const taskKeyName = `task${taskOrder[currentTaskIndex]}_search`
    const algorithmKeyName = `algorithm${algorithmOrder[currentAlgorithmIndex]}_search`
    
    let keyDataObject = {}
    
    if (!Object.keys(dataToStore).includes(taskKeyName)) {
      keyDataObject = {
        ...keyDataObject,
        [taskKeyName]: true
      }
    }

    if (!Object.keys(dataToStore).includes(algorithmKeyName)) {
      keyDataObject = {
        ...keyDataObject,
        [algorithmKeyName]: true
      }
    }
    
    if (Object.keys(keyDataObject).length > 0) {
      setDataToStore({
        ...dataToStore,
        ...keyDataObject
      })
    }
  }, [currentTaskIndex, currentAlgorithmIndex, pageType, algorithmOrder, dataToStore, setDataToStore, setPageType, taskOrder])

  return (
    <Suspense>
        <SearchPageContent />
    </Suspense>
  )
}


function SearchPageContent() {
  const [itemData, setItemData] = useState<ItemProps[] | null>(null);
  const [filteredData, setFilteredData] = useState<ItemProps[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true)
  const { currentAlgorithmIndex, algorithmOrder, algorithmInitialized } = useCurrentAlgorithmContext();
  
  const { itemObjectList1 } = useAlgorithm1Context()
  const { itemObjectList2 } = useAlgorithm2Context()
  const { itemObjectList3 } = useAlgorithm3Context()

  const {searchQuery} = useSearchQueryContext();

  useEffect(() => {
    if (!algorithmInitialized) {
      return
    };

    switch(algorithmOrder[currentAlgorithmIndex]) {
      case 1:
        setItemData(itemObjectList1)
        setLoading(false)
        break;
      case 2:
        setItemData(itemObjectList2)
        setLoading(false)
        break;
      case 3:
        setItemData(itemObjectList3)
        setLoading(false)
        break;
      default:
        setItemData(null);
        setLoading(false)
        break;
    }
  }, [currentAlgorithmIndex, algorithmInitialized, algorithmOrder, itemObjectList1, itemObjectList2, itemObjectList3])

  useEffect(() => {
    if (itemData && searchQuery) {
      const filtered = itemData.filter((item) => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered.slice(0, 30))
    } else {
      if (itemData) {
        setFilteredData(itemData.slice(0, 30))
      }
    }
  }, [searchQuery, itemData])

  return (
    <div>
      {loading ? (
        <p>The page is being loaded..</p>
      ) : (
        <>
          {!itemData ? (
              <>
                  <p>Error loading data - no data available</p>
              </>
          ) : (
              <>
                  {filteredData && <SearchGrid filteredData={filteredData} searchQuery={searchQuery}/>}
              </>
          )}
        </>
      )}
    </div>
  )
}

function SearchGrid({ filteredData, searchQuery }: SearchGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);  // Track the hovered item index
  const jumpDistance: number = useResponsiveJumpDistance();

  const zIndexState: number[] = useMemo(() => {
    return filteredData.map((_, index) => (index === hoveredIndex ? 50 : 0)); // Only set z-index to 30 when hovered
  }, [hoveredIndex, filteredData]); // Recompute when hoveredIndex changes

  const timersRef = useRef<(NodeJS.Timeout | null)[]>(new Array(filteredData.length).fill(null)); // Store individual timers for each item

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
  
  return (
    <>
      <div className="my-[3vw]">
          <div className="box-border p-0">
              <div className="mt-[1em] mx-0 mb-0 pt-[4%] min-h-[65px] pb-[0%]">
                      {/*START GRID ELEMENT*/}
                      <h1 className='text-5xl px-[4%] tracking-tighter font-[500] font-["Verdana"]'>{`Search Results${searchQuery && ` For "${searchQuery}"`}`}</h1>
                      <div className="grid gap-y-[4vw] gap-x-0 mt-[10px] mx-[4%] mb-[10px] leading-[1.6] grid-search-media-dependend">
                          {filteredData.map((item, index) => (
                              <div className={`box-border inline-block px-[0.2vw] relative align-top whitespace-normal ${index === 0 ? 'pl-0' : ''}`}
                                key={index}
                                onMouseEnter={() => handleMouseEnter(index)}  // Set hovered item index on hover
                                onMouseLeave={() => handleMouseLeave(index)}  // Reset hovered item index on leave
                                style={{
                                  zIndex: zIndexState[index] // Dynamically apply z-index
                                }}
                              >
                                  <Item 
                                    key={`${item['tvdb_id']}${index}`} 
                                    imdb_id={item['imdb_id']}
                                    tvdb_id={item["tvdb_id"]} 
                                    item_type={item["item_type"]} 
                                    title={item["title"]} year={item["year"]} 
                                    genres={item["genres"]} runtime={item["runtime"]} 
                                    actors={item["actors"]} pg_rating={item["pg_rating"]} 
                                    season_count={item["season_count"]} 
                                    originTransform={(index === 0 || index % jumpDistance === 0) ? 'left' : (index === jumpDistance-1 || index % jumpDistance === jumpDistance-1) ? 'right' : null}
                                  />
                              </div>
                          ))}
                      </div>
                      {/*END GRID ELEMENT*/}
              </div>
          </div>
      </div>    
    </>
  )
}