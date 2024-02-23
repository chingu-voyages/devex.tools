import Icon from "../Icon";

export default function RemoveBookmarkButton({ removeBookmark, editMode }) {
    return (
        <button
            className={`absolute left-[-9%] top-[-22%] rounded-full  bg-black/75 p-2 text-sm font-bold text-white hover:animate-wiggle ${
                editMode ? "" : "hidden"
            }`}
            onClick={removeBookmark}
        >
            <Icon name="close" />
        </button>
    );
}
