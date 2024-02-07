import { useEffect, useState } from "react";
import { RgbToHsl, createColorObj } from "./ColorPickerUtils";

export default function PickerHandles({
    colorData,
    handleColorChange
}){

    const [sliderValues, setSliderValues] = useState({
        hue: RgbToHsl(colorData.hue)
    })


    useEffect(()=>{
        updateHandleValues()
    },[colorData])

  return (
    <>
      <div id="picker-handles-container" className="px-6">
        <ul className="flex flex-1 flex-col">
          <li className="colorPickerSliderVar flex gap-x-3 justify-between">
            <span className="block font-bold text-sm w-[10px]">H</span>
            <span className="block font-medium text-sm text-gray-400 w-9">{parseInt(sliderValues.hue.h)}°</span>
            <input id="hue" max={360} min={0} step={1}
            type="range"
            defaultValue={parseInt(sliderValues.hue.h)}
            onChange={(e)=>handleHueOnChange(e, 'hue')}
            className="colorPickerSlider hueSlider flex-1 lg:w-[412px]"></input>
          </li>
          <li className="colorPickerSliderVar flex gap-x-3 justify-evenly">
            <span className="block font-bold text-sm w-[10px]">S</span>
            <span className="block font-medium text-sm text-gray-400 w-9">100%</span>
            <input id="saturation" max={100} min={0} step={1}
            type="range"
            defaultValue={parseInt(sliderValues.hue.h)}
            onChange={(e)=>handleHueOnChange(e, 'saturation')}
            className="colorPickerSlider satSlider flex-1"></input>
          </li>
        </ul>
      </div>
    </>
  );

    function handleHueOnChange(e, property){
        if(property === 'hue'){
            
            sliderValues.hue.h = e.target.value

            const newColorObj = createColorObj(colorData.color, sliderValues.hue)

            setSliderValues({...sliderValues})
            updateColorData(property, newColorObj)
        }else{
            updateColorData(property, e.target.value)
        }


    }

    function updateColorData(property, value){
        if(property === 'hue'){
            handleColorChange(value)
        }
    }

    function updateHandleValues(){
        const classElement = document.querySelector('.colorPickerSlider')

        classElement.style.setProperty('--hue-thumb-color', colorData.hue)  
    }
}
