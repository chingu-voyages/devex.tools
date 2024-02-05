import { useRef } from "react";
import CustomPicker from './CustomPicker';

export default function ColorPickerTool({ colorData, setColorData }) {
  const parentRef = useRef();

  const handleColorChange = (newColorData) => {
    setColorData(newColorData)
  };

  return (
    <>
      <section ref={parentRef} id="color-picker-container" className="flex flex-1">
        <div style={{backgroundColor: colorData.color, width: '50px', height: '50px'}}></div>
        <CustomPicker
        colorData={colorData}
        handleColorChange={handleColorChange}/>
      </section>
    </>
  );

    function updateSize(){
        const currentParentWidth = parentRef.current.offsetWidth;
    }

}
