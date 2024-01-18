import React, { useState } from 'react';
import he from 'he';

function CharacterFinderNumbers() {
  const [inputNumber, setInputNumber] = useState("");
  const [variations, setVariations] = useState([]);

  const handleGenerateVariations = () => {
    const baseNumber = inputNumber.trim();
    const variationsArray = generateVariations(baseNumber);
    setVariations(variationsArray);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleGenerateVariations();
    }
  };

  const generateVariations = (baseNumber) => {
    const variationsArray = [];

    if (!isNaN(baseNumber)) {
      const variationsForNumber = getVariationsForNumber(baseNumber);
      variationsArray.push(...variationsForNumber);
    }

    return variationsArray;
  };

  const getVariationsForNumber = (number) => {
    const variationsArray = [];

    variationsArray.push(number);

    return variationsArray;
  };

  return (
    <div>
      <h2>Numbers</h2>
      <input
        type="text"
        value={inputNumber}
        onChange={(e) => setInputNumber(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter a number"
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
    <p>Unicode: {variation.codePointAt(0)?.toString(16).toUpperCase().padStart(4, '0')}</p>
    <p>HTML Code: {`&#${variation.codePointAt(0)};`}</p>
    <p>HTML Entity: {`&${he.encode(variation, { useNamedReferences: true })};`}</p>
    <p>CSS Code: {`\\${variation.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')}`}</p>
  </div>
);

export default CharacterFinderNumbers;
