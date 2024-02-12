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
    <div className="p-6 bg-white h-7/8 w-50px">
      <p className="text-6xl font-bold border-b-4 border-black text-left py-4">
        {char}
      </p>
      <div className="flex flex-wrap">
        <div className="w-full">
          <p className="pt-2 text-s text-left font-bold uppercase">{name}</p>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/2">
            <p className="pt-2 text-xs text-left uppercase">
              unicode: <p><span className="font-bold">{unicode || " -- "}</span></p>
            </p>
          </div>
          
          <div className="w-full lg:w-1/2">
            <p className="pt-2 text-xs text-left uppercase">
              html code: <p><span className="font-bold flex flex-wrap">{htmlcode || " -- "}</span></p>
            </p>
            </div>
         
          <div className="w-full lg:w-1/2">
            <p className="pt-2 text-xs text-left uppercase">
              html entity:
              <p><span className="font-bold">
                {htmlEntity !== undefined && htmlEntity !== ""
                  ? htmlEntity
                  : " -- "}
              </span></p>
            </p>
          </div>
          <div className="w-full lg:w-1/2">
            <p className="pt-2 text-xs text-left uppercase">
              css code: <p><span className="font-bold">{cssCode || " -- "}</span></p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
