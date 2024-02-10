import { useEffect, useRef, useState } from "react";
import { colorWithAlpha, createColorObj, getColorString, HslToRgb, isValidColor } from "./ColorPickerUtils";

export default function ColorPickerInterface({ 
    className,
    colorData,
    setColorData,
    setInputOnFocus
}){
  
    const codesContainerRef = useRef()
    const [inputValues, setInputValues] = useState({
        hexColor: getColorString(colorData.color, 'hex'),
        rgb: HslToRgb(colorData.color),
        hsl: colorData.color,
        alpha: colorData.alpha
    })

    useEffect(()=>{
        if(colorData.alpha < 1){
            setInputValues({
                hexColor: colorWithAlpha(colorData.color, colorData.alpha),
                rgb: HslToRgb(colorData.color),
                hsl: colorData.color,
                alpha: colorData.alpha
            })
        } else{
            setInputValues({
                hexColor: getColorString(colorData.color, 'hex'),
                rgb: HslToRgb(colorData.color),
                hsl: {...colorData.color},
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
            }else if(input.id === 'h'){
                input.value !== parseInt(inputValues.hsl.h)? 
                input.value = parseInt(inputValues.hsl.h):
                input.value = input.value
            }else if(input.id === 's'){
                input.value !== parseFloat(inputValues.hsl.s)*100? 
                input.value = Math.floor(parseFloat(inputValues.hsl.s)*100):
                input.value = input.value
            }else if(input.id === 'l'){
                input.value !== parseFloat(inputValues.hsl.l)*100? 
                input.value = Math.floor(parseFloat(inputValues.hsl.l)*100):
                input.value = input.value
            }else if(input.id === 'a'){
                input.value !== inputValues.alpha? 
                input.value = `${parseFloat(inputValues.alpha*100).toFixed(0)}%`:
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
          <li id="rgb" className="flex flex-col w-[540px]">
            <span className="block font-bold">RGB</span>
            <div className="flex flex-1">
                <div className="relative w-1/4">
                    <span className="block absolute left-5 top-2 w-fit font-bold">R</span>
                    <input id="r" type="text" maxLength={3}
                    placeholder={inputValues.rgb.r}
                    defaultValue={inputValues.rgb.r}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    className="
                    border-y-2 border-l-2 border-r-2 
                    h-10 rounded-l outline-none text-center w-full 
                    font-medium text-gray-500 text-sm">
                    </input>
                </div>

                <div className="relative w-1/4">
                    <span className="block absolute left-5 top-2 w-fit font-bold">G</span>
                    <input id="g" type="text" maxLength={3}
                    placeholder={inputValues.rgb.g}
                    defaultValue={inputValues.rgb.g}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    className="border-y-2 border-r-2 h-10 
                    outline-none text-center w-full
                    font-medium text-gray-500 text-sm"></input>
                </div>

                <div className="relative w-1/4">
                    <span className="block absolute left-5 top-2 w-fit font-bold">B</span>
                    <input id="b" type="text" maxLength={3}
                    placeholder={inputValues.rgb.b}
                    defaultValue={inputValues.rgb.b}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    className="border-y-2 border-r-2 h-10 
                    outline-none text-center w-full
                    font-medium text-gray-500 text-sm"></input>
                </div>

                <div className="relative w-1/4">
                    <span className="block absolute left-5 top-2 w-fit font-bold">A</span>
                    <input id="a" type="text" maxLength={4}
                    placeholder={`${inputValues.alpha*100}%`}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    defaultValue={`${inputValues.alpha*100}%`}
                    className="border-y-2 border-r-2 h-10 rounded-r 
                    outline-none text-center w-full
                    font-medium text-gray-500 text-sm"></input>
                </div>

            </div>
          </li>
          <li id="hsl" className="flex flex-col w-[540px]">
            <span className="block font-bold">HSL</span>
            <div className="flex flex-1">
                <div className="relative w-1/4">
                    <span className="block absolute left-5 top-2 w-fit font-bold">H</span>
                    <input id="h" type="text" maxLength={3}
                    placeholder={parseFloat(inputValues.hsl.h).toFixed(0)}
                    defaultValue={parseInt(inputValues.hsl.h)}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    className="
                    border-y-2 border-l-2 border-r-2 
                    h-10 rounded-l outline-none text-center w-full 
                    font-medium text-gray-500 text-sm">
                    </input>
                </div>

                <div className="relative w-1/4">
                    <span className="block absolute left-5 top-2 w-fit font-bold">S</span>
                    <input id="s" type="text" maxLength={3}
                    placeholder={inputValues.hsl.s}
                    defaultValue={inputValues.hsl.s}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    className="border-y-2 border-r-2 h-10 
                    outline-none text-center w-full
                    font-medium text-gray-500 text-sm"></input>
                </div>

                <div className="relative w-1/4">
                    <span className="block absolute left-5 top-2 w-fit font-bold">L</span>
                    <input id="l" type="text" maxLength={3}
                    placeholder={inputValues.hsl.l}
                    defaultValue={inputValues.hsl.l}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    className="border-y-2 border-r-2 h-10 
                    outline-none text-center w-full
                    font-medium text-gray-500 text-sm"></input>
                </div>

                <div className="relative w-1/4">
                    <span className="block absolute left-5 top-2 w-fit font-bold">A</span>
                    <input id="a" type="text" maxLength={4}
                    placeholder={`${inputValues.alpha*100}%`}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    defaultValue={`${inputValues.alpha*100}%`}
                    className="border-y-2 border-r-2 h-10 rounded-r 
                    outline-none text-center w-full
                    font-medium text-gray-500 text-sm"></input>
                </div>

            </div>
          </li>
          <li id="cmyk" className="flex flex-col w-[540px]">
            <span className="block font-bold">CMYK</span>
            <div className="flex flex-1">
                <div className="relative w-1/4">
                    <span className="block absolute left-5 top-2 w-fit font-bold">R</span>
                    <input id="r" type="text" maxLength={3}
                    placeholder={inputValues.rgb.r}
                    defaultValue={inputValues.rgb.r}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    className="
                    border-y-2 border-l-2 border-r-2 
                    h-10 rounded-l outline-none text-center w-full 
                    font-medium text-gray-500 text-sm">
                    </input>
                </div>

                <div className="relative w-1/4">
                    <span className="block absolute left-5 top-2 w-fit font-bold">G</span>
                    <input id="g" type="text" maxLength={3}
                    placeholder={inputValues.rgb.g}
                    defaultValue={inputValues.rgb.g}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    className="border-y-2 border-r-2 h-10 
                    outline-none text-center w-full
                    font-medium text-gray-500 text-sm"></input>
                </div>

                <div className="relative w-1/4">
                    <span className="block absolute left-5 top-2 w-fit font-bold">B</span>
                    <input id="b" type="text" maxLength={3}
                    placeholder={inputValues.rgb.b}
                    defaultValue={inputValues.rgb.b}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    className="border-y-2 border-r-2 h-10 
                    outline-none text-center w-full
                    font-medium text-gray-500 text-sm"></input>
                </div>

                <div className="relative w-1/4">
                    <span className="block absolute left-5 top-2 w-fit font-bold">A</span>
                    <input id="a" type="text" maxLength={4}
                    placeholder={`${inputValues.alpha*100}%`}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    defaultValue={`${inputValues.alpha*100}%`}
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
        let value = e.target.value

        if(e.target.id==='hex'){
            if(isValidColor(e.target.value)){
                setInputValues({...inputValues, hexColor: e.target.value})
            }
        }else if(
            e.target.id==='r' || 
            e.target.id==='g' || 
            e.target.id==='b' 
        ){
            
            if(value > 255){
                value = 255
            } else if(value < 0){
                value = 0
            }
            const newRgb = {...inputValues.rgb, [e.target.id]: value}

            if(isValidColor(getColorString(newRgb, 'rgb'))){
                setInputValues({...inputValues, rgb: newRgb})
            }
        }else if(
            e.target.id==='h' || 
            e.target.id==='s' || 
            e.target.id==='l' 
        ){

            parseInt(e.target.value)
            
            if(e.target.id==='h'){
                if(value > 360){
                    value = 360
                } else if(value < 0){
                    value = 0
                }
            } else{
                if(value > 100){
                    value = 100
                } else if(value < 0 || isNaN(value)){
                    value = 0
                }
                value = parseFloat(value/100).toFixed(2)
            }

            const newHsl = {...inputValues.hsl, [e.target.id]: value}

            if(isValidColor(getColorString(newHsl, 'hsl'))){
                setInputValues({...inputValues, hsl: newHsl})
            }

        }
        else if(e.target.id==='a'){
            let  value = e.target.value
            if(value > 100){
                value = 100
            } else if(value < 0){
                value = 0
            }
        }
        setInputOnFocus(true)
    }

    function handleOnBlur(e){
        if(e.target.id==='hex'){
            setColorData(createColorObj(inputValues.hexColor))
        }else if(
            e.target.id==='r' ||
            e.target.id==='g' ||
            e.target.id==='b' 
        ){
            setColorData(createColorObj(inputValues.rgb))
        }else if(
            e.target.id==='h' ||
            e.target.id==='s' ||
            e.target.id==='l' 
        ){
            setColorData(createColorObj(inputValues.hsl))
        }else if(e.target.id==='a'){
            let  value = e.target.value

            if(value > 100){
                value = 100
            }

            setInputValues({
                ...inputValues,
                hexColor: colorWithAlpha(inputValues.hexColor, value/100),
                alpha: value/100
            })

            colorData.alpha = value/100

            setColorData({...colorData})

        }
    }
}
