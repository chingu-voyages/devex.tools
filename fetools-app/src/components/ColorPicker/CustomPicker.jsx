import { useEffect, useRef } from "react"

import tinycolor from "tinycolor2";

export default function CustomPicker({
  colorData,
  handleColorChange
}){

  const canvasRef = useRef()

  useEffect(()=>{
    createGradient()
  },[])

  return(
    <>
    <div>
      <canvas ref={canvasRef} id="color-picker" className="relative" onClick={handleClick}>
      </canvas>
    </div>  
    </>
  )

    function createGradient(){
      const ColorCtx = canvasRef.current.getContext('2d');  // This create a 2D context for the canvas

      const color = colorData.color;
      //Make HueGradient
      const gradientH = ColorCtx.createLinearGradient(0, 0, ColorCtx.canvas.width, 0);
      gradientH.addColorStop(0, '#fff');
      gradientH.addColorStop(1, color);
      ColorCtx.fillStyle = gradientH;
      ColorCtx.fillRect(0, 0, ColorCtx.canvas.width, ColorCtx.canvas.height);

      // Create a Vertical Gradient(white to black)
      const gradientV = ColorCtx.createLinearGradient(0, 0, 0, ColorCtx.canvas.height);
      gradientV.addColorStop(0, 'rgba(0,0,0,0)');
      gradientV.addColorStop(1, '#000');
      ColorCtx .fillStyle = gradientV;
      ColorCtx .fillRect(0, 0, ColorCtx.canvas.width, 
      ColorCtx .canvas.height); 

    }

    function createMarker(){

    }

    function handleClick(e){

      const ColorCtx = canvasRef.current.getContext('2d')

      const x = e.clientX;  // Get X coordinate
      const y = e.clientY;  // Get Y coordinate
      const pixel = ColorCtx.getImageData(x,y,1,1)['data'];   // Read pixel Color
      const rgb = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
      
      console.log(ColorCtx)
      console.log(e.clientX, e.clientY)
      console.log(pixel)

      colorData.color = rgb
      handleColorChange({...colorData})
    }
}