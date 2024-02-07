import React, { useState } from "react";
import { FiMaximize2, FiMinimize2 } from "react-icons/fi";

const Preview = ({ generateFontStyles }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
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

  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div
      className={`p-4 flex flex-col flex-1 gap-4 w-full  relative ${
        isEditing ? "cursor-text" : "cursor-pointer"
      } ${isFullscreen ? "fixed top-0 left-0 right-0 bottom-0 z-50 " : ""} ${
        isFullscreen ? "w-screen h-screen" : ""
      }`}
      onDoubleClick={handleDoubleClick}
      onBlur={handleBlur}
    >
      <div
        className={`absolute top-4 right-4 cursor-pointer ${
          isFullscreen ? "text-white" : "text-black"
        }`}
        onClick={handleFullscreenToggle}
      >
        {isFullscreen ? <FiMinimize2 size={20} /> : <FiMaximize2 size={20} />}
      </div>
      {isEditing ? (
        <textarea
          style={generateFontStyles()}
          className={`font-preview-text text-white bg-transparent block w-full h-full p-4 ${
            isFullscreen ? "text-2xl" : "text-base"
          }`}
          value={editedText}
          onChange={handleInputChange}
          autoFocus
        />
      ) : (
        <p
          style={generateFontStyles()}
          className={`font-preview-text break-words p-4 w-full h-full ${
            isFullscreen ? "text-2xl" : "text-base"
          }`}
        >
          {editedText}
        </p>
      )}
    </div>
  );
};

export default Preview;
