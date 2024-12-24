import Link from 'next/link'
import Image from 'next/image'

interface HeaderMenuProps {
    currentPage: string
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({ currentPage }) => {
    const urlList = [
        {url: "/", name: "Home"},
        {url: "/", name: "TV Shows"},
        {url: "/", name: "Movies"},
    ]

    return (
        <div className="sticky top-0 h-auto min-h-[70px] z-[99]">
            <div className="relative left-0 right-0 top-0 z-1 bg-[#141414]">
                <div className="relative flex height-header-menu bg-gradient-header-menu items-center p-header-menu text-size-header-menu z-2">
                    <Link 
                        href={"/"}
                        className="inline-block align-middle mr-header-logo "
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
                        {urlList.map((urlObject) => (
                            <li className="styles-tab-header-menu">
                                {urlObject.name === currentPage ? (
                                    <a key={urlObject.name} className="flex relative items-center text-[#fff] h-full transition-text-header-menu cursor-default font-bold">
                                        {urlObject.name}
                                    </a>
                                ) : (
                                    <Link
                                        key={urlObject.name}    
                                        href={"/"}
                                        className="flex relative items-center text-[#e5e5e5] h-full transition-text-header-menu hover:text-[#b3b3b3] focus:text-[#b3b3b3]"
                                    >
                                        {urlObject.name}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default HeaderMenu;