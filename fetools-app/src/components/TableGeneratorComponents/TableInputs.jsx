import { useState } from "react";
import { handleOptions,  } from "./TableGeneratorFN";

export const TableInputs = ({
  label,
  iconSrc,
  range = { min: 0, max: 0 },
  rotate = false,
  ShowUnits = true,
  prop,
  tableConfig,
  setTableConfig,
  delay = false
}) => {
  const dropDownOptions = ["px", "em", "rem", "%"];
  const [activeUnit, setActiveUnit] = useState("px");
  let propValue;

  switch (label) {
    case "Rows":
      propValue = "Rows";
      break;
    case "Columns":
      propValue = "Cols";
      break;

    default:
      propValue = prop;
      break;
  }

  return (
    <label className="flex flex-col gap-1 font-semibold lg:mx-w-[242px] max-h-[51px] h-full w-full my-1 text-sm">
      {label}
      <div className="flex gap-x-2">
        <img
          className={rotate ? "rotate-90" : ""}
          src={iconSrc}
          alt={`${label} Icon`}
        />
        <span>
          {prop === "dimensions"
            ? label === "Rows"
              ? tableConfig.dimensions.length
              : tableConfig.dimensions[1].length
            : tableConfig[prop]}
        </span>
        <input
          type="range"
          max={activeUnit !== "px" ? 20 : range.max}
          min={range.min}
          step={1}
          defaultValue={prop === "dimensions"
          ? label === "Rows"
            ? tableConfig.dimensions.length
            : tableConfig.dimensions[1].length
          : tableConfig[prop]}
          onChange={(e) => {
            delay ? setTimeout(()=>{
              handleOptions(
                e.target.value,
                propValue,
                tableConfig,
                setTableConfig,
                16,
                activeUnit
              );
            },225) : handleOptions(
              e.target.value,
              propValue,
              tableConfig,
              setTableConfig,
              16,
              activeUnit
            );

          }}
          className=" w-full"
        />
        {ShowUnits && (
          <select onChange={(e)=> setActiveUnit(e.target.value) } className="outline-none active:outline-none">
            {dropDownOptions.map((current, idx) => {
              return (
                <option key={idx} value={current}>
                  {" "}
                  {current}{" "}
                </option>
              );
            })}
          </select>
        )}
      </div>
    </label>
  );
};
