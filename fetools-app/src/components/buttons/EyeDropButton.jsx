import Icon from "../Icon";

import ToastButton from "../ToastButton";

export default function EyeDropButton({
    title,
    content = "",
    newValue = "",
    icon = "colorize",
    setState,
    toastState,
}) {
    return (
        <ToastButton onClickFun={changeCurrentItem} toastState={toastState}>
            <Icon name={icon} />
        </ToastButton>
    );

    function changeCurrentItem() {
        toastState.setToastContent({
            title: `${title}`,
            content: `${content} ${newValue}`,
            icon: "eyedrop",
            addOn() {
                return (
                    <span
                        className="absolute right-0 bottom-2 flex-2 w-10 h-10 rounded-full"
                        style={{ background: newValue }}
                    ></span>
                );
            },
        });
        setState();
    }
}
