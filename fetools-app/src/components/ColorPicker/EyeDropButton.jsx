import { MdColorize } from 'react-icons/md';

import { createColorObj } from './ColorPickerUtils';
import ToastButton from '../ToastButton';

export default function EyeDropButton({ newValue, setStateVar, toastState }) {
  return (
    <ToastButton onClickFun={changeCurrentColor} toastState={toastState}>
      <MdColorize />
    </ToastButton>
  );

  function changeCurrentColor() {
    toastState.setToastContent({
      title: 'New Color Set!',
      content: `current color is ${newValue}`,
      icon: 'eyedrop',
      addOn: {type:'color-dot', color: newValue}
    });
    setStateVar(createColorObj(newValue));
  }
}
