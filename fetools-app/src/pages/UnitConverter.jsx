import "../index.css";
import GoDeeper from "../components/ToolsLayout/GoDeeper";
import ToolHeading from "../components/ToolsLayout/ToolHeading";
import ToolHeaderSection from "../components/ToolsLayout/ToolHeaderSection";
import TextField from "../components/TextField";
import CodeBlock from "../components/CodeBlock";
import TabSwitcher from "../components/TabSwitcher";

import React, { useState, useRef } from "react";

// Function component UnitConverter for converting units between pixels, em/rem, and Tailwind utility classes

function UnitConverter() {
  // State hooks for managing component state
  const [basePixelSize, setBasePixelSize] = useState(16);
  const [pixels, setPixels] = useState(0);
  const [em, setEm] = useState(0);
  const [tailwindSize, setTailwindSize] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [cssSize, setCssSize] = useState("16px");

  // State variable to track if the alert has been shown
  const [alertShown, setAlertShown] = useState(false);

  // Update CSS size whenever pixels, em, or Tailwind size changes
  const updateCssSize = (newSizeInPixels) => {
    let finalSize = newSizeInPixels;

    // Check if newSizeInPixels exceeds the maximum allowed size for the preview (1000)
    if (newSizeInPixels > 1000 && !alertShown) {
      finalSize = 1000;
      // Notify the user that the preview is capped (you might want to throttle this or change the UX for a smoother experience)
      alert(
        "Preview is limited to 1000px. Conversion will still be accurate above this value."
      );
      setAlertShown(true);
    }

    // Check if newSizeInPixels is a number, if not, set CSS size to "0px"
    setCssSize(isNaN(finalSize) ? "0px" : `${finalSize}px`); // Update CSS size
  };

  // Tailwind Size Conversions
  const tailwindSizes = [
    0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20,
    24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96,
  ];

  const TailwindCheck = (TailwindSize) => {
    if (isNaN(TailwindSize) || TailwindSize === "") {
      return "";
    }
    const nearestTailwindSize = tailwindSizes.find(
      (size) => size == TailwindSize
    );
    if (nearestTailwindSize !== undefined) {
      return nearestTailwindSize;
    }
    // Return rem value if no exact tailwind size is found
    return `[${(TailwindSize / 4).toFixed(3)}rem]`;
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
    setTailwindSize(TailwindCheck(newEm * 4));
    updateCssSize(newPixels);
  };

  // Handler for rem/em value changes
  const handleEmChange = (e) => {
    const newEm = parseFloat(e.target.value);
    setEm(newEm);
    const newPixels = newEm * basePixelSize;
    setPixels(newPixels);
    setTailwindSize(TailwindCheck(newEm * 4));
    updateCssSize(newPixels);
  };

  // Handler for Tailwind size changes
  const handleTailwindChange = (e) => {
    const inputValue = e.target.value.toString();
    let newTailwindSize;
    let newEm;

    // Checks if the input value is in the format [X.XXXrem] and parses it correctly
    if (inputValue.startsWith("[") && inputValue.endsWith("rem]")) {
      // Extracts the numeric part and parses it as float
      const remValue = inputValue.slice(1, -4);
      if (!isNaN(remValue)) {
        newEm = remValue;
        newTailwindSize = inputValue;
      } else {
        newTailwindSize = 0;
        newEm = 0;
      }
    } else {
      newTailwindSize = inputValue;
      console.log(newTailwindSize);
      newEm = parseFloat(newTailwindSize) / 4;
      console.log(newEm);
    }

    setTailwindSize(newTailwindSize);
    setEm(newEm);
    const newPixels = newEm * basePixelSize;
    setPixels(newPixels);
    updateCssSize(newPixels);
  };

  //Tailwind Blur Function - handles entered tailwind sizes that don't exist
  const onTailwindBlur = () => {
    let newTailwindSize;

    if (tailwindSize.startsWith("[") && tailwindSize.endsWith("rem]")) {
      const remValue = tailwindSize.slice(1, -4);
      let newEm = remValue;
      newTailwindSize = TailwindCheck(newEm * 4);
    } else {
      newTailwindSize = tailwindSize;
    }

    setTailwindSize(TailwindCheck(newTailwindSize));
  };

  // A ref to the base size input element
  const baseSizeInputRef = useRef(null);

  // Handler for the cog (settings) icon click. Toggles the edit mode state.
  const handleCogClick = () => {
    const newEditMode = !editMode;
    setEditMode(newEditMode);
    if (newEditMode) {
      setTimeout(() => {
        baseSizeInputRef.current.focus();
        baseSizeInputRef.current.select();
      }, 0);
    }
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
      url: "https://www.w3schools.com/cssref/css_units.php",
      textValue: "Explore CSS units at W3Schools",
    },
    {
      url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
      textValue: "Learn more about CSS values and units at MDN",
    },
    {
      url: "https://www.youtube.com/watch?v=N5wpD9Ov_To&ab_channel=KevinPowell",
      textValue: "Are you using the right CSS units? With Kevin Powell",
    },
  ];

  //All Code Samples
  const CodeSamples = {
    px: [
      { title: "Font Size", code: `font-size: ${pixels}px;` },
      { title: "Height", code: `height: ${pixels}px;` },
      { title: "Width", code: `width: ${pixels}px;` },
      { title: "Margin", code: `margin: ${pixels}px;` },
      { title: "Padding", code: `padding: ${pixels}px;` },
      { title: "Gap", code: `gap: ${pixels}px;` },
      { title: "Border Width", code: `border-width: ${pixels}px;` },
      {
        title: "Position",
        code: `top: ${pixels}px;\nright: ${pixels}px;\nbottom: ${pixels}px;\nleft: ${pixels}px;`,
      },
    ],
    rem: [
      { title: "Font Size", code: `font-size: ${em}rem;` },
      { title: "Height", code: `height: ${em}rem;` },
      { title: "Width", code: `width: ${em}rem;` },
      { title: "Margin", code: `margin: ${em}rem;` },
      { title: "Padding", code: `padding: ${em}rem;` },
      { title: "Gap", code: `gap: ${em}rem;` },
      { title: "Border Width", code: `border-width: ${em}rem;` },
      {
        title: "Position",
        code: `top: ${em}rem;\nright: ${em}rem;\nbottom: ${em}rem;\nleft: ${em}rem;`,
      },
    ],
    em: [
      { title: "Font Size", code: `font-size: ${em}em;` },
      { title: "Height", code: `height: ${em}em;` },
      { title: "Width", code: `width: ${em}em;` },
      { title: "Margin", code: `margin: ${em}em;` },
      { title: "Padding", code: `padding: ${em}em;` },
      { title: "Gap", code: `gap: ${em}em;` },
      { title: "Border Width", code: `border-width: ${em}em;` },
      {
        title: "Position",
        code: `top: ${em}rem;\nright: ${em}rem;\nbottom: ${em}em;\nleft: ${em}rem;`,
      },
    ],
    NaN: [
      { title: "Font Size", code: "font-size: --" },
      { title: "Height", code: "height: --" },
      { title: "Width", code: "width: --" },
      { title: "Margin", code: "margin: --" },
      { title: "Padding", code: "padding: --" },
      { title: "Gap", code: "gap: --" },
      { title: "Border Width", code: "border-width: --" },
      {
        title: "Position",
        code: `top: --\nright: --\nbottom: --\nleft: --`,
      },
    ],
  };

  //TabSwitcher Content

  const tabButtons = ["px", "em", "rem"];

  const tabContents = [
    <div className="grid grid-cols-4 gap-4">
      {isNaN(pixels)
        ? CodeSamples["NaN"].map((sample) => (
            <CodeBlock title={sample.title} code={sample.code} />
          ))
        : CodeSamples["px"].map((sample) => (
            <CodeBlock title={sample.title} code={sample.code} />
          ))}
    </div>,
    <div className="grid grid-cols-4 gap-4">
      {isNaN(em)
        ? CodeSamples["NaN"].map((sample) => (
            <CodeBlock title={sample.title} code={sample.code} />
          ))
        : CodeSamples["em"].map((sample) => (
            <CodeBlock title={sample.title} code={sample.code} />
          ))}
    </div>,
    <div className="grid grid-cols-4 gap-4">
      {isNaN(pixels)
        ? CodeSamples["NaN"].map((sample) => (
            <CodeBlock title={sample.title} code={sample.code} />
          ))
        : CodeSamples["rem"].map((sample) => (
            <CodeBlock title={sample.title} code={sample.code} />
          ))}
    </div>,
  ];

  // JSX for rendering the UI components.
  return (
    <>
      <main>
        <ToolHeaderSection>
          <ToolHeading
            title="Unit Converter"
            tagline="Calculate PX, REM/EM, and Tailwind utility classes with ease."
          />
        </ToolHeaderSection>
        {/* Section for Input Boxes*/}
        <div className="flex gap-10 sm:py-8 sm:px-16 lg:px-80">
          <div className="mb-3">
            <label className="block mb-2 text-sm font-bold text-gray-400">
              Base Size
            </label>
            {/*Tertiary operator used to differentiate when the Base Size input element should and should not be editable*/}
            {editMode ? (
              <div className="flex border rounded relative">
                <input
                  ref={baseSizeInputRef}
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
                {/*Tertiary operator used to differentiate when the Base Size is NaN and Not NaN*/}
                {isNaN(basePixelSize) ? (
                  <span className="mr-2">--</span>
                ) : (
                  <span className="mr-2">{basePixelSize}px</span>
                )}
                <button onClick={handleCogClick}>⚙️</button>
              </div>
            )}
          </div>

          <TextField
            title="REM/EM"
            value={em}
            unit="rem"
            onValueChange={handleEmChange}
          />

          <TextField
            title="Pixels"
            value={pixels}
            unit="px"
            onValueChange={handlePixelChange}
          />

          <TextField
            title="Tailwind Size"
            value={tailwindSize}
            onValueChange={handleTailwindChange}
            inputType="text"
            onBlur={onTailwindBlur}
          />
        </div>
        {/* Section for Lorem Ipsum Preview*/}
        <div className="flex flex-col gap-4 items-start sm:p-8 lg:px-48">
          <p className="font-arial text-4xl">Preview</p>
          <div
            className="flex flex-row justify-start items-center border border-black border-dashed p-3 
        min-h-[100px] w-full overflow-auto"
          >
            <div
              contentEditable
              className="font-arial font-bold text-3xl break-words leading-none focus:outline-none"
              style={{
                fontSize: cssSize,
              }}
            >
              Lorem ipsum dolor sit amet
            </div>
          </div>
        </div>
        {/* Section for code blocks */}

        <div>
          <TabSwitcher
            buttons={tabButtons}
            children={tabContents}
            title="Code Samples"
          ></TabSwitcher>
        </div>

        <GoDeeper linksData={linksData} />
      </main>
    </>
  );
}

export default UnitConverter;
