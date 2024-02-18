import {Viewport} from '@radix-ui/react-toast';

const ToastViewport = ()=>{
    return(
    <Viewport draggable={false} id={'toast-viewport'}
    className={`pointer-events-none
    fixed flex flex-col gap-[10px] w-full left-0
    m-0 list-none z-[2147483647] outline-none
    max-sm:top-0 max-sm:p-2 sm:bottom-0 sm:p-6 `}/>
    )
};

export default ToastViewport;