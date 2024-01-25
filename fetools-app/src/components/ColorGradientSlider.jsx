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

    const [,setActiveKnob] = useState(false)

    const checkColors = checkColorArraysMatch()

    return(
    <>
        <div id="slider-container" className="flex flex-col flex-1 p-8 rounded-md ">
            <div
            className="wrap gradient flex flex-col relative w-full h-5 justify-center">
                    <label
                    className="flex-1 w-full h-max absolute ">
                            <input 
                            data-color={updatedColors[0]} 
                            id="thumb" type="range" min='0' max='100' step='1' defaultValue='0'
                            onChange={handleOnChange}
                            onFocus={handleOnFocus}
                            className="slider absolute isActive"
                            style={{background: 'red'}}></input>
                    </label>
                    <label
                    className="flex-1 w-full h-max absolute">
                        <input 
                        data-color={updatedColors[1]}  
                        id="thumb" type="range" min='0' max='100' step='1' defaultValue='100'
                        onChange={handleOnChange}
                        onFocus={handleOnFocus}
                        className="slider absolute"></input>
                    </label>
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
        const currentThumbElement = evt.target;
 
        const ThumbElements = document.querySelectorAll('#thumb');

        ThumbElements.forEach((thumb) =>{
            thumb.activeHandle = false;

            thumb.parentElement.classList.remove('z-10')
            thumb.classList.remove('isActive')
        })
    
        currentThumbElement.parentElement.classList.add('z-10')
        currentThumbElement.classList.add('isActive')

        getHexColor()

        handleActiveKnobState(currentThumbElement.activeHandle)
    }

    function handleActiveKnobState(){
        setActiveKnob(true)
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


}

