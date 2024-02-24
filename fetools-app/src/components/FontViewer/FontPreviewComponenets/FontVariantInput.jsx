const FontVariantInput = ({ font, handleFontChange }) => {
  const textTransformations = ['capitalize', 'uppercase', 'lowercase'];
  const buttonTexts = ['Aa', 'AA', 'aa'];

  return (
    <div className="flex items-center">
      <div className="text-base font-bold">Transform</div>
      <div className="flex gap-2 p-1 mt-1 font-bold">
        {textTransformations.map((variant, index) => (
          <button
            key={variant}
            onClick={() => handleFontChange('textTransform', variant)}
            className={`px-3 py-1  flex items-center ${
              font.textTransform === variant ? 'bg-gray-300' : 'bg-transparent'
            }`}
          >
            <span className="ml-1">{buttonTexts[index]}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FontVariantInput;
