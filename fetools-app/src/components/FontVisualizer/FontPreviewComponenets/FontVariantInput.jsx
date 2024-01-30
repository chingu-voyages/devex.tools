import React from "react";

const FontVariantInput = ({ font, handleFontChange }) => {
  const textTransformations = ["capitalize", "uppercase", "lowercase"];
  const buttonTexts = ["Aa", "AA", "aa"];

  return (
    <div className="flex-grow flex flex-col px-5">
      <div className="text-neutral-400 text-base">Transform</div>
      <div className="flex gap-2 mt-1">
        {textTransformations.map((variant, index) => (
          <button
            key={variant}
            onClick={() => handleFontChange("textTransform", variant)}
            className={`px-3 py-1  flex items-center ${
              font.textTransform === variant ? "bg-gray-300" : "bg-transparent"
            }`}
          >
            <span className="ml-1">{buttonTexts[index]}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FontVariantInput;
