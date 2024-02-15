import { MdContentCopy } from "react-icons/md";
import ToastButton from "./ToastButton";

function CopyButton({onCopy, timerRef, setOpenToast, setToastContent}) {

  const handleCopy = () => {
    const textToCopy = onCopy();
    if (navigator.clipboard && textToCopy) {
      navigator.clipboard.writeText(textToCopy).then(
        () => {
          setToastContent({title: 'Color Copied To Clipboard',content: textToCopy})
        },
        (err) => {
          console.error("Could not copy text: ", err);
        }
      );
    }
  };

  return (
    <ToastButton 
    onClickFun={handleCopy} 
    timerRef={timerRef} 
    setOpenToast={setOpenToast}>
      <MdContentCopy/>
    </ToastButton>

  );
}

export default CopyButton;