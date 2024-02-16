import { forwardRef } from "react"

const ColorInput = (forwardRef(function ColorInput(props, ref){
    
    const{
        defaultValue,
        placeholder, 
        onChange
    } = props
    
    return(
        <div className="relative flex z-0 w-full border rounded border-gray-400 pl-1 h-10 items-center">
            <input
            id="custom-color-input"
            type="color" 
            defaultValue={defaultValue} 
            onChange={onChange}
            className="w-8 h-8 flex-2"/>
            <input 
            ref={ref} 
            defaultValue={defaultValue}
            onChange={onChange} 
            placeholder={placeholder}
            type="text" 
            maxLength={7}
            className="uppercase outline-none w-10/12 pl-3 text-gray-500"/>
        </div>
        )
}))

export default ColorInput