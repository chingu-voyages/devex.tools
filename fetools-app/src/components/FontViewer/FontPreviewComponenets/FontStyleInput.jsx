import React from "react";
import { FaItalic, FaUnderline, FaStrikethrough } from "react-icons/fa";

const FontStyleInput = ({ font, handleFontChange }) => {
  const fontStyles = [
    { label: "italic", value: "italic" },
    { label: "underlined", value: "underlined" },
    { label: "line-through", value: "line-through" },
  ];

  return (
    <div className="flex items-center space-x-4 gap-4 w-full">
      <div className="text-base font-bold">Style:</div>
      <div className="flex mt-1 p-1">
        {fontStyles.map((style) => (
          <button
            key={style.label}
            onClick={() => {
              handleFontChange("style", style.value);
            }}
            className={`flex items-center justify-center p-2 mx-1 ${
              font.style === style.value && "bg-gray-300"
            }`}
          >
            {style.label === "italic" && <FaItalic />}
            {style.label === "underlined" && <FaUnderline />}
            {style.label === "line-through" && <FaStrikethrough />}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FontStyleInput;
