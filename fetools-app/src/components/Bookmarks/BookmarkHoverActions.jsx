export default function BookmarkHoverActions({
    className,
    label,
    actions,
    idx,
}) {
    return (
        <div
            key={idx}
            className={`absolute left-0 top-0 hidden bottom-0 w-full flex-col items-center justify-center rounded-md rounded-tl-none bg-black/50 px-4 pt-4 text-center text-white [:hover>&]:flex ${
                className ? className : ""
            }`}
        >
            <p>{label}</p>
            <div className="action-buttons flex gap-4 justify-center text-[24px]">
                {actions}
            </div>
        </div>
    );
}
