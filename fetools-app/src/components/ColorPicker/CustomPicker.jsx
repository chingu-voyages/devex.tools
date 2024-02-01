import { useEffect } from "react"

export default function CustomPicker({
  renderPicker
}){

  useEffect(()=>{
    renderPicker()
  },[])

  return(
    <>
    </>
  )
}