import { useState, useRef } from "react";
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
    position: gradientColors[0].value
  });

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
            gradientColors={gradientColors}
            setGradientColors={setGradientColors}
          />

          <ColorGradientInterface
            inputValue={inputValue}
            handleColorInputChange={handleColorInputChange}
            handlePositionInputChange={handlePositionInputChange}
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
    const regex = new RegExp('(^[\d]{0,3}%$)', 'gm')

    regex.test(evt.value)

    console.log(regex.test(evt.value))
  }

  function handleSetInputValue(newValues) {
    setInputValue({
      color: getHexString(newValues.color),
      position: `${newValues.position}%`,
    })
  }

  function updateCSSValues(cssClassName, propertyName, newValue) {
    const children = containerRef.current.querySelectorAll(cssClassName);

    children.forEach((element) => {
      element.style[propertyName] = newValue;
    });
  }
} 
