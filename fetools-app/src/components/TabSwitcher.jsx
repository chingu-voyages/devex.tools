import { useState } from "react"

export default function TabSwitcher({buttons, children}){

    const [ selectedButton, setSelectedButton] = useState(buttons[0])
    const [ displayedContent, setDisplayedContent] = useState(0)

    const radioButtons = array => array.map((btn, idx)=>(
            <label key={`radioBtn-${idx}`} id={btn} name="tab-switcher-buttons" 
            className="font-bold text-sm leading-none">
                <input type="radio" value={btn} 
                checked={selectedButton===btn} 
                onChange={ evt => (
                    handleOptionChange(evt),
                    setDisplayedContent(idx))
                } className="inline-block align-middle mr-1"/>
                <p className="inline-block leading-none">{btn}</p>
            </label>
        )
    )

    return(
        <div id="tab-switcher" 
        className="flex flex-col flex-1 p-6 mb-2
        sm:p-12 lg:px-48 lg:py-20">
            <div className="flex flex-1 justify-between">
                <h2 className="font-bold text-3xl leading-none">Tab Switcher</h2>
                <fieldset className="flex flex-wrap items-center gap-x-8">
                    {radioButtons(buttons)}
                </fieldset>
            </div>

            <div className="flex-1 flex-col">
                {children[displayedContent]}
            </div>
        </div>
    )

    function handleOptionChange(evt){
        setSelectedButton(evt.target.value)
    }
}