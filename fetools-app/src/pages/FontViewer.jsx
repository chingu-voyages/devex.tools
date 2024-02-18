import { useState } from 'react';
import CodeGenerator from '../components/FontVisualizer/CodeGenerator';
import FontOptions from '../components/FontVisualizer/FontOptions';
import Preview from '../components/FontVisualizer/Preview';
import ToolMain from '../components/ToolsLayout/ToolMain';
import ToolHeading from '../components/ToolsLayout/ToolHeading';
import {
  ToolSection,
  ToolSectionColumns,
} from '../components/ToolsLayout/Sections';
import GoDeeper from '../components/ToolsLayout/GoDeeper';
import useExpander from '../hooks/useExpander';
import useToastState from '../hooks/useToastState';
import Toast from '../components/Toast';

const FontVisualizer = () => {
  const [font, setFont] = useState({
    name: 'Georgia',
    color: '#222222',
    style: 'normal',
    weight: 'normal',
    textTransform: 'none',
    textAlign: 'center',
    letterSpacing: 0,
    lineHeight: 1.2,
    fontSize: 3,
  });

  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [codeType, setCodeType] = useState('css');

  // Hook to manage expanding preview
  const [isExpanded, toggleIsExpanded] = useExpander();
  const toastState = useToastState();

  const handleFontChange = (property, value) => {
    setFont(prevFont => ({
      ...prevFont,
      [property]: value,
    }));
  };

  const handleColorChange = e => {
    handleFontChange('color', e.target.value);
  };

  const handleBackgroundColorChange = e => {
    setBackgroundColor(e.target.value);
  };

  const handleFontSizeChange = value => {
    handleFontChange('fontSize', value);
  };

  const handleLetterSpacingChange = e => {
    handleFontChange('letterSpacing', `${e.target.value}px`);
  };

  const handleLineHeightChange = e => {
    handleFontChange('lineHeight', `${e.target.value}`);
  };

  const generateCssCode = () => {
    return `.devex-style {
  font-family: ${font.name};
  color: ${font.color};
  background-color: ${backgroundColor};
  font-style: ${font.style};
  font-weight: ${font.weight};
  text-transform: ${font.textTransform};
  text-align: ${font.textAlign};
  letter-spacing: ${font.letterSpacing};
  line-height: ${font.lineHeight};
  font-size: ${font.fontSize}em;
}`;
  };

  const generateTailwindCode = () => {
    return `font-family-${font.name}
text-${font.textAlign}
text-${font.color}
bg-${backgroundColor}
font-${font.style}
font-${font.weight}
tracking-${font.letterSpacing}
leading-${font.lineHeight}
text-${font.textTransform}
${fontSizeToTailwindClass(font.fontSize)}`;
  };

  const generateHtmlCode = () => {
    return `<div class="devex-style">
  Your content goes here
</div>
`;
  };

  const fontSizeToTailwindClass = fontSize => {
    if (fontSize === 1) {
      return 'text-xs';
    } else if (fontSize === 2) {
      return 'text-sm';
    } else if (fontSize === 3) {
      return 'text-base';
    } else if (fontSize === 4) {
      return 'text-lg';
    } else return 'text-[' + fontSize + 'em]';
  };

  const generateFontStyles = () => {
    return {
      fontFamily: font.name,
      color: font.color,
      backgroundColor: backgroundColor,
      fontStyle: font.style,
      fontWeight: font.weight,
      textTransform: font.textTransform,
      textAlign: font.textAlign,
      letterSpacing: font.letterSpacing,
      lineHeight: font.lineHeight,
      fontSize: `${font.fontSize}em`,
    };
  };

  const handleCopyClick = async () => {
    try {
      let codeToCopy;
      if (codeType === 'css') {
        codeToCopy = generateCssCode();
      } else if (codeType === 'html') {
        codeToCopy = generateHtmlCode();
      } else {
        codeToCopy = generateTailwindCode();
      }
      await navigator.clipboard.writeText(codeToCopy);
      console.log('Text copied to clipboard');
    } catch (err) {
      console.error('Unable to copy text to clipboard', err);
    }
  };

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
        />

        <Preview
          generateFontStyles={generateFontStyles}
          isExpanded={isExpanded}
          toggleIsExpanded={toggleIsExpanded}
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
          />
        </div>
      </ToolSection>

      <GoDeeper
        linksData={[
          {
            url: 'https://fonts.google.com/knowledge',
            textValue:
              'Explore guidance for selecting, customizing and using fonts from Google Fonts',
          },
        ]}
      />
      <Toast toastState={toastState}/>
    </ToolMain>
  );
};

export default FontVisualizer;
