import React, { useState } from "react";

const FontSizeInput = ({ font, handleFontSizeChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(font.fontSize);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    handleFontSizeChange(parseFloat(e.target.value));
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    handleFontSizeChange(parseFloat(inputValue));
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="text-base font-bold flex items-center">
        <span onClick={() => setIsEditing(true)} style={{ cursor: "text" }}>
          {isEditing ? (
            <input
              type="number"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className="flex items-center ml-2 w-10"
              autoFocus
            />
          ) : (
            <span>{font.fontSize}em</span>
          )}
        </span>

        <input
          type="range"
          value={font.fontSize}
          min={0}
          max={10}
          step={0.01}
          onChange={(e) => {
            setInputValue(e.target.value);
            handleFontSizeChange(parseFloat(e.target.value));
          }}
          className="flex-1"
        />
      </div>
    </div>
  );
};

export default FontSizeInput;
