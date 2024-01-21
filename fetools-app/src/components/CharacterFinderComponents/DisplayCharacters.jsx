import React from "react";
import htmlCharacters from "./htmlCharacters.json";

function DisplayCharacters({ category, searchQuery }) {
  const categoryMapping = {
    letters: htmlCharacters.letters,
    punctuation: htmlCharacters.punctuation,
    numbers: htmlCharacters.numbers,
    math: htmlCharacters.math,
    currency: htmlCharacters.currency,
    arrows: htmlCharacters.arrows,
    symbols: htmlCharacters.symbols,
  };

  const characterArray = categoryMapping[category];

  const filteredCharacters = searchQuery
    ? characterArray.filter((character) => {
        const searchString = searchQuery.toLowerCase();
        return (
          character.name.toLowerCase().includes(searchString) ||
          character.character.toLowerCase().includes(searchString) ||
          character.hex.toLowerCase().includes(searchString) ||
          character.dec.toLowerCase().includes(searchString) ||
          character.css.toLowerCase().includes(searchString)
        );
      })
    : characterArray;

  return (
    <div className="grid grid-cols-6 gap-4 mx-auto max-w-screen-lg">
      {filteredCharacters.map((character, index) => (
        <div
          key={index}
          className="p-2 bg-gray-100 rounded-md shadow-md mb-4 text-center"
        >
          <p className="text-lg font-bold">{character.character}</p>
          <p>{character.name}</p>
          <p>UNICODE: {character.unicode}</p>
          <p>HEX: {character.hex}</p>
          <p>DEC: {character.dec}</p>
          <p>HTML ENTITY: {character.entity}</p>
          <p>CSS: {character.css}</p>
        </div>
      ))}
    </div>
  );
}

export default DisplayCharacters;
