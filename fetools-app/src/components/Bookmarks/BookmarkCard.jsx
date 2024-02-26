import RemoveBookmarkButton from "./RemoveBookmarkButton";

export default function BookmarkCard({
    className,
    style,
    editMode,
    removeBookmark,
    children,
    hoverActions,
}) {
    return (
        <div
            className={`bookmark-card relative w-[14rem] aspect-video rounded-md rounded-tl-none shadow-l ${
                className || ""
            }`}
            style={style}
        >
            <RemoveBookmarkButton
                removeBookmark={removeBookmark}
                editMode={editMode}
            />
            {!editMode && hoverActions}
            {children}
        </div>
    );
}
