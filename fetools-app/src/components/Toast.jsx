import { useEffect } from 'react';

import { Provider } from '@radix-ui/react-toast';

import ToastViewport from './ToastViewport';
import ToastNotification from './ToastNotification';

export default function Toast({ toastState }) {
  const windowSize = window.innerWidth;

  useEffect(() => {
    return () => clearTimeout(toastState.toastTimerRef.current);
  }, [toastState.toastTimerRef]);

  return (
    <>
      <Provider
        label="Notification"
        swipeDirection={windowSize < 648 ? 'up' : 'down'}
      >
        <ToastNotification
          openToast={toastState.openToast}
          setOpenToast={toastState.setOpenToast}
          timerRef={toastState.toastTimerRef}
          toastContent={toastState.toastContent}
        />
        <ToastViewport />
      </Provider>
    </>
  );
}
