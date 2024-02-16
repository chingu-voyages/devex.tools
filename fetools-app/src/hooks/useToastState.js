import { useState, useRef } from 'react';

export default function useToastState() {
  const [openToast, setOpenToast] = useState(false);
  const [toastContent, setToastContent] = useState({
    title: 'Toast Title',
    content: 'Toast Content',
    icon: 'copy',
  });
  const toastTimerRef = useRef(0);

  return {
    openToast,
    setOpenToast,
    toastContent,
    setToastContent,
    toastTimerRef,
  };
}
