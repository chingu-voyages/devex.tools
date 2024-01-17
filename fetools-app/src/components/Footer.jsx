import { Link } from "react-router-dom"
import { appName } from "../pages/data"

export default function Footer(){
    return(
        <footer className='
        bg-[var(--ui-contrast-color)] flex flex-col p-4 justify-between  h-[157px]
        max-sm:p-4 max-sm:gap-8
        sm:p-8 sm:h-[138px] sm:gap-4
        '>
            <div className="
            flex justify-between
            sm:h-[39px]
            ">
                <h1 className="
                flex-1 block min-w-fit max-w-fit font-bold text-[32px] leading-none
                ">{appName}</h1>

                <svg onClick={goTopPage} width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg" 
                className="
                cursor-pointer self-center">
                    <rect y="0.5" width="32" height="32" rx="4" fill="#C8C8C8"/>
                    <path d="M21.8333 19L17.3788 14.7829C17.3788 14.7829 16.6363 13.9976 16 14C15.3636 14.0024 14.6212 14.7829 14.6212 14.7829L10.1666 19" stroke="#333333" strokeWidth="3.5" strokeLinecap="round"/>
                </svg>

            </div>
            <div className="
            flex justify-center gap-4
            max-sm:flex-col max-sm:items-center max-sm:h-[54px]
            sm:h-[19px]
            ">
                <p className="
                font-bold block max-w-fit min-w-fit 
                max-sm:tracking-tight
                ">Site Copyright &copy; 2024 {appName}.</p>
                <ul className="flex flex-row gap-4">
                    <li>
                        <Link to="/" className="
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