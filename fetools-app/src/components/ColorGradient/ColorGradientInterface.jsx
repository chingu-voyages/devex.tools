import { useRef, useState, useEffect } from "react";
import tinycolor from "tinycolor2";

import ColorInput from "../InputComponents/ColorInput";
import DropdownInput from "../InputComponents/DropdownInput";
import SliderInput from "../InputComponents/SliderInput";

export default function ColorGradientInterface({
  inputValue,
  setInputValue,
  handleColorInputChange,
  handlePositionInputChange,
  handleRotationInputChange,
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
        if (element.id === "color-input") {
          element.children[1].children[0].value = inputValue.color;
          element.children[1].children[1].children[0].value = inputValue.color;
        } else if (element.id === "position-input") {
          element.children[0].value = inputValue.position;
        } else if (element.id === "rotation-input") {
          element.children[0].value = inputValue.rotation;
        }
      });
    }
  }, [inputValue]);

  return (
    <>
      <div
        ref={parentRef}
        className="grid grid-cols-2 grid-rows-2 gap-x-4 gap-y-6 items-center"
      >
        <ColorInput
        ref={colorInputRef}
        defaultValue={displayData.color}
        onChange={handleColorInputChange}
        title="Color"
        placeholder={lastValidData.color || displayData.color}
        />

        <DropdownInput
        title="Type"
        dropdownOptions={["linear", "radial"]}
        ref={dropdownValueRef}
        callbackFun={() => {
          setInputValue({ ...inputValue, type: dropdownValueRef.current });
          updateTypeOnCSS();
        }}
        />

        <SliderInput
        sliderId='position'
        defaultValue={displayData.position}
        valueTypes={['%']}
        ranges={[{min: 0, max: 100}]}
        step={[1]}
        placeholder={displayData.position}
        title='Position'
        onChange={handlePositionInputChange}
        iconName='width'
        useEffectValue={inputValue.position}
        />

        <SliderInput
        sliderId='rotation'
        defaultValue={displayData.rotation}
        valueTypes={['°']}
        ranges={[{min: 0, max: 100}]}
        step={[1]}
        placeholder={displayData.rotation}
        title='Rotation'
        onChange={handleRotationInputChange}
        iconName='rotate_right'
        customPreviewValue={parseInt(displayData.rotation * 3.6)}
        />
      </div>
    </>
  );

  function updateTypeOnCSS() {
    const gradientRule = generateGradientRule(gradientColors);
    updateCSSValues(".gradient", "background", gradientRule);
  }
}
