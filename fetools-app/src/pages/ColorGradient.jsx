import tinycolor from "tinycolor2";

import ColorGradientSlider from "../components/ColorGradientSlider";
import ToolHeaderSection from "../components/ToolsLayout/ToolHeaderSection";
import ToolHeading from "../components/ToolsLayout/ToolHeading";

import "./ColorGradient.css"

export default function ColorGradient(){

    var color = tinycolor("red");

    console.log(color.toHex8String(), color.toHslString())


    return(
    <>
        <ToolHeaderSection>
            <ToolHeading title="Color Gradient" tagline="Use this tool to create gradients for any project!"></ToolHeading>
        </ToolHeaderSection>

        <div className="flex mx-48">
            <ColorGradientSlider/>
        </div>

    </>    
    )

    function lockTracks(){
        const tracks = document.querySelectorAll('#track')

        console.log(tracks)
    }
}