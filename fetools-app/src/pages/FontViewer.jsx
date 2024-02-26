import { useState } from "react";
import CodeGenerator from "../components/FontViewer/CodeGenerator";
import FontOptions from "../components/FontViewer/FontOptions";
import Preview from "../components/FontViewer/Preview";
import ToolMain from "../components/ToolsLayout/ToolMain";
import ToolHeading from "../components/ToolsLayout/ToolHeading";
import {
    ToolSection,
    ToolSectionColumns,
} from "../components/ToolsLayout/Sections";
import GoDeeper from "../components/ToolsLayout/GoDeeper";
import useExpander from "../hooks/useExpander";
import useBookmarks from "../hooks/useBookmarks";
import FontViewerBookmarks from "../components/FontViewer/FontViewerBookmarks";
import useToastState from "../hooks/useToastState";
import Toast from "../components/Toast";

import {
    generateHtmlCode,
    //    fontSizeToTailwindClass,
    generateCssCode,
    generateFontStyles,
    generateTailwindCode,
    handleCopyClick,
} from "../components/FontViewer/index";

const FontVisualizer = () => {
    const [font, setFont] = useState({
        name: "Georgia",
        color: "#FFF4E4",
        backgroundColor: "#57390B",
        style: "normal",
        weight: "normal",
        textTransform: "none",
        textAlign: "center",
        letterSpacing: 0,
        lineHeight: 1.2,
        fontSize: 3,
    });

    console.log("Font", font);

    const [isBookmarked, bookmarks, toggleBookmark, removeBookmark] =
        useBookmarks(font, "fonts");

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
        handleFontChange("backgroundColor", e.target.value);
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

    const [codeType, setCodeType] = useState("css");
    const [htmlCode, setHtmlCode] = useState(generateHtmlCode());

    // Hook to manage expanding preview
    const [isExpanded, toggleIsExpanded] = useExpander();
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
                    handleFontChange={handleFontChange}
                    handleColorChange={handleColorChange}
                    handleBackgroundColorChange={handleBackgroundColorChange}
                    handleLetterSpacingChange={handleLetterSpacingChange}
                    handleLineHeightChange={handleLineHeightChange}
                    handleFontSizeChange={handleFontSizeChange}
                    generateFontStyles={generateFontStyles}
                    isBookmarked={isBookmarked}
                    toggleBookmark={toggleBookmark}
                />

                <Preview
                    generateFontStyles={generateFontStyles}
                    isExpanded={isExpanded}
                    toggleIsExpanded={toggleIsExpanded}
                    font={font}
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
                        htmlCode={htmlCode}
                        setHtmlCode={setHtmlCode}
                    />
                </div>
            </ToolSection>

            <FontViewerBookmarks
                {...{ bookmarks, removeBookmark, setFont, toastState }}
            />

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
};

export default FontVisualizer;
