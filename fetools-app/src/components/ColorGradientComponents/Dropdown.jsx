"use client"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Dropdown({setInputValue,inputValue, updateTypeOnCSS}) {
  const [position, setPosition] = React.useState("Linear")

  const buttonRef = React.useRef()

  React.useEffect(()=>{
    if(inputValue.type !== position){
      console.log(position)
      updateValues()
    }
  },[position])

  return (
    <>
    <div className="flex flex-col w-full leading-none">
      <span className="font-bold my-1">Type</span>
      <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button ref={buttonRef} variant="outline" className="rounded-sm w-full h-14 border border-gray-400 outline-none">{position}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 outline-none">
            <DropdownMenuRadioGroup value={position} onValueChange={setPosition} className="outline-none">
              <DropdownMenuRadioItem value="Linear">Linear</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Radial">Radial</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
    </div>  
    </>
  )

  function updateValues(){
    if(inputValue.type !== position){
      setInputValue({...inputValue, type: position})
      updateTypeOnCSS() 
    }
  }
}
