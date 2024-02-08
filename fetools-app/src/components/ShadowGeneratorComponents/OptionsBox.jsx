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
} from "./ShadowGeneratorFN";

const OptionsBox = ({
  ShadowsStyles,
  setShadowsStyles,
  numOfShadows,
  setNumOfShadows,
  setActiveShadow,
  ActiveShadow,
}) => {
  //  console.log(ShadowsStyles[ActiveShadow])
  let color = tinycolor(ShadowsStyles[ActiveShadow].shadowColor).toHexString();

  return (
    <div className="  flex lg:max-w-[600px]   justify-evenly flex-col md:w-full lg:w-1/2 gap-y-6  ">
      <div className="flex justify-between  " id="Option1">
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
          />
          <img
            src={share}
            alt="share Icon"
            className="w-[24px] h-[24px] cursor-pointer "
          />
        </span>
      </div>

      <div id="Option2" className="flex flex-col md:flex-row gap-8">
        <div className="box-color w-full lg:w-1/2  lg:min-w-[242px] md:min-w-80   h-10 flex items-center justify-start px-1 border border-[color:var(--Design-Document-Outlines,#999)] border-solid  ">
          <input
            type="color"
            value={color}
            onChange={(e) => {
              
              colorChanger(e, setShadowsStyles, ShadowsStyles, ActiveShadow, false);
            }}
          />
          <input
            type="text"
            defaultValue={color}
            className="mx-2 border-none outline-none text-start flex-1"
            placeholder={color}
            onChange={(e) => {
              colorChanger(e, setShadowsStyles, ShadowsStyles, ActiveShadow);
            }}
          />
        </div>

        <span className="box-opacity  w-full lg:min-w-[242px] md:min-w-80   h-10 flex items-end px-1 ">
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

      <div className="flex gap-8 flex-col md:flex-row " id="Option4">
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
          range={{ min: -100, max: 100 }}
        />
      </div>

      <div className="Option5  ">
        <div className="boxAdd flex gap-2 ">
          {ShadowsStyles.map((current, idx) => {
            return (
              <div
                id={idx}
                key={idx}
                onClick={(e) => {
                  switchShadow(e, setActiveShadow, idx, ActiveShadow);
                }}
                className="w-8 h-8 border cursor-pointer border-[color:var(--Design-Document-Outlines,#999)] border-solid rounded-sm flex items-center justify-center"
              >
                <span> {current.id} </span>
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
            className="flex flex-1 max-w-[130px] cursor-pointer  justify-center items-center gap-1 "
          >
            <img src={addShadow} alt="Add Shadow Icon" />{" "}
            <strong className=""> Add Shadow</strong>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OptionsBox;
