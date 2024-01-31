import React from "react";
import Select from "react-select";

const FontWeightInput = ({ font, handleFontChange }) => {
  const fontWeights = [
    { value: "100", label: "A Thin 100", fontWeight: 100 },
    { value: "300", label: "A Light 300", fontWeight: 300 },
    { value: "400", label: "A Regular 400", fontWeight: 400 },
    { value: "500", label: "A Medium 500", fontWeight: 500 },
    { value: "600", label: "A Semi-Bold 600", fontWeight: 600 },
    { value: "700", label: "A Bold 700", fontWeight: 700 },
    { value: "800", label: "A Extra Bold 800", fontWeight: 800 },
    { value: "900", label: "A Black 900", fontWeight: 900 },
  ];

  const selectedOption =
    fontWeights.find((option) => option.value === font.weight) ||
    fontWeights[2];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      fontWeight: selectedOption.fontWeight,
    }),
    option: (provided, state) => ({
      ...provided,
      fontWeight: state.data.fontWeight,
    }),
  };

  return (
    <div className="flex flex-col px-5 text-base">
      Weight
      <Select
        value={selectedOption}
        onChange={(selectedOption) =>
          handleFontChange("weight", selectedOption.value)
        }
        options={fontWeights}
        className="mt-1 p-1"
        styles={customStyles}
      />
    </div>
  );
};

export default FontWeightInput;
