import React, { useState } from 'react';
import he from 'he';



function CharacterFinderLetters() {
  const [inputLetter, setInputLetter] = useState("");
  const [variations, setVariations] = useState([]);

  const handleGenerateVariations = () => {
    const baseLetter = inputLetter.trim().toLowerCase();
    const variationsArray = generateVariations(baseLetter);
    setVariations(variationsArray);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleGenerateVariations();
    }
  };

  const generateVariations = (baseLetter) => {
    const variationsArray = [];

    if (baseLetter.length === 1 && /^[a-z]$/.test(baseLetter)) {
      const variationsForLetter = getVariationsForLetter(baseLetter);
      variationsArray.push(...variationsForLetter);
    }

    return variationsArray;
  };

  const getVariationsForLetter = (letter) => {
    const variationsArray = [];
    const characterMap = createCharacterMap();

    if (letter in characterMap) {
      variationsArray.push(...characterMap[letter]);
    }

    return variationsArray;
  };

  const createCharacterMap = () => {
    
    const characterMap = {
      a: ['a', 'A', 'á', 'Á', 'à', 'À', 'ä', 'Ä', 'â', 'Â'],
      b: ['b', 'B'],
      c: ['c', 'C', 'ç', 'Ç'],
      d: ['d', 'D'],
      e: ['e', 'E', 'é', 'É', 'è', 'È', 'ë', 'Ë', 'ê', 'Ê'],
      f: ['f', 'F'],
      g: ['g', 'G'],
      h: ['h', 'H'],
      i: ['i', 'I', 'í', 'Í', 'ì', 'Ì', 'ï', 'Ï', 'î', 'Î'],
      j: ['j', 'J'],
      k: ['k', 'K'],
      l: ['l', 'L'],
      m: ['m', 'M'],
      n: [
        'n', 'N',
        'ñ', 'Ñ',
        'ń', 'Ń',
        'n̈', 'N̈',
        'ń', 'Ń',
        'n̂', 'N̂',
        'n̈', 'N̈',
      ],
      o: ['o', 'O', 'ó', 'Ó', 'ò', 'Ò', 'ö', 'Ö', 'ô', 'Ô'],
      p: ['p', 'P'],
      q: ['q', 'Q'],
      r: ['r', 'R'],
      s: ['s', 'S', 'š', 'Š'],
      t: ['t', 'T'],
      u: ['u', 'U', 'ú', 'Ú', 'ù', 'Ù', 'ü', 'Ü', 'û', 'Û'],
      v: ['v', 'V'],
      w: ['w', 'W'],
      x: ['x', 'X'],
      y: ['y', 'Y', 'ý', 'Ý', 'ÿ', 'Ÿ'],
      z: ['z', 'Z', 'ž', 'Ž'],
    };

    return characterMap;
  };

  return (
    
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      
      <h3>Letters</h3>
      <input
        type="text"
        value={inputLetter}
        onChange={(e) => setInputLetter(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter a letter (a-z)"
        style={{ margin: '10px' }}
      />
      <button  onClick={handleGenerateVariations} style={{
    padding: '10px',
    border: '1px solid #333', 
    borderRadius: '5px',
    cursor: 'pointer',
  }}>Find</button>

      <div style={{ margin: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {variations.map((variation, index) => (
          <div key={index} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', margin: '10px' }}>
            <p>{variation}</p>
            {renderVariationInfo(variation)}
          </div>
        ))}
      </div>
    </div>
  );
}

const renderVariationInfo = (variation) => (
  <div>
    <p>Unicode: {variation.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')}</p>
    <p>HTML Code: {`&#${variation.codePointAt(0)};`}</p>
    <p>HTML Entity: {`&${he.encode(variation, { useNamedReferences: true })};`}</p>
    <p>CSS Code: {`\\${variation.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')}`}</p>
  </div>
);

export default CharacterFinderLetters;

