const LetterSpacingInput = ({ font, handleLetterSpacingChange }) => {
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex items-center text-base font-bold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="w-4 h-4 text-black"
        >
          <path
            d="M21 12L17 16L15.6 14.6L17.175 13H6.825L8.4 14.6L7 16L3 12L7 8L8.425 9.4L6.825 11H17.175L15.6 9.4L17 8L21 12Z"
            fill="black"
          />
        </svg>
        <div className="flex items-center ml-2">{font.letterSpacing}</div>
        <input
          type="range"
          value={String(parseInt(font.letterSpacing))}
          min={-5}
          max={5}
          step={1}
          onChange={handleLetterSpacingChange}
          className="flex-1"
        />
      </div>
    </div>
  );
};

export default LetterSpacingInput;
