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
import { ToolPane } from "../ToolsLayout/Sections";

const FontPreview = ({
    font,
    backgroundColor,
    handleFontChange,
    handleColorChange,
    handleBackgroundColorChange,
    handleLetterSpacingChange,
    handleLineHeightChange,
    handleFontSizeChange,
    generateFontStyles,
    isBookmarked,
    toggleBookmark,
}) => {
    const stylesArr = [];
    const fontStyleObj = generateFontStyles(font, backgroundColor);

    for (const fontStyle in fontStyleObj) {
        if (
            fontStyle === "fontFamily" ||
            fontStyle === "color" ||
            fontStyle === "backgroundColor" ||
            fontStyle === "lineHeight" ||
            fontStyle === "fontStyle" ||
            fontStyle === "fontWeight" ||
            fontStyle === "textAlign" ||
            fontStyle === "textStyle" ||
            fontStyle === "letterSpacing"
        ) {
            stylesArr.push({ [fontStyle]: fontStyleObj[fontStyle] });
        }
        //stylesArr.push({[fontStyle]: fontStyleObj[fontStyle]})
    }

    console.log(stylesArr);
    return (
        <ToolPane
            title="Options"
            icon="tune"
            isPrimary={true}
            isBookmarked={isBookmarked}
            toggleBookmark={toggleBookmark}
            toolState={font}
        >
            <div className="flex flex-wrap justify-between gap-y-6 [&>*]:w-[48%]">
                <FontNameInput
                    font={font}
                    handleFontChange={handleFontChange}
                />
                <FontSizeInput
                    font={font}
                    handleFontSizeChange={handleFontSizeChange}
                />
                <FontColorInput
                    font={font}
                    handleColorChange={handleColorChange}
                />
                <BackgroundColorInput
                    backgroundColor={backgroundColor}
                    handleBackgroundColorChange={handleBackgroundColorChange}
                />
                <FontWeightInput
                    font={font}
                    handleFontChange={handleFontChange}
                />
                <FontVariantInput
                    font={font}
                    handleFontChange={handleFontChange}
                />
                <FontStyleInput
                    font={font}
                    handleFontChange={handleFontChange}
                />
                <TextAlignInput
                    font={font}
                    handleFontChange={handleFontChange}
                />
                <LetterSpacingInput
                    font={font}
                    handleLetterSpacingChange={handleLetterSpacingChange}
                />

                <LineHeightInput
                    font={font}
                    handleLineHeightChange={handleLineHeightChange}
                />
            </div>
        </ToolPane>
    );
};

/*

    bookmarkCallback={()=>{createBookmark(
      'fonts', 
      {fontOptions: {
        style: generateFontStyles(font, backgroundColor),
        options: font
      }}, 
      'fontOptions',
      ['style'],
      bookmarkLength, 
      setBookmarkLength)}}
*/

export default FontPreview;
