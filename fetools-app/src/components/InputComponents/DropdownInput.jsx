("use client");
import { forwardRef, useState, useRef, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Icon from "../Icon";

const DropdownInput = forwardRef(function DropdownInput(props, ref) {
  const { title, titleClassName, className, dropdownOptions, callbackFun, children } =
    props;

  const [position, setPosition] = useState(dropdownOptions[0]);
  const [menuStyle, setMenuStyle] = useState({ width: "50x" });
  const buttonRef = useRef();

  useEffect(() => {
    setMenuStyle({ width: `${buttonRef.current.offsetWidth}px` });
    window.addEventListener("resize", (e) => {
      setMenuStyle({ width: `${buttonRef.current.offsetWidth}px` });
    });
  }, []);

  useEffect(() => {
    ref.current = position;
    callbackFun();
  }, [position]);

  return (
    <>
      <div
        className={
          className
            ? `flex z-0 justify-center ${className}`
            : `flex z-0 justify-center flex-col`
        }
      >
        <h2
          className={`font-bold text-gray-600 text-sm ${titleClassName || ""}`}
        >
          {title}
        </h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="relative">
            <Button
            ref={buttonRef}
            variant="outline"
            className="
            relative flex rounded justify-start w-full px-0 pl-2 pr-8  
            border border-gray-400 outline-none
            text-gray-600 text-sm">
              {children && Array.isArray(children)?children[0]:children}
              <span className="flex-1 text-left">{position}</span>
              {children && Array.isArray(children)?children[1]:null}
              <Icon
              name={`keyboard_arrow_down`}
              className="absolute right-0"
              />
            </Button>

            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="rounded outline-none"
            style={menuStyle}
          >
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

  function createDropdownItems() {
    const options = dropdownOptions.map((option, idx) => {
      return (
        <DropdownMenuRadioItem 
        key={`option-${idx}`} 
        value={option}
        className='flex'>
          <span className="flex-2">{option}</span>
        </DropdownMenuRadioItem>
      );
    });
    return <>{options}</>;
  }
});

export default DropdownInput;
