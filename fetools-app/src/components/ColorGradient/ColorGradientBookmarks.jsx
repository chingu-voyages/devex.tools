import { BookmarkCollection, BookmarkHoverActions } from "../Bookmarks/index";
import EyeDropButton from "../buttons/EyeDropButton";
import CopyButton from "../CopyButton";
import { ToolSection } from "../ToolsLayout/Sections";

export default function ColorGradientBookmarks({
    bookmarks,
    removeBookmark,
    toastState,
    setColorsArr,
    setInputValue,
    setGradientColors,
    inputValue,
}) {
    return <ToolSection title="Your Collection" icon="bookmarks"></ToolSection>;
}
