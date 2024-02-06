import { useRef } from "react";
import CustomPicker from './CustomPicker';

export default function ColorPickerTool({ colorData, setColorData, handleQuery }) {
  const parentRef = useRef();

  const handleColorChange = (newColorData) => {
    setColorData(newColorData)
  };

  return (
    <>
      <section ref={parentRef} id="color-picker-container" className="flex flex-1 flex-col">
        <div 
        style={{backgroundColor: colorData.color}}
        className="h-24"></div>
        <CustomPicker
        colorData={colorData}
        handleColorChange={handleColorChange}
        handleQuery={handleQuery}
        className="w-full h-80"/>
      </section>
    </>
  );

    function updateSize(){
        const currentParentWidth = parentRef.current.offsetWidth;
    }

}
