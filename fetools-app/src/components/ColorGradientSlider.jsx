import { useState } from "react"
import tinycolor from "tinycolor2";

export default function ColorGradientSlider(
    {
        colorsArr, 
        updatedColors, 
        getHexColor, 
        handleSetUpdatedColors
    }
    ){

    const colorStyles = getCSSRules(':root')

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

    function getCSSRules(CSSRule){
        const styleSheet = document.styleSheets[0].cssRules
        for(let CSSStyle of styleSheet){
            if(CSSStyle.selectorText===CSSRule){
                return CSSStyle
            }
        }
    }

    function handleOnChange(evt){

        const currentThumbElement = evt.target;
        const currentThumbColor = currentThumbElement.dataset.color
        const siblings = isThereSiblings()
        const currentThumbValue = parseInt(currentThumbElement.value)

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

        console.log(evt)

        const currentThumbElement = evt.target;
 
        const thumbElements = document.querySelectorAll('.thumb');



        handleActiveIndex(currentThumbElement.id)
    }

    function handleActiveIndex(id){
        setActiveIndex(id)
    }

    function updateCSSValues(cssVariable, newValue){
        colorStyles.style.setProperty(cssVariable, newValue)
    }

    function checkColorArraysMatch(){
        
        const colorChanges = {}

        colorsArr.forEach((color,idx)=>{
            if(color!==updatedColors[idx]){
                colorChanges[idx] = {original: color, changeTo: updatedColors[0] }
            } else{
                colorChanges[idx] = {sameColor: color}
            }
        
        })

        return colorChanges
    }

    function createHandles(currentIndex,knobs=2){

        const knobsArr = []

        for(let i=0; i<knobs; i++){
            knobsArr.push(
                <label key={`label-${i}`}
                className="flex-1 w-full h-max absolute">
                        <input id={`${i}`}
                        data-color={updatedColors[i]} 
                        type="range" min='0' max='100' step='1' 
                        defaultValue={currentIndex===i?'0':'100'}
                        onChange={handleOnChange}
                        onFocus={handleOnFocus}
                        className={`thumb slider absolute ${currentIndex===i?'isActive z-10':''}`}></input>
                </label>
            )
        }

        return(
            <>{knobsArr}</>
        )

    }

}

