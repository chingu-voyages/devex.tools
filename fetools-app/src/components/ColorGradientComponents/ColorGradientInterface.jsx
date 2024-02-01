import { useRef, useState, useEffect } from "react"
import tinycolor from "tinycolor2";

export default function ColorGradientInterface({
    inputValue,
    handleColorInputChange,
    handlePositionInputChange,
    handleRotationInputChange,
    updateValuesOnBlur
}){
    
    const [displayData, setDisplayData] = useState(inputValue)
    const [lastValidData, setLastValidData] = useState(inputValue)
    
    const parentRef = useRef() 
    const colorInputRef = useRef()

    // Update displayData when showValues changes
    useEffect(() => {
        setDisplayData(inputValue);
        if (tinycolor(inputValue.color).isValid()) {
            setLastValidData({...lastValidData, color: tinycolor(inputValue.color).toHexString()});
        }
    }, [inputValue]);

    // Ensure input fields reflect the updated displayData
    useEffect(() => {
        if(parentRef.current){
            [...parentRef.current.children].forEach(label=>{
                if(label.id === 'color'){
                    label.children[0].children[0].value = inputValue.color
                    label.children[0].children[1].value = inputValue.color
                } else if(label.id === 'position'){
                    label.children[0].value = inputValue.position
                } else if(label.id === 'rotation'){
                    label.children[0].value = inputValue.rotation
                }
            })
        }
    }, [inputValue]);

    return(
        <>
        <div ref={parentRef} className="grid grid-cols-2 grid-rows-3 gap-x-7 gap-y-12 px-5">
            <label id="color" className="relative flex flex-col w-full font-bold ">Color
                <div className="relative w-full z-0">
                    <input 
                    ref={colorInputRef} 
                    defaultValue={displayData.color}
                    onChange={handleColorInputChange} 
                    placeholder={lastValidData.color || displayData.color}
                    type="text" 
                    maxLength={7}
                    className="rounded-sm border border-gray-400 p-4 uppercase flex-2"/>

                    <input 
                    type="color" 
                    defaultValue={displayData.color} 
                    onChange={handleColorInputChange}
                    className="absolute right-0 top-4"/>
                </div>
            </label>
            <label id="position" className="flex flex-col w-full font-bold">Position
                <input
                defaultValue={displayData.position}
                onChange={handlePositionInputChange}
                onBlur={updateValuesOnBlur}
                placeholder={lastValidData.position || displayData.position}
                type="text" 
                maxLength={4}
                className="rounded-sm border border-gray-400 p-4 uppercase text-center"/>
            </label>
            <label id="rotation" className="flex flex-col w-full font-bold">Rotation
                <input
                defaultValue={displayData.rotation} 
                placeholder={lastValidData.rotation || displayData.rotation}
                type="text"
                maxLength={4} 
                onChange={handleRotationInputChange}
                className="rounded-sm border border-gray-400 p-4 uppercase text-center"/>
            </label>
            <label id="type" className="flex flex-col w-full font-bold">Type
                <input 
                type="text" 
                className="rounded-sm border border-gray-400 p-4 uppercase text-center"/>
            </label>
        </div>
        </>
    )

}