import { useEffect } from "react";
import { createMonochromatic } from "./ColorPickerUtils";

export default function RelatedColors({ 
    colorData 
}){

    useEffect(()=>{
    }, [colorData])

  return(
  <>
    <h2 className="text-base pb-1">Tints & Shades (Monochromatic)</h2>
    <div id="monochromatic-colors" className="grid grid-cols-11 grid-rows-1 gap-x-[10px]">
        {monochromaticPreview()}
    </div>
  </>
  );

  function monochromaticPreview(){
    const colors = createMonochromatic(colorData.color)

    const previews = colors.map((color,idx)=>{
        return(
            <div key={`mono-${idx}`} style={{backgroundColor: color}}
            className={`
            h-24 
            ${idx===0?'lg:rounded-bl-lg':''}
            ${idx===10?'lg:rounded-r-lg':''}
            `}>
            </div>
        )
    })

    return(<>{previews}</>)
  }
}
