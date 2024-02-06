import React from "react";
import CopyButton from "./CopyButton";

function CodeBlock({ title, code, lang = "css" }) {
  // Function to provide the code text to the CopyButton
  const getCode = () => code.toString();

  const renderCodeWithHighlight = () => {
    if (lang === "css") {
      // Split code by lines for multiline code handling (for "position" attribute code)
      return code.split("\n").map((line, index) => {
        const [property, value] = line.split(":");
        return (
          <div key={index}>
            <span className="text-purple-800">{property}:</span>
            <span className="text-black">{value}</span>
          </div>
        );
      });
    }
    // Default or when lang is 'tailwind'
    return <span className="text-black">{code}</span>;
  };

  return (
    <div className="mb-4">
      <div className="mb-2 text-sm font-bold text-gray-400">{title}</div>
      <div className="p-3 bg-gray-200 rounded relative">
        <pre className="whitespace-pre-wrap overflow-x-auto">
          <code>{renderCodeWithHighlight()}</code>
        </pre>
      </div>
      <div className="absolute top-0 right-0 mb-2 hidden group-hover:flex">
        <CopyButton onCopy={getCode} />
      </div>
    </div>
  );
}

export default CodeBlock;
