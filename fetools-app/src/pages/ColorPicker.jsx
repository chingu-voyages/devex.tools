import { useState } from "react"
import { useSearchParams } from "react-router-dom"

import ToolHeaderSection from "../components/ToolsLayout/ToolHeaderSection"
import ToolHeading from "../components/ToolsLayout/ToolHeading"
import PageSection from "../components/PageLayout/PageSection"
import ColorPickerTool from "../components/ColorPicker/ColorPickerTool"
import ColorPickerInterface from "../components/ColorPicker/ColorPickerInterface"

import { createColorObj } from "../components/ColorPicker/ColorPickerUtils"


export default function ColorPicker() {
    
  const [searchParams, setSearchParams] = useSearchParams();
  const [colorData, setColorData] = useState(createColorObj(searchParams.get('color'))||createColorObj())

    return (
    <>
      <main>
        <ToolHeaderSection>
          <ToolHeading 
          title="Color Picker"
          tagline="Get colors, tints, and shades, with CSS and Tailwind code you can copy and paste into your project."
          ></ToolHeading>
        </ToolHeaderSection>

      <section className="flex mx-44">
        <ColorPickerTool 
          colorData={colorData}
          handleQuery={handleQuery}
          setColorData={setColorData}
          className='flex flex-1 flex-col min-w-[540px]'
        />

        <PageSection title="Color Codes" icon="integration_instructions" className="flex-1 p-0">
          <ColorPickerInterface className='flex-1 h-[380px]'/>
        </PageSection>

      </section>

      </main>
    </>

    )

  function handleQuery(color){
    color = color.slice(1);
    setSearchParams({ color });
  }

}
  