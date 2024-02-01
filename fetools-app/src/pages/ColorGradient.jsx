import { useState, useRef, useEffect } from "react";
import { getRandomColor, getHexString, getHslString, isValidHexColor, getRgb } from "../components/ColorGradientComponents/ColorGradientUtils";

import ColorGradientSlider from "../components/ColorGradientComponents/ColorGradientSlider";
import ToolHeaderSection from "../components/ToolsLayout/ToolHeaderSection";
import ToolHeading from "../components/ToolsLayout/ToolHeading";
import ColorGradientInterface from "../components/ColorGradientComponents/ColorGradientInterface";

export default function ColorGradient() {
  const containerRef = useRef();

  const [colorsArr, setColorsArr] = useState([
    getRandomColor(),
    getRandomColor(),
  ]);

  const [gradientColors, setGradientColors] = useState([
    {
      ...colorsArr[0],
      value: 0,
    },
    {
      ...colorsArr[1],
      value: 100,
    },
  ]);

  const [currentKnob, setCurrentKnob] = useState(false);

  const [inputValue, setInputValue] = useState({
    color: getHexString(gradientColors[0].colorStr),
    position: `${gradientColors[0].value}%`
  });

  useEffect(()=>{
    if(!currentKnob){
      setCurrentKnob(containerRef.current.querySelector('.thumb'))
    }

  },[currentKnob])

  return (
    <>
      <ToolHeaderSection>
        <ToolHeading
          title="Color Gradient"
          tagline="Use this tool to create gradients for any project!"
        ></ToolHeading>
      </ToolHeaderSection>

      <div
        ref={containerRef}
        className="flex flex-1 lg:mx-48 justify-between gap-x-2 h-[425px]"
      >
        <div className="flex-1 flex-col w-full rounded-lg border border-black">
          <ColorGradientSlider
            setColorsArr={setColorsArr}
            inputValue={inputValue}
            updateCSSValues={updateCSSValues}
            handleColorChange={handleColorChange}
            handleSetCurrentKnob={handleSetCurrentKnob}
            handleSetInputValue={handleSetInputValue}
            generateGradientRule={generateGradientRule}
            gradientColors={gradientColors}
            setGradientColors={setGradientColors}
          />

          <ColorGradientInterface
            inputValue={inputValue}
            handleColorInputChange={handleColorInputChange}
            handlePositionInputChange={handlePositionInputChange}
            updateValuesOnBlur={updateValuesOnBlur}
          />
        </div>

        <div
          id="show-gradient"
          className="gradient flex-1 rounded-lg border border-black"
        ></div>
      </div>
    </>
  );



  function handleSetCurrentKnob(knob) {
    setCurrentKnob(knob);
  }

  function handleColorInputChange(evt) {
    const newColor = evt.target.value;

    setInputValue({ ...inputValue, color: newColor }); // Update input value

    console.log(newColor, inputValue)

    if (isValidHexColor(newColor)) {
        handleColorChange(newColor); // Pass the new color to the parent component
    }

  }

  function handleColorChange(newColor) {
    // Assuming updatedColors is an array with two color values
    const newColorsArr = [...colorsArr];
    const newGradientColors = [...gradientColors]

    if (!currentKnob) {
      newColorsArr[0] = getRgb(newColor);
      newGradientColors[0] = {...newColorsArr[0], value: 0}
      
      console.log(newColorsArr);

      setColorsArr(newColorsArr);
      setGradientColors(newGradientColors)
      return;
    }

    newColorsArr[currentKnob.id] = getRgb(newColor); // Update the color at the current knob index
    newGradientColors[currentKnob.id] = {...newColorsArr[currentKnob.id], value: currentKnob.value}; // Update the color at the current knob index
    setColorsArr(newColorsArr);
    setGradientColors(newGradientColors);
  }

  function handlePositionInputChange(evt){
    const regex1 = /(^[\d]{0,3}%$)/gm;
    const regex2 = /(^[\d]{0,3}$)/gm;
    const newValue =  evt.target.value

    if(newValue.match(regex1)||newValue.match(regex2)){

      const isMatch = newValue.match(regex1)||newValue.match(regex2);
      
      const value = parseInt(isMatch[0].replace('%',''))
      
      currentKnob.value = value
      gradientColors[0].value = value
      inputValue.position = `${value}%`

      setGradientColors([...gradientColors])
    }

    const gradientRule = generateGradientRule(gradientColors)
    updateCSSValues('.gradient', 'background', gradientRule);
  }

  function updateValuesOnBlur(){
    setInputValue({...inputValue})
  }

  function handleSetInputValue(newValues) {
    setInputValue({
      color: getHexString(newValues.color),
      position: `${newValues.position}%`,
    })
  }

  function generateGradientRule(colorsArr) {
        
    const sortedColors = [...colorsArr]
    sortedColors.sort(( {value: color1Value}, {value: color2Value} ) => color1Value - color2Value)

    const newColorObject = sortedColors.map(({r,g,b,colorStr})=>({r,g,b,colorStr}))

    const isColorsArrSimilarToSorted = colorsArr.every(({colorStr}, idx)=>(
        colorStr === newColorObject[idx].colorStr
    ))

    if(!isColorsArrSimilarToSorted){
        setColorsArr(sortedColors.map(({r,g,b,colorStr})=>({r,g,b,colorStr})))
    }

    const colors = sortedColors.map(({colorStr,value}) => (`${colorStr} ${value}%`));
    const gradientRule = `linear-gradient(90deg, ${colors.join(', ')})`;

    return gradientRule;
}

  function updateCSSValues(cssClassName, propertyName, newValue) {
    const children = containerRef.current.querySelectorAll(cssClassName);

    children.forEach((element) => {
      element.style[propertyName] = newValue;
    });
  }
} 
