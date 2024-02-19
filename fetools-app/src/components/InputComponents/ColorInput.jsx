import { forwardRef } from "react";

const ColorInput = forwardRef(function ColorInput(props, ref) {
  const {
    defaultValue,
    placeholder,
    className,
    titleClassName,
    children,
    onChange,
  } = props;

  return (
    <div
      id="color-input"
      className={
        className
          ? `flex z-0 justify-center ${className}`
          : `flex z-0 justify-center flex-col`
      }
    >
      {children}
      <h2 className={`font-bold text-gray-600 text-sm ${titleClassName}`}>
        Color
      </h2>
      <div className="relative flex border rounded border-gray-400 pl-1 h-10 items-center">
        <input
          id="custom-color-input"
          type="color"
          defaultValue={defaultValue}
          onChange={onChange}
          className="w-8 h-8 flex-2"
        />
        <label id="color-hex-value">
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

export default ColorInput;
