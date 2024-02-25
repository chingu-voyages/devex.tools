import { forwardRef, useState } from "react";
import Icon from "../Icon";

const TabsInput = forwardRef(function TabsInput(props, ref) {
  const {
    id,
    name,
    className,
    title,
    titleClassName,
    options,
    borderAroundOptions,
    defaultOption
  } = props;

  const [activeIndex, setActiveIndex] = useState(defaultOption)

  return (
    <div
      id={`tab-input`}
      className={
        className
          ? `tabs${id} flex z-0 justify-center ${className}`
          : `tabs${id} flex z-0 justify-center flex-col` 
      }
    >
      {title
      ?
      <h2 className={`font-bold text-sm ${titleClassName || ''}`}>
        {title}
      </h2>
      :null}

      <div ref={ref} className={`
      relative grid h-10 items-center
      ${options.length===3?'grid-cols-3':'grid-cols-4'} 
      ${borderAroundOptions
      ?"border rounded border-gray-400 p-1 gap-x-2"
      :"gap-x-1 py-1"}`}>
        {createOptions()}
      </div>
    </div>
  );

  function createOptions(){
    
    const optionsElements = options.map((option,idx)=>(

    <div key={`icon-${id}-${idx}`}
    className="flex flex-1 relative w-full h-full 
    items-center text-center">
      <div className="flex relative w-full h-full hover:text-[#7F40BF]">
          <button value={option.value}
          onClick={(e)=>(option.onClick(e), setActiveIndex(idx))}
          className={`
          z-10 absolute bg-[transparent] w-full h-full 
          hover:border hover:border-black hover:rounded cursor-pointer
          ${idx===activeIndex?'border-2 border-[#666] rounded':''}
          `}></button>          
          <Icon
          className="m-auto cursor-pointer"
          name={option.iconName}
          id="center"/>
      </div>
    </div>
    ))
    
    return(<>{optionsElements}</>)
  }

});

export default TabsInput;

/*
      <div key={`icon-${id}-${idx}`}
      className="flex flex-1 relative w-full h-full 
      items-center text-center hover:text-[#7F40BF]"}>
        <div className="flex relative w-full h-full hover:text-[#7F40BF]">
            <button value={option.value}
            onClick={(e)=>(option.onClick(e), setActiveIndex(idx))}
            className={`
            z-0 absolute bg-[transparent] w-full h-full cursor-pointer
            ${idx===activeIndex?'outline outline-[#666] rounded':''}
            `}></button>          
            <Icon
            className="m-auto cursor-pointer z-10"
            name={option.iconName}
            id="center"/>
        </div>
      </div>
        
*/