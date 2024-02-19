import { useState } from "react"
import { useSearchParams } from "react-router-dom"

import ToolHeaderSection from "../components/ToolsLayout/ToolHeaderSection"
import ToolHeading from "../components/ToolsLayout/ToolHeading"
import ColorPickerTool from "../components/ColorPicker/ColorPickerTool"
import ColorPickerInterface from "../components/ColorPicker/ColorPickerInterface"

import { createColorObj } from "../components/ColorPicker/ColorPickerUtils"
import { getRandomColor } from "../components/ColorGradientComponents/ColorGradientUtils"

export default function ColorPicker() {
    
  const [searchParams, setSearchParams] = useSearchParams();
  const [colorData, setColorData] = useState(createColorObj(searchParams.get('color'))||getRandomColor().colorStr)

    return (
    <>
      <main>
        <ToolHeaderSection>
          <ToolHeading 
          title="Color Picker"
          tagline="Get colors, tints, and shades, with CSS and Tailwind code you can copy and paste into your project."
          ></ToolHeading>
        </ToolHeaderSection>

        <div className="flex justify-between m-8 mb-10
        md:mx-12 md:mt-12
        max-lg:flex-col max-lg:items-center max-lg:gap-y-4 max-lg:mx-6
        lg:mx-48 lg:mt-20 lg:gap-x-24">
          <ColorPickerTool 
          colorData={colorData}
          handleQuery={handleQuery}
          setColorData={setColorData}
          />
          <ColorPickerInterface/>
        </div>

      </main>
    </>

    )

  function handleQuery(color){
    color = color.slice(1);
    setSearchParams({ color });
  }

}
  