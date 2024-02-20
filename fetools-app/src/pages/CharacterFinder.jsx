import "../index.css";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import SearchField from "../components/SearchField";
import ToolHeading from "../components/ToolsLayout/ToolHeading";
import CharacterCategoryTab from "../components/CharacterFinderComponents/CharacterCategoryTab";
import htmlCharacters from "../components/CharacterFinderComponents/htmlCharacters.json";
import GoDeeper from "../components/ToolsLayout/GoDeeper";
import CharacterCard from "../components/CharacterFinderComponents/CharacterCard";

import ToolMain from "../components/ToolsLayout/ToolMain";
import { ToolSection } from "../components/ToolsLayout/Sections";

function CharacterFinder() {
  const [selectedCategory, setSelectedCategory] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(16);
  const [clearInput, setClearInput] = useState(false);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const displayCharacters = (category) => {
    setSelectedCategory(category);
    setSearchQuery("");
    setSearchResults([]);
    setCurrentPage(0);
    setClearInput(true);
  };

  useEffect(() => {
    if (clearInput) {
      const timer = setTimeout(() => {
        setClearInput(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [clearInput]);

  const removeLetterVariations = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const handleSearchChange = (query) => {
    if (query.startsWith("-")) {
      setSearchQuery(query);
      setCurrentPage(0);
      const actualHyphenSearch = Object.values(htmlCharacters).flatMap(
        (category) =>
          category.filter((character) =>
            character.name.toLowerCase().includes("hyphen")
          )
      );

      setSearchResults(actualHyphenSearch);
      return;
    }

    setSearchQuery((query = query.replace(/-/g, " ")));
    setCurrentPage(0);

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    updateSearchResults(query);
  };

  const updateSearchResults = (query) => {
    const allCharacterArrays = [
      ...htmlCharacters.letters.map((character) => ({
        ...character,
        name: character.name.replace(/-/g, " "),
      })),
      ,
      ...htmlCharacters.punctuation.map((character) => ({
        ...character,
        name: character.name.replace(/-/g, " "),
      })),
      ,
      ...htmlCharacters.numbers.map((character) => ({
        ...character,
        name: character.name.replace(/-/g, " "),
      })),
      ,
      ...htmlCharacters.math.map((character) => ({
        ...character,
        name: character.name.replace(/-/g, " "),
      })),
      ,
      ...htmlCharacters.currency.map((character) => ({
        ...character,
        name: character.name.replace(/-/g, " "),
      })),
      ,
      ...htmlCharacters.arrows.map((character) => ({
        ...character,
        name: character.name.replace(/-/g, " "),
      })),
      ,
      ...htmlCharacters.symbols.map((character) => ({
        ...character,
        name: character.name.replace(/-/g, " "),
      })),
      ,
      ...htmlCharacters.emojis.map((character) => ({
        ...character,
        name: character.name.replace(/-/g, " "),
        unicode:
          character.unicode && character.unicode.startsWith("U+")
            ? character.unicode
            : "U+" + character.unicode,
      })),
    ];

    let filteredResults;

    if (query.length === 1) {
      filteredResults = allCharacterArrays.filter(
        (character) =>
          character.character.toLowerCase() === query.toLowerCase() ||
          removeLetterVariations(character.character.toLowerCase()) ===
            removeLetterVariations(query.toLowerCase()) ||
          (character.entity &&
            character.entity.toLowerCase() === query.toLowerCase()) ||
          (character.hex &&
            character.hex.toLowerCase() === query.toLowerCase()) ||
          (character.unicode &&
            character.unicode.toLowerCase() === query.toLowerCase()) ||
          (character.css &&
            (character.css.toLowerCase() === query.toLowerCase() ||
              character.css.toLowerCase() === "\\" + query.toLowerCase()))
      );

      if (filteredResults.length === 0) {
        filteredResults = allCharacterArrays.filter((character) => {
          const name = character.name.toLowerCase();
          return (
            name.includes(` ${query.toLowerCase()}`) ||
            name.startsWith(`${query.toLowerCase()} `)
          );
        });
      }
    } else {
      filteredResults = allCharacterArrays.filter(
        (character) =>
          character.name.toLowerCase().includes(query.toLowerCase()) ||
          removeLetterVariations(character.name.toLowerCase()).includes(
            removeLetterVariations(query.toLowerCase())
          ) ||
          (character.entity &&
            character.entity.toLowerCase().includes(query.toLowerCase())) ||
          (character.hex &&
            character.hex.toLowerCase().includes(query.toLowerCase())) ||
          (character.unicode &&
            character.unicode.toLowerCase().includes(query.toLowerCase())) ||
          (character.css &&
            character.css.toLowerCase().includes(query.toLowerCase()))
      );
    }

    setSearchResults(filteredResults);
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const categoryData = searchQuery
    ? searchResults
    : selectedCategory === "collection"
    ? [] // TODO - Read out collection from local storage.
    : htmlCharacters[selectedCategory];

  const currentCategoryData = categoryData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const categories = [
    { name: "popular", displayName: "Popular", char: "☆" },
    { name: "letters", displayName: "Letters", char: "Ü" },
    { name: "punctuation", displayName: "Punctuation", char: "%" },
    { name: "numbers", displayName: "Numbers", char: "①" },
    { name: "math", displayName: "Math", char: "÷" },
    { name: "currency", displayName: "Currency", char: "€" },
    { name: "arrows", displayName: "Arrows", char: "→" },
    { name: "symbols", displayName: "Symbols", char: "§" },
    { name: "emojis", displayName: "Emoji", char: "☺" },
    { name: "collection", displayName: "Collection", char: "☲" },
  ];

  const selectedCategoryIcon = categories.find(
    (category) => category.name === selectedCategory
  ).char;

  const selectedCategoryDisplayName = categories.find(
    (category) => category.name === selectedCategory
  ).displayName;

  const categoryTabs = categories.map((category) => (
    <CharacterCategoryTab
      key={category.name}
      category={category.name}
      categoryDisplayName={category.displayName}
      char={category.char}
      selectCategory={displayCharacters}
      active={!searchQuery && category.name === selectedCategory}
    />
  ));

  return (
    <ToolMain>
      <ToolHeading
        title="Character Finder"
        tagline="Look up characters, symbols, HTML entities, and CSS codes."
        icon="Ampersand"
        iconType="svg"
      />
      <div className="container">
        <SearchField
          placeholderText={"Search"}
          search={handleSearchChange}
          clearInput={clearInput}
        />
      </div>

      <div className="container flex flex-wrap justify-between px-5 sm:px-8 gap-y-3">
        {categoryTabs}
      </div>

      <ToolSection
        title={searchQuery ? searchQuery : selectedCategoryDisplayName}
        icon={searchQuery ? "search" : selectedCategoryIcon}
        iconType={searchQuery ? "material" : "char"}
      >
        <div className="grid w-full grid-cols-4">
          {currentCategoryData.map((character, index) => (
            <CharacterCard
              key={index}
              char={character.character}
              name={character.name}
              unicode={
                character.unicode.startsWith("U+")
                  ? character.unicode
                  : "U+" + character.unicode
              }
              htmlcode={character.hex}
              htmlEntity={character.entity}
              cssCode={character.css}
            />
          ))}
        </div>
        <div className="flex justify-center p-6">
          <ReactPaginate
            pageCount={Math.ceil(categoryData.length / itemsPerPage)}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            previousLabel={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            }
            nextLabel={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            }
            breakLabel={"..."}
            onPageChange={handlePageClick}
            containerClassName={"pagination flex"}
            activeClassName={"bg-gray-200"}
            previousClassName={"mr-2 px-4 py-2"}
            nextClassName={"ml-2 px-4 py-2"}
            pageClassName={"mr-2 px-4 py-2"}
            breakClassName={"mr-2 px-4 py-2"}
            forcePage={currentPage}
          />
        </div>
      </ToolSection>

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
    </ToolMain>
  );
}

export default CharacterFinder;
