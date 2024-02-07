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
    <div className=" grid flex-1 grid-rows-5 grid-flow-col   gap-4 ">
      <FontNameInput font={font} handleFontChange={handleFontChange} />
      <FontColorInput font={font} handleColorChange={handleColorChange} />
      <FontWeightInput font={font} handleFontChange={handleFontChange} />
      <FontStyleInput font={font} handleFontChange={handleFontChange} />
      <LetterSpacingInput
        font={font}
        handleLetterSpacingChange={handleLetterSpacingChange}
      />
      <FontSizeInput font={font} handleFontSizeChange={handleFontSizeChange} />
      <BackgroundColorInput
        backgroundColor={backgroundColor}
        handleBackgroundColorChange={handleBackgroundColorChange}
      />
      <FontVariantInput font={font} handleFontChange={handleFontChange} />
      <TextAlignInput font={font} handleFontChange={handleFontChange} />

      <LineHeightInput
        font={font}
        handleLineHeightChange={handleLineHeightChange}
      />
    </div>
  );
};

export default FontPreview;
