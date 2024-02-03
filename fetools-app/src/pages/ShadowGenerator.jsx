import ToolHeading from "../components/ToolsLayout/ToolHeading";
import ToolHeaderSection from "../components/ToolsLayout/ToolHeaderSection";
import OptionsBox from "../components/ShadowGeneratorComponents/OptionsBox";
import CodeBlock from "../components/CodeBlock";
import { useState, useRef, useEffect } from "react";
import tinycolor from "tinycolor2";

const ShadowGenerator = () => {
  const [ShadowsStyles, setShadowsStyles] = useState([
    {
      id: 1,
      shadowColor: "rgba(144, 4, 186, 30%)",
      opacity: 30,
      horizontalOffset: 5,
      verticalOffset: 5,
      spread: 5,
      blur: 10,
      inset: false,
    },
  ]);
  const [currentStyle, setCurrentStyle] = useState([]);
  const [ActiveShadow, setActiveShadow] = useState(0);
  const [numOfShadows, setNumOfShadows] = useState(1);

  const box = useRef();

  useEffect(() => {
    let color;
    const cssRule = ShadowsStyles.map(
      ({
        inset,
        horizontalOffset,
        verticalOffset,
        blur,
        spread,
        shadowColor,
        opacity,
      }) => {
        color = tinycolor(shadowColor).setAlpha(opacity / 100);

        return `${
          inset ? "inset" : ""
        } ${horizontalOffset}px ${verticalOffset}px ${blur}px ${spread}px ${color.toString()}`;
      }
    );

    
    box.current.style.boxShadow = cssRule.join(", ");
    setCurrentStyle(cssRule);
    console.log(ShadowsStyles[ActiveShadow].shadowColor)
  }, [ShadowsStyles, ActiveShadow]);

  return (
    <>
      <ToolHeaderSection>
        <ToolHeading
          title="Shadow Creator"
          tagline="Generate unique box shadows for your elements."
        ></ToolHeading>
      </ToolHeaderSection>

      <section className="lg:mx-48 flex flex-col-reverse xl:flex-row 2xl:gap-16 justify-center   mx-6 md:mx-12">
        <h2 className="lg:hidden" >Prewiev</h2>

        <div className=" lg:max-w-1/2 w-full aspect-square md:aspect-video xl:aspect-square max-h-[414px] xl:max-w-[600px] flex justify-center items-center border border-[color:var(--Design-Document-Outlines,#999)] border-solid">
          <div
            ref={box}
            className="box-shadow w-[280px] h-44 bg-[#D9D9D9] rounded-2xl"
          ></div>
        </div>
        <OptionsBox
          ShadowsStyles={ShadowsStyles}
          setShadowsStyles={setShadowsStyles}
          numOfShadows={numOfShadows}
          setNumOfShadows={setNumOfShadows}
          ActiveShadow={ActiveShadow}
          setActiveShadow={setActiveShadow}
        />
      </section>

      <section className="lg:mx-48">
        <CodeBlock title="Code" code={"box-shadow:" + currentStyle} />
      </section>
    </>
  );
};

export default ShadowGenerator;
