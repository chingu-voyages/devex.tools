import { forwardRef } from "react";

const ColorInput = forwardRef(function ColorInput(props, ref) {
  const {
    id,
    placeholder,
    className,
    title,
    titleClassName,
    children,
    onChange,
    value,
  } = props;

  return (
    <div
      id={`color-input-${id}`}
      className={
        className
          ? `flex z-0 justify-center ${className}`
          : `flex z-0 justify-center flex-col`
      }
    >
      {children}
      <h2 className={`font-bold text-gray-600 text-sm ${titleClassName || ''}`}>
        {title}
      </h2>
      <div className="relative flex border rounded border-gray-400 pl-1 h-10 items-center">
        <input
          id="custom-color-input"
          type="color"
          value={value}
          onChange={onChange}
          className="min-w-8 w-8 min-h-8 h-8"
        />
        <label id="color-hex-value">
        <input
          ref={ref}
          onChange={onChange}
          onFocus={(e)=>{e.target.closest('div').classList.add('outline', 'outline-[#7F40BF]')}}
          onBlur={(e)=>{e.target.closest('div').classList.remove('outline', 'outline-[#7F40BF]')}}
          placeholder={placeholder}
          type="text"
          maxLength={7}
          className="uppercase outline-none w-full pl-3 text-gray-600"
        />
        </label>
      </div>
    </div>
  );
});

export default ColorInput;
