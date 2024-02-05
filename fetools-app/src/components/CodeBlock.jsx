import React from "react";
import CopyButton from "./CopyButton";

function CodeBlock({ title, code }) {
  // Function to provide the code text to the CopyButton
  const getCode = () => code.toString();

  return (
    <div className="mb-4 relative group">
      <div className="mb-2 text-sm font-bold text-gray-400">{title}</div>
      <div className="p-3 bg-gray-200 rounded relative">
        <pre className="whitespace-pre-wrap overflow-x-auto">
          <code>{code}</code>
        </pre>
      </div>
      <div className="absolute top-0 right-0 mb-2 hidden group-hover:flex">
        <CopyButton onCopy={getCode} />
      </div>
    </div>
  );
}

export default CodeBlock;
