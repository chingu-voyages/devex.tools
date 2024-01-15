import "../index.css";

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
      <p className="font-mono text-6xl">Unit Converter Page</p>
    </>
  );
}

export default UnitConverter;
