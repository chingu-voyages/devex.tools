import React, { useState } from "react";

const FontVisualizer = () => {
  const [font, setFont] = useState({
    name: "Arial",
    color: "#000000",
    style: "normal",
    weight: "normal",
    textTransform: "none",
    textAlign: "left",
    letterSpacing: 0,
    lineHeight: 1.2,
  });

  const fontFamilies = [
    "Arial",
    "Sans-serif",
    "Courier New",
    "Times New Roman",
    "Verdana",
    "Georgia",
    "Impact",
  ];

  const fontStyles = ["normal", "italic"];
  const fontWeights = ["normal", "bold", "bolder", "lighter"];
  const textTransformations = ["none", "capitalize", "uppercase", "lowercase"];
  const textAligns = ["left", "center", "right"];

  const handleFontChange = (property, value) => {
    setFont((prevFont) => ({
      ...prevFont,
      [property]: value,
    }));
  };

  const handleColorChange = (e) => {
    handleFontChange("color", e.target.value);
  };

  const handleLetterSpacingChange = (e) => {
    handleFontChange("letterSpacing", `${e.target.value}px`);
  };

  const handleLineHeightChange = (e) => {
    handleFontChange("lineHeight", `${e.target.value}`);
  };

  const generateFontStyles = () => {
    return {
      fontFamily: font.name,
      color: font.color,
      fontStyle: font.style,
      fontWeight: font.weight,
      textTransform: font.textTransform,
      textAlign: font.textAlign,
      letterSpacing: font.letterSpacing,
      lineHeight: font.lineHeight,
    };
  };

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(generateCssCode());
      console.log("Text copied to clipboard");
    } catch (err) {
      console.error("Unable to copy text to clipboard", err);
    }
  };

  const generateCssCode = () => {
    return `
      font-family: ${font.name};
      color: ${font.color};
      font-style: ${font.style};
      font-weight: ${font.weight};
      text-transform: ${font.textTransform};
      text-align: ${font.textAlign};
      letter-spacing: ${font.letterSpacing};
      line-height: ${font.lineHeight};
    `;
  };

  return (
    <div className="font-preview-container bg-gray-200 p-6 text-black">
      <div className="flex flex-wrap">
        <div className="font-preview w-full md:w-1/2 pr-0 md:pr-4 border border-gray-500 border-2 rounded p-4">
          <h1 className="text-2xl font-bold mb-4">Font Preview</h1>
          <label className="block mb-4">
            Font Name:
            <select
              value={font.name}
              onChange={(e) => handleFontChange("name", e.target.value)}
              className="mt-1 p-2 border rounded"
            >
              {fontFamilies.map((family) => (
                <option key={family} value={family}>
                  {family}
                </option>
              ))}
            </select>
          </label>

          <label className="block mb-4 text-black">
            Font Color:
            <input
              type="color"
              value={font.color}
              onChange={handleColorChange}
              className="mt-1 p-2 border rounded"
              id="fontColor"
              name="fontColor"
              style={{ backgroundColor: font.color, border: "2px solid #ddd" }}
            />
          </label>

          <label className="block mb-4 text-black">
            Font Style:
            <select
              value={font.style}
              onChange={(e) => handleFontChange("style", e.target.value)}
              className="mt-1 p-2 border rounded"
            >
              {fontStyles.map((style) => (
                <option key={style} value={style}>
                  {style}
                </option>
              ))}
            </select>
          </label>

          <label className="block mb-4 text-black">
            Font Weight:
            <select
              value={font.weight}
              onChange={(e) => handleFontChange("weight", e.target.value)}
              className="mt-1 p-2 border rounded"
            >
              {fontWeights.map((weight) => (
                <option key={weight} value={weight}>
                  {weight}
                </option>
              ))}
            </select>
          </label>

          <label className="block mb-4 text-black">
            Font Variant:
            <select
              value={font.textTransform}
              onChange={(e) => handleFontChange("textTransform", e.target.value)}
              className="mt-1 p-2 border rounded"
            >
              {textTransformations.map((variant) => (
                <option key={variant} value={variant}>
                  {variant}
                </option>
              ))}
            </select>
          </label>

          <label className="block mb-4 text-black">
            Text Align:
            <select
              value={font.textAlign}
              onChange={(e) => handleFontChange("textAlign", e.target.value)}
              className="mt-1 p-2 border rounded"
            >
              {textAligns.map((align) => (
                <option key={align} value={align}>
                  {align}
                </option>
              ))}
            </select>
          </label>

          <label className="block mb-4 text-black">
            Letter Spacing:
            <input
              type="range"
              value={String(parseInt(font.letterSpacing))}
              min={-10}
              max={10}
              step={1}
              onChange={handleLetterSpacingChange}
              className="mt-1"
            />
            <span className="ml-2">{font.letterSpacing}</span>
          </label>

          <label className="block mb-4 text-black">
            Line Height:
            <input
              type="range"
              value={String(parseInt(font.lineHeight))}
              min={0}
              max={10}
              step={0.1}
              onChange={handleLineHeightChange}
              className="mt-1"
            />
            <span className="ml-2">{font.lineHeight}</span>
          </label>
        </div>
        <div className="preview-container bg-white p-4 rounded-lg shadow-md mt-4 w-full md:w-1/2">
          <h2 className="text-xl font-bold mb-2 text-black">Preview:</h2>
          <p
            style={generateFontStyles()}
            className="font-preview-text text-black"
          >
            This is a preview text. Joseph Kotvak Stevensaurus wviolinm Ingrig
            Madrigal d_avid7 This is a preview text.
          </p>
        </div>
        <div
          className="css-code-generator mt-6 bg-white p-4 rounded-lg shadow-md w-full md:w-1/2"
          style={{ width: "100%" }}
        >
          <h2 className="text-xl font-bold mb-2">CSS Code Generator:</h2>
          <textarea
            value={generateCssCode()}
            readOnly
            className="border p-2 w-full bg-gray-100 text-black"
            style={{ height: "200px" }}
          />
          <button
            onClick={handleCopyClick}
            className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default FontVisualizer;
