import { BookmarkCollection, BookmarkHoverActions } from "../Bookmarks/index";
import EyeDropButton from "../buttons/EyeDropButton";
import CopyButton from "../CopyButton";
import { ToolSection } from "../ToolsLayout/Sections";
import tinycolor from "tinycolor2";

export default function ShadowCreatorBookmark({
  bookmarks,
  removeBookmark,
  toastState,
  ShadowsStyles,
  setShadowsStyles,
  ActiveShadow,
}) {
  return (
    <ToolSection title="Your Collection" icon="bookmarks">
      <BookmarkCollection
        bookmarks={bookmarks}
        removeBookmark={removeBookmark}
        formatBookmarkCardStyle={(item) => {
          console.log("item", item);
          if (!item) {
            return;
          }
          return {
            
    

            // border: "1px solid black"
          };
        }}
        formatBookmarkCardContents={(item) => {
          return (
            <div className="overflow-hidden h-full w-full flex justify-center items-center ">
              <div
                className="rounded-2xl bg-[#cccccc] "
                style={{
                  width: `120px`,
                  height: "90px",
                  boxShadow: `${item.inset ? "inset" : ""} ${
                    item.horizontalOffset
                  }px ${item.verticalOffset}px ${item.blur}px ${
                    item.spread
                  }px ${tinycolor(item.shadowColor)
                    .setAlpha(item.opacity / 100)
                    .toRgbString()}`,
                }}
              ></div>
            </div>
          );
        }}
        formatHoverActions={(item) => {
          if (!item) {
            return;
          }
          const newGradientCode = `${item.inset ? "inset" : ""} ${
            item.horizontalOffset
          }px ${item.verticalOffset}px ${item.blur}px ${
            item.spread
          }px ${tinycolor(item.shadowColor)
            .setAlpha(item.opacity / 100)
            .toRgbString()}`;
          const EyeDropAction = (
            <EyeDropButton
              key="EyeDropButton"
              title={"New Shadow Set"}
              setState={() => {
                ShadowsStyles[ActiveShadow] = {
                  ...ShadowsStyles[ActiveShadow],
                  ...item,
                };
                setShadowsStyles([...ShadowsStyles]);
              }}
              newValue={newGradientCode}
              toastState={toastState}
            />
          );
          const CopyAction = (
            <CopyButton
              key="CopyButton"
              onCopy={() => newGradientCode}
              toastState={toastState}
            />
          );
          return (
            <BookmarkHoverActions
              actions={[EyeDropAction, CopyAction]}
            ></BookmarkHoverActions>
          );
        }}
      />
    </ToolSection>
  );
}
