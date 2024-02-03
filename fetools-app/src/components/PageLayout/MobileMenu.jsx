import { Link } from "react-router-dom"

export default function MobileMenu({isClicked, handleState}){
   
return(
    <div id='mobile-menu' className={`
    absolute block w-screen flex-1 top-0
    max-sm:${isClicked?'':'hidden'}
    sm:hidden
    `}>

        <nav>
            <ul className="
            flex flex-col h-full text-center
            ">
                <li  className='
                w-full 
                border-solid border-4 border-b-2 border-black'>
                    <Link to="/unit-converter" 
                    onClick={()=>handleState(isClicked)} 
                    className="                            
                    block font-bold bg-[var(--bckgrnd-color)] leading-none
                    p-5 cursor-pointer
                    ">Unit Converter</Link>
                </li>
                <li className='
                w-full 
                border-collapse border-4 border-t-2 border-b-2 border-black'>
                    <Link to="/color-picker" 
                    onClick={()=>handleState(isClicked)} 
                    className="
                    block font-bold bg-[var(--bckgrnd-color)] leading-none
                    p-5 cursor-pointer
                    ">Color Picker</Link>
                </li>
                <li className='
                w-full 
                border-solid border-4 border-t-2 border-b-2 border-black'>
                    <Link to="/character-finder" 
                    onClick={()=>handleState(isClicked)} 
                    className="
                    block font-bold bg-[var(--bckgrnd-color)] leading-none
                    p-5 cursor-pointer
                    ">Character Finder</Link>
                </li>
                <li className='
                w-full 
                border-solid border-4 border-t-2 border-b-2 border-black'>
                    <Link to="/font-visualizer" 
                    onClick={()=>handleState(isClicked)} 
                    className="
                    block font-bold bg-[var(--bckgrnd-color)] leading-none
                    p-5 cursor-pointer
                    ">Font Visualizer</Link>
                </li>
                <li className='
                w-full 
                border-solid border-4 border-t-2 border-black'>
                    <Link to="/color-gradient" 
                    onClick={()=>handleState(isClicked)} 
                    className="
                    block font-bold bg-[var(--bckgrnd-color)] leading-none
                    p-5 cursor-pointer
                    ">Color Gradient</Link>
                </li>
                <li className='
                w-full 
                border-solid border-4 border-t-2 border-black'>
                    <Link to="/team" 
                    onClick={()=>handleState(isClicked)} 
                    className="
                    block font-bold bg-[var(--bckgrnd-color)] leading-none
                    p-5 cursor-pointer
                    ">Team</Link>
                </li>
            </ul>
        </nav>
    </div>
    )
}