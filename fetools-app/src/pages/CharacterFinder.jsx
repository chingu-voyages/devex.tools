import "../index.css";
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
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
    setSearchQuery(query);
    setCurrentPage(0);

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    updateSearchResults(query);
  };

  const updateSearchResults = (query) => {
    const allCharacterArrays = [
      ...htmlCharacters.letters,
      ...htmlCharacters.punctuation,
      ...htmlCharacters.numbers,
      ...htmlCharacters.math,
      ...htmlCharacters.currency,
      ...htmlCharacters.arrows,
      ...htmlCharacters.symbols,
      ...htmlCharacters.emojis,
    ];

    let filteredResults;

    if (query.length === 1) {
      filteredResults = allCharacterArrays.filter(
        (character) =>
          character.character.toLowerCase() === query.toLowerCase() ||
          removeLetterVariations(character.character.toLowerCase()) ===
            removeLetterVariations(query.toLowerCase())
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
    } else if (query.startsWith("&#")) {
      // search hex
      const hexQuery = query.slice(2);
      filteredResults = allCharacterArrays.filter((character) =>
        character.hex.toLowerCase().includes(hexQuery.toLowerCase())
      );
    } else {
      filteredResults = allCharacterArrays.filter(
        (character) =>
          character.name.toLowerCase().includes(query.toLowerCase()) ||
          removeLetterVariations(character.name.toLowerCase()).includes(
            removeLetterVariations(query.toLowerCase())
          )
      );
    }

    setSearchResults(filteredResults);
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const categoryData = searchQuery
    ? searchResults
    : htmlCharacters[selectedCategory];

  const currentCategoryData = categoryData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <main>
      <div className="w-full md:w-3/4 mx-auto">
        <div className="w-full md:w-3/4 mx-auto mt-12 mb-12">
          <ToolHeading
            title="Character Finder"
            tagline="Look up characters, symbols, HTML entities, and CSS codes."
          />
        </div>
        <div className="w-full md:w-3/4 mx-auto mt-12 mb-12">
        <SearchField
          placeholderText={"Search"}
          search={handleSearchChange}
          clearInput={clearInput}
        />
        </div>

        
          <div className="grid grid-cols-10 w-full md:w-3/4 mx-auto">
            <CharacterCategoryTab
              category={"popular"}
              categoryDisplayName={"Popular"}
              char={"☆"}
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
              char={"☺"}
              selectCategory={displayCharacters}
            />
            <CharacterCategoryTab
              category={"numbers"} // place holder
              categoryDisplayName={"Collection"}
              char={"☲"} // place hodler
              selectCategory={displayCharacters}
            />
          </div>
        

        <div className="grid grid-cols-4 mt-12 w-full md:w-3/4 mx-auto border border-gray-300 rounded">
          {currentCategoryData.map((character, index) => (
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
        

        <div className="mt-12 mb-12 w-full md:w-3/4 mx-auto border border-gray-300 rounded">
          <div className="">
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
          </div>
        </div>
      </div>
    </main>
  );
}

export default CharacterFinder;
