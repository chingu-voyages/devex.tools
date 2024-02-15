import { MdColorize } from 'react-icons/md';

import { createColorObj } from './ColorPickerUtils';
import ToastButton from '../ToastButton';

export default function EyeDropButton({ newColor, setColorData, toastState }) {
  return (
    <ToastButton onClickFun={changeCurrentColor} toastState={toastState}>
      <MdColorize />
    </ToastButton>
  );

  function changeCurrentColor() {
    toastState.setToastContent({
      title: 'New Color Set!',
      content: `current color is ${newColor}`,
      icon: 'eyedrop',
    });
    setColorData(createColorObj(newColor));
  }
}
