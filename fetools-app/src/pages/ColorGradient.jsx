import { useState, useRef } from "react";
import tinycolor from "tinycolor2";

import ColorGradientSlider from "../components/ColorGradientSlider";
import ToolHeaderSection from "../components/ToolsLayout/ToolHeaderSection";
import ToolHeading from "../components/ToolsLayout/ToolHeading";
import ColorGradientInterface from "../components/ColorGradientInterface";

const colorsArr = [
    getRandomColor(), getRandomColor()
]

export default function ColorGradient(){

    const [updatedColors, setUpdatedColors] = useState(colorsArr)
    const showValues = {
        color: null
    }

    updateCSSValues('--color1-thumb', colorsArr[0])
    updateCSSValues('--color2-thumb', colorsArr[1])
    updateCSSValues('--color1-gradient', updatedColors[0])
    updateCSSValues('--color2-gradient', updatedColors[1])

    return(
    <>
        <ToolHeaderSection>
            <ToolHeading title="Color Gradient" tagline="Use this tool to create gradients for any project!"></ToolHeading>
        </ToolHeaderSection>

        <div className="flex flex-1 lg:mx-48 justify-between gap-x-2 h-[425px]">
            <div 
            className="flex-1 flex-col w-full rounded-lg border border-black">
                <ColorGradientSlider 
                colorsArr={colorsArr} 
                updatedColors={updatedColors}
                getHexColor={updateShowValues}
                handleSetUpdatedColors={handleSetUpdatedColors}/>
                
                <ColorGradientInterface 
                showValues={showValues}
                />
            </div>

            <div id="show-gradient" 
            className="gradient flex-1 rounded-lg border border-black">         
            </div>

        </div>
    </>    
    )

    function updateShowValues(){
        const currentKnob = document.querySelector('.isActive')

        showValues.color = tinycolor(currentKnob.dataset.color).toHexString()

        console.log(showValues)
    }

    function handleSetUpdatedColors(newColorsArr){
        setUpdatedColors(newColorsArr)
    }

}

function getRandomColor(){
    const hNum = (Math.random()*361).toFixed(0)
    const sNum = (Math.random()*101).toFixed(0)
    const lNum = (Math.random()*101).toFixed(0)
    return (`hsla(${hNum}, ${sNum}%, ${lNum}%, 1)`)
}

function getCSSRules(CSSRule){
    const styleSheet = document.styleSheets[0].cssRules
    for(let CSSStyle of styleSheet){
        if(CSSStyle.selectorText===CSSRule){
            return CSSStyle
        }
    }
}

function updateCSSValues(cssVariable, newValue){
    const colorStyles = getCSSRules(':root')

    colorStyles.style.setProperty(cssVariable, newValue)
}