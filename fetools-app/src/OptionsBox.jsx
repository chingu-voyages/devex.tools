import optionMenu from "../../assets/tune.svg";
import addbookmark from "../../assets/bookmark_add.svg";
import share from "../../assets/share.svg";
import opacityIcon from "../../assets/opacity.svg";
import doubleArrow from "../../assets/doubleArrow.svg";
import zoom from "../../assets/pan_zoom.svg";
import blur from "../../assets/blur.svg";
import addShadow from "../../assets/ev_shadow_add.svg";
import tinycolor from "tinycolor2";
import { ShadowInput } from "./ShadowInput";

import {
  colorChanger,
  opacityChanger,
  shadowPropertyValue,
  newShadow,
  switchShadow,
  removeShadow,
} from "./ShadowGeneratorFN";

const OptionsBox = ({
  ShadowsStyles,
  setShadowsStyles,
  numOfShadows,
  setNumOfShadows,
  setActiveShadow,
  ActiveShadow,
  setRemoveShadow,
}) => {
  // debugger
  let color = tinycolor(ShadowsStyles[ActiveShadow].shadowColor).toHexString();

  // xl:aspect-square  flex  xl:max-h-[457px]  h-full flex-col md:w-full  flex-1 gap-y-6 xl:mx-12 rounded-r-sm
  return (
    <div className="md:aspect-video  lg:px-9 mx-2 lg:w-1/2  text-sm flex flex-col gap-6 lg:justify-evenly ">
      <div className="flex justify-between  max-h-[36px]" id="Option1">
        <span className="flex items-center">
          <img
            src={optionMenu}
            alt="Option Menu"
            className="w-[24px] h-[24px] m-1"
          />
          <h3 className="text-[32px] font-bold text-primary">Options</h3>
        </span>

        <span className="flex items-center gap-4">
          <img
            src={addbookmark}
            alt="book mark"
            className="w-[24px] h-[24px]  cursor-pointer "
            onClick={() => {
              localStorage.removeItem("ShadowStyle");
              localStorage.setItem(
                "ShadowStyle",
                JSON.stringify(ShadowsStyles)
              );
            }}
          />
          <img
            src={share}
            alt="share Icon"
            className="w-[24px] h-[24px] cursor-pointer "
          />
        </span>
      </div>

      <div id="Option2" className="flex flex-col md:flex-row gap-8">
        <div className="box-color md:w-1/2  h-10 flex items-center justify-start px-1 border border-[color:var(--Design-Document-Outlines,#999)] border-solid  ">
          <input
            type="color"
            value={color}
            onChange={(e) => {
              colorChanger(
                e,
                setShadowsStyles,
                ShadowsStyles,
                ActiveShadow,
                false
              );
            }}
          />
          <input
            type="text"
            className="mx-2 border-none outline-none text-start flex-1"
            placeholder={color}
            onChange={(e) => {
              colorChanger(e, setShadowsStyles, ShadowsStyles, ActiveShadow);
            }}
          />
        </div>

        <span className="box-opacity  md:w-1/2   max-h-[43px]   flex items-end px-1 ">
          <div className="flex flex-col gap-1  ">
            <strong>Opacity</strong>
            <div className="flex gap-x-1">
              <img src={opacityIcon} alt="Opacity Icon" />
              <span>{ShadowsStyles[ActiveShadow].opacity}%</span>
            </div>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={ShadowsStyles[ActiveShadow].opacity}
            defaultValue={30}
            step="1"
            className={` ml-3 w-full  rounded-3xl h-[8px] `}
            onChange={(e) => {
              opacityChanger(e, setShadowsStyles, ShadowsStyles, ActiveShadow);
            }}
          />
        </span>
      </div>

      <div className="flex flex-col md:flex-row gap-8" id="Option3">
        <ShadowInput
          label="Horizontal Offset"
          iconSrc={doubleArrow}
          prop="horizontalOffset"
          ShadowsStyles={ShadowsStyles}
          setShadowsStyles={setShadowsStyles}
          ActiveShadow={ActiveShadow}
          onChange={shadowPropertyValue}
          range={{ min: -50, max: 50 }}
        />

        <ShadowInput
          label="Vertical Offset"
          iconSrc={doubleArrow}
          prop="verticalOffset"
          ShadowsStyles={ShadowsStyles}
          setShadowsStyles={setShadowsStyles}
          ActiveShadow={ActiveShadow}
          onChange={shadowPropertyValue}
          range={{ min: -50, max: 50 }}
        />
      </div>

      <div className="flex gap-8 flex-col md:flex-row" id="Option4">
        <ShadowInput
          label="Spread"
          iconSrc={zoom}
          prop="spread"
          ShadowsStyles={ShadowsStyles}
          setShadowsStyles={setShadowsStyles}
          ActiveShadow={ActiveShadow}
          onChange={shadowPropertyValue}
          range={{ min: -100, max: 100 }}
        />

        <ShadowInput
          label="Blur"
          iconSrc={blur}
          prop="blur"
          ShadowsStyles={ShadowsStyles}
          setShadowsStyles={setShadowsStyles}
          ActiveShadow={ActiveShadow}
          onChange={shadowPropertyValue}
          inset={true}
          range={{ min: 0, max: 100 }}
        />
      </div>

      <div className="Option5  ">
        <div className="boxAdd flex gap-2 justify-around text-[12px] ">
          {ShadowsStyles.map((current, idx) => {
            return (
              <div
                id={idx}
                key={idx}
                onClick={(e) => {
                  switchShadow(e, setActiveShadow, idx, ActiveShadow);
                }}
                className={` ${
                  ActiveShadow === idx ? "bg-black text-white" : ""
                }  w-8 h-8 border cursor-pointer  border-[color:var(--Design-Document-Outlines,#999)] border-solid rounded-sm flex items-center justify-center`}
              >
                <span> {idx + 1} </span>
              </div>
            );
          })}

          <button
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
            className="flex flex-1 max-w-[130px] cursor-pointer  justify-center items-center gap-1  text-[12px]"
          >
            <img src={addShadow} alt="Add Shadow Icon" />{" "}
            <strong className=""> Add Shadow</strong>
          </button>

          <button
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
            className="font-semibold underline"
          >
            remove this shadow
          </button>
        </div>
      </div>
    </div>
  );
};

export default OptionsBox;
