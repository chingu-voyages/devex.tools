export default function MobileMenu({isHidden, toggleShow}){

    lockPageScroll()

    return(
        <div id='mobile-menu' className={`
        absolute block w-screen h-screen overscroll-none flex-1 bg-slate-400 top-0
        max-sm:${isHidden?"hidden":""} 
        sm:hidden
        `}>
            <nav>
                <svg onClick={()=>toggleShow(isHidden)} xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 256 256"
                className="
                cursor-pointer flex-2 fill-current self-center
                sm:hidden
                ">
                    <path fill="currentColor" d="M205.66 194.34a8 8 0 0 1-11.32 11.32L128 139.31l-66.34 66.35a8 8 0 0 1-11.32-11.32L116.69 128L50.34 61.66a8 8 0 0 1 11.32-11.32L128 116.69l66.34-66.35a8 8 0 0 1 11.32 11.32L139.31 128Z"/>
                </svg>
                <ul>
                    <li>
                        <p>test</p>
                    </li>
                    <li>
                        <p>test</p>
                    </li>
                </ul>
            </nav>
        </div>
    )

    function lockPageScroll(){
        if(isHidden){
            document.body.classList.remove('lockScroll')
        } else{
            document.body.classList.add('lockScroll')
        }
    }
}

