const BackgroundColorInput = ({
  backgroundColor,
  handleBackgroundColorChange,
}) => {
  return (
    <div className="flex items-center gap-2">
      <div className="text-base font-bold">Background</div>
      <div className="flex px-5 text-base text-neutral-400">
        <div
          className="relative w-8 h-8 px-2 border color-picker-toggle"
          style={{
            cursor: 'pointer',
            backgroundColor: backgroundColor,
          }}
        >
          <input
            type="color"
            value={backgroundColor}
            onChange={handleBackgroundColorChange}
            className="absolute w-full h-full opacity-0 cursor-pointer color-picker-input"
            id="backgroundColor"
            name="backgroundColor"
            style={{
              borderRadius: '5px',
            }}
          />
          <span
            className="absolute top-0 px-1 ml-2 left-full"
            style={{ marginTop: '5px' }}
          >
            {backgroundColor}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BackgroundColorInput;
