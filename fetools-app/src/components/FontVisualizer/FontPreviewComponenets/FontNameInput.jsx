import React from "react";
import Select from "react-select";

const FontNameInput = ({ font, handleFontChange }) => {
  const fontFamilies = [
    { value: "Arial", label: "Arial" },
    { value: "Sans-serif", label: "Sans-serif" },
    { value: "Courier New", label: "Courier New" },
    { value: "Times New Roman", label: "Times New Roman" },
    { value: "Verdana", label: "Verdana" },
    { value: "Georgia", label: "Georgia" },
    { value: "Impact", label: "Impact" },
    { value: "Brush Script MT", label: "Brush Script MT" },
    { value: "Tahoma", label: "Tahoma" },
    { value: "Trebuchet MS", label: "Trebuchet MS" },
  ];

  return (
    <div className="flex-grow flex flex-col px-5 text-neutral-400 text-base">
      Font
      <Select
        value={{ value: font.name, label: font.name }}
        onChange={(selectedOption) =>
          handleFontChange("name", selectedOption.value)
        }
        options={fontFamilies}
        className="mt-1 p-1 flex-grow"
      />
    </div>
  );
};

export default FontNameInput;
