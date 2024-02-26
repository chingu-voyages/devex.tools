import Icon from "../Icon";

export default function RemoveBookmarkButton({ removeBookmark, editMode }) {
    return (
        <button
            className={`absolute left-[-8%] top-[-19%] rounded-full w-10 h-10  bg-black/75 p-2 text-sm font-bold text-white hover:animate-wiggle ${
                editMode ? "" : "hidden"
            }`}
            onClick={removeBookmark}
        >
            <Icon name="close" />
        </button>
    );
}
