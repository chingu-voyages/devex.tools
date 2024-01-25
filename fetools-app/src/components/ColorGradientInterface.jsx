import { useRef, useState } from "react"

export default function ColorGradientInterface({}){
    
    const [showValues, setShowValues] = useState()
    const colorInputRef = useRef()

    updateValues()

    return(
        <>
        <div className="grid grid-cols-2 grid-rows-3 gap-x-7 gap-y-12 px-5">
            <label id="color" className="flex flex-col w-full">Color
                <input ref={colorInputRef} type="text" className="rounded-sm border border-gray-400 p-4"/>
            </label>
            <label id="position" className="flex flex-col w-full">Position
                <input type="text" className="rounded-sm border border-gray-400 p-4"/>
            </label>
            <label id="color" className="flex flex-col w-full">Rotation
                <input type="text" className="rounded-sm border border-gray-400 p-4"/>
            </label>
            <label id="position" className="flex flex-col w-full">Type
                <input type="text" className="rounded-sm border border-gray-400 p-4"/>
            </label>
        </div>
        </>
    )
    
    function updateValues(){
        //console.log(colorInputRef.current)
    }

}