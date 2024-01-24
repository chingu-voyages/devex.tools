import React from "react";
import htmlCharacters from "./htmlCharacters.json";
import CharacterCard from "./CharacterCard";

function DisplayCategories({category}) {
  const categoryMapping = {
    letters: htmlCharacters.letters,
    punctuation: htmlCharacters.punctuation,
    numbers: htmlCharacters.numbers,
    math: htmlCharacters.math,
    currency: htmlCharacters.currency,
    arrows: htmlCharacters.arrows,
    symbols: htmlCharacters.symbols,
    emojis: htmlCharacters.emojis,
  };

  const characterArray = categoryMapping[category];
  return (
    <div className="grid grid-cols-6 gap-2 mx-auto max-w-screen-lg">
      {characterArray.map((character, index) => (
        <CharacterCard
          key={index}
          char={category === "emojis" ? character.emoji : character.character}
          name={character.name}
          unicode={character.unicode}
          htmlcode={category === "emojis" ? character.html : character.hex}
          htmlEntity={character.entity}
          cssCode={character.css}
        />
      ))}
    </div>
  );
}

export default DisplayCategories;
