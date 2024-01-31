import React from "react";

const FontSizeInput = ({ font, handleFontSizeChange }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className=" text-base font-bold flex items-center">
        <span>{font.fontSize}em</span>
        <input
          type="range"
          value={font.fontSize}
          min={-10}
          max={10}
          step={0.01}
          onChange={(e) => handleFontSizeChange(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default FontSizeInput;
