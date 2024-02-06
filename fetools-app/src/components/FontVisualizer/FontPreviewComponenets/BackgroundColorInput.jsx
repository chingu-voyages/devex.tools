import React from "react";

const BackgroundColorInput = ({
  backgroundColor,
  handleBackgroundColorChange,
}) => {
  return (
    <div className="flex  flex-col px-5 text-neutral-400 ">
      <label htmlFor="backgroundColor" className="mb-2">
        Background:
      </label>

      <div className="border">
        <div
          className="border color-picker-toggle relative w-8 h-8"
          style={{
            cursor: "pointer",
            backgroundColor: backgroundColor,
          }}
        >
          <input
            type="color"
            value={backgroundColor}
            onChange={handleBackgroundColorChange}
            className="color-picker-input absolute opacity-0 cursor-pointer w-full h-full"
            id="backgroundColor"
            name="backgroundColor"
            style={{
              borderRadius: "5px",
            }}
          />
          <span
            className="ml-2 absolute top-0 left-full px-1"
            style={{ marginTop: "5px" }}
          >
            {backgroundColor}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BackgroundColorInput;
