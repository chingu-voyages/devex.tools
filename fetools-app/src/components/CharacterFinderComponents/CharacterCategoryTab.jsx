import Icon from "../Icon";

const CharacterCategoryTab = ({
  category,
  categoryDisplayName,
  icon,
  iconType,
  selectCategory,
  active = false,
}) => {
  return (
    <div
      className={`w-[18.75%] lg:w-[8.75%] sm:[&:nth-child(5)>button]:rounded-tr-lg sm:[&:nth-child(6)>button]:rounded-bl-lg lg:[&:nth-child(6)>button]:rounded-bl-none lg:[&:first-child>button]:rounded-bl-lg lg:[&:nth-child(5)>button]:rounded-tr-none sm:[&:last-of-type>button]:rounded-br-lg lg:[&:last-of-type>button]:rounded-tr-lg`}
    >
      <button
        className={`${
          active ? "active outline outline-2" : ""
        } bg-white text-black py-2 sm:px-4 outlined-button focus:outline focus:ring-2 focus:ring-[#9747FF] hover:outline hover:outline-[#9747FF] hover:outline-2 max-sm:border-b-4 max-sm:border-primary sm:border border-gray-300 w-full`}
        onClick={() => selectCategory(category)}
        style={{ minWidth: "50px" }}
      >
        <p className="flex justify-center text-3xl font-bold text-black">
          <Icon name={icon} type={iconType} size="30" />
        </p>
        <p className="flex justify-center text-xs font-bold">
          {categoryDisplayName}
        </p>
      </button>
    </div>
  );
};

export default CharacterCategoryTab;
