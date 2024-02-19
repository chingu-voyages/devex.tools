import React, { useState, useRef } from "react";
import { MdOutlineSettings } from "react-icons/md";

// EditableInput component
function EditableInput({
  value,
  unit = "",
  onChange,
  label,
  type = "text", // Default to text if no type is specified
}) {
  // State to manage whether the input is in edit mode or not
  const [editMode, setEditMode] = useState(false);

  // Reference to the input element to focus on it when entering edit mode
  const inputRef = useRef(null);

  // Function to toggle edit mode
  const toggleEditMode = () => {
    const newEditMode = !editMode;
    setEditMode(newEditMode);
    if (newEditMode) {
      setTimeout(() => {
        inputRef.current.focus();
        inputRef.current.select();
      }, 0);
    }
  };

  // Function to handle onBlur event
  const handleBlur = () => {
    if (editMode) {
      // If in edit mode, set editMode to false when the input loses focus
      setEditMode(false);
    }
  };

  // Function to check if the value is empty
  function isEmpty(value) {
    return (
      value === undefined ||
      value === null ||
      (typeof value === "string" && value.trim() === "") ||
      (typeof value === "number" && isNaN(value))
    );
  }

  return (
    <div className="mb-3 flex items-center">
      {/* Label for the input */}
      <label className="text-sm font-bold text-black mr-2">{label}</label>
      {/*Tertiary operator used to differentiate when the input field should and should not be editable*/}
      {editMode ? (
        <div className="flex border rounded relative">
          <input
            ref={inputRef}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={handleBlur}
            className="border rounded border-black w-28 py-2 px-3 pr-12 text-center text-gray-400 leading-tight"
          />
          {/* Display unit next to the input if applicable*/}
          <span className="px-2 text-gray-700 absolute inset-y-0 right-0 flex items-center mr-2 pointer-events-none font-semibold">
            {unit}
          </span>
        </div>
      ) : (
        // Render static text when not in edit mode
        <div className="flex items-center">
          {isEmpty(value) ? (
            <span className="mr-2 bg-gray-200 px-2">--</span>
          ) : (
            <span className="mr-2 bg-gray-200 px-2">
              {value}
              {unit}
            </span>
          )}
          {/* Button to toggle edit mode */}
          <button onClick={toggleEditMode} style={{ fontSize: "24px" }}>
            <MdOutlineSettings />
          </button>
        </div>
      )}
    </div>
  );
}

export default EditableInput;
