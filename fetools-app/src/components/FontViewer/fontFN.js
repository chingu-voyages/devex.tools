export const generateHtmlCode = (tailwind = false) => {
    return `<div class="devex-style">
    Your content goes here
    </div>
  `;
};

export const generateTailwindCode = (font) => {
    return `font-family-${font.name}
text-${font.textAlign}
text-${font.color}
bg-[${font.backgroundColor}]
font-${font.style}
font-${font.weight}
tracking-[${font.letterSpacing}]
leading-[${font.lineHeight}]
text-[${font.textTransform}]
${fontSizeToTailwindClass(font.fontSize)}`;
};

export const fontSizeToTailwindClass = (fontSize) => {
    if (fontSize === 1) {
        return "text-xs";
    } else if (fontSize === 2) {
        return "text-sm";
    } else if (fontSize === 3) {
        return "text-base";
    } else if (fontSize === 4) {
        return "text-lg";
    } else return "text-[" + fontSize + "em]";
};

export const generateFontStyles = (font) => {
    return {
        fontFamily: font.name,
        color: font.color,
        backgroundColor: font.backgroundColor,
        fontStyle: font.style,
        fontWeight: font.weight,
        textTransform: font.textTransform,
        textAlign: font.textAlign,
        letterSpacing: font.letterSpacing,
        lineHeight: font.lineHeight,
        fontSize: `${font.fontSize}em`,
    };
};

export const handlehtmlCode = (setHtmlCode, tag) => {
    setHtmlCode(`<${tag} class="devex-style">
  Your content goes here
  <${tag}/>
`);
};

export const generateCssCode = (font) => {
    return `.devex-style {
  font-family: ${font.name};
  color: ${font.color};
  background-color: ${font.backgroundColor};
  font-style: ${font.style};
  font-weight: ${font.weight};
  text-transform: ${font.textTransform};
  text-align: ${font.textAlign};
  letter-spacing: ${font.letterSpacing};
  line-height: ${font.lineHeight};
  font-size: ${font.fontSize}em;
  }`;
};

export const handleFontChange = (property, value) => {
    setFont((prevFont) => ({
        ...prevFont,
        [property]: value,
    }));
};

export const handleColorChange = (e) => {
    handleFontChange("color", e.target.value);
};

export const handleBackgroundColorChange = (value) => {
    handleFontChange("backgroundColor", value);
};

export const handleFontSizeChange = (value) => {
    handleFontChange("fontSize", value);
};

export const handleLetterSpacingChange = (e) => {
    handleFontChange("letterSpacing", `${e.target.value}px`);
};

export const handleLineHeightChange = (e) => {
    handleFontChange("lineHeight", `${e.target.value}`);
};

export const handleCopyClick = async () => {
    try {
        let codeToCopy;
        if (codeType === "css") {
            codeToCopy = generateCssCode();
        } else if (codeType === "html") {
            codeToCopy = generateHtmlCode();
        } else {
            codeToCopy = generateTailwindCode();
        }
        await navigator.clipboard.writeText(codeToCopy);
        console.log("Text copied to clipboard");
    } catch (err) {
        console.error("Unable to copy text to clipboard", err);
    }
};
