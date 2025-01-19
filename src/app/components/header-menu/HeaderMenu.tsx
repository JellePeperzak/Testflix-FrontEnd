'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePageContext} from '@/app/context/PageTypeContext'
import { useState, useEffect, useRef, ChangeEvent } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

const HeaderMenu: React.FC = () => {
    const { pageType, setPageType } = usePageContext();

    const urlList = [
        {url: "/testflix", name: "Home"},
        {url: "/testflix/tvshows", name: "TV Shows"},
        {url: "/testflix/movies", name: "Movies"},
    ]

    return (
        <div className="sticky top-0 h-auto min-h-[70px] z-[99]">
            <div className="relative left-0 right-0 top-0 z-1 bg-[#141414]">
                <div className="relative flex height-header-menu bg-gradient-header-menu items-center p-header-menu text-size-header-menu z-2">
                    <Link 
                        href={"/testflix"}
                        className="inline-block align-middle mr-header-logo "
                        onClick={() => setPageType("Home")}
                    >
                        <Image 
                            src={"/logo.png"}
                            width={2226}
                            height={678}
                            alt={`Testflix Logo`}
                            className={"image-size-header-logo "}
                        />
                    </Link>
                    <ul className="flex items-center m-0 p-0">
                        {urlList.map((urlObject, index) => (
                            <li key={`${urlObject.name}${index}`} className="styles-tab-header-menu">
                                {urlObject.name === pageType ? (
                                    <a className="flex relative items-center text-[#fff] h-full transition-text-header-menu cursor-default font-bold">
                                        {urlObject.name}
                                    </a>
                                ) : (
                                    <Link
                                        key={`${urlObject.name}${index}`}    
                                        href={urlObject.url}
                                        className="flex relative items-center text-[#e5e5e5] h-full transition-text-header-menu hover:text-[#b3b3b3] focus:text-[#b3b3b3]"
                                        onClick={() => setPageType(urlObject.name)}
                                    >
                                        {urlObject.name}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                    <div className="flex grow absolute top-0 right-[4%] h-full justify-end items-center">
                        <SearchBar />
                    </div>
                </div>
            </div>
        </div>
    )
}

/*
    FOR MORE SEARCH BAR RELATED CSS, CHECK OUT THE NETFLIX 
    HTML, SPECIFICALLY ON THE SEARCH PAGE SO THE SEARCHBAR STICKS
*/

/* 
    TO DO: 
    - CROSS BUTTON DOES NOT HAVE AN ONCLICK FUNCTION YET
        - On click function should empty the quary and the searchbar content
    - SEARCHBAR CONTENT IS NOT TRACKED IN STATE YET
*/
function SearchBar() {
    const [searchBarFocus, setSearchBarFocus] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [initialUrl, setInitialUrl] = useState("");
    const [searchPage, setSearchPage] = useState(false);

    const searchParams = useSearchParams();
    const urlVariable = searchParams.get('q');

    const searchBarRef = useRef<HTMLDivElement>(null);

    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const handleSearchButtonClickOutside = (event: MouseEvent) => {
            if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
                if (!searchPage) {
                    setSearchBarFocus(false);
                }  
            }
        };
    
        document.addEventListener('mousedown', handleSearchButtonClickOutside);
    
        return () => {
            document.removeEventListener('mousedown', handleSearchButtonClickOutside)
        }
    }, [searchPage]);

    useEffect(() => {
        if (!urlVariable && searchQuery) {
            setSearchPage(false);
            setSearchQuery("");
            setInitialUrl("");
            setSearchBarFocus(false);
        } else if (urlVariable && !searchQuery){
            setSearchBarFocus(true);
            setSearchPage(true);
            setSearchQuery(urlVariable);
        }
    }, [urlVariable])
    
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (searchQuery.length === 0 && e.target.value.length > 0) {
            setInitialUrl(pathname)
            router.push(`/testflix/search/?q=${e.target.value}`)
            setSearchPage(true)
        }
        if (searchQuery.length > 0 && e.target.value.length !== 0) {
            router.push(`/testflix/search/?q=${e.target.value}`)
        }
        if (searchQuery.length !== 0 && e.target.value.length === 0) {
            if (initialUrl.length === 0) {
                router.push('/testflix')
            } else {
                router.push(initialUrl)
            }
            setSearchPage(false)
        }
        setSearchQuery(e.target.value);
    };

    const handleSearchButtonClick = () => {
        setSearchBarFocus(true);
    };

    const handleDeleteButtonClick = () => {
        setSearchQuery("")
        setSearchPage(false)
        setSearchBarFocus(false);
        if (initialUrl.length === 0) {
            router.push('/testflix')
        } else {
            router.push(initialUrl)
        }
    }

    return (
        <div 
            className={`inline-block align-middle display-searchbox ${searchBarFocus && "ml-[100px]"}`}
            ref={searchBarRef}
        >
            <div className={`flex items-center ${searchBarFocus && "b-searchbar-input"}`}>
                {!searchBarFocus ? (
                    <button 
                        className="inline-block bg-transparent border-none cursor-pointer"
                        onClick={handleSearchButtonClick}
                    >
                        <i className={`fas fa-search text-[20px]`} />
                    </button>
                ) : (
                    <div className="flex items-center px-[6px] h-[24px]">
                        <i className={`fas fa-search text-[20px]`}/>
                    </div>
                )}                
                <input 
                    className={`${searchBarFocus ? "w-[212px] pt-[7px] pr-[14px] pb-[7px] pl-[7px] duration-300" : "w-[0px]"} inline-block box-border bg-transparent text-[14px] text-[#fff] border-0 outline-none`}
                    value={searchQuery}
                    onChange={handleInputChange}
                    placeholder="Search for a title"
                />
                {(searchBarFocus && searchQuery.length > 0) && (
                    <div className="flex items-center px-[6px] h-[24px]">
                        <i 
                            className={`fas fa-x text-[15px] mx-[6px] cursor-pointer`}
                            onClick={handleDeleteButtonClick}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}


export default HeaderMenu;