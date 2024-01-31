import React from "react";

const CodeTypeRadio = ({ value, checked, onChange, label }) => (
  <label className="mr-2 flex  ">
    <input
      type="radio"
      value={value}
      checked={checked}
      onChange={onChange}
      className="hidden"
    />
    <div className="flex items-center ">
      <div
        className={`w-3 h-3 border-2 border-black rounded-full ${
          checked ? "bg-black" : "bg-white"
        }`}
      >
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="13"
            viewBox="0 0 12 13"
            fill="none"
          >
            <circle cx="6" cy="6.5" r="6" fill="#333333" />
          </svg>
        )}
      </div>
    </div>
    <span className="ml-1">{label}</span>
  </label>
);

export default CodeTypeRadio;
