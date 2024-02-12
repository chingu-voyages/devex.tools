import React, { useState, useEffect } from "react";

const SearchField = ({ placeholderText, links, search,clearInput }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    search(e.target.value);
  };

  useEffect(() => {
    if (clearInput){
      setInputValue("");
      search("");
    }
  }, [clearInput]);


  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search(inputValue);
    }
    if (e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "ArrowUp" ||e.key === "ArrowDown" ||e.key === "Backspace") {
      return;
    }
    search(inputValue);
  };


  return (
    <div className="flex justify-end">
      <input
        type="text"
        placeholder={placeholderText}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="bg-gray-100 p-3 text-lg"
      />
      <button
        className="bg-gray-100 text-black p-2"
        onClick={() => search(inputValue)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchField;
