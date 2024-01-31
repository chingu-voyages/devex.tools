import React, { useState } from "react";
import CopyButton from "./CodeGeneratorComponents/CopyButton";

const HtmlCodeGenerator = ({ generateHtmlCode }) => {
  const handleCopyClick = async () => {
    try {
      const codeToCopy = generateHtmlCode();
      await navigator.clipboard.writeText(codeToCopy);
      console.log("HTML code copied to clipboard");
    } catch (err) {
      console.error("Unable to copy HTML code to clipboard", err);
    }
  };

  return (
    <div
      className="code-generator p-4 flex flex-col gap-4 w-full  relative"
      style={{ width: "100%" }}
    >
      <h2 className="text-xl font-bold mb-2">HTML Code</h2>
      <textarea
        value={generateHtmlCode()}
        readOnly
        className="p-2 w-full bg-gray-100 text-black border-0"
        style={{ height: "200px" }}
      />
      <CopyButton handleCopyClick={handleCopyClick} />
    </div>
  );
};

export default HtmlCodeGenerator;
