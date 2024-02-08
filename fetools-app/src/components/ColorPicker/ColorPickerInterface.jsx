import { useEffect, useRef, useState } from "react";
import { colorWithAlpha, createColorObj, getColorString, HslToRgb, isValidColor } from "./ColorPickerUtils";

export default function ColorPickerInterface({ 
    className,
    colorData,
    setColorData
}){
  
    const codesContainerRef = useRef()
    const [inputValues, setInputValues] = useState({
        hexColor: getColorString(colorData.color, 'hex'),
        rgb: HslToRgb(colorData.color),
        alpha: colorData.alpha
    })

    useEffect(()=>{
        if(colorData.alpha < 1){
            setInputValues({
                hexColor: colorWithAlpha(colorData.color, colorData.alpha),
                rgb: HslToRgb(colorData.color),
                alpha: colorData.alpha
            })
        } else{
            setInputValues({
                hexColor: getColorString(colorData.color, 'hex'),
                rgb: HslToRgb(colorData.color),
                alpha: colorData.alpha
            })
        }
    },[colorData])
  
    useEffect(()=>{
        codesContainerRef.current.querySelectorAll('input').forEach(input=>{
            if(input.id==='hex'){
                input.value !== inputValues.hexColor? 
                input.value = inputValues.hexColor:
                input.value = input.value
            }else if(input.id === 'r'){
                input.value !== inputValues.rgb.r? 
                input.value = inputValues.rgb.r:
                input.value = input.value
            }else if(input.id === 'g'){
                input.value !== inputValues.rgb.g? 
                input.value = inputValues.rgb.g:
                input.value = input.value
            }else if(input.id === 'b'){
                input.value !== inputValues.rgb.b? 
                input.value = inputValues.rgb.b:
                input.value = input.value
            }else if(input.id === 'a'){
                input.value !== inputValues.alpha? 
                input.value = parseFloat(inputValues.alpha*100).toFixed(0):
                input.value = input.value
            }
        })

    },[inputValues])

    return (
    <>
      <div id="color-picker-interface" className={className}>
        <ul ref={codesContainerRef} id="codes-container" className="flex flex-col mt-2 gap-y-7 w-fit">
          <li className="flex flex-col">
            <span className="block font-bold">HEX</span>
            <input id="hex" type="text" maxLength={9}
            placeholder={inputValues.hexColor}
            defaultValue={inputValues.hexColor}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            className="border-2 h-10 rounded outline-none 
            text-center font-medium text-gray-700 text-sm uppercase"></input>
          </li>
          <li className="flex flex-col w-[540px]">
            <span className="block font-bold">RGB</span>
            <div className="flex flex-1">
                <div className="relative w-1/4">
                    <span className="block absolute left-5 top-2 w-fit font-bold">R</span>
                    <input id="r" type="text" maxLength={3}
                    defaultValue={inputValues.rgb.r}
                    className="
                    border-y-2 border-l-2 border-r-2 
                    h-10 rounded-l outline-none text-center w-full 
                    font-medium text-gray-500 text-sm">
                    </input>
                </div>

                <div className="relative w-1/4">
                    <span className="block absolute left-5 top-2 w-fit font-bold">G</span>
                    <input id="g" type="text" maxLength={3}
                    defaultValue={inputValues.rgb.g}
                    className="border-y-2 border-r-2 h-10 
                    outline-none text-center w-full
                    font-medium text-gray-500 text-sm"></input>
                </div>

                <div className="relative w-1/4">
                    <span className="block absolute left-5 top-2 w-fit font-bold">B</span>
                    <input id="b" type="text" maxLength={3}
                    defaultValue={inputValues.rgb.b}
                    className="border-y-2 border-r-2 h-10 
                    outline-none text-center w-full
                    font-medium text-gray-500 text-sm"></input>
                </div>

                <div className="relative w-1/4">
                    <span className="block absolute left-5 top-2 w-fit font-bold">A</span>
                    <input id="a" type="text" maxLength={4}
                    defaultValue={`${colorData.alpha*100}%`}
                    className="border-y-2 border-r-2 h-10 rounded-r 
                    outline-none text-center w-full
                    font-medium text-gray-500 text-sm"></input>
                </div>

            </div>
          </li>
        </ul>
      </div>
    </>
    );

    function handleOnChange(e){
        console.log(e.target.value)
        if(e.target.id==='hex'){
            if(isValidColor(e.target.value)){
                setInputValues({...inputValues, hexColor: e.target.value})
            }
        }
    }

    function handleOnBlur(e){
        if(e.target.id==='hex'){
            if(isValidColor(e.target.value)){
                setColorData(createColorObj(e.target.value))
            }
        }
    }
}
