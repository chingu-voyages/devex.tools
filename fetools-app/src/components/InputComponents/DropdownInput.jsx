("use client");
import {forwardRef, useState, useRef, useEffect} from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const test = forwardRef(function ColorInput(props, ref) {
  const {
    defaultValue,
    placeholder,
    className,
    title,
    titleClassName,
    children,
    onChange,
  } = props;

  return (
    <div
      className={
        className
          ? `flex z-0 justify-center ${className}`
          : `flex z-0 justify-center flex-col`
      }
    >
      {children}
      <h2 className={`font-bold text-gray-600 text-sm ${titleClassName}`}>
        {title}
      </h2>
      <div className="relative flex border rounded border-gray-400 pl-1 h-10 items-center">
        <input
          id="custom-color-input"
          type="color"
          defaultValue={defaultValue}
          onChange={onChange}
          className="w-8 h-8 flex-2"
        />
        <label id="colorHexText">
          <input
            ref={ref}
            defaultValue={defaultValue}
            onChange={onChange}
            placeholder={placeholder}
            type="text"
            maxLength={7}
            className="uppercase outline-none w-10/12 pl-3 text-gray-600"
          />
        </label>
      </div>
    </div>
  );
});

const DropdownInput = forwardRef(function DropdownInput(props, ref) {

    const {
        title,
        titleClassName,
        className,
    dropdownOptions, 
    callbackFun
    } = props 

    const [position, setPosition] = useState(dropdownOptions[0]);
    const [menuStyle,setMenuStyle] = useState({width: '50x'})
    const buttonRef = useRef();
  
    useEffect(()=>{
        setMenuStyle({width: `${buttonRef.current.offsetWidth}px`})
        window.addEventListener('resize', (e)=>{setMenuStyle({width: `${buttonRef.current.offsetWidth}px`})})
    },[])

    useEffect(() => {
        ref.current = position
        callbackFun()
    }, [position]);
  

    return (
      <>
        <div       
        className={
        className
          ? `flex z-0 justify-center ${className}`
          : `flex z-0 justify-center flex-col`
      }>
            <h2 className={`font-bold text-gray-600 text-sm ${titleClassName||''}`}>
            {title}
            </h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                ref={buttonRef}
                variant="outline"
                className="
                relative rounded justify-start w-full 
                border border-gray-400 outline-none
                text-gray-600 text-sm"
              >{position}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
            className="rounded outline-none"
            style={menuStyle}>
              <DropdownMenuRadioGroup
                value={position}
                onValueChange={setPosition}
                className="outline-none"
              >
                {createDropdownItems()}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </>
    );
  
    function createDropdownItems(){
          const options = dropdownOptions.map((option, idx)=>{
                return(
                <DropdownMenuRadioItem 
                key={`option-${idx}`} 
                value={option}>
                    <span>{option}</span>
                    </DropdownMenuRadioItem>
                )
            })   
          return(<>{options}</>)
    }
})

export default DropdownInput;






