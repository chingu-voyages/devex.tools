import { useRef, useState, useEffect } from "react"
import tinycolor from "tinycolor2";

export default function ColorGradientInterface({
    showValues,
    handleColorChange
}){
    
    const [displayData, setDisplayData] = useState(showValues)
    const [inputValue, setInputValue] = useState({
        color: showValues.color
    });
    
    const colorInputRef = useRef()

    // Update displayData when showValues changes
    useEffect(() => {
        setDisplayData(showValues);
    }, [showValues]);

    // Ensure input fields reflect the updated displayData
    useEffect(() => {
        if (colorInputRef.current) {
            colorInputRef.current.value = inputValue.color;
        }
    }, [inputValue]);

    return(
        <>
        <div className="grid grid-cols-2 grid-rows-3 gap-x-7 gap-y-12 px-5">
            <label id="color" className="flex flex-col w-full font-bold ">Color
                <input 
                ref={colorInputRef} 
                defaultValue={displayData.color}
                onChange={handleColorInputChange} 
                placeholder={displayData.color}
                type="text" 
                className="rounded-sm border border-gray-400 p-4 uppercase"/>
            </label>
            <label id="position" className="flex flex-col w-full font-bold">Position
                <input type="text" className="rounded-sm border border-gray-400 p-4 uppercase"/>
            </label>
            <label id="color" className="flex flex-col w-full font-bold">Rotation
                <input type="text" className="rounded-sm border border-gray-400 p-4 uppercase"/>
            </label>
            <label id="position" className="flex flex-col w-full font-bold">Type
                <input type="text" className="rounded-sm border border-gray-400 p-4 uppercase"/>
            </label>
        </div>
        </>
    )

    function isValidHexColor(color){
        return tinycolor(color).isValid();
    }

    function handleColorInputChange(evt){
        const newColor = evt.target.value;
        setInputValue({...inputValue, color: newColor}); // Update input value

        console.log(isValidHexColor(newColor))

        if (isValidHexColor(newColor)) {
            handleColorChange(newColor); // Pass the new color to the parent component
        }
    };
}