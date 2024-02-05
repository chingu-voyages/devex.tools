import "../index.css";
import React, { useState } from "react";
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

  const displayCharacters = (category) => {
    setSelectedCategory(category);
    setSearchQuery("");
    setSearchResults([]);
  };

  const removeLetterVariations = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  // ...

  const handleSearchChange = (query) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

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
        filteredResults = allCharacterArrays.filter(
          (character) => {
            const name = character.name.toLowerCase();
            return name.includes(` ${query.toLowerCase()}`) || name.startsWith(`${query.toLowerCase()} `);
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

  const categoryData = searchQuery
    ? searchResults
    : htmlCharacters[selectedCategory];

  return (
    <main>
      <ToolHeading
        title="Char Finder"
        tagline="Look up characters, symbols, HTML entities, and codes for use on your page!"
      />

      <SearchField placeholderText={"Search"} search={handleSearchChange} />

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
          category={"numbers"} // place holder
          categoryDisplayName={"Favorites"}
          char={"❤️"}
          selectCategory={displayCharacters}
        />
      </div>

      <div className="grid grid-cols-6 gap-2 mx-auto max-w-screen-lg">
        {categoryData.map((character, index) => (
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
