import React, { useState } from "react";
import CopyButton from "./CodeGeneratorComponents/CopyButton";
import CodeTypeRadio from "./CodeGeneratorComponents/CodeTypeRadio";

const CodeGenerator = ({ generateCssCode, generateTailwindCode }) => {
  const [codeType, setCodeType] = useState("css");

  const handleCopyClick = async () => {
    try {
      const codeToCopy =
        codeType === "css" ? generateCssCode() : generateTailwindCode();
      await navigator.clipboard.writeText(codeToCopy);
      console.log("Text copied to clipboard");
    } catch (err) {
      console.error("Unable to copy text to clipboard", err);
    }
  };

  return (
    <div
      className="code-generator mt-6 bg-white p-4 rounded-lg shadow-md w-full md:w-1/2 relative transition-all duration-300 border-0"
      style={{ width: "100%" }}
    >
      <h2 className="text-xl font-bold mb-2">
        {codeType === "css" ? "CSS Code" : "Tailwind CSS Code"}
      </h2>
      <textarea
        value={codeType === "css" ? generateCssCode() : generateTailwindCode()}
        readOnly
        className="p-2 w-full bg-gray-100 text-black border-0"
        style={{ height: "200px" }}
      />
      <CopyButton handleCopyClick={handleCopyClick} />
      <div className="flex mt-2">
        <CodeTypeRadio
          value="css"
          checked={codeType === "css"}
          onChange={() => setCodeType("css")}
          label="CSS"
        />
        <CodeTypeRadio
          value="tailwind"
          checked={codeType === "tailwind"}
          onChange={() => setCodeType("tailwind")}
          label="Tailwind"
        />
      </div>
    </div>
  );
};

export default CodeGenerator;
