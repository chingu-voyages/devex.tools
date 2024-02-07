import { useEffect, useState} from "react";
import { createColorObj, getColorString } from "./ColorPickerUtils";

export default function PickerHandles({
    colorData,
    handleColorChange,
    calculateMarkerPositionOnColor
}){

  const [pickerData, setPickerData] = useState({
    s: parseInt(colorData.color.s)*100, 
    l: parseInt(colorData.color.l)*100
  })

  useEffect(()=>{
    calculateMarkerPositionOnColor(()=>{setPickerData({
      s: parseInt(colorData.color.s)*100, 
      l: parseInt(colorData.color.l)*100
      })})
  },[])

  useEffect(()=>{
    updateHandleValues()
  },[colorData])

  return (
    <>
      <div id="picker-handles-container" className="px-6">
        <ul className="colorPickerSliderVar flex flex-1 flex-col gap-y-4 ">
          <li className="flex gap-x-3 justify-between">
            <span className="block font-bold text-sm w-[10px]">H</span>
            <span className="block font-medium text-sm text-gray-400 w-9">{parseInt(colorData.hue.h)}°</span>
            <input id="hue" max={360} min={0} step={1}
            type="range"
            defaultValue={parseInt(colorData.hue.h)}
            onChange={(e)=>handleOnChange(e, 'hue')}
            className="colorPickerSlider hueSlider flex-1 "></input>
          </li>
          <li className="flex gap-x-3 justify-evenly">
            <span className="block font-bold text-sm w-[10px]">S</span>
            <span className="block font-medium text-sm text-gray-400 w-9">{parseInt(colorData.color.s*100)}%</span>
            <input id="saturation" max={100} min={0} step={1}
            type="range"
            value={parseInt(colorData.color.s*100)}
            onChange={(e)=>handleOnChange(e, 'saturation')}
            className="colorPickerSlider satSlider flex-1"></input>
          </li>
          <li className="flex gap-x-3 justify-evenly">
            <span className="block font-bold text-sm w-[10px]">L</span>
            <span className="block font-medium text-sm text-gray-400 w-9">{parseInt(colorData.color.l*100)}%</span>
            <input id="light" max={100} min={0} step={1}
            type="range"
            value={parseInt(colorData.color.l*100)}
            onChange={(e)=>handleOnChange(e, 'light')}
            className="colorPickerSlider lightSlider flex-1"></input>
          </li>
        </ul>
      </div>
    </>
  );

  function handleOnChange(e, property){
    if(property === 'hue'){
      colorData.hue.h = parseInt(e.target.value)

      const newColorObj = createColorObj(colorData.color, colorData.hue)

      updateColorData(property, newColorObj)
    }else if(property === 'saturation'){

      colorData.color.s = (parseFloat(e.target.value/100))
      
      console.log(colorData)
      updateColorData(property, {...colorData, hue: colorData.hue})
    } else if(property === 'light'){

      colorData.color.l = (parseFloat(e.target.value/100))
      
      console.log(colorData)
      updateColorData(property, {...colorData, hue: colorData.hue})
    }

    calculateMarkerPositionOnColor()
  }

  function updateColorData(property, value){
      if(property === 'hue'){
        handleColorChange(value)
      } else{
        handleColorChange(value)
      }
  }

  function updateHandleValues(){
    const classElement = document.querySelector('.colorPickerSliderVar')

    classElement.style.setProperty('--hue-thumb-color', getColorString(colorData.hue, 'hsl'))  
    classElement.style.setProperty('--sat-thumb-color', getColorString(colorData.color, 'hsl'))
    classElement.style.setProperty('--sat-slider-color', getSatSliderColor())
    classElement.style.setProperty('--light-thumb-color', getColorString(colorData.color, 'hsl'))  
    classElement.style.setProperty('--light-slider-color', getLightSliderColor())  

    function getSatSliderColor(){
      const startColor = {...colorData.color}
      const endColor = {...colorData.color}

      startColor.s = 0
      endColor.s = 1

      const rule = `linear-gradient(90deg, ${getColorString(startColor, 'hsl')}, ${getColorString(endColor, 'hsl')})`

      return rule
    }

    function getLightSliderColor(){
      const startColor = {...colorData.color}
      const middleColor = {...colorData.color}
      const endColor = {...colorData.color}

      console.log(colorData)

      startColor.l = 0
      middleColor.l = .5
      endColor.l = 1

      const rule = `linear-gradient(90deg, 
        ${getColorString(startColor, 'hsl')},
        ${getColorString(middleColor, 'hsl')}, 
        ${getColorString(endColor, 'hsl')})`

      return rule
    }
  }
}
