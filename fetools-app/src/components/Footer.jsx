import { Link } from "react-router-dom"
import { appName } from "../data"
import arrowUp from "../assets/arrow-up.svg"

export default function Footer(){
    return(
        <footer className='
        bg-[var(--ui-contrast-color)] flex flex-col p-4 justify-between
        max-sm:p-4 max-sm:gap-8
        sm:p-8 sm:gap-4
        '>
            <div className="
            flex justify-between
            ">
                <h1 className="
                flex-1 block min-w-fit max-w-fit font-bold text-3xl leading-none
                ">{appName}</h1>

                <img onClick={goTopPage}
                src={arrowUp} alt="arrow up footer icon"
                className="
                cursor-pointer self-center
                "/>

            </div>
            <div className="
            flex justify-center gap-4
            max-sm:flex-col max-sm:items-center
            ">
                <p className="
                font-bold block max-w-fit min-w-fit 
                max-sm:tracking-tight
                ">Site Copyright &copy; 2024 {appName}.</p>
                <ul className="flex flex-row gap-4">
                    <li>
                        <Link to="/team" className="
                        font-bold block underline underline-offset-2 
                        ">About Us</Link>
                    </li>
                    <li>
                        <Link to="/" className="
                        font-bold block underline underline-offset-2 
                        ">Privacy Policy</Link>
                    </li>

                </ul>

            </div>
        </footer>

    )
}

function goTopPage(){
    window.scrollTo({
        top: 0,
        behavior: "smooth"})
}