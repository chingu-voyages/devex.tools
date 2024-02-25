import tinycolor from "tinycolor2";
import ColorInput from "../InputComponents/ColorInput";
import SliderInput from "../InputComponents/SliderInput";
import {
  colorChanger,
  shadowPropertyValue,
  newShadow,
  switchShadow,
  removeShadow,
  unitChanger,
} from "./ShadowCreatorFN";
import { ToolPane } from "../ToolsLayout/Sections";
import Icon from "../Icon";

const OptionsBox = ({
  ShadowsStyles,
  setShadowsStyles,
  numOfShadows,
  setNumOfShadows,
  setActiveShadow,
  ActiveShadow,
  setRemoveShadow,
}) => {
  let color = tinycolor(ShadowsStyles[ActiveShadow].shadowColor).toHexString();
  return (
    <ToolPane title="Options" isPrimary={true} icon="tune">
      <div className="flex flex-wrap justify-between gap-y-6 [&>*]:w-[48%] mb-6">
        <div className="control color shadow-color flex items-center">
          <ColorInput
            placeholder={color}
            value={color}
            onChange={(e) => {
              colorChanger(e, setShadowsStyles, ShadowsStyles, ActiveShadow);
            }}
          />
        </div>

        <SliderInput
          useEffectValue={ShadowsStyles[ActiveShadow].opacity}
          sliderId={"opacity"}
          defaultValue={ShadowsStyles[ActiveShadow].opacity}
          valueTypes={[""]}
          ranges={[{ min: 0, max: 100 }]}
          step={1}
          title={"Opacity"}
          iconName={"opacity"}
          onChange={(e) =>
            shadowPropertyValue(
              e,
              setShadowsStyles,
              ShadowsStyles,
              "opacity",
              ActiveShadow
            )
          }
        />

        <SliderInput
          useEffectValue={ShadowsStyles[ActiveShadow].horizontalOffset}
          sliderId={"horizontal-offset"}
          defaultValue={ShadowsStyles[ActiveShadow].horizontalOffset}
          valueTypes={["px", "em", "rem"]}
          ranges={[
            { min: -96, max: 96 },
            { min: -8, max: 8 },
            { min: -8, max: 8 },
          ]}
          step={1}
          title={"horizontal Offset"}
          iconName={"width"}
          onClickFn={(e) => {
            unitChanger(
              e,
              "horizontalOffset",
              setShadowsStyles,
              ShadowsStyles,
              ActiveShadow
            );
          }}
          onChange={(e) =>
            shadowPropertyValue(
              e,
              setShadowsStyles,
              ShadowsStyles,
              "horizontalOffset",
              ActiveShadow
            )
          }
        />

        <SliderInput
          useEffectValue={ShadowsStyles[ActiveShadow].verticalOffset}
          sliderId={"vertical-Offset"}
          defaultValue={ShadowsStyles[ActiveShadow].verticalOffset}
          valueTypes={["px", "em", "rem"]}
          ranges={[
            { min: -96, max: 96 },
            { min: -8, max: 8 },
            { min: -8, max: 8 },
          ]}
          step={1}
          title={"Vertical Offset"}
          iconName={"height"}
          onClickFn={(e) => {
            unitChanger(
              e,
              "verticalOffset",
              setShadowsStyles,
              ShadowsStyles,
              ActiveShadow
            );
          }}
          onChange={(e) =>
            shadowPropertyValue(
              e,
              setShadowsStyles,
              ShadowsStyles,
              "verticalOffset",
              ActiveShadow
            )
          }
        />

        <SliderInput
          useEffectValue={ShadowsStyles[ActiveShadow].spread}
          sliderId={"spread"}
          defaultValue={ShadowsStyles[ActiveShadow].spread}
          valueTypes={["px", "em", "rem"]}
          ranges={[
            { min: 0, max: 100 },
            { min: 1, max: 10 },
            { min: 1, max: 10 },
          ]}
          step={1}
          title={"Spread"}
          iconName={"pan_zoom"}
          onClickFn={(e) => {
            unitChanger(
              e,
              "spread",
              setShadowsStyles,
              ShadowsStyles,
              ActiveShadow
            );
          }}
          onChange={(e) =>
            shadowPropertyValue(
              e,
              setShadowsStyles,
              ShadowsStyles,
              "spread",
              ActiveShadow
            )
          }
        />

        <SliderInput
          useEffectValue={ShadowsStyles[ActiveShadow].blur}
          sliderId={"blur"}
          defaultValue={ShadowsStyles[ActiveShadow].blur}
          valueTypes={["px", "em", "rem"]}
          ranges={[
            { min: 0, max: 100 },
            { min: 1, max: 10 },
            { min: 1, max: 10 },
          ]}
          step={1}
          title={"Blur"}
          iconName={"lens_blur"}
          onClickFn={(e) => {
            unitChanger(
              e,
              "blur",
              setShadowsStyles,
              ShadowsStyles,
              ActiveShadow
            );
          }}
          onChange={(e) =>
            shadowPropertyValue(
              e,
              setShadowsStyles,
              ShadowsStyles,
              "blur",
              ActiveShadow
            )
          }
        />

        {/* <ShadowInput
          label="Blur"
          icon="lens_blur"
          prop="blur"
          ShadowsStyles={ShadowsStyles}
          setShadowsStyles={setShadowsStyles}
          ActiveShadow={ActiveShadow}
          onChange={shadowPropertyValue}
          range={{ min: 0, max: 100 }}
        /> */}

        <div className="flex min-w-full justify-end">
          <span className="flex gap-2">
            Inset
            <input
              type="checkbox"
              className="w-6 h-6 border-[#f5f5f5] accent-accent"
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
        </div>
      </div>
      <div className="boxAdd flex gap-4 justify-between text-3">
        <div className="flex gap-4">
          <div className="flex gap-2">
            {ShadowsStyles.map((current, idx) => {
              return (
                <div
                  id={idx}
                  key={idx}
                  onClick={(e) => {
                    switchShadow(e, setActiveShadow, idx, ActiveShadow);
                  }}
                  className={` ${
                    ActiveShadow === idx ? "bg-accent text-white" : ""
                  } flex h-8 w-8 cursor-pointer select-none items-center justify-center rounded-[.25rem] border border-solid border-[#999999)]`}
                >
                  <span> {idx + 1} </span>
                </div>
              );
            })}
          </div>

          <button
            className="add-shadow flex max-w-[130px] flex-1 cursor-pointer select-none items-center justify-center gap-1 text-sm font-semibold"
            onClick={() => {
              newShadow(
                setNumOfShadows,
                numOfShadows,
                setShadowsStyles,
                ShadowsStyles,
                setActiveShadow,
                ActiveShadow
              );
            }}
          >
            <Icon name="ev_shadow_add" /> Add
          </button>
        </div>

        {numOfShadows > 1 && (
          <button
            className="remove-shadow flex select-none items-center gap-2 text-sm font-semibold hover:text-accent"
            onClick={() =>
              removeShadow(
                setShadowsStyles,
                ShadowsStyles,
                ActiveShadow,
                setActiveShadow,
                numOfShadows,
                setNumOfShadows,
                setRemoveShadow
              )
            }
          >
            <Icon name="ev_shadow_minus" /> Remove
          </button>
        )}
      </div>
    </ToolPane>
  );
};

export default OptionsBox;
