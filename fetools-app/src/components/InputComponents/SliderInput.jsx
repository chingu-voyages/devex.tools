import { forwardRef, useState } from "react";
import Icon from "../Icon";

const SliderInput = forwardRef(function ColorInput(props, ref) {
  const {
    sliderId,
    defaultValue,
    valueTypes,
    ranges,
    step,
    className,
    title,
    titleClassName,
    iconName,
    onChange,
    customPreviewValue
  } = props;

  const [activeIndex, setActiveIndex] = useState(0)
  const [openMenu, setOpenMenu] = useState(false)

  return (
    <div
      id={`${sliderId}-input`}
      className={
        className
          ? `flex z-0 justify-center text-gray-600 text-sm ${className}`
          : `flex flex-col z-0 justify-center text-gray-600 text-sm`
      }
    >
      <h2 className={`font-bold text-sm${titleClassName || ''}`}>
        {title}
      </h2>
      <div className="relative flex w-full h-10 items-center">
        <Icon name={iconName} className="block "/>
        <span className="block text-right font-bold min-w-12">
          <span className={`${valueTypes.length===1?'':'pr-3'}`}>{customPreviewValue||defaultValue}</span>
          <span className={`pl-1 ${valueTypes.length===1?'':'hidden'}`}>{valueTypes[activeIndex]}</span>
        </span>
        <label id={`slider-${sliderId}`} className="w-full pl-1">
        <input
            ref={ref}
            min={ranges[activeIndex].min}
            max={ranges[activeIndex].max}
            step={step}
            defaultValue={defaultValue}
            onChange={onChange}
            type="range"
            className="block w-full"
          />
        </label>
        <span className={`relative flex min-w-12 items-center ${valueTypes.length===1?'hidden':''}`}>
            <span className="block min-w-7 text-center font-bold">{valueTypes[activeIndex]}</span>
            <span className="flex w-full overflow-hidden">
              <Icon name={`keyboard_arrow_${!openMenu?'down':'up'}`} size="24" 
              onClick={()=>setOpenMenu(!openMenu)}
              className="block font-bold self-end" 
              ></Icon>
              <ul id="value-types-menu" className={`absolute left-2 top-[100%] ${!openMenu?'hidden':''}`}>
                {getValueTypesList()}
              </ul>
            </span>
          </span>
      </div>
    </div>
  );

  function getValueTypesList(){
    const types = valueTypes.map((type,idx)=>{
      if(idx===activeIndex){return}
      return <li key={`type-${idx}`} onClick={()=>setActiveIndex(idx)} className="font-bold">{type}</li>
    })

    return(<>{types}</>)
  }
});

export default SliderInput;
