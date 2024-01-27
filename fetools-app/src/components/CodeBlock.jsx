import React from "react";
import CopyButton from "./CopyButton";

function CodeBlock({ title, code }) {
  // Function to provide the code text to the CopyButton

  const handleCopy = () => code;

  return (
    <div className="mb-4 relative">
      <div className="mb-2 text-sm font-bold text-gray-400">{title}</div>
      <div className="absolute top-0 right-0 mb-2">
        <CopyButton onCopy={handleCopy} />
      </div>
      <div className="p-3 bg-gray-200 rounded relative">
        <code>{code}</code>
      </div>
    </div>
  );
}

export default CodeBlock;
