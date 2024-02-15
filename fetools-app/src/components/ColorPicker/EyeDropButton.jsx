import { MdColorize } from "react-icons/md";

import { createColorObj } from './ColorPickerUtils';
import ToastButton from "../ToastButton";

export default function EyeDropButton({newColor, setColorData, timerRef, setOpenToast, setToastContent}) {

  return (
    <ToastButton 
    onClickFun={changeCurrentColor} 
    timerRef={timerRef} 
    setOpenToast={setOpenToast}>
      <MdColorize/>
    </ToastButton>

  );

  function changeCurrentColor(){
    setToastContent({title: 'New Color Set!',content: `current color is ${newColor}`,icon: 'eyedrop'})
    setColorData(createColorObj(newColor))
  }
}