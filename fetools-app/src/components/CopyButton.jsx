import { MdContentCopy } from 'react-icons/md';
import ToastButton from './ToastButton';

function CopyButton({ onCopy, toastState }) {
  const handleCopy = () => {
    const textToCopy = onCopy();
    if (navigator.clipboard && textToCopy) {
      navigator.clipboard.writeText(textToCopy).then(
        () => {
          toastState.setToastContent({
            title: 'Color Copied To Clipboard',
            content: textToCopy,
            icon: 'copy',
          });
          console.log(toastState);
        },
        err => {
          console.error('Could not copy text: ', err);
        }
      );
    }
  };

  return (
    <ToastButton onClickFun={handleCopy} toastState={toastState}>
      <MdContentCopy />
    </ToastButton>
  );
}

export default CopyButton;
