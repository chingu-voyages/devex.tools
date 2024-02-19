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
        className="h-24 mb-3 rounded-tr-2xl">
        </div>
        <CustomPicker
        colorData={colorData}
        handleColorChange={handleColorChange}
        handleQuery={handleQuery}/>
      </section>
    </>
  );

    function updateSize(){
        const currentParentWidth = parentRef.current.offsetWidth;
    }

}
