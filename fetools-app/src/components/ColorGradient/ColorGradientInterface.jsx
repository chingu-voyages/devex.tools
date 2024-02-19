import { useRef, useState, useEffect } from "react";
import tinycolor from "tinycolor2";

import ColorInput from "../InputComponents/ColorInput";
import DropdownInput from "../InputComponents/DropdownInput";

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
}) {
  const [displayData, setDisplayData] = useState(inputValue);
  const [lastValidData, setLastValidData] = useState(inputValue);

  const dropdownValueRef = useRef();

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
      [...parentRef.current.children].forEach((element) => {
        console.log(element)
        if (element.id === "color-input") {
          element.children[1].children[0].value = inputValue.color;
          element.children[1].children[1].children[0].value = inputValue.color;
        } else if (element.id === "position") {
          element.children[0].value = inputValue.position;
        } else if (element.id === "rotation") {
          element.children[0].value = inputValue.rotation;
        }
      });
    }
  }, [inputValue]);

  return (
    <>
      <div
        ref={parentRef}
        className="grid grid-cols-2 grid-rows-2 gap-x-4 gap-y-6"
      >
        <ColorInput
          ref={colorInputRef}
          defaultValue={displayData.color}
          onChange={handleColorInputChange}
          title="Color"
          placeholder={lastValidData.color || displayData.color}
        />

        <DropdownInput
          title={"Type"}
          dropdownOptions={["linear", "radial"]}
          ref={dropdownValueRef}
          callbackFun={() => {
            setInputValue({ ...inputValue, type: dropdownValueRef.current });
            updateTypeOnCSS();
          }}
        />

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
      </div>
    </>
  );

  function updateTypeOnCSS() {
    const gradientRule = generateGradientRule(gradientColors);
    updateCSSValues(".gradient", "background", gradientRule);
  }

}
