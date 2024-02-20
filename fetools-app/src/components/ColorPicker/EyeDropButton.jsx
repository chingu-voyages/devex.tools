import { MdColorize } from 'react-icons/md';

import { createColorObj } from './ColorPickerUtils';
import ToastButton from '../ToastButton';

export default function EyeDropButton({ title, content, newValue, setStateVar, toastState }) {
  return (
    <ToastButton onClickFun={changeCurrentColor} toastState={toastState}>
      <MdColorize />
    </ToastButton>
  );

  function changeCurrentColor() {
    toastState.setToastContent({
      title: `${title}`,
      content: `${content||''} ${newValue}`,
      icon: 'eyedrop',
      addOn(){
        return(
        <span
          className="absolute right-0 bottom-2 flex-2 w-10 h-10 rounded-full"
          style={{ background: newValue }}
        ></span>
      )}
    });
    setStateVar();
  }
}
