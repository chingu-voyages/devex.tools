import * as Toast from '@radix-ui/react-toast';
import { useEffect, useRef, useState } from 'react';
import { MdContentCopy } from "react-icons/md";

export default function CreateToast({
  children, 
  copiedCode, 
  onClickfun, 
  btnClassName = '',
  buttonType
}){
  
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null)
  const timerRef = useRef(0)


  useEffect(()=>{
    return () => clearTimeout(timerRef.current);
  },[])

  const isSmallScreen = window.innerWidth<=640

  if(isSmallScreen){
    return (
    <Toast.Provider label='Notification' swipeDirection='up'>
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
      <Toast.Root
      type='foreground'
      className={`
      ToastRoot ToastTop
      relative bg-white rounded-md text-black w-[360px] m-auto px-12 py-4 border border-gray-300
      shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] 
      items-center 
      data-[state=open]:animate-slideIn 
      data-[state=closed]:animate-hide 
      data-[swipe=move]:translate-y-[var(--radix-toast-swipe-move-y)] 
      data-[swipe=cancel]:translate-y-0 
      data-[swipe=cancel]:transition-[transform_200ms_ease-out]`}
      open={open}
      onOpenChange={setOpen}>
        <span className='absolute left-5 top-5 text-gray-500'><MdContentCopy/></span>
        <div>
        <Toast.Title className="mb-[5px] font-sm font-bold">
          Code Copied to Clipboard
        </Toast.Title>
        <Toast.Description asChild>
          <span>
            {copiedCode}
          </span>
        </Toast.Description>
        </div>
      </Toast.Root>
  
    <Toast.Viewport 
      className={`
      ${!isSmallScreen?'hidden':''}
      [--viewport-padding:_25px] fixed top-0 left-0
      flex flex-col p-[var(--viewport-padding)] gap-[10px] w-full 
      m-0 list-none z-[2147483647] outline-none`}/>
    </Toast.Provider>
    )
  } else{
    return (
    <Toast.Provider label='Notification' swipeDirection='down'>
      <button id={`button-${buttonType}`} ref={buttonRef} className={btnClassName}
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
      <Toast.Root
      type='foreground'
      className={`
      ToastRoot ToastBottom visible
      relative bg-white rounded-md text-black w-[360px] m-auto px-12 py-4 border border-gray-300
      shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] 
      items-center 
      data-[state=open]:animate-slideIn 
      data-[state=closed]:animate-hide 
      data-[swipe=move]:translate-y-[var(--radix-toast-swipe-move-y)] 
      data-[swipe=cancel]:translate-y-0 
      data-[swipe=cancel]:transition-[transform_200ms_ease-out]`}
      open={open}
      onOpenChange={setOpen}>
        <span className='absolute left-5 top-5 text-gray-500'><MdContentCopy/></span>
        <div>
        <Toast.Title className="mb-[5px] font-sm font-bold">
          Code Copied to Clipboard
        </Toast.Title>
        <Toast.Description asChild>
          <span>
            {copiedCode}
          </span>
        </Toast.Description>
        </div>
      </Toast.Root>
  
    <Toast.Viewport 
      className={`
      visible
      ${isSmallScreen?'hidden':''}
      [--viewport-padding:_25px] fixed bottom-0 left-0
      flex flex-col p-[var(--viewport-padding)] gap-[10px] w-full 
      m-0 list-none z-[100] outline-none`}/>
    </Toast.Provider>
    )
  }
}
