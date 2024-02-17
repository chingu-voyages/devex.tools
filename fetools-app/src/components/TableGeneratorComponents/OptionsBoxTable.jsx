import optionMenu from "../../assets/tune.svg";
import addbookmark from "../../assets/bookmark_add.svg";
import share from "../../assets/share.svg";
import rowsAndCols from "../../assets/table.svg";
import paddingIcons from "../../assets/padding.svg";
import doubleArrows from "../../assets/doubleArrow.svg";
import alingLeft from "../../assets/text-left.svg";
import alingright from "../../assets/text-right.svg";
import alingjustify from "../../assets/text-justify.svg";
import alingcenter from "../../assets/text-center.svg";
import lineCurve from "../../assets/line_curve.svg";
import borderWidth from "../../assets/border_all.svg";
import InputColor from "./InputColor";
import { handleOptions } from "./TableGeneratorFN";

import { TableInputs } from "./TableInputs";

export const OptionsBoxTable = ({ tableConfig, setTableConfig }) => {
  return (
    <div className="md:aspect-video  lg:px-9 mx-2 lg:w-1/2  text-sm flex flex-col gap-6 lg:justify-evenly font-bold ">
      <div className="flex justify-between max-h-[36px]" id="Option1">
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
            alt="share Icon"
            src={share}
            className="w-[24px] h-[24px] cursor-pointer "
          />
        </span>
      </div>

      <div>
        <h3 className="border-b font-semibold text-[18px] border-[#D9D9D9] ">
          Layout
        </h3>

        <div id="Option2" className="flex flex-col md:flex-row gap-4">
          <TableInputs
            label="Rows"
            iconSrc={rowsAndCols}
            range={{ min: 2, max: 50 }}
            ShowUnits={false}
            tableConfig={tableConfig}
            setTableConfig={setTableConfig}
            prop="dimensions"
            delay={true}
          />

          <TableInputs
            label="Columns"
            iconSrc={rowsAndCols}
            rotate={true}
            range={{ min: 1, max: 50 }}
            ShowUnits={false}
            tableConfig={tableConfig}
            setTableConfig={setTableConfig}
            prop="dimensions"
            delay={true}
          />
        </div>
      </div>

      <div id="Option3" className="flex flex-col md:flex-row gap-6">
        <TableInputs
          label="Vertical Cell Padding"
          iconSrc={paddingIcons}
          range={{ min: 0, max: 100 }}
          tableConfig={tableConfig}
          setTableConfig={setTableConfig}
          prop="verticalCellPading"
          delay={true}
        />

        <TableInputs
          label="Horizontal Cell Padding"
          iconSrc={paddingIcons}
          rotate={true}
          range={{ min: 0, max: 100 }}
          tableConfig={tableConfig}
          setTableConfig={setTableConfig}
          prop="horizontalCellPading"
        />
      </div>

      <div id="Option4" className="flex flex-col md:flex-row gap-6">
        <TableInputs
          label="Table Width"
          iconSrc={doubleArrows}
          range={{ min: 0, max: 100 }}
          tableConfig={tableConfig}
          setTableConfig={setTableConfig}
          prop="tableWidth"
        />

        <label className="flex flex-col gap-1 font-semibold lg:mx-w-[242px] max-h-[51px] h-full w-full my-1 text-sm">
          Text Alignment
          <div className="flex gap-x-2  justify-around py-2 ">
            <img
              src={alingLeft}
              className="w-4 h-4 cursor-pointer"
              alt="start"
              onClick={(e) =>
                handleOptions(
                  e,
                  "textAlign",
                  tableConfig,
                  setTableConfig,
                  e.target.alt
                )
              }
            />
            <img
              src={alingcenter}
              className="w-4 h-4 cursor-pointer"
              alt="center"
              onClick={(e) =>
                handleOptions(
                  e,
                  "textAlign",
                  tableConfig,
                  setTableConfig,
                  e.target.alt
                )
              }
            />
            <img
              src={alingright}
              className="w-4 h-4 cursor-pointer"
              alt="end"
              onClick={(e) =>
                handleOptions(
                  e,
                  "textAlign",
                  tableConfig,
                  setTableConfig,
                  e.target.alt
                )
              }
            />
            <img
              src={alingjustify}
              className="w-4 h-4 cursor-pointer"
              alt="justify"
              onClick={(e) =>
                handleOptions(
                  e,
                  "textAlign",
                  tableConfig,
                  setTableConfig,
                  e.target.alt
                )
              }
            />
          </div>
        </label>
      </div>

      <h3 className="border-b font-semibold text-[18px] border-[#D9D9D9] ">
        Borders
      </h3>
      <div id="Option5" className="grid grid-cols-1 grid-row-2  gap-6">
        <TableInputs
          label="Border Rounding"
          iconSrc={lineCurve}
          range={{ min: 0, max: 100 }}
          tableConfig={tableConfig}
          setTableConfig={setTableConfig}
          prop="borderRounding"
        />

        <TableInputs
          label="Border Width"
          iconSrc={borderWidth}
          range={{ min: 0, max: 10 }}
          tableConfig={tableConfig}
          setTableConfig={setTableConfig}
          prop="borderWidth"
        />

        <div className="flex justify-between  ">
          <div className="flex justify-start w-1/2 ">
            <label className="flex flex-col gap-1 font-semibold lg:mx-w-[242px] max-h-[51px] h-full w-full my-1 text-sm max-w-24">
              Border Style:
            </label>

            <select
              onChange={(e) =>
                handleOptions(
                  e.target.value,
                  "borderStyle",
                  tableConfig,
                  setTableConfig
                )
              }
              name=""
              className="border border-gray-200 w-full max-w-60"
            >
              <option value="solid"> solid </option>
              <option value="none">none</option>
              <option value="dotted"> dotted </option>
              <option value="dashed solid"> dashed solid </option>
              <option value="dashed double none"> dashed double none </option>
              <option value="dashed groove none dotted">
                dashed groove none dotted{" "}
              </option>
              <option value="dashed groove none dotted">
                dashed groove none dotted{" "}
              </option>
            </select>
          </div>

          <div className="  flex gap-2 items-center justify-end w-1/2 ">
            <strong className>Collapse</strong>
            <input
              type="checkbox"
              onChange={(e) => {
                handleOptions(
                  e.target.checked,
                  "collapse",
                  tableConfig,
                  setTableConfig
                );
              }}
            />
          </div>
        </div>
      </div>

      <h3 className="border-b font-semibold text-[18px] border-[#D9D9D9] ">
        Colors
      </h3>
      <div id="Option5" className="grid md:grid-cols-2">
        <InputColor
          labelText="Text"
          tableConfig={tableConfig}
          setTableConfig={setTableConfig}
          prop="textColor"
        />
        <InputColor
          labelText="Background"
          tableConfig={tableConfig}
          setTableConfig={setTableConfig}
          prop="bgColor"
        />
        <InputColor
          labelText="Border"
          tableConfig={tableConfig}
          setTableConfig={setTableConfig}
          prop="borderColor"
        />
        <InputColor
          labelText="Header Text"
          prop="headerText"
          tableConfig={tableConfig}
          setTableConfig={setTableConfig}
        />
        <InputColor
          labelText="Header Background"
          tableConfig={tableConfig}
          setTableConfig={setTableConfig}
          prop="headerBg"
        />
      </div>
    </div>
  );
};
