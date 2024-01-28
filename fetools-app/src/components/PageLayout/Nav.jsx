import { Link } from "react-router-dom"

export default function Nav(){
    return(
        <nav className='       
        flex-1 
        max-sm:hidden
        md:content-between md:items-center xl:justify-self-end
        '>
            <ul className="
            sm:flex sm:justify-between sm:items-center sm:text-center
            ">
                <li className='flex-1 max-w-min'>
                    <Link to="/unit-converter" className="
                    block font-bold flex-1 bg-[var(--bckgrnd-color)] w-max leading-none
                    cursor-pointer
                    sm:py-2 sm:px-4 lg:px-4 xl:py-4 xl:px-8
                    ">Unit Converter</Link>
                </li>
                <li className='flex-1 max-w-min'>
                    <Link to="/color-picker" className="
                    block font-bold flex-1 bg-[var(--bckgrnd-color)] w-max leading-none
                    cursor-pointer
                    sm:py-2 sm:px-4 lg:px-4 xl:py-4 xl:px-8
                    ">Color Picker</Link>
                </li>
                <li className='flex-1 max-w-min'>
                    <Link to="/character-finder" className="
                    block font-bold flex-1 bg-[var(--bckgrnd-color)] w-max leading-none
                    cursor-pointer
                    sm:py-2 sm:px-4 lg:px-4 xl:py-4 xl:px-8
                    ">Character Finder</Link>
                </li>
                <li className='flex-1 max-w-min'>
                    <Link to="/font-visualizer" className="
                    block font-bold flex-1 bg-[var(--bckgrnd-color)] w-max leading-none
                    cursor-pointer
                    sm:py-2 sm:px-4 lg:px-4 xl:py-4 xl:px-8
                    ">Font Visualizer</Link>
                </li>
                <li className='flex-1 max-w-min'>
                    <Link to="/color-gradient" className="
                    block font-bold flex-1 bg-[var(--bckgrnd-color)] w-max leading-none
                    cursor-pointer
                    sm:py-2 sm:px-4 lg:px-4 xl:py-4 xl:px-8
                    ">Color Gradient</Link>
                </li>
                <li className='flex-1 max-w-min'>
                    <Link to="/team" className="
                    block font-bold flex-1 bg-[var(--bckgrnd-color)] w-max leading-none
                    cursor-pointer
                    sm:py-2 sm:px-4 lg:px-4 xl:py-4 xl:px-8
                    ">Team</Link>
                </li>
            </ul>
        </nav>
    )
}