import { ToolPreviewPane } from "../ToolsLayout/Sections";

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
      columnLayoutClasses="h-[${cssSize}px] min-h-72 lg:border-r rounded-bl-lg"
    >
      {/* Inline Notification about Preview Limit */}

      {alertShown && (
        <div className="px-4 py-2 text-center text-yellow-800 bg-yellow-100 rounded-md">
          Preview is limited to 800px. Conversion will still be accurate above
          this value.
        </div>
      )}

      <div
        className="flex flex-row items-center justify-center w-full h-full p-3"
        style={gridBackgroundStyle}
      >
        <div
          contentEditable
          ref={editableRef}
          className="flex items-center text-3xl font-bold leading-none break-words font-arial focus:outline-none min-h-72"
          style={{
            fontSize: cssSize,
            height: cssSize,
          }}
          onInput={handleContentChange} // Update state on input
        ></div>
      </div>
    </ToolPreviewPane>
  );
}
