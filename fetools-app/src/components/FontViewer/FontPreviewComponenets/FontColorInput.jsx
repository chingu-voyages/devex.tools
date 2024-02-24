import React from "react";
import ColorInput from "../../InputComponents/ColorInput";
import Icon from "../../Icon";

const FontColorInput = ({ font, handleColorChange }) => {
  return (
    <div className="flex items-center space-x-4 gap-4 w-full">
      <ColorInput
        title={"color"}
        defaultValue={font.color}
        onChange={handleColorChange}
        className={'flex-row'}
        titleClassName={'sm:hidden'}
      >
        <Icon name="format_color_text" className="self-center mr-2"/>
      </ColorInput>
    </div>
  );
};

/*

      <div className="text-base font-bold">Color</div>

      <div className="flex px-5 text-neutral-400 text-base">
        <div
          className="border px-2 color-picker-toggle relative w-8 h-8"
          style={{
            cursor: "pointer",
            backgroundColor: font.color,
          }}
        >
          <input
            type="color"
            value={font.color}
            onChange={handleColorChange}
            className="color-picker-input absolute opacity-0 cursor-pointer w-full h-full"
            id="fontColor"
            name="fontColor"
            style={{
              borderRadius: "5px",
            }}
          />
          <span
            className="ml-2 absolute top-0 left-full px-1"
            style={{ marginTop: "5px" }}
          >
            {font.color}
          </span>
        </div>
      </div>

*/

export default FontColorInput;
