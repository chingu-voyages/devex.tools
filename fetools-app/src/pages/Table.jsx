import ToolHeading from "../components/ToolsLayout/ToolHeading";
import ToolHeaderSection from "../components/ToolsLayout/ToolHeaderSection";
import CodeBlock from "../components/CodeBlock";
import PageSection from "../components/PageLayout/PageSection";
import TabSwitcher from "../components/TabSwitcher";
import GoDeeper from "../components/ToolsLayout/GoDeeper";
import { OptionsBoxTable } from "../components/TableGeneratorComponents/OptionsBoxTable";
import { TableGenerator } from "../components/TableGeneratorComponents/TableGenerator";
import { useState } from "react";
import "react-indiana-drag-scroll/dist/style.css";
import { generateMultidimensionalArray } from "../components/TableGeneratorComponents/TableGeneratorFN";
import { Scrollbars } from "react-custom-scrollbars-2";

const Table = () => {
  const [tableConfig, setTableConfig] = useState({
    dimensions: generateMultidimensionalArray(24, 3),
    verticalCellPading: 0,
    horizontalCellPading: 0,
    tableWidth: "500",
    textAlign: "center",
    borderRounding: 25,
    borderWidth: 1,
    borderStyle: "solid",
    collapse: true,
    textColor: "#000",
    bgColor: "#F1F1F1",
    borderColor: "#000",
    headerText: "#ffffff",
    headerBg: "#FF007A",
  });

  return (
    <>
      <ToolHeaderSection>
        <ToolHeading
          title="Table Generator"
          tagline="Output any number of rows and columns, with placeholder content and styling."
        ></ToolHeading>
      </ToolHeaderSection>

      <PageSection title="" icon="">
        <div className="flex flex-col lg:flex-row-reverse lg:max-h-[786px] ">
          <OptionsBoxTable
            tableConfig={tableConfig}
            setTableConfig={setTableConfig}
          />

          <div className="display flex flex-col justify-center h-fit  m-7 lg:m-0   lg:w-1/2 w-full ">
            <Scrollbars
              style={{
                width: "100%",
                height: 608,
                borderRadius: tableConfig.borderRounding,
                borderWidth: tableConfig.borderWidth,
                borderStyle: tableConfig.borderStyle,
                borderColor: tableConfig.borderColor
              }}
              className=" max-h-[608px] w-full border-black "
            >
              <TableGenerator tableConfig={tableConfig} setTableConfig={setTableConfig} />
              
            </Scrollbars>
            <div className="flex justify-between py-2" > <span>Click on any cell’s contents to edit.</span>   </div>
          </div>
        </div>
      </PageSection>
      <PageSection
        className=""
        title="Code Snippets"
        icon="integration_instructions"
      >
        <TabSwitcher title="" buttons={["css", "tailwind"]}>
          <CodeBlock title="" code={""} lang="css" />
          <CodeBlock
            title=""
            code={` /* Add this to your tailwind.config.js file */
            module.exports = {
              theme: {
                extend: {
                  boxShadow: {
                    '3xl': ,
                  }
                }
              }
            }
          `}
            lang="css"
          />
        </TabSwitcher>
      </PageSection>

      <PageSection title="Go Deeper" icon="school">
        <GoDeeper
          linksData={[
            {
              url: "https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow",
              textValue:
                "box-shadow from MDN - https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow ",
            },
            {
              url: "https://www.w3schools.com/cssref/css3_pr_box-shadow.php",
              textValue:
                "box-shadow from W3 School - https://www.w3schools.com/cssref/css3_pr_box-shadow.php ",
            },
            {
              url: "https://css-tricks.com/almanac/properties/b/box-shadow/",
              textValue:
                "box-shadow from Css-tricks - https://www.w3schools.com/cssref/css3_pr_box-shadow.php ",
            },
          ]}
        />
      </PageSection>
    </>
  );
};

export default Table;
