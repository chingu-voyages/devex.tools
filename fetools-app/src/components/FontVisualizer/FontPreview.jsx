import React from "react";
import FontNameInput from "./FontPreviewComponenets/FontNameInput";
import FontColorInput from "./FontPreviewComponenets/FontColorInput";
import BackgroundColorInput from "./FontPreviewComponenets/BackgroundColorInput";
import FontSizeInput from "./FontPreviewComponenets/FontSizeInput";
import FontStyleInput from "./FontPreviewComponenets/FontStyleInput";
import FontWeightInput from "./FontPreviewComponenets/FontWeightInput";
import FontVariantInput from "./FontPreviewComponenets/FontVariantInput";
import TextAlignInput from "./FontPreviewComponenets/TextAlignInput";
import LetterSpacingInput from "./FontPreviewComponenets/LetterSpacingInput";
import LineHeightInput from "./FontPreviewComponenets/LineHeightInput";

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
