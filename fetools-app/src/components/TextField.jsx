import { useRef } from "react";
import CopyButton from "./CopyButton";

function TextField({
  title,
  value,
  unit,
  onValueChange,
  inputType = "number",
  onBlur,
  toastState,
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
    <>
      <style>
        {`
          input[type='number']::-webkit-inner-spin-button,
          input[type='number']::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          input[type='number'] {
            -moz-appearance: textfield;
          }
        `}
      </style>
      <div className="relative mb-3">
        <label className="block mb-2 text-sm font-bold text-black">
          {title}
        </label>
        <div className="relative flex border rounded">
          <input
            ref={inputRef}
            type={inputType}
            className={`py-2 pl-3 leading-tight text-gray-400 border border-black rounded w-28 focus:outline-none focus:shadow-outline ${
              unit ? "pr-12" : "pr-3"
            }`}
            value={value}
            onChange={onValueChange}
            onFocus={handleInputClick}
            onBlur={onBlur}
          />
          {unit && (
            <span className="absolute inset-y-0 right-0 flex items-center px-2 mr-2 font-semibold text-gray-700 pointer-events-none">
              {unit}
            </span>
          )}
          <span className="absolute top-0 right-0 -mt-2 text-lg transform translate-x-1/2 -translate-y-full">
            <CopyButton onCopy={getValueWithUnit} toastState={toastState} />
          </span>
        </div>
      </div>
    </>
  );
}

export default TextField;
