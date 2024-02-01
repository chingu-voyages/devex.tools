import { useEffect } from "react"
import { ChromePicker } from "react-color";
import reactCSS from "reactcss";

export default function CustomPicker({
  color,
  handleChange
}){

  const pickerStyle = reactCSS({
    'default':{
      picker:{
        width: '400px',
        background: '#000',
      },
      active:{
        background: 'none',
      },
    }
  })

  useEffect(()=>{
   // renderPicker()
   // updateStyle()

  },[])

  return(
    <>
      <ChromePicker 
      className="flex-1 w-100 shadow-none"
      color={color}
      onChange={handleChange}
      styles={pickerStyle}/>
    </>
  )

}