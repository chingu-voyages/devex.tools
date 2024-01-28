import { useState} from "react";
import tinycolor from "tinycolor2";

import ColorGradientSlider from "../components/ColorGradientSlider";
import ToolHeaderSection from "../components/ToolsLayout/ToolHeaderSection";
import ToolHeading from "../components/ToolsLayout/ToolHeading";
import ColorGradientInterface from "../components/ColorGradientInterface";

export default function ColorGradient(){

    const [colorsArr, setColorsArr] = useState([
        getRandomColor(), getRandomColor()
    ])

    const [updatedColors, setUpdatedColors] = useState(colorsArr)
    const [currentKnob, setCurrentKnob] = useState(false)

    const [inputValue, setInputValue] = useState({color: getHexString(updatedColors[0])});

    console.log(getHexString(updatedColors[0]) + ' Color Gradient')

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
                handleSetUpdatedColors={handleSetUpdatedColors}
                updateCSSValues={updateCSSValues}
                handleSetCurrentKnob={handleSetCurrentKnob}
                handleSetInputValue={handleSetInputValue}
                />
                
                <ColorGradientInterface
                inputValue={inputValue}
                handleColorInputChange={handleColorInputChange}
                />
            </div>

            <div id="show-gradient" 
            className="gradient flex-1 rounded-lg border border-black">         
            </div>

        </div>
    </>    
    )

    function handleSetUpdatedColors(newColorsArr){
        setUpdatedColors(newColorsArr)
    }

    function handleSetCurrentKnob(knob){
        setCurrentKnob(knob)
    }

    function handleColorChange(newColor){
        // Assuming updatedColors is an array with two color values
        const newColorsArr = [...updatedColors];

        if(!currentKnob){
            newColorsArr[0] = getHslString(newColor);
            console.log(newColorsArr)
            setUpdatedColors(newColorsArr);
            setColorsArr(newColorsArr)
            return
        }
        
        newColorsArr[currentKnob.id] = getHslString(newColor); // Update the color at the current knob index
        setUpdatedColors(newColorsArr); // Update the colors state
        setColorsArr(newColorsArr);
    }

    function handleColorInputChange(evt){

        const newColor = evt.target.value;
        
        setInputValue({...inputValue, color: newColor}); // Update input value

        if (isValidHexColor(newColor)) {

            handleColorChange(newColor); // Pass the new color to the parent component
        }
    }

    function handleSetInputValue(key, value){
        if(key==='color'){
            setInputValue({...inputValue,[key]: getHexString(value)})
            return
        }
        setInputValue({...inputValue,[key]: value})
    }
}

function getRandomColor(){
    const hNum = (Math.random()*361).toFixed(0)
    const sNum = (Math.random()*101).toFixed(0)
    const lNum = (Math.random()*101).toFixed(0)
    return (`hsla(${hNum}, ${sNum}%, ${lNum}%, 1)`)
}

function updateCSSValues(cssVariable, newValue){
    const colorStyles = getCSSRules(':root')

    colorStyles.style.setProperty(cssVariable, newValue)
}

function getCSSRules(CSSRule){
    const styleSheet = document.styleSheets[0].cssRules
    for(let CSSStyle of styleSheet){
        if(CSSStyle.selectorText===CSSRule){
            return CSSStyle
        }
    }
}

function getHexString(color){
    const currentHexColor = tinycolor(color).toHexString()
    return currentHexColor
}

function getHslString(color){
    const currentHexColor = tinycolor(color).toHslString()
    return currentHexColor
}

function isValidHexColor(color){
    return tinycolor(color).isValid();
}