import { useRef } from "react";
import tinycolor from "tinycolor2";

import ColorGradientSlider from "../components/ColorGradientSlider";
import ToolHeaderSection from "../components/ToolsLayout/ToolHeaderSection";
import ToolHeading from "../components/ToolsLayout/ToolHeading";

import "../ColorGradient.css"

export default function ColorGradient(){

    const showGradient = useRef()

    return(
    <>
        <ToolHeaderSection>
            <ToolHeading title="Color Gradient" tagline="Use this tool to create gradients for any project!"></ToolHeading>
        </ToolHeaderSection>

        <div className="flex flex-1 lg:mx-48 justify-between gap-x-2 h-[425px]">
            <div 
            className="flex-1 w-full rounded-lg border border-black">
                <ColorGradientSlider/>
            </div>
            <div ref={showGradient} id="show-gradient" 
            className="gradient flex-1 rounded-lg border border-black">         
            </div>

        </div>
    </>    
    )

    function updateShowGradient(){
        showGradient.current
    }
}