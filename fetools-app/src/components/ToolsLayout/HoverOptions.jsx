export default function HoverOptions({
    className,
    heading,
    headingClassName,
    buttonsContainerClassName,
    buttons,
    buttonsClassName
}){

    return(
    <>
    <span
    id="hover-options"
    className={`${className||''}`}>
        {heading
        ?
        <div>
        <p className={`${headingClassName||''}`}>{heading}</p>
        </div>
        :null
        }
        <div 
        className={`grid grid-cols-2 grid-rows-1 ${buttonsContainerClassName}`}>
        {createOptions()}
        </div>
    </span>
    </>
    )

    function createOptions(){
        const options = buttons.map((button,idx)=>(
            <span key={`span-button-${idx}`} className={`flex text-2xl justify-center ${buttonsClassName||''}`}>
                {button}
            </span>
        ))

        return(<>{options}</>)
    }
}