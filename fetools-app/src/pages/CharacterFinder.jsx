import React, { useState } from "react";
import DisplayCategories from "../components/CharacterFinderComponents/DisplayCategories";
import SearchField from "../components/SearchField";
import ToolHeading from "../components/ToolsLayout/ToolHeading";
import CharacterCategoryTab from "../components/CharacterFinderComponents/CharacterCategoryTab";
import htmlCharacters from "../components/CharacterFinderComponents/htmlCharacters.json";
import GoDeeper from "../components/ToolsLayout/GoDeeper";
import CharacterCard from "../components/CharacterFinderComponents/CharacterCard";

function CharacterFinder() {
  const [selectedCategory, setSelectedCategory] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 18;

  const displayCharacters = (category) => {
    setSelectedCategory(category);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleSearch = () => {
    const filteredCharacters = htmlCharacters.filter((character) => {
      const searchString = searchQuery.toLowerCase();

      const matches =
        character.name.toLowerCase().includes(searchString) ||
        character.character.includes(searchString) ||
        (typeof character.unicode === "string" &&
          character.unicode.toLowerCase().includes(searchString)) ||
        (typeof character.hex === "string" &&
          character.hex.toLowerCase().includes(searchString)) ||
        (typeof character.dec === "string" &&
          character.dec.toLowerCase().includes(searchString)) ||
        (typeof character.entity === "string" &&
          character.entity.toLowerCase().includes(searchString)) ||
        (typeof character.css === "string" &&
          character.css.toLowerCase().includes(searchString));

      return matches;
    });

    setSearchResults(filteredCharacters);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(searchResults.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getDisplayedCharacters = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const validCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);

    if (currentPage !== validCurrentPage) {
      setCurrentPage(validCurrentPage);
    }

    return searchResults.slice(startIndex, endIndex);
  };

  return (
    <main>
      <ToolHeading
        title="Char Finder"
        tagline="Look up characters, symbols, HTML entities, and codes for use on your page!"
      />

      <SearchField
        placeholderText="Search"
        search={handleSearch}
        onChange={handleSearchChange}
      />

      <div className="pt-4 pb-4 flex justify-center">
        <CharacterCategoryTab
          category={"popular"}
          categoryDisplayName={"Popular"}
          char={"🤩"}
          selectCategory={displayCharacters}
        />
        <CharacterCategoryTab
          category={"letters"}
          categoryDisplayName={"Letters"}
          char={"Ü"}
          selectCategory={displayCharacters}
        />
        <CharacterCategoryTab
          category={"punctuation"}
          categoryDisplayName={"Punctuation"}
          char={"%"}
          selectCategory={displayCharacters}
        />
        <CharacterCategoryTab
          category={"numbers"}
          categoryDisplayName={"Numbers"}
          char={"①"}
          selectCategory={displayCharacters}
        />
        <CharacterCategoryTab
          category={"math"}
          categoryDisplayName={"Math"}
          char={"÷"}
          selectCategory={displayCharacters}
        />
        <CharacterCategoryTab
          category={"currency"}
          categoryDisplayName={"Currency"}
          char={"€"}
          selectCategory={displayCharacters}
        />
        <CharacterCategoryTab
          category={"arrows"}
          categoryDisplayName={"Arrows"}
          char={"→"}
          selectCategory={displayCharacters}
        />
        <CharacterCategoryTab
          category={"symbols"}
          categoryDisplayName={"Symbols"}
          char={"§"}
          selectCategory={displayCharacters}
        />
        <CharacterCategoryTab
          category={"emojis"}
          categoryDisplayName={"Emoji"}
          char={"👍"}
          selectCategory={displayCharacters}
        />
        <CharacterCategoryTab
          category={"punctuation"} // Placeholder
          categoryDisplayName={"Faves"}
          char={"❤️"}
          selectCategory={displayCharacters}
        />
      </div>

      {searchQuery ? (
        <div className="grid grid-cols-6 gap-2 mx-auto max-w-screen-lg">
          {getDisplayedCharacters().map((character, index) => (
            <CharacterCard
              key={index}
              char={character.character}
              name={character.name}
              unicode={character.unicode}
              htmlcode={character.hex}
              htmlEntity={character.entity}
              cssCode={character.css}
            />
          ))}
        </div>
      ) : (
        <React.Fragment>
          {selectedCategory && (
            <DisplayCategories
              category={selectedCategory}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
            />
          )}
        </React.Fragment>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                className={`mx-2 px-3 py-1 rounded-md ${
                  currentPage === pageNumber
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-700 hover:bg-blue-500 hover:text-white focus:outline-none"
                }`}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            )
          )}
        </div>
      )}

      <GoDeeper
        linksData={[
          {
            url: "https://developer.mozilla.org/en-US/docs/Glossary/Entity",
            textValue: "All about entities at MDN",
          },
          {
            url: "https://deliciousbrains.com/how-unicode-works/",
            textValue: "How Unicode works at Delicious Brain",
          },
          {
            url: "https://daily-dev-tips.com/posts/tailwind-css-pseudo-elements/",
            textValue:
              "Seeing special characters in pseudo-elements with Tailwind CSS",
          },
        ]}
      />
    </main>
  );
}

export default CharacterFinder;
