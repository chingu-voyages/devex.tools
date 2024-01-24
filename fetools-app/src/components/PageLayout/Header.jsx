import { useState} from 'react';
import { Link } from 'react-router-dom';
import { appName } from "../../data"

import closeIcon from '../../assets/x-solid.svg'
import hamburgerIcon from '../../assets/hamburger.svg'

import Nav from './Nav';
import MobileMenu from './MobileMenu'

export default function Header(){

    const [click, setClick] = useState(false);

    return(
        <header>
            <div className='
            bg-[var(--ui-contrast-color)] flex p-4 justify-between
            sm:max-lg:flex-col sm:max-lg:justify-center
            md:max-lg:p-8
            lg:items-center lg:px-4
            2xl:px-16
            '>
                <Link to="/"
                onClick={()=>handleState(true)}
                className="
                flex-2 block font-bold text-3xl leading-none min-w-fit
                cursor-pointer
                sm:max-lg:self-center sm:max-lg:mb-4
                lg:mr-2 xl:mr-16 2xl:mr-80
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
        </header>
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


