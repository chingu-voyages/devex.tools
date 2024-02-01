import { useRef, useState, useEffect } from "react"
import tinycolor from "tinycolor2";

export default function ColorGradientInterface({
    inputValue,
    handleColorInputChange,
    handlePositionInputChange,
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
                    label.children[0].value = inputValue.color
                } else if(label.id === 'position'){
                    label.children[0].value = inputValue.position
                }
            })
        }
    }, [inputValue]);

    return(
        <>
        <div ref={parentRef} className="grid grid-cols-2 grid-rows-3 gap-x-7 gap-y-12 px-5">
            <label id="color" className="flex flex-col w-full font-bold ">Color
                <input 
                ref={colorInputRef} 
                defaultValue={displayData.color}
                onChange={handleColorInputChange} 
                placeholder={lastValidData.color || displayData.color}
                type="text" 
                maxLength={7}
                className="rounded-sm border border-gray-400 p-4 uppercase"/>
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
            <label id="totation" className="flex flex-col w-full font-bold">Rotation
                <input type="text" className="rounded-sm border border-gray-400 p-4 uppercase text-center"/>
            </label>
            <label id="type" className="flex flex-col w-full font-bold">Type
                <input type="text" className="rounded-sm border border-gray-400 p-4 uppercase text-center"/>
            </label>
        </div>
        </>
    )

}