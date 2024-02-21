import { useState } from "react";
import { ToolPreviewPane } from "../ToolsLayout/Sections";

const Preview = ({
  generateFontStyles,
  isExpanded,
  toggleIsExpanded,
  font,
  bg,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(
    "Click to edit this preview text."
  );

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    setEditedText(e.target.value);
  };

  return (
    <ToolPreviewPane
      isExpanded={isExpanded}
      toggleIsExpanded={toggleIsExpanded}
      expandedLayoutClasses={` min-h-80`}
      columnLayoutClasses=" lg:border-r rounded-bl-lg h-full min-h-80"
    >
      <div
        className={`h-full ${isEditing ? "cursor-text" : "cursor-pointer"}`}
        onClick={handleClick}
        onBlur={handleBlur}
      >
        {isEditing ? (
          <textarea
            style={generateFontStyles()}
            className={`font-preview-text p-4 w-full h-full min-h-[25rem] m-0`}
            value={editedText}
            onChange={handleInputChange}
            autoFocus
          />
        ) : (
          <p
            style={generateFontStyles(font, bg)}
            className={`font-preview-text break-words p-4 text-base w-full h-full min-h-[25rem]`}
          >
            {editedText}
          </p>
        )}
      </div>
    </ToolPreviewPane>
  );
};

export default Preview;
