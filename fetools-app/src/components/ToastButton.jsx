export default function ToastButton({ onClickFun, children, toastState }) {
  const { setOpenToast, toastTimerRef } = toastState||false;

  return (
    <button
      onClick={() => {
        onClickFun();
        setOpenToast(false);
        window.clearTimeout(toastTimerRef.current);
        toastTimerRef.current = window.setTimeout(() => {
          setOpenToast(true);
        }, 100);
      }}
    >
      {children}
    </button>
  );
}
