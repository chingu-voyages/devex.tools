import React, {useState, useEffect} from "react";
import htmlCharacters from "./htmlCharacters.json";
import CharacterCard from "./CharacterCard";

function DisplayCategories({ category, currentPage, itemsPerPage }) {
  const categoryMapping = {
    letters: htmlCharacters.letters,
    punctuation: htmlCharacters.punctuation,
    numbers: htmlCharacters.numbers,
    math: htmlCharacters.math,
    currency: htmlCharacters.currency,
    arrows: htmlCharacters.arrows,
    symbols: htmlCharacters.symbols,
    emojis: htmlCharacters.emojis,
    popular: htmlCharacters.popular
  };

  const characterArray = categoryMapping[category];
  const [displayedCharacters, setDisplayedCharacters] = useState([]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedCharacters(characterArray.slice(startIndex, endIndex));
  }, [category, currentPage, itemsPerPage]);

  return (
    <div className="grid grid-cols-6 gap-2 mx-auto max-w-screen-lg">
      {displayedCharacters.map((character, index) => (
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