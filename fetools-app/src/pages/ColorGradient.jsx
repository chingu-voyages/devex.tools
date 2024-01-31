import { useState, useRef } from "react";
import tinycolor from "tinycolor2";

import ColorGradientSlider from "../components/ColorGradientSlider";
import ToolHeaderSection from "../components/ToolsLayout/ToolHeaderSection";
import ToolHeading from "../components/ToolsLayout/ToolHeading";
import ColorGradientInterface from "../components/ColorGradientInterface";

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
    color: getHexString(gradientColors[0].color),
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
            colorsArr={colorsArr}
            setColorsArr={setColorsArr}
            handleSetColorsArr={handleSetColorsArr}
            updateCSSValues={updateCSSValues}
            handleSetCurrentKnob={handleSetCurrentKnob}
            handleSetInputValue={handleSetInputValue}
            gradientColors={gradientColors}
            setGradientColors={setGradientColors}
          />

          <ColorGradientInterface
            inputValue={inputValue}
            handleColorInputChange={handleColorInputChange}
          />
        </div>

        <div
          id="show-gradient"
          className="gradient flex-1 rounded-lg border border-black"
        ></div>
      </div>
    </>
  );

  function handleSetColorsArr(newColorsArr) {
    setColorsArr(newColorsArr);
  }

  function handleSetCurrentKnob(knob) {
    setCurrentKnob(knob);
  }

  function handleColorChange(newColor) {
    // Assuming updatedColors is an array with two color values
    const newColorsArr = [...colorsArr];

    if (!currentKnob) {
      newColorsArr[0] = getHslString(newColor);
      console.log(newColorsArr);
      setColorsArr(newColorsArr);
      setColorsArr(newColorsArr);
      return;
    }

    newColorsArr[currentKnob.id] = getHslString(newColor); // Update the color at the current knob index
    setColorsArr(newColorsArr); // Update the colors state
    setColorsArr(newColorsArr);
  }

  function handleColorInputChange(evt) {
    const newColor = evt.target.value;

    setInputValue({ ...inputValue, color: newColor }); // Update input value

    if (isValidHexColor(newColor)) {
      handleColorChange(newColor); // Pass the new color to the parent component
    }
  }

  function handleSetInputValue(key, value) {
    if (key === "color") {
      setInputValue({ ...inputValue, [key]: getHexString(value) });
      return;
    }
    setInputValue({ ...inputValue, [key]: value });
  }

  function updateCSSValues(cssClassName, propertyName, newValue) {
    const children = containerRef.current.querySelectorAll(cssClassName);

    children.forEach((element) => {
      element.style[propertyName] = newValue;
    });
  }
}

function getRandomColor() {
  const rNum = (Math.random() * 255).toFixed(0);
  const gNum = (Math.random() * 255).toFixed(0);
  const bNum = (Math.random() * 255).toFixed(0);
  const colorObj = {
    r: parseInt(rNum),
    g: parseInt(gNum),
    b: parseInt(bNum),
    colorStr: `rgba(${rNum}, ${gNum}, ${bNum}, 1)`,
  };

  return colorObj;
}

function getHexString(color) {
  const currentHexColor = tinycolor(color).toHexString();
  return currentHexColor;
}

function getHslString(color) {
  const currentHexColor = tinycolor(color).toHslString();
  return currentHexColor;
}

function isValidHexColor(color) {
  return tinycolor(color).isValid();
}
