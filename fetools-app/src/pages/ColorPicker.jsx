import React from "react"
import tinycolor from "tinycolor2"
import ToolHeaderSection from "../components/ToolsLayout/ToolHeaderSection"
import ToolHeading from "../components/ToolsLayout/ToolHeading"

function ColorPicker() {

    const [color, setColor] = React.useState("#aabbcc")

    return (
    <>
      <main className="">
        <ToolHeaderSection>
          <ToolHeading 
          title="Color Picker"
          tagline="Get colors, tints, and shades, with CSS and Tailwind code you can copy and paste into your project."
          ></ToolHeading>
        </ToolHeaderSection>

      </main>
    </>

    )
}
  
export default ColorPicker