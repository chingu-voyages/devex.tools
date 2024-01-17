import { useState} from 'react';
import {Link } from 'react-router-dom';
import { appName } from "../pages/data"
import MobileMenu from './MobileMenu'

export default function Header(){

    const [click, setClick] = useState(false);

    return(
        <div >
            <div className='
            bg-[var(--ui-contrast-color)] flex p-4 justify-between h-[71px]
            sm:max-lg:flex-col sm:max-xl:h-[154px]  sm:max-md:p-4 sm:justify-center
            md:max-lg:p-8
            lg:items-center lg:h-[71px] lg:px-16 lg:gap-2
            xl:px-16 xl:gap-16 min-[1440px]:gap-48
            '>
                <Link to="/" className="
                            flex-1 block min-w-fit max-w-fit font-bold text-[32px] leading-none
                            cursor-pointer
                            sm:max-lg:self-center sm:max-lg:mb-4
                            ">{appName}</Link>
                <nav className='       
                flex-1 
                max-sm:hidden
                md:content-between md:items-center xl:justify-self-end
                '>
                    <ul className="
                    sm:flex sm:justify-between sm:items-center sm:text-center sm:h-[35px]
                    lg:h-[51px]
                    ">
                        <li className='flex-1 max-w-min'>
                            <Link to="/unit-converter" className="
                            block font-bold flex-1 bg-[var(--bckgrnd-color)] w-max leading-none
                            cursor-pointer
                            sm:py-[8px] sm:px-[16px]
                            lg:py-[16px] lg:px-[32px]
                            ">Unit Converter</Link>
                        </li>
                        <li className='flex-1 max-w-min'>
                            <Link to="/color-picker" className="
                            block font-bold flex-1 bg-[var(--bckgrnd-color)] w-max leading-none
                            cursor-pointer
                            sm:py-[8px] sm:px-[16px]
                            lg:py-[16px] lg:px-[32px]
                            ">Color Picker</Link>
                        </li>
                        <li className='flex-1 max-w-min'>
                            <Link to="/character-finder" className="
                            block font-bold flex-1 bg-[var(--bckgrnd-color)] w-max leading-none
                            cursor-pointer
                            sm:py-[8px] sm:px-[16px]
                            lg:py-[16px] lg:px-[32px]
                            ">Character Finder</Link>
                        </li>
                        <li className='flex-1 max-w-min'>
                            <Link to="/font-visualizer" className="
                            block font-bold flex-1 bg-[var(--bckgrnd-color)] w-max leading-none
                            cursor-pointer
                            sm:py-[8px] sm:px-[16px]
                            lg:py-[16px] lg:px-[32px]
                            ">Font Visualizer</Link>
                        </li>
                        <li className='flex-1 max-w-min'>
                            <Link to="/team" className="
                            block font-bold flex-1 bg-[var(--bckgrnd-color)] w-max leading-none
                            cursor-pointer
                            sm:py-[8px] sm:px-[16px]
                            lg:py-[16px] lg:px-[32px]
                            ">Team</Link>
                        </li>
                    </ul>
                </nav>
                <div id='button-container'>
                    {updateMenuContextIcon(click)}
                </div>
            </div>
            <div className='relative'>
                <MobileMenu
                    isClicked={click}
                    hideMenu={hideMenu}
                    updateMenuContextIcon={updateMenuContextIcon}
                />
            </div>
        </div>
    )

    function updateMenuContextIcon(isClicked){
        if(!isClicked){
            return(
                <svg id='hamburguer-btn' onClick={()=>setClick(!click)} width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg"
                className="
                cursor-pointer flex-2 fill-current self-center
                sm:hidden
                ">
                    <path d="M4.875 27.625H34.125M4.875 19.5H34.125M4.875 11.375H34.125" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        } else{
            return(
                <svg id='x-btn' onClick={()=>setClick(!click)} xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 256 256"
                className="
                cursor-pointer flex-2 fill-current self-center
                sm:hidden
                ">
                    <path fill="currentColor" d="M205.66 194.34a8 8 0 0 1-11.32 11.32L128 139.31l-66.34 66.35a8 8 0 0 1-11.32-11.32L116.69 128L50.34 61.66a8 8 0 0 1 11.32-11.32L128 116.69l66.34-66.35a8 8 0 0 1 11.32 11.32L139.31 128Z"/>
                </svg>
    
            )
        }
    }

    

}


