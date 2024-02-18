import { Root, Title, Description } from "@radix-ui/react-toast";
import { MdColorize, MdContentCopy, MdError } from "react-icons/md";

export default function ToastNotification({
  toastContent,
  setOpenToast,
  openToast,
}) {
  const { title, content, icon, addOn } = toastContent;
  return (
    <Root
      type="foreground"
      className={`pointer-events-auto
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
      onOpenChange={setOpenToast}
    >
      <span className="absolute left-5 top-5 text-gray-500">
        {getIcon(icon)}
      </span>
      <div>
        <Title className="mb-[5px] font-sm font-bold">{title}</Title>
        <Description asChild>
          <div className="relative flex">
            <span className="flex-1">{content}</span>
            {getAddOn()}
          </div>
        </Description>
      </div>
    </Root>
  );

  function getIcon(iconType) {
    switch (iconType) {
      case "copy":
        return <MdContentCopy />;
      case "eyedrop":
        return <MdColorize />;
      case "error":
        return <MdError />;
      default:
        break;
    }
  }

  function getAddOn() {
    if (!addOn) {
      return;
    }
    switch (addOn.type) {
      case "color-dot":
        return (
          <span
            className="absolute right-0 bottom-2 flex-2 w-10 h-10 rounded-full"
            style={{ backgroundColor: addOn.color }}
          ></span>
        );

      default:
        break;
    }
  }
}
