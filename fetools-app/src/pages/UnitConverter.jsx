import "../index.css";
import GoDeeper from "../components/GoDeeper";
import CopyButton from "../components/CopyButton";

import React, { useState } from "react";

// Function component UnitConverter for converting units between pixels, em/rem, and Tailwind utility classes

function UnitConverter() {
  // State hooks for managing component state
  const [basePixelSize, setBasePixelSize] = useState(16);
  const [pixels, setPixels] = useState(0);
  const [em, setEm] = useState(0);
  const [tailwindSize, setTailwindSize] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [cssSize, setCssSize] = useState("16px");

  // Update CSS size whenever pixels, em, or Tailwind size changes
  const updateCssSize = (newSizeInPixels) => {
    setCssSize(`${newSizeInPixels}px`); // Update CSS size
  };

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
    updateCssSize(newPixels);
  };

  // Handler for rem/em value changes
  const handleEmChange = (e) => {
    const newEm = parseFloat(e.target.value);
    setEm(newEm);
    const newPixels = newEm * basePixelSize;
    setPixels(newPixels);
    setTailwindSize(newEm * 4);
    updateCssSize(newPixels);
  };

  // Handler for Tailwind size changes
  const handleTailwindChange = (e) => {
    const newTailwindSize = parseFloat(e.target.value);
    setTailwindSize(newTailwindSize);
    const newEm = newTailwindSize / 4;
    setEm(newEm);
    setPixels(newEm * basePixelSize);
    updateCssSize(newPixels);
  };

  // Handler for the cog (settings) icon click. Toggles the edit mode state.
  const handleCogClick = () => {
    setEditMode(!editMode);
  };

  // Handler for the input field losing focus
  const handleBaseSizeInputBlur = () => {
    if (editMode) {
      // If in edit mode, set editMode to false when the input loses focus
      setEditMode(false);
    }
  };

  //links for Go Deeper component
  const linksData = [
    {
      url: "https://en.wikipedia.org/wiki/Gabe_Newell",
      textValue: "Dummy Link 1",
    },
    {
      url: "https://en.wikipedia.org/wiki/SteamOS",
      textValue: "Dummy Link 2",
    },
    {
      url: "https://en.wikipedia.org/wiki/Half-Life:_Alyx",
      textValue: "Dummy Link 3",
    },
  ];

  // JSX for rendering the UI components.
  return (
    <>
      <main
        className="p-6
    sm:p-12 lg:px-48 lg:py-20"
      >
        <p className="font-arial font-bold text-6xl ml-4">Unit Converter</p>

        <p className="font-arial text-1xl ml-4 mb-2 text-gray-400">
          Calculate PX, REM/EM, and Tailwind utility classes with ease.
        </p>

        <div className="flex gap-10 p-4 ml-52">
          <div className="mb-3">
            <label className="block mb-2 text-sm font-bold text-gray-400">
              Base Size
            </label>
            {/*Tertiary operator used to differentiate when the Base Size input element should and should not be editable*/}
            {editMode ? (
              <div className="flex border rounded relative">
                <input
                  type="number"
                  className="border rounded border-black w-28 py-2 px-3  text-gray-400 leading-tight"
                  value={basePixelSize}
                  onChange={handleBasePixelSizeChange}
                  onBlur={handleBaseSizeInputBlur}
                />
                <span className="px-2 text-gray-700 absolute inset-y-0 right-0 flex items-center mr-2 pointer-events-none font-semibold">
                  px
                </span>
              </div>
            ) : (
              <div className="flex items-center">
                <span className="mr-2">{basePixelSize}px</span>
                <button onClick={handleCogClick}>⚙️</button>
              </div>
            )}
          </div>

          <div className="mb-3 relative">
            <label className="block mb-2 text-sm font-bold text-gray-400">
              REM/EM
            </label>
            <div className="flex border rounded relative">
              <input
                type="number"
                className="border rounded border-black w-28 py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
                value={em}
                onChange={handleEmChange}
              />
              <span className="px-2 text-gray-700 absolute inset-y-0 right-0 flex items-center mr-2 pointer-events-none font-semibold">
                rem
              </span>
              <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-full text-lg -mt-2">
                <CopyButton onCopy={() => em.toString()} />
              </span>
            </div>
          </div>

          <div className="mb-3 relative">
            <label className="block mb-2 text-sm font-bold text-gray-400">
              Pixels
            </label>
            <div className="flex border rounded relative">
              <input
                type="number"
                className="border rounded border-black w-28 py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
                value={pixels}
                onChange={handlePixelChange}
              />
              <span className="px-2 text-gray-700 absolute inset-y-0 right-0 flex items-center mr-2 pointer-events-none font-semibold">
                px
              </span>
              <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-full text-lg -mt-2">
                <CopyButton onCopy={() => pixels.toString()} />
              </span>
            </div>
          </div>

          <div className="mb-3 relative">
            <label className="block mb-2 text-sm font-bold text-gray-400">
              Tailwind Size
            </label>
            <div className="flex border rounded relative">
              <input
                type="number"
                className="border rounded border-black w-28 py-2 px-3 text-gray-400 leading-tight"
                value={tailwindSize}
                onChange={handleTailwindChange}
              />
              <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-full text-lg -mt-2">
                <CopyButton onCopy={() => pixels.toString()} />
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 items-start p-4">
          <p className="font-arial text-4xl">Preview</p>
          <div
            className="flex flex-row justify-start items-center border border-black border-dashed p-3 
        min-h-[100px] w-full overflow-auto"
          >
            <p
              className="font-arial font-bold text-3xl break-words leading-none"
              style={{
                fontSize: cssSize,
              }}
            >
              Lorem ipsum dolor sit amet
            </p>
          </div>
        </div>
        {/* <GoDeeper linksData={linksData} /> */}
      </main>
    </>
  );
}

export default UnitConverter;
