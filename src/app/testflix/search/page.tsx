'use client'

import { useEffect, useState } from "react"
import { usePageContext } from "@/app/context/PageTypeContext"
import { useSearchParams } from "next/navigation";
import { useCurrentAlgorithmContext } from "@/app/context/CurrentAlgorithmContext";
import { useAlgorithm1Context } from '@/app/context/Algorithm1Context';
import { useAlgorithm2Context } from '@/app/context/Algorithm2Context';
import { useAlgorithm3Context } from '@/app/context/Algorithm3Context';
import { useBackendDataContext } from "@/app/context/BackendDataContext"
import { useTaskContext } from "@/app/context/TaskContext"

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
  }, [currentTaskIndex, currentAlgorithmIndex, pageType])

  return (
        <SearchPageContent />
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

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q');

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
  }, [currentAlgorithmIndex, algorithmInitialized])

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
  
  return (
    <>
      <div className="my-[3vw]">
        
          <div className="box-border p-0">
              <div className="mt-[1em] mx-0 mb-0 pt-[4%] min-h-[65px] pb-[0%]">
                      {/*START GRID ELEMENT*/}
                      <h1 className='text-5xl px-[4%] tracking-tighter font-[500] font-["Verdana"]'>{`Search Results${searchQuery && ` For "${searchQuery}"`}`}</h1>
                      <div className="grid overflow-hidden gap-y-[4vw] gap-x-0 mt-[10px] mx-[4%] mb-[10px] leading-[1.6] grid-search-media-dependend">
                          {filteredData.map((item, index) => (
                              <div className={`box-border inline-block px-[0.2vw] relative align-top whitespace-normal ${index === 0 ? 'pl-0' : ''} hover:z-10 z-1`}
                                  key={index}>
                                  <Item key={`${item['tvdb_id']}${index}`} tvdb_id={item["tvdb_id"]} item_type={item["item_type"]} title={item["title"]} year={item["year"]} genres={item["genres"]} runtime={item["runtime"]} actors={item["actors"]} pg_rating={item["pg_rating"]} banner_url={item["banner_url"]} season_count={item["season_count"]} />
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