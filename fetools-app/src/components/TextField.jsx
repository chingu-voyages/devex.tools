import React, { useRef } from "react";
import CopyButton from "./CopyButton";

function TextField({
  title,
  value,
  unit,
  onValueChange,
  inputType = "number",
  onBlur,
}) {
  // A ref to the input element
  const inputRef = useRef(null);

  // Function to concatenate value and unit, used for the copy function
  const getValueWithUnit = () => {
    return unit ? `${value}${unit}` : value.toString();
  };

  // Function to handle click inside the input field
  const handleInputClick = () => {
    if (inputRef.current) {
      inputRef.current.select(); // Select all text in the input field
    }
  };

  return (
    <div className="mb-3 relative">
      <label className="block mb-2 text-sm font-bold text-gray-400">
        {title}
      </label>
      <div className="flex border rounded relative">
        <input
          ref={inputRef}
          type={inputType}
          className="border rounded border-black w-28 py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
          value={value}
          onChange={onValueChange}
          onFocus={handleInputClick}
          onBlur={onBlur}
        />
        {unit && (
          <span className="px-2 text-gray-700 absolute inset-y-0 right-0 flex items-center mr-2 pointer-events-none font-semibold">
            {unit}
          </span>
        )}
        <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-full text-lg -mt-2">
          <CopyButton onCopy={getValueWithUnit} />
        </span>
      </div>
    </div>
  );
}

export default TextField;
