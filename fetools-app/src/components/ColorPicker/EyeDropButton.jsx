import { MdColorize } from 'react-icons/md';
import { createColorObj } from './ColorPickerUtils';

export default function EyeDropButton({ newColor, setColorData }) {
  return (
    <div onClick={changeCurrentColor}>
      <MdColorize />
    </div>
  );

  function changeCurrentColor() {
    setColorData(createColorObj(newColor));
  }
}
