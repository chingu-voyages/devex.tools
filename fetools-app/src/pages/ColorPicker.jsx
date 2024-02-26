import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ColorPickerTool from "../components/ColorPicker/ColorPickerTool";
import ColorPickerInterface from "../components/ColorPicker/ColorPickerInterface";
import RelatedColors from "../components/ColorPicker/RelatedColors";
import Toast from "../components/Toast";
import GoDeeper from "../components/ToolsLayout/GoDeeper";
import ToolHeading from "../components/ToolsLayout/ToolHeading";
import ToolMain from "../components/ToolsLayout/ToolMain";

import {
    ToolPane,
    ToolSection,
    ToolSectionColumns,
} from "../components/ToolsLayout/Sections";

import {
    createColorObj,
    getColorString,
} from "../components/ColorPicker/ColorPickerUtils";
import useExpander from "../hooks/useExpander";
import useToastState from "../hooks/useToastState";

import useBookmarks from "../hooks/useBookmarks";
import ColorPickerBookmarks from "../components/ColorPicker/ColorPickerBookmarks";

export default function ColorPicker() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [inputOnFocus, setInputOnFocus] = useState(false);
    const [colorData, setColorData] = useState(
        createColorObj(searchParams.get("color")) || createColorObj()
    );

    const [isBookmarked, bookmarks, toggleBookmark, removeBookmark] =
        useBookmarks(colorData, "colors");

    const toastState = useToastState();

    const [isExpanded, toggleIsExpanded] = useExpander();

    useEffect(() => {
        if (!searchParams.get("color")) {
            handleQuery(getColorString(colorData.color, "hex"));
        }

        if (
            getColorString(colorData.color, "hex") !==
                `#${searchParams.get("color")}` &&
            searchParams.get("color")
        ) {
            setColorData(createColorObj(searchParams.get("color")));
        }
    }, [searchParams]);

    return (
        <ToolMain>
            <ToolHeading
                title="Color Picker"
                tagline="Get colors, tints, and shades, with CSS and Tailwind code you can copy and paste into your project."
                icon="colorize"
            ></ToolHeading>

            <ToolSectionColumns isExpanded={isExpanded} reverse={false}>
                <ColorPickerTool
                    colorData={colorData}
                    handleQuery={handleQuery}
                    setColorData={setColorData}
                    inputOnFocus={inputOnFocus}
                    setInputOnFocus={setInputOnFocus}
                    isExpanded={isExpanded}
                    toggleIsExpanded={toggleIsExpanded}
                />

                <ToolPane
                    title="Color Codes"
                    icon="integration_instructions"
                    isPrimary={true}
                    isBookmarked={isBookmarked}
                    toggleBookmark={toggleBookmark}
                    toolState={colorData}
                    shareCallback={() => {}}
                >
                    <ColorPickerInterface
                        colorData={colorData}
                        setColorData={setColorData}
                        inputOnFocus={inputOnFocus}
                        setInputOnFocus={setInputOnFocus}
                    />
                </ToolPane>
            </ToolSectionColumns>

            <ToolSection title="Related Colors" icon="palette">
                <RelatedColors
                    colorData={colorData}
                    toastState={toastState}
                    createColorObj={createColorObj}
                    setColorData={setColorData}
                />
            </ToolSection>

            <ColorPickerBookmarks
                bookmarks={bookmarks}
                removeBookmark={removeBookmark}
                setColorData={setColorData}
                toastState={toastState}
            />

            <GoDeeper
                linksData={[
                    {
                        url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_Colors_and_Luminance",
                        textValue:
                            "MDN Web Docs: Understanding Colors and Luminance",
                    },
                    {
                        url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors/Applying_color",
                        textValue:
                            "MDN Web Docs: Applying color to HTML elements using CSS",
                    },
                    {
                        url: "https://www.youtube.com/watch?v=YeI6Wqn4I78",
                        textValue:
                            "Color theory basics: use the color wheel & color harmonies to choose colors that work well together",
                    },
                ]}
            />
            <Toast toastState={toastState} />
        </ToolMain>
    );

    function handleQuery(color) {
        color = color.slice(1);
        setSearchParams({ color });
    }
}
