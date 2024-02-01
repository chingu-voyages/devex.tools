import { useState, useRef, useEffect } from "react";
import { getRandomColor, getHexString, isValidHexColor, getRgb } from "../components/ColorGradientComponents/ColorGradientUtils";

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
    position: gradientColors[0].value,
    rotation: 25,
    type: 'Linear'
  });

  useEffect(()=>{
    if(!currentKnob){
      setCurrentKnob(containerRef.current.querySelector('.isActive'))
    }
  },[currentKnob])


  useEffect(()=>{
    const gradientRuleSlider = generateGradientRule(gradientColors, 90, true)
    const gradientRule = generateGradientRule(gradientColors)
    
    updateCSSValues('.gradientSlider', 'background', gradientRuleSlider) 
    updateCSSValues('.gradient', 'background', gradientRule)  
  },[inputValue])

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
        className="flex flex-1 lg:mx-48 justify-between gap-x-2"
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
            setInputValue={setInputValue}
            handleColorInputChange={handleColorInputChange}
            handlePositionInputChange={handlePositionInputChange}
            handleRotationInputChange={handleRotationInputChange}
            updateValuesOnBlur={updateValuesOnBlur}
            gradientColors={gradientColors}
            generateGradientRule={generateGradientRule}
            updateCSSValues={updateCSSValues}
            onClickRandom={onClickRandom}
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

    const newValue =  parseInt(evt.target.value)

    currentKnob.value = newValue
    gradientColors[0].value = newValue
    inputValue.position = newValue

    setGradientColors([...gradientColors])
  }

  function handleRotationInputChange(evt){
    inputValue.rotation =  parseInt(evt.target.value)

    setInputValue({...inputValue, rotation: parseInt(evt.target.value)})
  }

  function handleSetInputValue(newValues) {
    setInputValue({
      color: getHexString(newValues.color),
      position: newValues.position,
      rotation: newValues.rotation,
      type: newValues.type
    })
  }

  function updateValuesOnBlur(){
    setInputValue({...inputValue})
  }

  function generateGradientRule(colorsArr, newRotation=null, isSlider) {
        
    const rotationValue = newRotation||(parseInt(inputValue.rotation)*3.6)
    const type = inputValue.type

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

    if(type==='Radial' && !isSlider){
      const gradientRule = `${type}-gradient(${colors.join(', ')})`;
      return gradientRule;
    }

    const gradientRule = `linear-gradient(${rotationValue}deg, ${colors.join(', ')})`;

    return gradientRule;
  }   

  function updateCSSValues(cssClassName, propertyName, newValue) {
    const element = containerRef.current.querySelector(cssClassName);

    element.style[propertyName] = newValue;
  }

  function onClickRandom(){
    const newColorArr = [getRandomColor(), getRandomColor()]
    setColorsArr(newColorArr)
    setGradientColors([
    {
      ...newColorArr[0],
      value: 0
    },
    {
      ...newColorArr[1],
      value: 100
    }])
  }
} 
