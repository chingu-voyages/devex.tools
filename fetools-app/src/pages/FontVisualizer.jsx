import React, { useState } from "react";
import CSSCodeGenerator from "../components/FontVisualizer/CSSCodeGenerator";
import FontPreview from "../components/FontVisualizer/FontPreview";
import Preview from "../components/FontVisualizer/Preview";

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
    fontSize: 1,
  });

  const [backgroundColor, setBackgroundColor] = useState("#ffffff");

  const handleFontChange = (property, value) => {
    setFont((prevFont) => ({
      ...prevFont,
      [property]: value,
    }));
  };

  const handleColorChange = (e) => {
    handleFontChange("color", e.target.value);
  };

  const handleBackgroundColorChange = (e) => {
    setBackgroundColor(e.target.value);
  };

  const handleFontSizeChange = (value) => {
    handleFontChange("fontSize", value);
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
      backgroundColor: backgroundColor,
      fontStyle: font.style,
      fontWeight: font.weight,
      textTransform: font.textTransform,
      textAlign: font.textAlign,
      letterSpacing: font.letterSpacing,
      lineHeight: font.lineHeight,
      fontSize: `${font.fontSize}em`,
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
      background-color: ${backgroundColor};
      font-style: ${font.style};
      font-weight: ${font.weight};
      text-transform: ${font.textTransform};
      text-align: ${font.textAlign};
      letter-spacing: ${font.letterSpacing};
      line-height: ${font.lineHeight};
      font-size: ${font.fontSize}em;
    `;
  };

  return (
    <main className="flex p-20 flex-col items-start gap-10 self-stretch">
      <div className="flex items-start gap-48 self-stretch">
        <Preview generateFontStyles={generateFontStyles} />
        <FontPreview
          font={font}
          backgroundColor={backgroundColor}
          handleFontChange={handleFontChange}
          handleColorChange={handleColorChange}
          handleBackgroundColorChange={handleBackgroundColorChange}
          handleLetterSpacingChange={handleLetterSpacingChange}
          handleLineHeightChange={handleLineHeightChange}
          handleFontSizeChange={handleFontSizeChange}
        />
      </div>
      <CSSCodeGenerator
        generateCssCode={generateCssCode}
        handleCopyIcon={handleCopyClick}
      />
    </main>
  );
};

export default FontVisualizer;
