import React from "react";

const FontSizeInput = ({ font, handleFontSizeChange }) => {
  return (
    <div className="flex gap-4 w-full">
      <div className="flex-grow flex flex-col px-5 py-3.5">
        <div className="text-neutral-400 text-base font-bold flex items-center">
          <span
            className="font-black"
            style={{
              color: "var(--Design-Document-Text, #333)",
              fontFamily: "Inter",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "normal",
              marginRight: "5px",
            }}
          >
            {font.fontSize}em
          </span>
          <input
            type="range"
            value={font.fontSize}
            min={-10}
            max={10}
            step={0.01}
            onChange={(e) => handleFontSizeChange(parseFloat(e.target.value))}
            className="w-full"
            style={{
              color: "var(--Design-Document-Text, #333)",
              fontFamily: "Inter",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "normal",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FontSizeInput;
