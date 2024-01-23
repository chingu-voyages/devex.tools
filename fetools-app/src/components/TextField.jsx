import React from "react";
import CopyButton from "./CopyButton"; // adjust the import path based on your project structure

function TextField({ title, value, unit, onValueChange }) {
  // Function to concatenate value and unit, used for the copy function
  const getValueWithUnit = () => {
    return unit ? `${value} ${unit}` : value.toString();
  };

  return (
    <div className="mb-3 relative">
      <label className="block mb-2 text-sm font-bold text-gray-400">
        {title}
      </label>
      <div className="flex border rounded relative">
        <input
          type="number"
          className="border rounded border-black w-28 py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
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
