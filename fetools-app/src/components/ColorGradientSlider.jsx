import { useState } from "react"
import tinycolor from "tinycolor2";

const colors = [
    getRandomColor(), getRandomColor()
]

export default function ColorGradientSlider(){

    const colorStyles = getCSSRules(':root')

    const [,setActiveKnob] = useState(false)
    const [knobsNumber, setKnobsNumber] = useState(2)

    updateCSSValues('--color1', colors[0])
    updateCSSValues('--color2', colors[1])

    return(
    <div id="slider-container" className="flex flex-col flex-1 p-8 rounded-md ">
        <div
        className="wrap gradient flex flex-col relative w-full h-5 justify-center">
                <label
                className="flex-1 w-full h-max absolute">
                        <input data-color={colors[0]} id="thumb" type="range" min='0' max='100' step='1' defaultValue='0'
                        onChange={handleOnChange}
                        onFocus={handleOnFocus}
                        className="slider absolute"
                        style={{background: 'red'}}></input>
                </label>
                <label
                className="flex-1 w-full h-max absolute">
                    <input data-color={colors[1]} id="thumb" type="range" min='0' max='100' step='1' defaultValue='100'
                    onChange={handleOnChange}
                    onFocus={handleOnFocus}
                    className="slider absolute"></input>
                </label>
        </div>
    </div>
    )

    function getCSSRules(CSSRule){
        const styleSheet = document.styleSheets[1].cssRules
        for(let CSSStyle of styleSheet){
            if(CSSStyle.selectorText===CSSRule){
                return CSSStyle
            }
        }
    }

    function handleOnChange(evt){

        const currentThumbElement = evt.target;
        const currentThumbColor = currentThumbElement.getAttribute('data-color')
 
        if(currentThumbColor === colorStyles.style.getPropertyValue('--color1')){
            updateCSSValues('--percentage1', `${currentThumbElement.value}%`)
        } else{
            updateCSSValues('--percentage2', `${currentThumbElement.value}%`)
        }   
    }

    function handleOnFocus(evt){
        const currentThumbElement = evt.target;
 
        const ThumbElements = document.querySelectorAll('#thumb');

        ThumbElements.forEach((thumb) =>{
            thumb.activeHandle = false;

            thumb.classList.remove('isActive', 'z-10')
        })
    
        currentThumbElement.classList.add('isActive', 'z-10')

        handleActiveKnobState(currentThumbElement.activeHandle)
    }

    function handleActiveKnobState(){
        setActiveKnob(true)
    }

    function updateCSSValues(cssVariable, newValue){
        colorStyles.style.setProperty(cssVariable, newValue)
    }

}

function getRandomColor(){
    const hNum = (Math.random()*361).toFixed(0)
    const sNum = (Math.random()*101).toFixed(0)
    const lNum = (Math.random()*101).toFixed(0)
    return (`hsla(${hNum}, ${sNum}%, ${lNum}%, 1)`)
}