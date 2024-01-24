import React from "react";

const CharacterCategoryTab = ({
  category,
  categoryDisplayName,
  char,
  selectCategory,
}) => {
  return (
    <div className="pt-4 pb-4">
      <button
        className={
          "bg-white text-black py-2 px-4 rounded-md mr-4 outlined-button hover:bg-black hover:text-white"
        }
        onClick={() => selectCategory(category)}
      >
        <p className="font-bold">{categoryDisplayName}</p>
        <p className="font-bold text-xl text-gray-400 flex justify-left">
          {char}
        </p>
      </button>
    </div>
  );
};

export default CharacterCategoryTab;
