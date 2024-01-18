import '../index.css';
import React from 'react';
import CharacterFinderLetters from '../components/CharacterFinderComponents/Letters';
import CharacterFinderPunctuation from '../components/CharacterFinderComponents/Punctuation';
import CharacterFinderNumbers from '../components/CharacterFinderComponents/Numbers';
import CharacterFinderMath from '../components/CharacterFinderComponents/Math';

function CharacterFinder() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Character Finder</h2>
      <CharacterFinderLetters />
      <CharacterFinderPunctuation/>
      <CharacterFinderNumbers/>
      <CharacterFinderMath/>
    </div>
  );
}

export default CharacterFinder;
