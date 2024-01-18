import React, { useState } from 'react';
import he from 'he';

function CharacterFinderMath() {
  const [inputSymbol, setInputSymbol] = useState("");
  const [variations, setVariations] = useState([]);

  const handleGenerateVariations = () => {
    const baseSymbol = inputSymbol.trim();
    const variationsArray = generateVariations(baseSymbol);
    setVariations(variationsArray);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleGenerateVariations();
    }
  };

  const generateVariations = (baseSymbol) => {
    const variationsArray = [];

    if (baseSymbol.length === 1 && /^[+\-*/=<>]+$/.test(baseSymbol)) {
      const variationsForSymbol = getVariationsForSymbol(baseSymbol);
      variationsArray.push(...variationsForSymbol);
    }

    return variationsArray;
  };

  const getVariationsForSymbol = (symbol) => {
    const variationsArray = [];

    variationsArray.push(symbol);

    return variationsArray;
  };

  return (
    <div>
      <h2>Math Symbols</h2>
      <input
        type="text"
        value={inputSymbol}
        onChange={(e) => setInputSymbol(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter a math symbol"
        style={{ margin: '10px' }}
      />
      <button
        onClick={handleGenerateVariations}
        style={{
          padding: '10px',
          border: '1px solid #333',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Find
      </button>

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

export default CharacterFinderMath;
