import { shadowPropertyValue } from "./ShadowGeneratorFN";

export const ShadowInput = ({
  label,
  iconSrc,
  prop,
  setShadowsStyles,
  ShadowsStyles,
  ActiveShadow,
  inset = false,
  range = {min: 0, max:0}
}) => {

  return (
    <label className="flex flex-col gap-1 font-semibold lg:mx-w-[242px] w-full">
      {label}
      <div className="flex gap-x-2">
        <img
          className={prop === "verticalOffset" ? "rotate-90" : ""}
          src={iconSrc}
          alt={`${label} Icon`}
        />
        <span>{ShadowsStyles[ActiveShadow][prop]}px</span>
        <input
          type="range"
          max={range.max}
          min={range.min}
          
          value={ShadowsStyles[ActiveShadow][prop]}
          className="lg:min-w-[170px] w-full"
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
