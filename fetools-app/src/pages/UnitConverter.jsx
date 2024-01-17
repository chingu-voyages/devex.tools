import "../index.css";
import "../UnitConverter.css";

import React, { useState } from "react";

function UnitConverter() {
  const [basePixelSize, setBasePixelSize] = useState(16);
  const [pixels, setPixels] = useState(0);
  const [em, setEm] = useState(0);
  const [tailwindSize, setTailwindSize] = useState(0);

  const handleBasePixelSizeChange = (e) => {
    const newBaseSize = parseFloat(e.target.value);
    setBasePixelSize(newBaseSize);
    setEm(pixels / newBaseSize);
  };

  const handlePixelChange = (e) => {
    const newPixels = parseFloat(e.target.value);
    setPixels(newPixels);
    setEm(newPixels / basePixelSize);
  };

  const handleEmChange = (e) => {
    const newEm = parseFloat(e.target.value);
    setEm(newEm);
    const newPixels = newEm * basePixelSize;
    setPixels(newPixels);
  };

  const handleTailwindChange = (e) => {
    const newTailwindSize = parseFloat(e.target.value);
    setTailwindSize(newTailwindSize);
  };

  return (
    <>
      <p className="font-mono text-6xl p-1">Unit Converter</p>
      <div className="flex gap-2 p-4">
        <div className="mb-3">
          <label className="block mb-2 text-sm font-bold text-white">
            Base Pixel Size
          </label>
          <input
            type="number"
            className="border rounded py-2 px-3 text-gray-700 leading-tight"
            value={basePixelSize}
            onChange={handleBasePixelSizeChange}
          />
        </div>
        <div className="mb-3">
          <label className="block mb-2 text-sm font-bold text-white">
            Pixels
          </label>
          <input
            type="number"
            className="border rounded py-2 px-3 text-gray-700 leading-tight"
            value={pixels}
            onChange={handlePixelChange}
          />
        </div>
        <div className="mb-3">
          <label className="block mb-2 text-sm font-bold text-white">
            REM/EM
          </label>
          <input
            type="number"
            className="border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={em}
            onChange={handleEmChange}
          />
        </div>
        <div className="mb-3">
          <label className="block mb-2 text-sm font-bold text-white">
            Tailwind Size
          </label>
          <input
            type="number"
            className="border rounded py-2 px-3 text-gray-700 leading-tight"
            value={tailwindSize}
            onChange={handleTailwindChange}
          />
        </div>
      </div>
    </>
  );
}

export default UnitConverter;
