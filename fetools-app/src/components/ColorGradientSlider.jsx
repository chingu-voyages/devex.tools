import { useState } from "react"
import tinycolor from "tinycolor2";

const colors = [
    getRandomColor(), getRandomColor()
]

export default function ColorGradientSlider(){

    const colorStyles = getCSSRules(':root')

    const [,setActiveKnob] = useState(false)

    const [updateColors, setUpdateColors] = useState(colors)

    updateCSSValues('--color1-thumb', colors[0])
    updateCSSValues('--color2-thumb', colors[1])
    updateCSSValues('--color1-gradient', updateColors[0])
    updateCSSValues('--color2-gradient', updateColors[1])

    console.log(updateColors)

    const checkColors = checkColorArraysMatch()

    return(
    <div id="slider-container" className="flex flex-col flex-1 p-8 rounded-md ">
        <div
        className="wrap gradient flex flex-col relative w-full h-5 justify-center">
                <label
                className="flex-1 w-full h-max absolute">
                        <input 
                        data-color={
                            Object.hasOwn(checkColors[0], 'sameColor')?updateColors[0]:updateColors[0]
                        } 
                        id="thumb" type="range" min='0' max='100' step='1' defaultValue='0'
                        onChange={handleOnChange}
                        onFocus={handleOnFocus}
                        className="slider absolute"
                        style={{background: 'red'}}></input>
                </label>
                <label
                className="flex-1 w-full h-max absolute">
                    <input 
                    data-color={
                            Object.hasOwn(checkColors[1], 'sameColor')?updateColors[1]:updateColors[1]
                    }  
                    id="thumb" type="range" min='0' max='100' step='1' defaultValue='100'
                    onChange={handleOnChange}
                    onFocus={handleOnFocus}
                    className="slider absolute"></input>
                </label>
        </div>
    </div>
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
    
                const currentColorIndex = updateColors.indexOf(currentThumbColor)
    
                const siblingColorIndex = colors.findIndex(
                    color=>color===siblings.next.dataset.color
                )
    
                console.log(currentThumbValue, nextValue)
                
                if(currentThumbValue > nextValue){
    
                    if(updateColors[currentColorIndex]!==colors[siblingColorIndex]&&
                        updateColors[siblingColorIndex]!==currentThumbColor){
                            console.log('test')
                        updateCSSValues('--percentage1', `${nextValue}%`)
                        updateCSSValues('--percentage2', `${currentThumbValue}%`)
                        setUpdateColors([colors[siblingColorIndex], colors[currentColorIndex]])
                    }
    
                    updateCSSValues('--percentage2', `${currentThumbValue}%`)
                    
    
                } else if(currentThumbValue < nextValue){
                    
                    if(updateColors[currentColorIndex]!==colors[currentColorIndex]){
                        setUpdateColors([colors[0], colors[1]])
                    }
    
                    updateCSSValues('--percentage1', `${currentThumbValue}%`)
                }

            } else{
                const previousValue = parseInt(siblings.previous.value)   
       
                const currentColorIndex = updateColors.indexOf(currentThumbColor)
    
                const siblingColorIndex = colors.findIndex(
                    color=>color===siblings.previous.dataset.color
                )
    
                console.log(currentThumbValue, previousValue)
                
                if(currentThumbValue < previousValue){

                    if(updateColors[currentColorIndex]!==colors[siblingColorIndex]&&
                        updateColors[siblingColorIndex]!==currentThumbColor){
                            console.log('test')
                        updateCSSValues('--percentage1', `${previousValue}%`)
                        updateCSSValues('--percentage2', `${currentThumbValue}%`)
                        setUpdateColors([colors[currentColorIndex], colors[siblingColorIndex]])
                    }

                    updateCSSValues('--percentage1', `${currentThumbValue}%`)

                }else if(currentThumbValue > previousValue){

                    if(updateColors[currentColorIndex]!==colors[currentColorIndex]){
                        setUpdateColors([colors[0], colors[1]])
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

        colors.forEach((color,idx)=>{
            if(color!==updateColors[idx]){
                colorChanges[idx] = {original: color, changeTo: updateColors[0] }
            } else{
                colorChanges[idx] = {sameColor: color}
            }
        
        })

        return colorChanges
    }

}

function getRandomColor(){
    const hNum = (Math.random()*361).toFixed(0)
    const sNum = (Math.random()*101).toFixed(0)
    const lNum = (Math.random()*101).toFixed(0)
    return (`hsla(${hNum}, ${sNum}%, ${lNum}%, 1)`)
}