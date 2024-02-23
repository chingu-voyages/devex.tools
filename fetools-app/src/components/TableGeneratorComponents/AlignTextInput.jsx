import { useState } from "react";
import Icon from "../Icon";

export const AlignTextInput = ({ tableConfig, setTableConfig }) => {
  const [activeText, setActiveText] = useState("center");

  return (
    <div className="flex  w-full h-8 items-center justify-evenly ">
      <button className="rounded-[1px]">
        <Icon
          className={`cursor-pointer  ${
            activeText === "left" && " border border-1 border-[#999999] "
          } w-8 h-8  flex justify-center items-center hover:text-[#7F40BF]  `}
          name="format_align_left"
          style={{ borderRadius: "4px" }}
          onClick={() => {
            setActiveText("left"),
              setTableConfig({ ...tableConfig, textAlign: "left" });
          }}
        />
      </button>

      <button className="rounded-[1px]">
        <Icon
          className={`cursor-pointer  ${
            activeText === "center" && "outline outline-1 outline-[#999999]"
          } w-8 h-8  flex justify-center items-center hover:text-[#7F40BF] `}
          name="format_align_center"
          style={{ borderRadius: "4px" }}
          onClick={() => {
            setActiveText("center"),
              setTableConfig({ ...tableConfig, textAlign: "center" });
          }}
        />
      </button>

      <button className="rounded-[1px]">
        <Icon
          className={`cursor-pointer  ${
            activeText === "right" && "outline outline-1 outline-[#999999]"
          } w-8 h-8  flex justify-center items-center  hover:text-[#7F40BF]`}
          name="format_align_right"
          style={{ borderRadius: "4px" }}
          onClick={() => {
            setActiveText("right"),
              setTableConfig({ ...tableConfig, textAlign: "right" });
          }}
        />
      </button>

      <button className="rounded-[1px]" >
        <Icon
          className={`cursor-pointer  ${
            activeText === "justify" && "outline outline-1 outline-[#999999]"
          } w-8 h-8  flex justify-center items-center hover:text-[#7F40BF] `}
          name="format_align_justify"   
          style={{ borderRadius: "4px" }}
          onClick={() => {
            setActiveText("justify"),
              setTableConfig({ ...tableConfig, textAlign: "justify" });
          }}
        />  
      </button>
    </div>
  );
};
