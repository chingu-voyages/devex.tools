import React from "react";
import {
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
} from "react-icons/fa";

const TextAlignInput = ({ font, handleFontChange }) => {
  const textAligns = ["left", "center", "right", "justify"];

  return (
    <div className="flex flex-col px-5">
      <div className="text-neutral-400 text-base">Align</div>
      <div className="flex mt-1 p-1">
        {textAligns.map((align) => (
          <button
            key={align}
            onClick={() => handleFontChange("textAlign", align)}
            className={`flex items-center justify-center p-2 mx-1  ${
              font.textAlign === align ? "bg-gray-300" : "bg-white"
            }`}
          >
            {align === "left" && <FaAlignLeft />}
            {align === "center" && <FaAlignCenter />}
            {align === "right" && <FaAlignRight />}
            {align === "justify" && <FaAlignJustify />}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TextAlignInput;
