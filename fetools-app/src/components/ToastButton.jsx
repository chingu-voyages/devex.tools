export default function ToastButton({onClickFun, children, setOpenToast, timerRef}) {

  return (
    <button onClick={()=>{
        onClickFun()
        setOpenToast(false);
        window.clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(() => {
          setOpenToast(true);
        }, 100);
        }}>
      {children}
    </button>
  );
}