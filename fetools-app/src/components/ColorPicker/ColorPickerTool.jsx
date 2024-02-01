import { useRef } from "react";
import CustomPicker from './CustomPicker';

export default function ColorPickerTool({ color, setColor }) {
  const parentRef = useRef();

  const handleChange = (color) => {
    console.log(color)
    setColor(color);
  };

  return (
    <>
      <section ref={parentRef} id="color-picker-container" className="flex flex-1">
        <CustomPicker
        updateSize={updateSize}
        color={color}
        handleChange={handleChange}/>
      </section>
    </>
  );

    function updateSize(){
        const currentParentWidth = parentRef.current.offsetWidth;

    }

}
