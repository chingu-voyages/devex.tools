import { Root, Title, Description } from '@radix-ui/react-toast';
import { MdContentCopy } from "react-icons/md";

export default function ToastNotification({title, copiedCode, setOpenToast, openToast}){
 
  return(
    <Root
    type='foreground'
    className={`
    ToastRoot max-sm:ToastTop sm:ToastBottom
    relative bg-white rounded-md text-black w-[360px] max-[380px]:w-full m-auto px-12 py-4 border border-gray-300
    shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] 
    items-center 
    data-[state=open]:animate-slideIn 
    data-[state=closed]:animate-hide 
    data-[swipe=move]:translate-y-[var(--radix-toast-swipe-move-y)] 
    data-[swipe=cancel]:translate-y-0 
    data-[swipe=cancel]:transition-[transform_200ms_ease-out]`}
    open={openToast}
    onOpenChange={setOpenToast}>
      <span className='absolute left-5 top-5 text-gray-500'><MdContentCopy/></span>
      <div>
      <Title className="mb-[5px] font-sm font-bold">
        {title}
      </Title>
      <Description asChild>
        <span>
          {copiedCode}
        </span>
      </Description>
      </div>
    </Root>
  );
}
