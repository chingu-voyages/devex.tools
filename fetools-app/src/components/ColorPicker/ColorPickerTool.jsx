import { useRef } from "react";
import iro from "@jaames/iro";
import CustomPicker from "./CustomPicker";

export default function ColorPickerTool({ color, setColor }) {
  const parentRef = useRef();

  const handleChange = (color) => {
    setColor(color);
  };

  return (
    <>
      <section ref={parentRef} id="color-picker-container">
        <CustomPicker renderPicker={renderPicker} />
      </section>
    </>
  );

  function renderPicker() {
    const colorPicker = new iro.ColorPicker(`#${parentRef.current.id}`,{
        layout: [
          { 
            component: iro.ui.Box,
            options: {}
          },
        ]
      });
  }
}
