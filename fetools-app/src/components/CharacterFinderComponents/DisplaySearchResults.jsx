import React from "react";
import CharacterCard from "./CharacterCard";
import htmlCharacters from "./htmlCharacters.json";

function DisplaySearchResults({ searchQuery }) {
  const allCharacters = Object.values(htmlCharacters);

  const filteredCharacters = searchQuery
    ? allCharacters.filter((character) => {
        const searchString = searchQuery.toLowerCase();
        return (
          character.name.toLowerCase().includes(searchString) ||
          character.character.toLowerCase().includes(searchString) ||
          character.hex.toLowerCase().includes(searchString) ||
          character.dec.toLowerCase().includes(searchString) ||
          character.css.toLowerCase().includes(searchString)
        );
      })
    : allCharacters;

  return (
    <div className="grid grid-cols-6 gap-2 mx-auto max-w-screen-lg">
      {filteredCharacters.map((character, index) => (
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
  );
}

export default DisplaySearchResults;
