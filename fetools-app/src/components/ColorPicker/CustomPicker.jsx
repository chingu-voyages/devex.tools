import { useEffect } from "react"

import tinycolor from "tinycolor2";


export default function CustomPicker({
  color,
  handleChange
}){

  useEffect(()=>{
   // renderPicker()
   // updateStyle()

  },[])

  return(
    <>
      <canvas id="color-picker"></canvas>
    </>
  )

    function createGradient(){
      const colorCanvas = document.getElementById('color_canvas');
      const ColorCtx = colorCanvas .getContext('2d');  // This create a 2D context for the canvas

      const color = 'rgba(0,0,255,1)';
      let gradientH = ColorCtx .createLinearGradient(0, 0, ColorCtx .canvas.width, 0);
      gradientH.addColorStop(0, '#fff');
      gradientH.addColorStop(1, color);
      ColorCtx .fillStyle = gradientH;
      ColorCtx .fillRect(0, 0, ColorCtx .canvas.width, ColorCtx .canvas.height);


      // Create a Vertical Gradient(white to black)
      let gradientV = ColorCtx .createLinearGradient(0, 0, 0, 300);
      gradientV.addColorStop(0, 'rgba(0,0,0,0)');
      gradientV.addColorStop(1, '#000');
      ColorCtx .fillStyle = gradientV;
      ColorCtx .fillRect(0, 0, ColorCtx .canvas.width, 
      ColorCtx .canvas.height); 
    }

}