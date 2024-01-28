import { useState } from "react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
  

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
            <div id="tab-switcher-sm" className="max-[420px]:hidden">
                <div className="flex flex-1 justify-between ">
                    <h2 className="font-bold text-3xl leading-none">Tab Switcher</h2>
                    <fieldset className="flex flex-wrap items-center gap-x-8">
                        {radioButtons(buttons)}
                    </fieldset>
                </div>

                <div className="flex-1 flex-col">
                    {children[displayedContent]}
                </div>
            </div>

            <div id="tab-switcher-mobile" className="min-[420px]:hidden">
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger 
                        className="font-bold text-3xl leading-none">Tab Switcher</AccordionTrigger>
                        <AccordionContent>
                            <fieldset className="flex flex-wrap items-center gap-x-8">
                                {radioButtons(buttons)}
                            </fieldset>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <div className="flex-1 flex-col mt-3">
                    {children[displayedContent]}
                </div>
            </div>

        </div>
    )

    function handleOptionChange(evt){
        setSelectedButton(evt.target.value)
    }
}