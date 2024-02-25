import { ToolPreviewPane } from "../ToolsLayout/Sections";

function handlePaste(event) {
  // Prevent the default paste action
  event.preventDefault();

  // Get the text content from the clipboard
  const text = (event.clipboardData || window.clipboardData).getData("text");

  // Insert the text content into the contentEditable div
  document.execCommand("insertHTML", false, text);
}

export default function Preview({
  alertShown = false,
  gridBackgroundStyle,
  editableRef,
  cssSize,
  handleContentChange,
  isExpanded,
  toggleIsExpanded,
}) {
  return (
    <ToolPreviewPane
      isExpanded={isExpanded}
      toggleIsExpanded={toggleIsExpanded}
      expandedLayoutClasses={`h-[${cssSize}px] min-h-72`}
      columnLayoutClasses={`h-[${cssSize}px] min-h-72 lg:border-r rounded-bl-lg`}
    >
      {/* Inline Notification about Preview Limit */}

      {alertShown && (
        <div className="px-4 py-2 text-center text-yellow-800 bg-yellow-100 rounded-md">
          Preview is limited to 800px. Conversion will still be accurate above
          this value.
        </div>
      )}

      <div
        className="flex justify-center w-full h-full p-3 min-h-72 max-h-72 overflow-auto"
        style={gridBackgroundStyle}
      >
        <div
          contentEditable
          ref={editableRef}
          className="text-3xl font-bold leading-none break-words font-arial focus:outline-none max-w-full max-h-full"
          style={{
            fontSize: cssSize,
            margin: "auto",
          }}
          onInput={handleContentChange} // Update state on input
          onPaste={handlePaste}
        ></div>
      </div>
    </ToolPreviewPane>
  );
}
