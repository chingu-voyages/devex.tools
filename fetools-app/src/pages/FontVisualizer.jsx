import React, { useState } from "react";
import CodeGenerator from "../components/FontVisualizer/CodeGenerator";
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
  const [codeType, setCodeType] = useState("css");

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

  const generateTailwindCode = () => {
    return `
      font-family-${font.name}
      text-${font.textAlign}-${font.textAlign}
      text-${font.color}-${font.color}
      bg-${backgroundColor}-${backgroundColor}
      font-${font.style}-${font.style}
      font-${font.weight}-${font.weight}
      tracking-${font.letterSpacing}-${font.letterSpacing}
      leading-${font.lineHeight}-${font.lineHeight}
      text-${font.textTransform}-${font.textTransform}
      text-${fontSizeToTailwindClass(font.fontSize)}-${font.fontSize}
    `;
  };

  const fontSizeToTailwindClass = (fontSize) => {
    if (fontSize === 1) {
      return "text-xs";
    } else if (fontSize === 2) {
      return "text-sm";
    } else if (fontSize === 3) {
      return "text-base";
    } else if (fontSize === 4) {
      return "text-lg";
    }
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
      const codeToCopy =
        generateCodeType() === "css"
          ? generateCssCode()
          : generateTailwindCode();
      await navigator.clipboard.writeText(codeToCopy);
      console.log("Text copied to clipboard");
    } catch (err) {
      console.error("Unable to copy text to clipboard", err);
    }
  };

  const generateCodeType = () => {
    return codeType;
  };

  return (
    <main className="flex flex-col items-start gap-10 self-stretch p-8 lg:p-20">
      <h1 className="text-4xl font-bold mb-8">Font Viewer</h1>
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

      <CodeGenerator
        generateCssCode={generateCssCode}
        generateTailwindCode={generateTailwindCode}
        handleCopyIcon={handleCopyClick}
        codeType={codeType}
        setCodeType={setCodeType}
        className="flex flex-col justify-center items-center gap-32 self-stretch"
      />
    </main>
  );
};

export default FontVisualizer;
