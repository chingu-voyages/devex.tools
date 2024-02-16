import ToolHeading from "../components/ToolsLayout/ToolHeading";
import ToolHeaderSection from "../components/ToolsLayout/ToolHeaderSection";
import OptionsBox from "../components/ShadowGeneratorComponents/OptionsBox";
import CodeBlock from "../components/CodeBlock";
import Toast from "../components/Toast";
import { useState, useRef, useEffect } from "react";
import {
  generateCssRule,
  updateId
} from "../components/ShadowGeneratorComponents/ShadowGeneratorFN";
import PageSection from "../components/PageLayout/PageSection";
import TabSwitcher from "../components/TabSwitcher";
import GoDeeper from "../components/ToolsLayout/GoDeeper";
import { useSearchParams } from "react-router-dom";
import useToastState from "../hooks/useToastState";

const ShadowGenerator = () => {
  const [firstRender, setFirstRender] = useState(false);
  const [ShadowsStyles, setShadowsStyles] = useState([
    {
      id: 0,
      shadowColor: "rgba(51, 51, 51, 25%)",
      opacity: 30,
      horizontalOffset: 10,
      verticalOffset: 10,
      spread: 0,
      blur: 5,
      inset: false,
      units: {
        horizontalOffset: "px",
        verticalOffset: "px",
        spread: "px",
        blur: "px",
      },
    },
  ]);
  const [currentStyle, setCurrentStyle] = useState([]);
  const [ActiveShadow, setActiveShadow] = useState(0);
  const [numOfShadows, setNumOfShadows] = useState(1);
  const [removeShadow, setRemoveShadow] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();
  const toastState = useToastState()

  const box = useRef();

  useEffect(() => {
    const applyBoxShadow = (styles) => {
      const cssRule = generateCssRule(styles);
      box.current.style.boxShadow = cssRule.join(", ");
      setCurrentStyle(cssRule);
    };

    if (firstRender && localStorage.getItem("ShadowStyle")) {
      const localStorageValue = JSON.parse(localStorage.getItem("ShadowStyle"));
      const newState = localStorageValue.filter((obj) => obj.id !== 0);
      setShadowsStyles(newState);
      setShadowsStyles(localStorageValue);
      setFirstRender(false);
    }

  
    if (removeShadow) {
      updateId(ShadowsStyles, setShadowsStyles, setRemoveShadow);
    }

    applyBoxShadow(ShadowsStyles);
  }, [ShadowsStyles, ActiveShadow, searchParams]);

  console.log(searchParams)
  return (
    <>
      <ToolHeaderSection>
        <ToolHeading
          title="Shadow Creator"
          tagline="Generate unique box shadows for your elements."
        ></ToolHeading>
      </ToolHeaderSection>
      {/* className="flex max-w flex-col-reverse bg-red-800 lg:flex-row  justify-center  gap-3 mx-6 md:mx-12 rounded-sm xl:border border-[color:var(--Design-Document-Outlines,#999)] border-solid" */}
      <PageSection icon="" title="" className="w-full ">
        <div className="flex flex-col-reverse  lg:flex-row  justify-center ">
          <div className="bg-[#FFF2F8] flex justify-center items-center  lg:h-[457px]  md:aspect-video lg:aspect-auto  rounded-l-sm overflow-hidden text-base  w-full flex-1     ">
            <div
              ref={box}
              className="box-shadow w-[280px] h-44  rounded-2xl bg-[#FF007A]"
            ></div>
          </div>
          <OptionsBox
            ShadowsStyles={ShadowsStyles}
            setShadowsStyles={setShadowsStyles}
            numOfShadows={numOfShadows}
            setNumOfShadows={setNumOfShadows}
            ActiveShadow={ActiveShadow}
            setActiveShadow={setActiveShadow}
            setRemoveShadow={setRemoveShadow}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </div>
      </PageSection>

      <PageSection
        className=""
        title="Code Snippets"
        icon="integration_instructions"
      >
        <TabSwitcher title="" buttons={["css", "tailwind"]}>
          <CodeBlock
            title=""
            code={`box-shadow: ${currentStyle.toString()}`}
            lang="css"
            toastState={toastState}
          />
          <CodeBlock
            title=""
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
        <Toast toastState={toastState}/>
      </PageSection>
    </>
  );
};

function handleQuery(ShadowStylesObj) {
  setSearchParams({ Arr: ShadowStyles });
}

export default ShadowGenerator;
