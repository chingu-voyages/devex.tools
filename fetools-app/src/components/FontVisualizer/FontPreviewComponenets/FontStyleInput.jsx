import React from "react";
import { FaItalic, FaUnderline, FaStrikethrough } from "react-icons/fa";

const FontStyleInput = ({ font, handleFontChange }) => {
  const fontStyles = [
    { value: "italic", label: <FaItalic /> },
    { value: "underlined", label: <FaUnderline /> },
    { value: "strikethrough", label: <FaStrikethrough /> },
  ];

  return (
    <div className="flex-grow flex flex-col px-5">
      <div className="text-neutral-400 text-base font-bold">Style:</div>
      <div className="flex mt-1 p-1">
        {fontStyles.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => handleFontChange("style", value)}
            className={`flex items-center justify-center p-2 mx-1  ${
              font.style === value ? "bg-gray-300" : "bg-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FontStyleInput;
