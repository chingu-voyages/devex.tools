import InputColor from "./InputColor";
import { handleOptions } from "./TableGeneratorFN";

import { TableInputs } from "./TableInputs";
import Icon from "../Icon";
import { ToolPane } from "../ToolsLayout/Sections";


export const OptionsBoxTable = ({ tableConfig, setTableConfig }) => {
  return (
    <ToolPane title="Options" icon="tune" isPrimary={true}>
      <div className="flex flex-col gap-8 text-sm font-bold md:aspect-video lg:justify-evenly">
        <section className="layout flex flex-wrap justify-between gap-y-4 [&>*]:w-[48%]">
          <h3 className="border-b pb-1 border-[#D9D9D9] text-[18px] font-semibold min-w-full">
            Layout
          </h3>

          <TableInputs
            label="Rows"
            icon="table_rows"
            range={{ min: 2, max: 50 }}
            ShowUnits={false}
            tableConfig={tableConfig}
            setTableConfig={setTableConfig}
            prop="dimensions"
            delay={true}
          />

          <TableInputs
            label="Columns"
            icon="view_week"
            range={{ min: 1, max: 50 }}
            ShowUnits={false}
            tableConfig={tableConfig}
            setTableConfig={setTableConfig}
            prop="dimensions"
            delay={true}
          />
          <TableInputs
            label="Vertical Cell Padding"
            icon="padding"
            range={{ min: 0, max: 100 }}
            tableConfig={tableConfig}
            setTableConfig={setTableConfig}
            prop="verticalCellPading"
            delay={true}
          />

          <TableInputs
            label="Horizontal Cell Padding"
            icon="padding"
            range={{ min: 0, max: 100 }}
            tableConfig={tableConfig}
            setTableConfig={setTableConfig}
            prop="horizontalCellPading"
          />
          <TableInputs
            label="Table Width"
            icon="width"
            range={{ min: 0, max: 1024 }}
            tableConfig={tableConfig}
            setTableConfig={setTableConfig}
            prop="tableWidth"
          />
         
          <label className="my-1 flex h-full max-h-[51px] w-full flex-col gap-1 text-sm font-semibold">
            Text Alignment
            <div className="flex gap-x-2  justify-around py-2 ">
              <Icon
                className="cursor-pointer"
                name="format_align_left"
                id="left"
                onClick={(e) =>
                  handleOptions(
                    e.target.id,
                    "textAlign",
                    tableConfig,
                    setTableConfig
                  )
                }
              />
              <Icon
                className="cursor-pointer"
                name="format_align_center"
                id="center"
                onClick={(e) =>
                  handleOptions(
                    e.target.id,
                    "textAlign",
                    tableConfig,
                    setTableConfig
                  )
                }
              />
              <Icon
                className="cursor-pointer"
                name="format_align_right"
                id="right"
                onClick={(e) =>
                  handleOptions(
                    e.target.id,
                    "textAlign",
                    tableConfig,
                    setTableConfig
                  )
                }
              />
              <Icon
                className="cursor-pointer"
                name="format_align_justify"
                id="justify"
                onClick={(e) =>
                  handleOptions(
                    e.target.id,
                    "textAlign",
                    tableConfig,
                    setTableConfig,
                  )
                }
              />
            </div>
          </label>

          
        </section>

        <section className="borders flex flex-wrap justify-between [&>*]:w-[48%] gap-y-4">
          <h3 className="border-b border-[#D9D9D9] pb-1 text-[18px] font-semibold min-w-full">
            Borders
          </h3>
          <TableInputs
            label="Border Rounding"
            icon="line_curve"
            range={{ min: 0, max: 100 }}
            tableConfig={tableConfig}
            setTableConfig={setTableConfig}
            prop="borderRounding"
          />
          <TableInputs
            label="Border Width"
            icon="border_all"
            range={{ min: 0, max: 10 }}
            tableConfig={tableConfig}
            setTableConfig={setTableConfig}
            prop="borderWidth"
          />
          <div className="flex justify-start items-center">
            <label className="w-[10rem] text-sm font-semibold">
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
              className="h-[43px] w-full rounded-[.25rem] border border-gray-200"
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
        </section>
      </div>
    </ToolPane>
  );

/* TabsInput
          <TabsInput
            name={"text-align"}
            options={[
              {
                iconName: 'format_align_left',
                value: 'left',
                onClick: (e) =>
                handleOptions(
                  e.target.value,
                  "textAlign",
                  tableConfig,
                  setTableConfig
                )
              },
              {
                iconName: 'format_align_left',
                value: 'left',
                onClick: (e) =>
                handleOptions(
                  e.target.value,
                  "textAlign",
                  tableConfig,
                  setTableConfig
                )
              },
              {
                iconName: 'format_align_left',
                value: 'left',
                onClick: (e) =>
                handleOptions(
                  e.target.value,
                  "textAlign",
                  tableConfig,
                  setTableConfig
                )
              },
              {
                iconName: 'format_align_left',
                value: 'left',
                onClick: (e) =>
                handleOptions(
                  e.target.value,
                  "textAlign",
                  tableConfig,
                  setTableConfig
                )
              }
            ]}
            borderAroundOptions={false}
          />
*/

};
