import "../index.css";
import React, { useState } from "react";
import DisplayCategories from "../components/CharacterFinderComponents/DisplayCategories";
import SearchField from "../components/SearchField";
import DisplaySearchResults from "../components/CharacterFinderComponents/DisplaySearchResults";
import ToolHeading from "../components/ToolsLayout/ToolHeading";
import CharacterCategoryTab from "../components/CharacterFinderComponents/CharacterCategoryTab";
import htmlCharacters from "../components/CharacterFinderComponents/htmlCharacters.json";
import GoDeeper from "../components/ToolsLayout/GoDeeper";

function CharacterFinder() {
  const [selectedCategory, setSelectedCategory] = useState("symbols"); //placeholder for popular tab
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
          category={"symbols"} //placeholder
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
          category={"punctuation"} //placeholder
          categoryDisplayName={"Faves"}
          char={"❤️"}
          selectCategory={displayCharacters}
        />
      </div>
      {selectedCategory && <DisplayCategories category={selectedCategory} />}
      

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
