import React from "react";

const BackgroundColorInput = ({
  backgroundColor,
  handleBackgroundColorChange,
}) => {
  return (
    <div className="flex items-center space-x-4 gap-4 w-full">
      <div className="text-base font-bold">Backgraund</div>
      <div className="flex px-5 text-neutral-400 text-base">
        <div
          className="border px-2 color-picker-toggle relative w-8 h-8"
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
