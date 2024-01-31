import React from "react";
import { FaItalic, FaUnderline, FaStrikethrough } from "react-icons/fa";

const FontStyleInput = ({ font, handleFontChange }) => {
  const fontStyles = ["italic", "underlined", "strikethrough"];

  return (
    <div className="flex items-center space-x-4 gap-4 w-full">
      <div className="text-base font-bold">Style:</div>
      <div className="flex mt-1 p-1">
        {fontStyles.map((style) => (
          <button
            key={style}
            onClick={() => handleFontChange("fontStyle", style)}
            className={`flex items-center justify-center p-2 mx-1  ${
              font.fontStyle === style ? "bg-gray-300" : "bg-white"
            }`}
          >
            {style === "italic" && <FaItalic />}
            {style === "underlined" && <FaUnderline />}
            {style === "strikethrough" && <FaStrikethrough />}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FontStyleInput;
