import ToolHeading from "../components/ToolsLayout/ToolHeading";
import ToolHeaderSection from "../components/ToolsLayout/ToolHeaderSection";
import OptionsBox from "../components/ShadowGeneratorComponents/OptionsBox";
import CodeBlock from "../components/CodeBlock";
import { useState, useRef, useEffect } from "react";
import {
  generateCssRule,
  updateId,
} from "../components/ShadowGeneratorComponents/ShadowGeneratorFN";

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

    console.log(ShadowsStyles);

    applyBoxShadow(ShadowsStyles);
  }, [ShadowsStyles, ActiveShadow]);

  return (
    <>
      <ToolHeaderSection>
        <ToolHeading
          title="Shadow Creator"
          tagline="Generate unique box shadows for your elements."
        ></ToolHeading>
      </ToolHeaderSection>

      <section className="lg:mx-48 flex flex-col-reverse xl:flex-row 2 justify-center   mx-6 md:mx-12">
       

        <div className="bg-[#FFF2F8]  overflow-hidden text-base lg:max-w-1/2 w-full aspect-square md:aspect-video xl:aspect-square xl:max-h-[457px] xl:max-w-[600px] flex justify-center items-center border-l border-t border-b border-r xl:border-r-none border-[color:var(--Design-Document-Outlines,#999)] border-solid">
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
        />
      </section>

      <section className="lg:mx-48">
        <CodeBlock title="Code" code={"box-shadow"} unit={currentStyle} />
      </section>

      <section className="lg:mx-48">{/* <GoDeeper/> */}</section>
    </>
  );
};

export default ShadowGenerator;
