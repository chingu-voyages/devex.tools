import React from "react";

const CharacterCard = ({
  char,
  name,
  unicode,
  htmlcode,
  htmlEntity,
  cssCode,
}) => {
  return (
    <div className="p-2 bg-gray-100 rounded-md shadow-md m-4 h-7/8">
      <p className="text-6xl font-bold text-left">{char}</p>
      <p className="pt-2 text-xs text-left font-bold uppercase">{name}</p>
      <p className="pt-2 text-xs text-left uppercase">
        unicode: <span className="font-bold">{unicode}</span>
      </p>
      <p className="pt-2 text-xs text-left uppercase">
        html code: <span className="font-bold">{htmlcode}</span>
      </p>
      <p className="pt-2 text-xs text-left uppercase">
        html entity: <span className="font-bold">{htmlEntity}</span>
      </p>
      <p className="pt-2 text-xs text-left uppercase">
        css code: <span className="font-bold">{cssCode}</span>
      </p>
    </div>
  );
};

export default CharacterCard;
