import { useEffect } from 'react';

import { Provider } from '@radix-ui/react-toast';

import ToastViewport from './ToastViewport';
import ToastNotification from './ToastNotification';

export default function Toast({ toastState }) {
  const { openToast, setOpenToast, toastTimerRef, toastContent } = toastState;

  const windowSize = window.innerWidth;

  useEffect(() => {
    return () => clearTimeout(toastTimerRef.current);
  }, []);

  return (
    <>
      <Provider
        label="Notification"
        swipeDirection={windowSize < 648 ? 'up' : 'down'}
      >
        <ToastNotification
          openToast={openToast}
          setOpenToast={setOpenToast}
          timerRef={toastTimerRef}
          copiedCode={toastContent}
        />
        <ToastViewport />
      </Provider>
    </>
  );
}

/*
                <ToastNotification 
                open={open} 
                setOpen={setOpen} 
                timerRef={timerRef} 
                copiedCode={copiedCode}/>
*/

/*
     <ToastPrimitive.Provider label='Notification' swipeDirection='up'>
    <button className={btnClassName}
    onClick={() => {
      onClickfun();
      setOpen(false);
      window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        setOpen(true);
      }, 100);
    }}
    >
        {children}
      </button>

  
    </ToastPrimitive.Provider>

      function removeOtherToasts(){
    const toasts = document.querySelectorAll('.ToastRoot')

    if(toasts.length===0){return}

    toasts.forEach(toast=>{
      
      const parentSpan = toast.parentElement
      
      if(parentSpan.children.length===0){return}
      
      toast.remove()
    })
  }
*/
