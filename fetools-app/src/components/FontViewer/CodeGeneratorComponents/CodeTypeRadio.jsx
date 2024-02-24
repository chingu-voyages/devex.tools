import React from "react";
import { FaDotCircle, FaCircle } from "react-icons/fa";

const CodeTypeRadio = ({ value, checked, onChange, label }) => (
  <label className="mr-2 flex items-center">
    <input
      type="radio"
      value={value}
      checked={checked}
      onChange={onChange}
      className="hidden"
    />
    <div className="flex items-center">
      {checked ? (
        <FaDotCircle className="w-5 h-5 mr-1 text-black" />
      ) : (
        <FaCircle className="w-5 h-5 mr-1 text-gray-500" />
      )}
    </div>
    <span>{label}</span>
  </label>
);

export default CodeTypeRadio;
