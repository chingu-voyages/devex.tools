import React from "react";

const CopyButton = ({ handleCopyClick }) => (
  <button
    onClick={handleCopyClick}
    className="absolute top-2 right-2 text-white p-2 rounded-full cursor-pointer bg-transparent focus:outline-none"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M21.333 4H5.33301V21.3333"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.666 9.33301H26.666V25.333C26.666 26.0403 26.3851 26.7185 25.885 27.2186C25.3849 27.7187 24.7066 27.9997 23.9993 27.9997H13.3327C12.6254 27.9997 11.9472 27.7187 11.4471 27.2186C10.947 26.7185 10.666 26.0403 10.666 25.333V9.33301Z"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>
);

export default CopyButton;
