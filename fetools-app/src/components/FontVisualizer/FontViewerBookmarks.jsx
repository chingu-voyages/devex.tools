import { BookmarkCollection, BookmarkHoverActions } from "../Bookmarks/index";
import EyeDropButton from "../buttons/EyeDropButton";
import { ToolSection } from "../ToolsLayout/Sections";

export default function FontViewerBookmarks({
    bookmarks,
    removeBookmark,
    setFont,
    toastState,
}) {
    console.log("FontViewerBookmarks");
    return (
        <ToolSection title="Your Collection" icon="bookmarks">
            <BookmarkCollection
                bookmarks={bookmarks}
                removeBookmark={removeBookmark}
                formatBookmarkCardStyle={(item) => {
                    return {
                        backgroundColor: item.backgroundColor,
                    };
                }}
                formatBookmarkCardContents={(item) => {
                    return (
                        <div className="flex flex-col items-center">
                            <div className="p-2 text-xs flex w-full justify-between text-white">
                                <p className="font-bold">{item.name}</p>
                                <p>
                                    {item.fontSize} /{" "}
                                    {item.lineHeight * 100 + "%"}
                                </p>
                            </div>
                            <div
                                style={{
                                    fontFamily: item.name,
                                    fontSize: "4rem",
                                    color: item.color,
                                    fontWeight: item.fontWeight,
                                    fontStyle: item.style,
                                    textTransform: item.textTransform,
                                }}
                            >
                                Aa
                            </div>
                        </div>
                    );
                }}
                formatHoverActions={(item) => {
                    const EyeDropAction = (
                        <EyeDropButton
                            key="EyeDropButton"
                            title={"New Color Set"}
                            setState={() => setFont(item)}
                            content="Font Style"
                            toastState={toastState}
                        />
                    );
                    return (
                        <BookmarkHoverActions
                            actions={[EyeDropAction]}
                        ></BookmarkHoverActions>
                    );
                }}
            />
        </ToolSection>
    );
}
