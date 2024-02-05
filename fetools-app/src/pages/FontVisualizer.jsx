import React, { useState } from "react";
import CodeGenerator from "../components/FontVisualizer/CodeGenerator";
import FontPreview from "../components/FontVisualizer/FontPreview";
import Preview from "../components/FontVisualizer/Preview";
import HtmlCodeGenerator from "../components/FontVisualizer/HtmlCodeGenerator";

const FontVisualizer = () => {
  const [font, setFont] = useState({
    name: "Arial",
    color: "#999999",
    style: "normal",
    weight: "normal",
    textTransform: "none",
    textAlign: "left",
    letterSpacing: 0,
    lineHeight: 1.2,
    fontSize: 1,
  });

  const [backgroundColor, setBackgroundColor] = useState("#333333");
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

  const generateHtmlCode = () => {
    return `
      <div style="font-family: ${font.name}; color: ${font.color}; background-color: ${backgroundColor}; font-style: ${font.style}; font-weight: ${font.weight}; text-transform: ${font.textTransform}; text-align: ${font.textAlign}; letter-spacing: ${font.letterSpacing}; line-height: ${font.lineHeight}; font-size: ${font.fontSize}em;">
        Your content goes here
      </div>
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
      backgroundColor: backgroundColor,
      fontStyle: font.style,
      fontWeight: font.weight,
      textTransform: font.textTransform,
      textAlign: font.textAlign,
      letterSpacing: font.letterSpacing,
      lineHeight: font.lineHeight,
      fontSize: `${font.fontSize}em`,
      fontSize: `${font.fontSize}em`,
    };
  };

  const handleCopyClick = async () => {
    try {
      let codeToCopy;
      if (codeType === "css") {
        codeToCopy = generateCssCode();
      } else if (codeType === "html") {
        codeToCopy = generateHtmlCode();
      } else {
        codeToCopy = generateTailwindCode();
      }
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
    <main className="flex flex-col items-start gap-10 p-8 lg:p-20">
      <div className="flex pb-4 items-end self-stretch">
        <h1 className="text-4xl font-bold">Font Viewer</h1>
      </div>

      <div className="flex gap-12 items-start">
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

      <div className="flex items-center gap-475 self-stretch">
        <h2 className="text-2xl font-bold mb-4">Code</h2>
      </div>

      <div className="flex  gap-12">
        <CodeGenerator
          generateCssCode={generateCssCode}
          generateTailwindCode={generateTailwindCode}
          handleCopyIcon={handleCopyClick}
          codeType={codeType}
          setCodeType={setCodeType}
        />

        <HtmlCodeGenerator generateHtmlCode={generateHtmlCode} />
      </div>
    </main>
  );
};

export default FontVisualizer;
