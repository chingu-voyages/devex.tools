import { useState } from "react"

import tinycolor from "tinycolor2"

import ToolHeaderSection from "../components/ToolsLayout/ToolHeaderSection"
import ToolHeading from "../components/ToolsLayout/ToolHeading"
import ColorPickerTool from "../components/ColorPicker/ColorPickerTool"
import ColorPickerInterface from "../components/ColorPicker/ColorPickerInterface"

function ColorPicker() {

    const [color, setColor] = useState({
      background: '#000'
    })

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
          color={color}
          setColor={setColor}
          />
          <ColorPickerInterface/>
        </div>

      </main>
    </>

    )
}
  
export default ColorPicker