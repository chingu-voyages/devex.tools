import { useState } from "react";
import CodeGenerator from "../components/FontVisualizer/CodeGenerator";
import FontOptions from "../components/FontVisualizer/FontOptions";
import Preview from "../components/FontVisualizer/Preview";
import ToolMain from "../components/ToolsLayout/ToolMain";
import ToolHeading from "../components/ToolsLayout/ToolHeading";
import {
  ToolSection,
  ToolSectionColumns,
} from "../components/ToolsLayout/Sections";
import Bookmark from "../components/ToolsLayout/Bookmark";
import GoDeeper from "../components/ToolsLayout/GoDeeper";
import useExpander from "../hooks/useExpander";
import useToastState from "../hooks/useToastState";
import {
  createBookmark,
  checkForLocalStorage,
} from "../components/ToolsLayout/BookmarkUtils";
import Toast from "../components/Toast";

import {
  generateHtmlCode,
  fontSizeToTailwindClass,
  generateCssCode,
  generateFontStyles,
  generateTailwindCode,
  handleCopyClick,
} from "../components/FontVisualizer/index";

const FontVisualizer = () => {
  const [font, setFont] = useState({
    name: "Georgia",
    color: "#FFF4E4",
    style: "normal",
    weight: "normal",
    textTransform: "none",
    textAlign: "center",
    letterSpacing: 0,
    lineHeight: 1.2,
    fontSize: 3,
  });

  const handleFontChange = (property, value) => {
    setFont((prevFont) => ({
      ...prevFont,
      [property]: value,
    }));
  };

  const handleColorChange = (e) => {
    handleFontChange("color", e.target.value);
  };

  const handleBackgroundColorChange = (e) => {
    setBackgroundColor(e.target.value);
  };

  const handleFontSizeChange = (value) => {
    handleFontChange("fontSize", value);
  };

  const handleLetterSpacingChange = (e) => {
    handleFontChange("letterSpacing", `${e.target.value}px`);
  };

  const handleLineHeightChange = (e) => {
    handleFontChange("lineHeight", `${e.target.value}`);
  };

  const [backgroundColor, setBackgroundColor] = useState("#57390B");
  const [codeType, setCodeType] = useState("css");
  const [htmlCode, setHtmlCode] = useState(generateHtmlCode());

  // Hook to manage expanding preview
  const [isExpanded, toggleIsExpanded] = useExpander();
  const [bookmarkLength, setBookmarkLength] = useState(
    checkForLocalStorage().length
  );
  const toastState = useToastState();

  return (
    <ToolMain>
      <ToolHeading
        title="Font Viewer"
        tagline="Preview font property combinations live in the browser."
        icon="format_size"
      />
      <ToolSectionColumns isExpanded={isExpanded}>
        <FontOptions
          font={font}
          backgroundColor={backgroundColor}
          handleFontChange={handleFontChange}
          handleColorChange={handleColorChange}
          handleBackgroundColorChange={handleBackgroundColorChange}
          handleLetterSpacingChange={handleLetterSpacingChange}
          handleLineHeightChange={handleLineHeightChange}
          handleFontSizeChange={handleFontSizeChange}
          generateFontStyles={generateFontStyles}
          bookmarkLength={bookmarkLength}
          setBookmarkLength={setBookmarkLength}
        />

        <Preview
          generateFontStyles={generateFontStyles}
          isExpanded={isExpanded}
          toggleIsExpanded={toggleIsExpanded}
          font={font}
          bg={backgroundColor}
        />
      </ToolSectionColumns>

      {/* Section for code blocks */}
      <ToolSection icon="integration_instructions" title="Code Snippets">
        <div className="flex flex-1">
          <CodeGenerator
            generateCssCode={generateCssCode}
            generateHtmlCode={generateHtmlCode}
            generateTailwindCode={generateTailwindCode}
            handleCopyIcon={handleCopyClick}
            codeType={codeType}
            setCodeType={setCodeType}
            toastState={toastState}
            font={font}
            bg={backgroundColor}
            htmlCode={htmlCode}
            setHtmlCode={setHtmlCode}
          />
        </div>
      </ToolSection>

      <ToolSection title="Your Collection" icon="bookmarks">
        <Bookmark
          pageName={"fonts"}
          getStyleFromBookmark={[
            {
              styleProperty: "backgroundColor",
              bookmarkProperty: "fontOptions",
              bookmarkSubProperty: "style",
              bookmarkSubSubProperty: "backgroundColor",
            },
            {
              styleProperty: "fontFamily",
              bookmarkProperty: "fontOptions",
              bookmarkSubProperty: "style",
              bookmarkSubSubProperty: "fontFamily",
            },
            {
              styleProperty: "color",
              bookmarkProperty: "fontOptions",
              bookmarkSubProperty: "style",
              bookmarkSubSubProperty: "color",
            },
          ]}
          addStyle={{ width: "240px", height: "145px"}}
          deleteProperty={"fontOptions"}
          setBookmarkLength={setBookmarkLength}
          bookmarkHoverElement={() => {}}
          childElement={createBookmarkChildren}
          childProperty={"fontOptions"}
          childSubProperty="options"

        >
          <div>

            <span className="text-6xl">aA</span>
          </div>
        </Bookmark>
      </ToolSection>

      <GoDeeper
        linksData={[
          {
            url: "https://fonts.google.com/knowledge",
            textValue:
              "Explore guidance for selecting, customizing and using fonts from Google Fonts",
          },
        ]}
      />
      <Toast toastState={toastState} />
    </ToolMain>
  );

function createBookmarkChildren(fontOptions){
  return(
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <span>{fontOptions.name}</span>      
        <span>{fontOptions.fontSize}/{fontOptions.lineHeight*100}%</span>     
      </div>
 
      <span className="h-full text-6xl m-auto">aA</span>
    </div>
  )
}
};

export default FontVisualizer;
