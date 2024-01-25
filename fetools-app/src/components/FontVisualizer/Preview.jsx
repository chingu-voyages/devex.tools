import React, { useState } from "react";

const Preview = ({ generateFontStyles }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(
    "This is a preview text. Joseph Kotvak Stevensaurus wviolinm Ingrig Madrigal d_avid7 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean auctor tempor quam, ac rhoncus risus accumsan vel. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque vel tellus vel arcu malesuada aliquam. Praesent enim justo, placerat at felis ac, dignissim bibendum turpis."
  );

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    setEditedText(e.target.value);
  };

  return (
    <div
      className={`preview-container bg-gray-800 p-12 flex flex-col items-start gap-4 w-full min-h-[400px] border border-gray-500 rounded ${
        isEditing ? "cursor-text" : "cursor-pointer"
      }`}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "4px",
        flex: "1 0 0",
        alignSelf: "stretch",
        borderRadius: "8px",
        border: "1px solid var(--Design-Document-Outlines, #999)",
        background: "var(--Design-Document-Text, #333)",
      }}
      onDoubleClick={handleDoubleClick}
      onBlur={handleBlur}
    >
      {isEditing ? (
        <textarea
          style={generateFontStyles()}
          className="font-preview-text text-white flex-grow outline-none bg-transparent"
          value={editedText}
          onChange={handleInputChange}
          autoFocus
        />
      ) : (
        <p
          style={generateFontStyles()}
          className="font-preview-text text-white flex-grow"
        >
          {editedText}
        </p>
      )}
    </div>
  );
};

export default Preview;
