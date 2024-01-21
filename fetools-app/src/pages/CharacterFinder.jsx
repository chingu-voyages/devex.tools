import "../index.css";
import React, { useState } from "react";
import DisplayCharacters from "../components/CharacterFinderComponents/DisplayCharacters";
import SearchField from "../components/SearchField";
import ToolHeading from "../components/ToolHeading";
import CharacterCategoryTab from "../components/CharacterCategoryTab";
import htmlCharacters from "../components/CharacterFinderComponents/htmlCharacters.json";

function CharacterFinder() {
  const [selectedCategory, setSelectedCategory] = useState("symbols");
  const [searchQuery, setSearchQuery] = useState("");

  const displayCharacters = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <main>
      <ToolHeading
        title="Char Finder"
        tagline="Look up characters,symbols, HTML entities and codes for use on your page!"
      />
      
      <SearchField
        placeholderText={"Search"}
        links={[
          htmlCharacters.arrows,
          htmlCharacters.currency,
          htmlCharacters.letters,
          htmlCharacters.math,
          htmlCharacters.numbers,
          htmlCharacters.punctuation,
          htmlCharacters.symbols,
        ]}
        search={handleSearchChange}
      />
      <div className="pt-4 pb-4 flex justify-center">
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
      </div>
      {selectedCategory && (
        <DisplayCharacters
          category={selectedCategory}
          searchQuery={searchQuery}
        />
      )}
    </main>
  );
}

export default CharacterFinder;
