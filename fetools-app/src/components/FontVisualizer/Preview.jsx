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
      className={`  p-4 flex flex-col  gap-4 w-full border  rounded ${
        isEditing ? "cursor-text" : "cursor-pointer"
      }`}
      onDoubleClick={handleDoubleClick}
      onBlur={handleBlur}
    >
      {isEditing ? (
        <textarea
          style={generateFontStyles()}
          className="font-preview-text text-white bg-transparent block w-full h-full p-4"
          value={editedText}
          onChange={handleInputChange}
          autoFocus
        />
      ) : (
        <p
          style={generateFontStyles()}
          className="font-preview-text text-white break-words p-4 w-full h-full"
        >
          {editedText}
        </p>
      )}
    </div>
  );
};

export default Preview;
