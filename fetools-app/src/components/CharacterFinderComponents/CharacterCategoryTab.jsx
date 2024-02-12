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
          "bg-white text-black py-2 px-4 mr-4 outlined-button hover:bg-gray-200 hover:text-black border border-gray-300 w-20"
        }
        onClick={() => selectCategory(category)}
        style={{ minWidth: '50px' }}
      >
        <p className="font-bold text-3xl text-black flex justify-center">
          {char}
        </p>
        <p className="font-bold text-xs  flex justify-center">{categoryDisplayName}</p>
      </button>
    </div>
  );
};

export default CharacterCategoryTab;
