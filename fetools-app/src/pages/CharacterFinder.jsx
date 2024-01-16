import '../index.css';
import React, {useState} from 'react';
import he from 'he';


function CharacterFinder() {

  const [inputValue, setInputValue] = useState("");
  const [encodedValue, setEncodedvalue] = useState("");
    return (
      <><div>
        <p className="font-mono text-6xl">Character Finder</p>
      </div><div>
          <input type="text" value={inputValue} />
          <button onClick={""}>Encode</button>


        </div></>

      
    )
}
  
export default CharacterFinder