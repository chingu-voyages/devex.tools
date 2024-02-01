import { useState } from "react"

import tinycolor from "tinycolor2"

import ToolHeaderSection from "../components/ToolsLayout/ToolHeaderSection"
import ToolHeading from "../components/ToolsLayout/ToolHeading"
import ColorPickerTool from "../components/ColorPicker/ColorPickerTool"

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

        <div>
          <ColorPickerTool 
          color={color}
          setColor={setColor}
          />
          
        </div>

      </main>
    </>

    )
}
  
export default ColorPicker