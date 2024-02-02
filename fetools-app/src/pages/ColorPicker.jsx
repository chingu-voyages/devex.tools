import { useState } from "react"

import tinycolor from "tinycolor2"

import ToolHeaderSection from "../components/ToolsLayout/ToolHeaderSection"
import ToolHeading from "../components/ToolsLayout/ToolHeading"
import ColorPickerTool from "../components/ColorPicker/ColorPickerTool"
import ColorPickerInterface from "../components/ColorPicker/ColorPickerInterface"
import { getRandomColor } from "../components/ColorGradientComponents/ColorGradientUtils"


export default function ColorPicker() {
    
  const [colorData, setColorData] = useState(createRandomColorObj())

    return (
    <>
      <main className="">
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
          setColorData={setColorData}
          />
          <ColorPickerInterface/>
        </div>

      </main>
    </>

    )


    function createRandomColorObj(){
      const color = getRandomColor().colorStr
      const hue = getHue()

      return {color: color, hue: hue}

      function getHue(){
        const hsl = new tinycolor(color).toHsl()
        hsl.s = 1
        hsl.l = 0.5
        return tinycolor(hsl).toRgbString()
      }

    }
}
  