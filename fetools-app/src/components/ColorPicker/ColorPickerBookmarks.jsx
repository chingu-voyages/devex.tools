import { BookmarkCollection, BookmarkHoverActions } from "../Bookmarks/index";
import EyeDropButton from "../buttons/EyeDropButton";
import CopyButton from "../CopyButton";
import { createColorObj } from "./ColorPickerUtils";
import { ToolSection } from "../ToolsLayout/Sections";
import tinycolor from "tinycolor2";

export default function ColorPickerBookmarks({
    bookmarks,
    removeBookmark,
    setColorData,
    toastState,
}) {
    return (
        <ToolSection title="Your Collection" icon="bookmarks">
            <BookmarkCollection
                bookmarks={bookmarks}
                removeBookmark={removeBookmark}
                formatBookmarkCardStyle={(item) => {
                    return {
                        backgroundColor: tinycolor(item.color).toHexString(),
                    };
                }}
                formatHoverActions={(item) => {
                    const newValue = tinycolor(item.color).toHexString();
                    const EyeDropAction = (
                        <EyeDropButton
                            key="EyeDropButton"
                            title={"New Color Set"}
                            setState={() =>
                                setColorData(createColorObj(item.color))
                            }
                            newValue={newValue}
                            toastState={toastState}
                        />
                    );
                    const CopyAction = (
                        <CopyButton
                            key="CopyButton"
                            onCopy={() => tinycolor(item.color).toHexString()}
                            toastState={toastState}
                        />
                    );
                    return (
                        <BookmarkHoverActions
                            label={tinycolor(item.color)
                                .toHexString()
                                .toUpperCase()}
                            actions={[EyeDropAction, CopyAction]}
                        ></BookmarkHoverActions>
                    );
                }}
            />
        </ToolSection>
    );
}
