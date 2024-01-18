import "../index.css";

import React, { useState } from "react";

// Function component UnitConverter for converting units between pixels, em/rem, and Tailwind utility classes

function UnitConverter() {
  // State hooks for managing component state
  const [basePixelSize, setBasePixelSize] = useState(16);
  const [pixels, setPixels] = useState(0);
  const [em, setEm] = useState(0);
  const [tailwindSize, setTailwindSize] = useState(0);
  const [editMode, setEditMode] = useState(false);

  // Handler for base pixel size changes
  const handleBasePixelSizeChange = (e) => {
    const newBaseSize = parseFloat(e.target.value);
    setBasePixelSize(newBaseSize);
    const newEm = pixels / newBaseSize;
    setEm(newEm);
    setTailwindSize(newEm * 4);
  };

  // Handler for pixel value changes
  const handlePixelChange = (e) => {
    const newPixels = parseFloat(e.target.value);
    setPixels(newPixels);
    const newEm = newPixels / basePixelSize;
    setEm(newEm);
    setTailwindSize(newEm * 4);
  };

  // Handler for rem/em value changes
  const handleEmChange = (e) => {
    const newEm = parseFloat(e.target.value);
    setEm(newEm);
    const newPixels = newEm * basePixelSize;
    setPixels(newPixels);
    setTailwindSize(newEm * 4);
  };

  // Handler for Tailwind size changes
  const handleTailwindChange = (e) => {
    const newTailwindSize = parseFloat(e.target.value);
    setTailwindSize(newTailwindSize);
    const newEm = newTailwindSize / 4;
    setEm(newEm);
    setPixels(newEm * basePixelSize);
  };

  // Handler for the cog (settings) icon click. Toggles the edit mode state.
  const handleCogClick = () => {
    setEditMode(!editMode);
  };

  // JSX for rendering the UI components.
  return (
    <div>
      <p className="font-mono text-5xl ml-3">Unit Converter</p>
      <p className="font-mono text-1xl ml-3 mb-2">
        Calculate PX, REM/EM, and Tailwind utility classes with ease.
      </p>
      <div className="flex gap-10 p-4">
        <div className="mb-3">
          <label className="block mb-2 text-sm font-bold text-white">
            Base Size
          </label>
          {/*Tertiary operator used to differntiate when the Base Size input element should and should not be editable*/}
          {editMode ? (
            <input
              type="number"
              className="border rounded w-28 py-2 px-3  text-gray-700 leading-tight"
              value={basePixelSize}
              onChange={handleBasePixelSizeChange}
            />
          ) : (
            <div className="flex items-center">
              <span className="mr-2">{basePixelSize}</span>
              <button onClick={handleCogClick}>⚙️</button>
            </div>
          )}
        </div>
        <div className="mb-3 relative">
          <label className="block mb-2 text-sm font-bold text-white">
            REM/EM
          </label>
          <div className="flex border rounded relative">
            <input
              type="number"
              className="border rounded w-28 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={em}
              onChange={handleEmChange}
            />
            <span className="px-2 text-gray-700 absolute inset-y-0 right-0 flex items-center mr-2 pointer-events-none">
              rem
            </span>
          </div>
        </div>
        <div className="mb-3 relative">
          <label className="block mb-2 text-sm font-bold text-white">
            Pixels
          </label>
          <div className="flex border rounded relative">
            <input
              type="number"
              className="border rounded w-28 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={pixels}
              onChange={handlePixelChange}
            />
            <span className="px-2 text-gray-700 absolute inset-y-0 right-0 flex items-center mr-2 pointer-events-none">
              px
            </span>
          </div>
        </div>

        <div className="mb-3">
          <label className="block mb-2 text-sm font-bold text-white">
            Tailwind Size
          </label>
          <input
            type="number"
            className="border rounded w-28 py-2 px-3 text-gray-700 leading-tight"
            value={tailwindSize}
            onChange={handleTailwindChange}
          />
        </div>
      </div>
    </div>
  );
}

export default UnitConverter;
