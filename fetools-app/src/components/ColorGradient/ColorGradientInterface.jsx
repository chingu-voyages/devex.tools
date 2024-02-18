import { useRef, useState, useEffect } from 'react';
import { Button } from '@/src/components/ui/button';
import tinycolor from 'tinycolor2';

import { Dropdown } from './Dropdown';

export default function ColorGradientInterface({
  inputValue,
  setInputValue,
  handleColorInputChange,
  handlePositionInputChange,
  handleRotationInputChange,
  updateValuesOnBlur,
  gradientColors,
  generateGradientRule,
  updateCSSValues,
  onClickRandom,
}) {
  const [displayData, setDisplayData] = useState(inputValue);
  const [lastValidData, setLastValidData] = useState(inputValue);

  const parentRef = useRef();
  const colorInputRef = useRef();

  // Update displayData when showValues changes
  useEffect(() => {
    setDisplayData(inputValue);
    if (tinycolor(inputValue.color).isValid()) {
      setLastValidData({
        ...lastValidData,
        color: tinycolor(inputValue.color).toHexString(),
      });
    }
  }, [inputValue]);

  // Ensure input fields reflect the updated displayData
  useEffect(() => {
    if (parentRef.current) {
      [...parentRef.current.children].forEach(label => {
        if (label.id === 'color') {
          label.children[0].children[0].value = inputValue.color;
          label.children[0].children[1].value = inputValue.color;
        } else if (label.id === 'position') {
          label.children[0].value = inputValue.position;
        } else if (label.id === 'rotation') {
          label.children[0].value = inputValue.rotation;
        }
      });
    }
  }, [inputValue]);

  return (
    <>
      <div
        ref={parentRef}
        className="grid grid-cols-2 grid-rows-3 gap-x-7 gap-y-12 px-5"
      >
        <label id="color" className="flex flex-col font-bold ">
          Color
          <div className="relative z-0 max-w-[228px]">
            <input
              ref={colorInputRef}
              defaultValue={displayData.color}
              onChange={handleColorInputChange}
              placeholder={lastValidData.color || displayData.color}
              type="text"
              maxLength={7}
              className="rounded-sm border border-gray-400 p-4  uppercase flex-2 w-[228px] outline-none"
            />

            <input
              type="color"
              defaultValue={displayData.color}
              onChange={handleColorInputChange}
              className="absolute right-3 top-4"
            />
          </div>
        </label>
        <label
          id="position"
          className="relative flex flex-col w-full font-bold"
        >
          Position
          <input
            max={100}
            step={1}
            defaultValue={displayData.position}
            onChange={handlePositionInputChange}
            onBlur={updateValuesOnBlur}
            type="range"
            className="rounded-sm border border-gray-400 py-5 uppercase text-center"
          />
          <span className="block absolute bottom-0 left-24">
            {displayData.position}%
          </span>
        </label>
        <Dropdown
          inputValue={inputValue}
          setInputValue={setInputValue}
          updateTypeOnCSS={updateTypeOnCSS}
        />
        <label
          id="rotation"
          className="relative flex flex-col w-full font-bold"
        >
          Rotation
          <input
            max={100}
            step={1}
            defaultValue={displayData.rotation}
            type="range"
            onChange={handleRotationInputChange}
            className="rounded-sm border border-gray-400 py-4 uppercase text-center"
          />
          <span className="block absolute bottom-0 left-24">
            {parseInt(displayData.rotation * 3.6)}°
          </span>
        </label>
        <Button
          onClick={onClickRandom}
          variant="outline"
          className="col-span-2 rounded-sm border border-gray-400 h-14"
        >
          Random
        </Button>
      </div>
    </>
  );

  function updateTypeOnCSS() {
    const gradientRule = generateGradientRule(gradientColors);
    updateCSSValues('.gradient', 'background', gradientRule);
  }
}
