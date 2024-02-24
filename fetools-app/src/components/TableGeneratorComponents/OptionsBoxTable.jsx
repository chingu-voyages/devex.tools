import { handleOptions, hanldeColorOptions } from "./TableGeneratorFN";
import { ToolPane } from "../ToolsLayout/Sections";
import ColorInput from "./../InputComponents/ColorInput";
import DropdownInput from "../InputComponents/DropdownInput";
import { useRef } from "react";
import SliderInput from "../InputComponents/SliderInput";
import TabsInput from "../InputComponents/TabsInput";

export const OptionsBoxTable = ({ tableConfig, setTableConfig }) => {
  const dropdownValueRef = useRef();
  const dropDownOptions = ["px", "em", "rem"];
  const ranges = [
    { min: 0, max: 35 },
    { min: 0, max: 35 },
    { min: 0, max: 35 }
  ];

  return (
    <ToolPane title="Options" icon="tune" isPrimary={true}>
      <div className="flex flex-col gap-8 text-sm font-bold md:aspect-video lg:justify-evenly">
        <section className="layout flex flex-wrap justify-between gap-y-4 [&>*]:w-[48%]">
          <h3 className="border-b pb-1 border-[#D9D9D9] text-[18px] font-semibold min-w-full">
            Layout
          </h3>

            
          <SliderInput
            useEffectValue={tableConfig.dimensions.length}
            sliderId={"Rows"}
            defaultValue={tableConfig.dimensions.length}
            valueTypes={['']}
            ranges={[
              { min: 1, max: 50 },
            ]}
            step={1}
            title={"Rows"}
            iconName={"table_rows"}
            onChange={(e)=> { setTimeout(() => {handleOptions(e.target.value,"Rows",tableConfig,setTableConfig ), 250})}}
          />


          <SliderInput
            useEffectValue={tableConfig.dimensions[0].length}
            sliderId={"Columns"}
            defaultValue={tableConfig.dimensions[0].length}
            valueTypes={['']}
            ranges={[
              { min: 0, max: 50 },
            ]}
            step={1}
            title={"Columns"}
            iconName={"view_week"}
            onChange={(e)=> { setTimeout(() => {handleOptions(e.target.value,"Cols",tableConfig,setTableConfig ), 250})}}
          />

          <SliderInput
            useEffectValue={tableConfig.verticalCellPading}
            sliderId={"vertical-cell-padding"}
            defaultValue={tableConfig.verticalCellPading}
            valueTypes={dropDownOptions}
            ranges={[
              { min: 0, max: 100 },
              { min: 0, max: 10 },
              { min: 0, max: 100 },
            ]}
            step={1}
            title={"Vertical Cell Padding"}
            iconName={"padding"}
            onChange={(e) => {
              setTableConfig({
                ...tableConfig,
                verticalCellPading: Number(e.target.value),
              });
            }}
          />

          <SliderInput
            useEffectValue={tableConfig.horizontalCellPading}
            sliderId={"horizontal-cell-padding"}
            defaultValue={tableConfig.horizontalCellPading}
            valueTypes={dropDownOptions}
            ranges={[
              { min: 0, max: 100 },
              { min: 0, max: 10 },
              { min: 0, max: 100 },
            ]}
            step={1}
            title={"Horizontal Cell Padding"}
            iconName={"padding"}
            onChange={(e) => {
              setTableConfig({
                ...tableConfig,
                horizontalCellPading: Number(e.target.value),
              });
            }}
          />

          <SliderInput
            useEffectValue={tableConfig.tableWidth}
            sliderId={"table-width"}
            defaultValue={tableConfig.tableWidth}
            valueTypes={dropDownOptions}
            ranges={[{min:0, max: 1024}]}
            step={1}
            title={"table Width"}
            iconName={"width"}
            onChange={(e) => {
              setTableConfig({
                ...tableConfig,
                tableWidth: e.target.value,
              });
            }}
          />

          <TabsInput
            name={"text-align"}
            title={"Text Align"}
            defaultOption={1}
            optionSize={{ width: 32, height: 32 }}
            options={[
              {
                iconName: "format_align_left",
                value: "left",
                onClick: (e) =>
                  handleOptions(
                    e.target.value,
                    "textAlign",
                    tableConfig,
                    setTableConfig
                  ),
              },
              {
                iconName: "format_align_center",
                value: "center",
                onClick: (e) =>
                  handleOptions(
                    e.target.value,
                    "textAlign",
                    tableConfig,
                    setTableConfig
                  ),
              },
              {
                iconName: "format_align_right",
                value: "right",
                onClick: (e) =>
                  handleOptions(
                    e.target.value,
                    "textAlign",
                    tableConfig,
                    setTableConfig
                  ),
              },
              {
                iconName: "format_align_justify",
                value: "justify",
                onClick: (e) =>
                  handleOptions(
                    e.target.value,
                    "textAlign",
                    tableConfig,
                    setTableConfig
                  ),
              },
            ]}
            borderAroundOptions={false}
          />
        </section>

        <section className="borders flex flex-wrap justify-between [&>*]:w-[48%] gap-y-4">
          <h3 className="border-b border-[#D9D9D9] pb-1 text-[18px] font-semibold min-w-full">
            Borders
          </h3>

          <SliderInput
            useEffectValue={tableConfig.borderRounding}
            sliderId={"border-rounding"}
            defaultValue={tableConfig.borderRounding}
            valueTypes={dropDownOptions}
            ranges={ranges}
            step={1}
            title={"Border Rounding"}
            iconName={"line_curve"}
            onChange={(e) => {
              setTableConfig({
                ...tableConfig,
                borderRounding: e.target.value,
              });
            }}
          />

          <SliderInput
            useEffectValue={tableConfig.borderWidth}
            sliderId={"border-width"}
            defaultValue={tableConfig.borderWidth}
            valueTypes={dropDownOptions}
            ranges={ranges}
            step={1}
            title={"Border Width"}
            iconName={"border_all"}
            onChange={(e) => {
              setTableConfig({
                ...tableConfig,
                borderWidth: e.target.value,
              });
            }}
          />

          <div className="flex justify-start items-center">
            <DropdownInput
              ref={dropdownValueRef}
              className="flex-row items-center gap-2"
              callbackFun={() =>
                setTableConfig({
                  ...tableConfig,
                  borderStyle: dropdownValueRef.current,
                })
              }
              title="Border Style:"
              dropdownOptions={["solid", "dotted", "dashed", "double", "none"]}
            />
          </div>

         
          <div className="flex gap-2 items-center justify-end">
            <strong className>Collapse Border</strong>
            <input
              defaultChecked={true}
              type="checkbox"
              className="w-6 h-6 accent-accent"
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
        </section>
        <section className="colors flex flex-wrap justify-between [&>*]:w-[48%] gap-y-4">
          <h3 className="min-w-full border-b border-[#D9D9D9] pb-1 text-[18px] font-semibold">
            Colors
          </h3>

          <ColorInput
            title={"Text"}
            placeholder={tableConfig.textColor}
            id="table-text-color"
            onChange={(e) => {
              hanldeColorOptions(
                e.target.value,
                tableConfig,
                setTableConfig,
                "textColor"
              );
            }}
          />

          <ColorInput
            title={"Background"}
            placeholder={tableConfig.bgColor}
            id="table-background-color"
            onChange={(e) => {
              hanldeColorOptions(
                e.target.value,
                tableConfig,
                setTableConfig,
                "bgColor"
              );
            }}
          />

          <ColorInput
            title={"Border"}
            placeholder={tableConfig.borderColor}
            id="table-border-color"
            onChange={(e) => {
              hanldeColorOptions(
                e.target.value,
                tableConfig,
                setTableConfig,
                "borderColor"
              );
            }}
          />

          <ColorInput
            title={"Header Text"}
            placeholder={tableConfig.headerText}
            value={tableConfig.headerText}
            id="table-header-text-color"
            onChange={(e) => {
              hanldeColorOptions(
                e.target.value,
                tableConfig,
                setTableConfig,
                "headerText"
              );
            }}
          />

          <ColorInput
            title={"Header Background"}
            placeholder={tableConfig.headerBg}
            value={tableConfig.headerBg}
            id="table-header-background-color"
            onChange={(e) => {
              hanldeColorOptions(
                e.target.value,
                tableConfig,
                setTableConfig,
                "headerBg"
              );
            }}
          />
        </section>
      </div>
    </ToolPane>
  );

};
