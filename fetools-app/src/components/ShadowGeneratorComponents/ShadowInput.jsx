import { shadowPropertyValue, unitChanger } from "./ShadowGeneratorFN";
import { useState } from "react";

export const ShadowInput = ({
  label,
  iconSrc,
  prop,
  setShadowsStyles,
  ShadowsStyles,
  ActiveShadow,
  inset = false,
  range = { min: 0, max: 0 },
}) => {
  const dropDownOptions = ["px", "em", "rem"];
  let unit = ShadowsStyles[ActiveShadow][prop] + ShadowsStyles[ActiveShadow].units[prop]
  const [activeUnit, setActiveUnit] = useState("px")
  
  return (
    <label className="flex flex-col gap-1 font-semibold lg:mx-w-[242px] max-h-[51px] h-full w-full my-1">
      {label}
      <div className="flex gap-x-2">
        <img
          className={prop === "verticalOffset" ? "rotate-90" : ""}
          src={iconSrc}
          alt={`${label} Icon`}
        />
        <span  >{unit} </span>
        <input
          type="range"
          max={activeUnit !== "px"? 20 : range.max  }
          min={range.min}
          value={ShadowsStyles[ActiveShadow][prop]}
          className="lg:min-w-[10px] w-full"
          onChange={(e) => {
            shadowPropertyValue(
              e,
              setShadowsStyles,
              ShadowsStyles,
              prop,
              ActiveShadow
            );
          }}
        />
        <select
          className="outline-none active:outline-none"
          onChange={(e) => {
            unitChanger(e, prop, setShadowsStyles, ShadowsStyles, ActiveShadow,activeUnit, setActiveUnit);
          }}
        >
          {dropDownOptions.map((current, idx) => {
            return (
              <option key={idx} value={current}>
                {" "}
                {current}{" "}
              </option>
            );
          })}
        </select>

        {inset ? (
          <span className="flex gap-2">
            Inset
            <input
              type="checkbox"
              onChange={(e) => {
                shadowPropertyValue(
                  e,
                  setShadowsStyles,
                  ShadowsStyles,
                  "inset",
                  ActiveShadow
                );
              }}
            />
          </span>
        ) : (
          ""
        )}
      </div>
    </label>
  );
};
