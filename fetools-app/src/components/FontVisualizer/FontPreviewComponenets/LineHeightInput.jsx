import React from "react";

const LineHeightInput = ({ font, handleLineHeightChange }) => {
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
          ></span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="mr-1"
          >
            <path
              d="M12 21L8 17L9.4 15.6L11 17.175V6.825L9.4 8.4L8 7L12 3L16 7L14.6 8.425L13 6.825V17.175L14.6 15.6L16 17L12 21Z"
              fill="black"
            />
          </svg>
          <div className="flex items-center ml-2">
            <span
              className="text-neutral-500"
              style={{
                color: "var(--Design-Document-Text, #333)",
                fontFamily: "Inter",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "normal",
              }}
            >
              {font.lineHeight}%
            </span>
          </div>
          <input
            type="range"
            value={String(parseFloat(font.lineHeight))}
            min={0}
            max={10}
            step={0.1}
            onChange={handleLineHeightChange}
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
};

export default LineHeightInput;
