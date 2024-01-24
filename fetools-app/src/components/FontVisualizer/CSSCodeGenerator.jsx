import React from "react";

const CSSCodeGenerator = ({ generateCssCode }) => {
  const handleCopyClick = () => {
    const textarea = document.createElement("textarea");
    textarea.value = generateCssCode();
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  };

  return (
    <div
      className="css-code-generator mt-6 bg-white p-4 rounded-lg shadow-md w-full md:w-1/2 relative transition-all duration-300 border-0"
      style={{ width: "100%" }}
    >
      <h2 className="text-xl font-bold mb-2">CSS Code :</h2>
      <textarea
        value={generateCssCode()}
        readOnly
        className="p-2 w-full bg-gray-100 text-black border-0"
        style={{ height: "200px" }}
      />
      <button
        onClick={handleCopyClick}
        className="absolute top-2 right-2 text-white p-2 rounded-full cursor-pointer bg-transparent focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-gray-800 dark:text-white"
          fill="none"
          viewBox="0 0 16 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M2 5a1 1 0 0 0-1 1v12a.969.969 0 0 0 .933 1h8.1a1 1 0 0 0 1-1.033M10 1v4a1 1 0 0 1-1 1H5m10-4v12a.97.97 0 0 1-.933 1H5.933A.97.97 0 0 1 5 14V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 9.828 1h4.239A.97.97 0 0 1 15 2Z"
          />
        </svg>
      </button>
    </div>
  );
};

export default CSSCodeGenerator;
