import { useState } from "react"
import { Link } from "react-router-dom"

export default function MobileMenu({isClicked, updateMenuContextIcon}){
   
    const [isHidden, setIsHidden] = useState(isClicked)

    console.log(isHidden)
    //    lockPageScroll()
return(
    <>
        <div id='mobile-menu' className={`
        absolute block w-screen flex-1 bg-slate-400 top-0
        max-sm:${isClicked?'':'hidden'}
        sm:hidden
        `}>

            <nav>
                <ul className="
                flex flex-col h-full text-center
                ">
                    <li  className='
                    w-full 
                    border-solid border-2 border-black'>
                        <Link to="/unit-converter" 
                        onClick={()=>{
                            hideMenu()
                            }
                            
                        } 
                        className="                            
                        block font-bold bg-[var(--bckgrnd-color)] leading-none
                        p-5 cursor-pointer
                        ">Unit Converter</Link>
                    </li>
                    <li className='
                    w-full 
                    border-collapse border-solid border-2 border-black'>
                        <Link to="/color-picker" 
                        onClick={()=>hideMenu()}
                        className="
                        block font-bold bg-[var(--bckgrnd-color)] leading-none
                        p-5 cursor-pointer
                        ">Color Picker</Link>
                    </li>
                    <li className='
                    w-full 
                    border-solid border-2 border-black'>
                        <Link to="/character-finder" 
                        onClick={()=>hideMenu()}
                        className="
                        block font-bold bg-[var(--bckgrnd-color)] leading-none
                        p-5 cursor-pointer
                        ">Character Finder</Link>
                    </li>
                    <li className='
                    w-full 
                    border-solid border-2 border-black'>
                        <Link to="/font-visualizer" 
                        onClick={()=>hideMenu()}
                        className="
                        block font-bold bg-[var(--bckgrnd-color)] leading-none
                        p-5 cursor-pointer
                        ">Font Visualizer</Link>
                    </li>
                    <li className='
                    w-full 
                    border-solid border-2 border-black'>
                        <Link to="/team" 
                        onClick={()=>hideMenu()}
                        className="
                        block font-bold bg-[var(--bckgrnd-color)] leading-none
                        p-5 cursor-pointer
                        ">Team</Link>
                    </li>
                </ul>
            </nav>
        </div>
    </>
    )

    function hideMenu(){
        const menuElement = document.querySelector('#mobile-menu')

        setIsHidden('hidden')
    }

}

