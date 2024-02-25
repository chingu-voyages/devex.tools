// React
import { useState, useRef, useEffect } from 'react';

// Layout
import {
  ToolPreviewPane,
  ToolSection,
  ToolSectionColumns,
} from '../components/ToolsLayout/Sections';
import ToolMain from '../components/ToolsLayout/ToolMain';
import ToolHeading from '../components/ToolsLayout/ToolHeading';
import GoDeeper from '../components/ToolsLayout/GoDeeper';

// Global Components
import TabSwitcher from '../components/TabSwitcher';
import CodeBlock from '../components/CodeBlock';

// Expander
import useExpander from '../hooks/useExpander';

// Toast
import Toast from '../components/Toast';
import useToastState from '../hooks/useToastState';

// Shadow Creator Components
import OptionsBox from '../components/ShadowCreator/OptionsBox';
import {
  generateCssRule,
  updateId,
} from '../components/ShadowCreator/ShadowCreatorFN';

const ShadowCreator = () => {
  const [firstRender, setFirstRender] = useState(false);
  const [ShadowsStyles, setShadowsStyles] = useState([
    {
      id: 0,
      shadowColor: 'rgba(51, 51, 51, 25%)',
      opacity: 30,
      horizontalOffset: 10,
      verticalOffset: 10,
      spread: 0,
      blur: 5,
      inset: false,
      units: {
        opacity: '%',
        horizontalOffset: 'px',
        verticalOffset: 'px',
        spread: 'px',
        blur: 'px',
      },
    },
  ]);
  const [currentStyle, setCurrentStyle] = useState([]);
  const [ActiveShadow, setActiveShadow] = useState(0);
  const [numOfShadows, setNumOfShadows] = useState(1);
  const [removeShadow, setRemoveShadow] = useState(false);

  const toastState = useToastState();
  const [isExpanded, toggleIsExpanded] = useExpander();

  const box = useRef();

  useEffect(() => {
    const applyBoxShadow = styles => {
      const cssRule = generateCssRule(styles);
      box.current.style.boxShadow = cssRule.join(',');
      setCurrentStyle(cssRule);
    };

    if (firstRender && localStorage.getItem('ShadowStyle')) {
      const localStorageValue = JSON.parse(localStorage.getItem('ShadowStyle'));
      const newState = localStorageValue.filter(obj => obj.id !== 0);
      setShadowsStyles(newState);
      setShadowsStyles(localStorageValue);
      setFirstRender(false);
    }

    if (removeShadow) {
      updateId(ShadowsStyles, setShadowsStyles, setRemoveShadow);
    }

    // console.log(ShadowsStyles);
    applyBoxShadow(ShadowsStyles);
  }, [ShadowsStyles, ActiveShadow]);

  

  return (
    <ToolMain>
      <ToolHeading
        title="Shadow Creator"
        tagline="Generate unique box shadows for your elements."
        icon="ev_shadow"
      ></ToolHeading>

      <ToolSectionColumns
        isExpanded={isExpanded}
        toggleIsExpanded={toggleIsExpanded}
      >
        <OptionsBox
          ShadowsStyles={ShadowsStyles}
          setShadowsStyles={setShadowsStyles}
          numOfShadows={numOfShadows}
          setNumOfShadows={setNumOfShadows}
          ActiveShadow={ActiveShadow}
          setActiveShadow={setActiveShadow}
          setRemoveShadow={setRemoveShadow}
        />
        <ToolPreviewPane
          isExpanded={isExpanded}
          toggleIsExpanded={toggleIsExpanded}
        >
          <div className="flex h-80 min-h-full items-center justify-center overflow-hidden rounded-bl-lg border-r">
            <div
              ref={box}
              className=" h-44 w-[280px] rounded-2xl bg-[#cccccc]"
            ></div>
          </div>
        </ToolPreviewPane>
      </ToolSectionColumns>

      <ToolSection
        className=""
        title="Code Snippets"
        icon="integration_instructions"
      >
        <TabSwitcher buttons={['CSS', 'Tailwind']}>
          <CodeBlock
            title="CSS"
            code={`box-shadow: ${currentStyle.toString()}`}
            lang="css"
            toastState={toastState}
          />
          <CodeBlock
            title="Tailwind"
            code={` /* Add this to your tailwind.config.js file */
            module.exports = {
              theme: {
                extend: {
                  boxShadow: {
                    '3xl': ${currentStyle.toString()},
                  }
                }
              }
            }
          `}
            lang="css"
            toastState={toastState}
          />
        </TabSwitcher>
      </ToolSection>

      <GoDeeper
        linksData={[
          {
            url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow',
            textValue: 'box-shadow from MDN',
          },
          {
            url: 'https://www.w3schools.com/cssref/css3_pr_box-shadow.php',
            textValue: 'box-shadow from W3 Schools',
          },
          {
            url: 'https://css-tricks.com/almanac/properties/b/box-shadow/',
            textValue: 'box-shadow from CSS-Tricks',
          },
        ]}
      />
      <Toast toastState={toastState} />
    </ToolMain>
  );
};

export default ShadowCreator;
