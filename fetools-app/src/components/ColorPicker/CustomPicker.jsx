import { useEffect, useRef, useState } from "react"
import { getHexString } from "../ColorGradientComponents/ColorGradientUtils";

export default function CustomPicker({
  colorData,
  handleColorChange,
  handleQuery
}){

  const canvasContainerRef = useRef();
  const canvasRef = useRef();
  const markerRef = useRef();
  const intervalMouseMoveRef = useRef(null);
  const intervalMouseClickRef = useRef(null);

  const [imgFile, setImgFile] = useState(null)
  const [isColorPicker, setIsColorPicker] = useState(true)
  const [mouseCoor, setMouseCoor] = useState({x:0,y:0})
  const [currentColor, setCurrentColor] = useState(getHexString(colorData.color))

  useEffect(()=>{
    markerRef.current.children[0].style.background = colorData.color
    canvasRef.current.currentColor = currentColor
    return ()=>{
      stopInterval(intervalMouseMoveRef)
    }
  },[mouseCoor])

  useEffect(()=>{
    resizeCanvas()

    if(isColorPicker){
      createCanvasGradients()
    } else{
      console.log('img picker')
      createImagePicker()
    }

  },[isColorPicker])

  return(
    <>
    <div>
      <div ref={canvasContainerRef} className="relative">
        <canvas 
        ref={canvasRef} 
        id="color-picker"
        onDragOver={(e)=>isColorPicker?"":e.preventDefault()}
        onDrop={handleOnDrop}
        onMouseMove={(e)=>startInterval(e,handleOnMouseMove,intervalMouseMoveRef)}
        onClick={(e)=>handleClick(e,true)}
        onMouseDown={(e)=>startInterval(e,handleClick,intervalMouseClickRef)}
        onMouseUp={()=>(
          stopInterval(intervalMouseClickRef), 
          stopInterval(intervalMouseMoveRef), 
          handleQuery(currentColor))}
        onMouseLeave={()=>(stopInterval(intervalMouseClickRef), stopInterval(intervalMouseMoveRef))}
        className="relative z-0 w-full h-48 rounded-b-2xl"></canvas>
        <div ref={markerRef} 
        className={`
        marker absolute leading-none rounded-full border-4 outline outline-1 outline-slate-600  w-5 h-5 mt-[-11px] ml-[-8px] pointer-events-none`}>
          {createPickerMarker()}
        </div>
      </div>
          <button onClick={()=>setIsColorPicker(!isColorPicker)}>Switch sampler</button>
    </div>  
    </>
  )

    function resizeCanvas(){
      const WIDTH = canvasContainerRef.current.offsetWidth
      const HEIGHT = canvasContainerRef.current.offsetHeight

      canvasRef.current.width = WIDTH
      canvasRef.current.height = HEIGHT
    }

    function createCanvasGradients(){
      const colorCtx = canvasRef.current.getContext('2d');  // This create a 2D context for the canvas

      const hue = colorData.hue;
      //Make HueGradient
      const gradientH = colorCtx.createLinearGradient(0, 0, colorCtx.canvas.width, 0);
      gradientH.addColorStop(0, '#fff');
      gradientH.addColorStop(1, hue);
      colorCtx.fillStyle = gradientH;
      colorCtx.fillRect(0, 0, colorCtx.canvas.width, colorCtx.canvas.height);

      // Create a Vertical Gradient(transparent to black)
      const gradientV = colorCtx.createLinearGradient(0, 0, 0, colorCtx.canvas.height);
      gradientV.addColorStop(0, 'rgba(0,0,0,0)');
      gradientV.addColorStop(1, '#000');
      colorCtx .fillStyle = gradientV;
      colorCtx .fillRect(0, 0, colorCtx.canvas.width, 
      colorCtx .canvas.height); 

    }

    function createImagePicker(){

      if(!imgFile){
        return
      }

      const colorCtx = canvasRef.current.getContext('2d');
      const reader = new FileReader();

      let imageCopiedData = imgFile
      console.log(imgFile)

      reader.onload = function(event) {
        console.log(event.target.result)
        const img = new Image(),
            imgStr = imgFile || event.target.result,
            imgData = colorCtx.getImageData(0,0, canvasRef.current.width,canvasRef.current.height);

        img.src = event.target.result;
        
        img.onload = function(event) {
            colorCtx.height = canvasRef.height = this.height;
            colorCtx.width = canvasRef.width = this.width;
            colorCtx.drawImage(this, 0, 0);
        };
    };
    
      reader.readAsDataURL(imageCopiedData);
    }

    function handleOnDrop(e){
      
      e.preventDefault();
      if(isColorPicker){
        return
      }

      const colorCtx = canvasRef.current.getContext('2d');
      const reader = new FileReader();

      console.log(imgFile)
      let imageCopiedData = imgFile || e.dataTransfer.files[0]

      reader.onload = function(event) {
        console.log(event.target.result)
        const img = new Image(),
            imgStr = imgFile || event.target.result,
            imgData = colorCtx.getImageData(0,0, canvasRef.current.width,canvasRef.current.height);

        img.src = event.target.result;
        
        img.onload = function(event) {
            colorCtx.height = canvasRef.height = this.height;
            colorCtx.width = canvasRef.width = this.width;
            colorCtx.drawImage(this, 0, 0);
        };
    };
    
      reader.readAsDataURL(imageCopiedData);
      setImgFile(e.dataTransfer.files[0])
    }

    function createPickerMarker(){
      return(
        <div className={`rounded-full border border-slate-300 w-full h-full`}></div>
      )
    }

    function handleClick(e, firstClick){
      colorData.color = canvasRef.current.currentColor
      handleColorChange({...colorData})
      calculateMarkerPosition()
      if(!firstClick){
        canvasRef.current.click()
      }
      
    }

    function startInterval(e, func, ref){
      if (ref.current) return;
      ref.current = setInterval(() => {
        func(e)
      }, 10);
    }

    function stopInterval(ref){
      if (ref.current) {
        clearInterval(ref.current);
        ref.current = null;
      }
    }

    function handleOnMouseMove(e){

      trackColorOnMouse()
      setMouseCoor({x: e.clientX, y: e.clientY})

      function trackColorOnMouse(){
        const ColorCtx = canvasRef.current.getContext('2d')
        const canvasRect = canvasRef.current.getBoundingClientRect()
  
        const x = mouseCoor.x - canvasRect.left;
        const y = mouseCoor.y - canvasRect.top;
  
        const pixel = ColorCtx.getImageData(x,y,1,1)['data'];   // Read pixel Color
        const rgb = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
        

        setCurrentColor(getHexString(rgb))
      }
    }

    function calculateMarkerPosition(){
      const canvasRect = canvasRef.current.getBoundingClientRect()

      const x = parseInt(((mouseCoor.x - canvasRect.left)/canvasRef.current.offsetWidth)*100)
      const y =  parseInt(((mouseCoor.y - canvasRect.top)/canvasRef.current.offsetHeight)*100)

      console.log(x, y)

      markerRef.current.style.top = `${y}%`
      markerRef.current.style.left = `${x}%`
    }
  }