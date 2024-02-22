import { forwardRef } from "react";
import Icon from "../Icon";

const TabsInput = forwardRef(function TabsInput(props, ref) {
  const {
    name,
    className,
    title,
    titleClassName,
    options,
    borderAroundOptions
  } = props;

  return (
    <div
      id="tab-input"
      className={
        className
          ? `flex z-0 justify-center ${className}`
          : `flex z-0 justify-center flex-col`
      }
    >
      {title
      ?
      <h2 className={`font-bold text-gray-600 text-sm ${titleClassName || ''}`}>
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
      <label key={`icon-${idx}`} name={name} 
      className="flex flex-1 relative w-full h-full 
      items-center text-center">
        <div className="flex relative w-full h-full">
          <input  type="radio" value={option.value} defaultChecked={idx===0?true:false} 
          onClick={option.onClick}
          className={`z-10 absolute bg-[transparent] w-full h-full cursor-pointer`}></input>
          <Icon
          className="m-auto cursor-pointer"
          name={option.iconName}
          id="center"/>
        </div>
      </label>
    ))
    
    return(<>{optionsElements}</>)
  }

});

export default TabsInput;
