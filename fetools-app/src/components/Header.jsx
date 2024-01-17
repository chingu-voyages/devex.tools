import { useState} from 'react';
import { Link } from 'react-router-dom';
import { appName } from "../pages/data"

import MobileMenu from './MobileMenu'
import closeIcon from '../assets/x-solid.svg'
import hamburgerIcon from '../assets/hamburger.svg'

import Nav from './Nav';

export default function Header(){

    const [click, setClick] = useState(false);

    return(
        <div >
            <div className='
            bg-[var(--ui-contrast-color)] flex p-4 justify-between
            sm:max-lg:flex-col sm:max-md:p-4 sm:justify-center
            md:max-lg:p-8
            lg:items-center lg:px-16 lg:gap-2
            xl:px-16 xl:gap-16 min-[1440px]:gap-48
            '>
                <Link to="/"
                onClick={()=>handleState(true)}
                className="
                flex-1 block min-w-fit max-w-fit font-bold text-3xl leading-none
                cursor-pointer
                sm:max-lg:self-center sm:max-lg:mb-4
                ">{appName}</Link>
                <Nav/>
                <div id='button-container'>
                    {updateMenuContextIcon(click)}
                </div>
            </div>
            <div className='relative'>
                <MobileMenu
                    isClicked={click}
                    handleState={handleState}
                />
            </div>
        </div>
    )

    function updateMenuContextIcon(isClicked){
        if(!isClicked){
            return(
                <img onClick={()=>setClick(!click)}
                src={hamburgerIcon} alt='hamburger icon'
                className='cursor-pointer sm:hidden'/>
            )
        } else{
            return(
                <img onClick={()=>setClick(!click)}
                src={closeIcon} alt='hamburger icon'
                className='cursor-pointer sm:hidden'/>
            )
        }
    }

    function handleState(click){
        setClick(!click)
    }

}


