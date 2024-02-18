import ToolHeading from '../components/ToolsLayout/ToolHeading';
import CodeBlock from '../components/CodeBlock';
import TabSwitcher from '../components/TabSwitcher';
import GoDeeper from '../components/ToolsLayout/GoDeeper';
import { OptionsBoxTable } from '../components/TableGeneratorComponents/OptionsBoxTable';
import { TableGenerator } from '../components/TableGeneratorComponents/TableGenerator';
import { useState } from 'react';
import useExpander from '../hooks/useExpander';
import { generateMultidimensionalArray } from '../components/TableGeneratorComponents/TableGeneratorFN';
import {
  ToolPreviewPane,
  ToolSection,
  ToolSectionColumns,
} from '../components/ToolsLayout/Sections';
import ToolMain from '../components/ToolsLayout/ToolMain';

const Table = () => {
  const [tableConfig, setTableConfig] = useState({
    dimensions: generateMultidimensionalArray(16, 3),
    verticalCellPading: 4,
    horizontalCellPading: 0,
    tableWidth: '420',
    textAlign: 'center',
    borderRounding: 25,
    borderWidth: 1,
    borderStyle: 'solid',
    collapse: true,
    textColor: '#000',
    bgColor: '#F1F1F1',
    borderColor: '#000',
    headerText: '#ffffff',
    headerBg: '#663399',
  });
  const [isExpanded, toggleIsExpanded] = useExpander();

  return (
    <ToolMain>
      <ToolHeading
        title="Table Generator"
        tagline="Output any number of rows and columns, with placeholder content and styling."
        icon="table"
      ></ToolHeading>

      <ToolSectionColumns isExpanded={isExpanded}>
        <OptionsBoxTable
          tableConfig={tableConfig}
          setTableConfig={setTableConfig}
        />

        <ToolPreviewPane toggleIsExpanded={toggleIsExpanded}>
          <div className="px-8 py-12 h-[40rem]">
            <div className="w-full h-full max-h-full overflow-auto flex items-start justify-start">
              <TableGenerator
                tableConfig={tableConfig}
                setTableConfig={setTableConfig}
              />
            </div>
          </div>
          <p className="text-center">Click on any cell’s contents to edit.</p>
        </ToolPreviewPane>
      </ToolSectionColumns>
      <ToolSection
        className=""
        title="Code Snippets"
        icon="integration_instructions"
      >
        <TabSwitcher title="" buttons={['css', 'tailwind']}>
          <CodeBlock title="" code={''} lang="css" />
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
      </ToolSection>

      <GoDeeper
        linksData={[
          {
            url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow',
            textValue:
              'box-shadow from MDN - https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow ',
          },
          {
            url: 'https://www.w3schools.com/cssref/css3_pr_box-shadow.php',
            textValue:
              'box-shadow from W3 School - https://www.w3schools.com/cssref/css3_pr_box-shadow.php ',
          },
          {
            url: 'https://css-tricks.com/almanac/properties/b/box-shadow/',
            textValue:
              'box-shadow from Css-tricks - https://www.w3schools.com/cssref/css3_pr_box-shadow.php ',
          },
        ]}
      />
    </ToolMain>
  );
};

export default Table;
