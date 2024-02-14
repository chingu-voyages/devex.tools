const CharacterCategoryTab = ({
  category,
  categoryDisplayName,
  char,
  selectCategory,
}) => {
  return (
    <div className="w-[18.75%] lg:w-[8.75%] sm:[&:nth-child(5)>button]:rounded-tr-lg sm:[&:nth-child(6)>button]:rounded-bl-lg lg:[&:nth-child(6)>button]:rounded-bl-none lg:[&:first-child>button]:rounded-bl-lg lg:[&:nth-child(5)>button]:rounded-tr-none sm:[&:last-of-type>button]:rounded-br-lg lg:[&:last-of-type>button]:rounded-tr-lg">
      <button
        className={
          'bg-white text-black py-2 px-4 outlined-button hover:bg-gray-200 hover:text-black border border-gray-300 w-full'
        }
        onClick={() => selectCategory(category)}
        style={{ minWidth: '50px' }}
      >
        <p className="flex justify-center text-3xl font-bold text-black">
          {char}
        </p>
        <p className="flex justify-center text-xs font-bold">
          {categoryDisplayName}
        </p>
      </button>
    </div>
  );
};

export default CharacterCategoryTab;
