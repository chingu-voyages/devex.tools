import React from "react";

const FontPreview = ({
  font,
  backgroundColor,
  handleFontChange,
  handleColorChange,
  handleBackgroundColorChange,
  handleLetterSpacingChange,
  handleLineHeightChange,
  handleFontSizeChange,
}) => {
  return (
    <div className=" grid grid-rows-5 grid-flow-col gap-4">
      <FontNameInput font={font} handleFontChange={handleFontChange} />
      <FontColorInput font={font} handleColorChange={handleColorChange} />
      <BackgroundColorInput
        backgroundColor={backgroundColor}
        handleBackgroundColorChange={handleBackgroundColorChange}
      />
      <FontSizeInput font={font} handleFontSizeChange={handleFontSizeChange} />
      <FontStyleInput font={font} handleFontChange={handleFontChange} />
      <FontWeightInput font={font} handleFontChange={handleFontChange} />
      <FontVariantInput font={font} handleFontChange={handleFontChange} />
      <TextAlignInput font={font} handleFontChange={handleFontChange} />
      <LetterSpacingInput
        font={font}
        handleLetterSpacingChange={handleLetterSpacingChange}
      />
      <LineHeightInput
        font={font}
        handleLineHeightChange={handleLineHeightChange}
      />
    </div>
  );
};

export default FontPreview;
