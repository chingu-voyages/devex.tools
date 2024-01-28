import {  useState } from "react"
import tinycolor from "tinycolor2"

export default function ColorGradientSlider({
    colorsArr, 
    updatedColors, 
    handleSetUpdatedColors,
    updateCSSValues,
    handleSetCurrentKnob,
    handleSetInputValue
}){

    const [activeIndex, setActiveIndex] = useState(0)

    return(
    <>
        <div id="slider-container" className="flex flex-col flex-1 p-8 rounded-md">
            <div 
            className="wrap gradient flex flex-col relative w-full h-5 justify-center">
                {createHandles(activeIndex)}
            </div>
        </div>
    </>
    )

    function createHandles(currentIndex,knobs=2){

        const knobsArr = []

        for(let i=0; i<knobs; i++){

            let defaultValue = null

            if(i===0){
                defaultValue = '0'
            } 

            if(i===1){
                defaultValue = '100'
            }

            knobsArr.push(
                <label key={`label-${i}`}
                className="flex-1 w-full h-max absolute">
                        <input id={`${i}`}
                        data-color={updatedColors[i]} 
                        type="range" min='0' max='100' step='1' 
                        defaultValue={defaultValue}
                        onChange={(evt)=>handleOnChange(evt)}
                        onFocus={handleOnFocus}
                        className={`thumb slider absolute ${currentIndex===i?'isActive z-10':''}`}></input>
                </label>
            )
        }

        return(
            <>{knobsArr}</>
        )

    }

    function handleSetActiveIndex(index){
        setActiveIndex(index)
    }

    function handleOnChange(evt){

        const currentThumbElement = evt.target;
        const currentThumbColor = currentThumbElement.dataset.color

        if(currentThumbColor!==updatedColors[evt.target.id]){
            currentThumbElement.dataset.color = updatedColors[evt.target.id]
        }

        const siblings = isThereSiblings()
        const currentThumbValue = parseInt(currentThumbElement.value)

        console.log(tinycolor(currentThumbColor).toHexString(), ' inside Change')

        checkKnobValues()

        function isThereSiblings(){
            const siblings = {next: null, previous: null}
            
            const nextSibling = currentThumbElement.parentElement.nextElementSibling
            const previousSibling = currentThumbElement.parentElement.previousElementSibling

            if(nextSibling){
                siblings.next = nextSibling.children[0]
            }

            if(previousSibling){
                siblings.previous = previousSibling.children[0]
            }

            return siblings
        }

        function checkKnobValues(){

            if(siblings.next){
                const nextValue = parseInt(siblings.next.value)
    
                const currentColorIndex = updatedColors.indexOf(currentThumbColor)
    
                const siblingColorIndex = colorsArr.findIndex(
                    color=>color===siblings.next.dataset.color
                )
                 
                if(currentThumbValue > nextValue){
    
                    if(updatedColors[currentColorIndex]!==colorsArr[siblingColorIndex]&&
                        updatedColors[siblingColorIndex]!==currentThumbColor){
                            console.log('test')
                        updateCSSValues('--percentage1', `${nextValue}%`)
                        updateCSSValues('--percentage2', `${currentThumbValue}%`)
                        handleSetUpdatedColors([colorsArr[siblingColorIndex], colorsArr[currentColorIndex]])
                    }
    
                    updateCSSValues('--percentage2', `${currentThumbValue}%`)
                       
                } else if(currentThumbValue < nextValue){
                    
                    if(updatedColors[currentColorIndex]!==colorsArr[currentColorIndex]){
                        handleSetUpdatedColors([colorsArr[0], colorsArr[1]])
                    }
    
                    updateCSSValues('--percentage1', `${currentThumbValue}%`)
                }

            } else{
                const previousValue = parseInt(siblings.previous.value)   
       
                const currentColorIndex = updatedColors.indexOf(currentThumbColor)
    
                const siblingColorIndex = colorsArr.findIndex(
                    color=>color===siblings.previous.dataset.color
                )

                if(currentThumbValue < previousValue){

                    if(updatedColors[currentColorIndex]!==colorsArr[siblingColorIndex]&&
                        updatedColors[siblingColorIndex]!==currentThumbColor){
                            console.log('test')
                        updateCSSValues('--percentage1', `${previousValue}%`)
                        updateCSSValues('--percentage2', `${currentThumbValue}%`)
                        handleSetUpdatedColors([colorsArr[currentColorIndex], colorsArr[siblingColorIndex]])
                    }

                    updateCSSValues('--percentage1', `${currentThumbValue}%`)

                }else if(currentThumbValue > previousValue){

                    if(updatedColors[currentColorIndex]!==colorsArr[currentColorIndex]){
                        handleSetUpdatedColors([colorsArr[0], colorsArr[1]])
                    }

                    updateCSSValues('--percentage2', `${currentThumbValue}%`)
                }
            }
        }
    }

    function handleOnFocus(evt){

        const currentThumbElement = evt.target;
        const thumbElements = document.querySelectorAll('.thumb')

        thumbElements.forEach(thumb=>{
            thumb.classList.remove('isActive', 'z-10')
        })

        currentThumbElement.classList.add('isActive', 'z-10')
    
        console.log(tinycolor(currentThumbElement.dataset.color).toHexString())

        handleSetInputValue('color', currentThumbElement.dataset.color)
        handleSetActiveIndex(currentThumbElement.id)
        handleSetCurrentKnob(currentThumbElement)
    }

}

