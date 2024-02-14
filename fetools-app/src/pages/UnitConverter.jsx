import '../index.css';
import GoDeeper from '../components/ToolsLayout/GoDeeper';
import ToolHeading from '../components/ToolsLayout/ToolHeading';
import CodeBlock from '../components/CodeBlock';
import TabSwitcher from '../components/TabSwitcher';

import { useState, useEffect, useRef } from 'react';
import ToolMain from '../components/ToolsLayout/ToolMain';
import {
  ToolSection,
  ToolSectionColumns,
} from '../components/ToolsLayout/Sections';
import Calculator from '../components/UnitConverter/Calculator';
import Preview from '../components/UnitConverter/Preview';
import CodeSnippets from '../components/UnitConverter/CodeSnippets';

// Function component UnitConverter for converting units between pixels, em/rem, and Tailwind utility classes

function UnitConverter() {
  // State hooks for managing component state
  const [basePixelSize, setBasePixelSize] = useState(16);
  const [pixels, setPixels] = useState(64);
  const [em, setEm] = useState(4);
  const [tailwindSize, setTailwindSize] = useState(16);
  const [cssSize, setCssSize] = useState(`${pixels}px`);

  // State to hold the content of the contentEditable div
  const [editableContent, setEditableContent] = useState('Aa');

  // Function to handle changes in the contentEditable div
  const editableRef = useRef(null);

  const handleContentChange = () => {
    const newText = editableRef.current.innerText;
    if (newText !== editableContent) {
      setEditableContent(newText);
    }
  };

  // Use useEffect to set the initial content of the contentEditable div
  useEffect(() => {
    const currentText = editableRef.current.innerText;
    if (editableContent !== currentText) {
      editableRef.current.innerText = editableContent;
    }
  }, [editableContent]);

  // State variable to track if the alert has been shown
  const [alertShown, setAlertShown] = useState(false);

  // Update CSS size whenever pixels, em, or Tailwind size changes
  const updateCssSize = newSizeInPixels => {
    let finalSize = newSizeInPixels;
    let displayNote = false;

    // Check if newSizeInPixels exceeds the maximum allowed size for the preview (800)
    if (newSizeInPixels > 800) {
      finalSize = 800;
      displayNote = true;
    }

    // Check if newSizeInPixels is a number, if not, set CSS size to "0px"
    setCssSize(isNaN(finalSize) ? '0px' : `${finalSize}px`); // Update CSS size

    // Update the state to control the visibility of the inline notification
    setAlertShown(displayNote);
  };

  // State hook for the grid background style
  const [gridBackgroundStyle, setGridBackgroundStyle] = useState({});

  //Update the grid background style when cssSize changes using useEffect hook
  useEffect(() => {
    const size = parseInt(cssSize); // Parse only the numeric part of cssSize
    if (!isNaN(size) && size > 0) {
      const lineThickness = 0.5;
      const backgroundStyle = {
        backgroundImage: `
          linear-gradient(to right, #d8b8ff ${lineThickness}px, transparent ${lineThickness}px),
          linear-gradient(to bottom, #d8b8ff ${lineThickness}px, transparent ${lineThickness}px)`,
        backgroundSize: `${size}px ${size}px`,
      };
      setGridBackgroundStyle(backgroundStyle);
    } else {
      setGridBackgroundStyle({});
    }
  }, [cssSize]);

  // Tailwind Size Conversions
  const tailwindSizes = [
    0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20,
    24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96,
  ];

  const tailwindCheck = TailwindSize => {
    if (isNaN(TailwindSize) || TailwindSize === '') {
      return '';
    }
    const nearestTailwindSize = tailwindSizes.find(
      size => size == TailwindSize
    );
    if (nearestTailwindSize !== undefined) {
      return nearestTailwindSize;
    }
    // Return rem value if no exact tailwind size is found
    return `[${parseFloat((TailwindSize / 4).toFixed(3))}rem]`;
  };

  // Handler for base pixel size changes
  const handleBasePixelSizeChange = e => {
    const newBaseSize = parseFloat(e.target.value);
    setBasePixelSize(newBaseSize);
    const newEm = pixels / newBaseSize;
    setEm(newEm);
    setTailwindSize(tailwindCheck(newEm * 4));
  };

  // Handler for pixel value changes
  const handlePixelChange = e => {
    const newPixels = parseFloat(e.target.value);
    setPixels(newPixels);
    const newEm = newPixels / basePixelSize;
    setEm(newEm);
    setTailwindSize(tailwindCheck(newEm * 4));
    updateCssSize(newPixels);
  };

  // Handler for rem/em value changes
  const handleEmChange = e => {
    const newEm = parseFloat(e.target.value);
    setEm(newEm);
    const newPixels = newEm * basePixelSize;
    setPixels(newPixels);
    setTailwindSize(tailwindCheck(newEm * 4));
    updateCssSize(newPixels);
  };

  // Tailwind Size Character Validation
  const isValidCharacter = char => {
    const validChars = '[],pxrem.';
    return validChars.includes(char) || !isNaN(char);
  };

  // Tailwind Size Format Check
  const formatCheck = input => {
    // Check if input is in the allowed format [Xrem] or [Xpx], if so, return as is
    if (
      (input.startsWith('[') && input.endsWith('rem]')) ||
      (input.startsWith('[') && input.endsWith('px]'))
    ) {
      return input;
    }

    // Remove all non-numeric characters except for the decimal point
    return input.replace(/[^\d.]/g, '');
  };

  // Handler for Tailwind Size changes
  const handleTailwindChange = e => {
    const inputValue = e.target.value.toString();
    const lastChar = inputValue.slice(-1); // Get the last character

    // Validate the last character
    if (!isValidCharacter(lastChar)) {
      e.preventDefault();
      return; // Stop handling if the last character is not valid
    }

    // Validate format
    let formattedValue = formatCheck(inputValue);

    let newTailwindSize;
    let newEm;

    // Checks if the input value is in the format [X.XXXrem] and parses it correctly
    if (formattedValue.startsWith('[') && formattedValue.endsWith('rem]')) {
      // Extracts the numeric part and parses it as float
      const remValue = formattedValue.slice(1, -4);
      if (!isNaN(remValue)) {
        newEm = remValue;
        newTailwindSize = formattedValue;
      } else {
        newTailwindSize = 0;
        newEm = 0;
      }
    } else if (
      formattedValue.startsWith('[') &&
      formattedValue.endsWith('px]')
    ) {
      // Extracts the numeric part and parses it as float
      const pxValue = formattedValue.slice(1, -3);
      if (!isNaN(pxValue)) {
        let newPx = pxValue;
        newEm = newPx / basePixelSize;
        newTailwindSize = formattedValue;
      } else {
        newTailwindSize = 0;
        newEm = 0;
      }
    } else {
      newTailwindSize = formattedValue;
      newEm = parseFloat(newTailwindSize) / 4;
    }

    setTailwindSize(inputValue);
    setEm(newEm);
    const newPixels = newEm * basePixelSize;
    setPixels(newPixels);
    updateCssSize(newPixels);
  };

  //Tailwind Blur Function - handles entered tailwind sizes that don't exist
  const onTailwindBlur = () => {
    let newTailwindSize;

    if (tailwindSize.startsWith('[') && tailwindSize.endsWith('rem]')) {
      const remValue = tailwindSize.slice(1, -4);
      let newEm = remValue;
      newTailwindSize = newEm * 4;
    } else if (tailwindSize.startsWith('[') && tailwindSize.endsWith('px]')) {
      const pxValue = tailwindSize.slice(1, -3);
      let newPx = pxValue;
      let newEm = newPx / basePixelSize;
      newTailwindSize = newEm * 4;
    } else {
      newTailwindSize = tailwindSize;
    }
    setTailwindSize(tailwindCheck(formatCheck(newTailwindSize)));
  };

  const [isExpanded, setIsExpanded] = useState(false);

  function toggleIsExpanded() {
    setIsExpanded(prev => !prev);
  }

  // JSX for rendering the UI components.
  return (
    <ToolMain>
      <ToolHeading
        title="Unit Converter"
        tagline="Calculate PX, REM/EM, and Tailwind utility classes with ease."
        icon="sync"
        iconRotate={true}
      />

      <ToolSectionColumns isExpanded={isExpanded}>
        <Calculator
          em={em}
          handleEmChange={handleEmChange}
          pixels={pixels}
          handlePixelChange={handlePixelChange}
          tailwindSize={tailwindSize}
          handleTailwindChange={handleTailwindChange}
          onTailwindBlur={onTailwindBlur}
          basePixelSize={basePixelSize}
          handleBasePixelSizeChange={handleBasePixelSizeChange}
        />
        <Preview
          alertShown={alertShown}
          gridBackgroundStyle={gridBackgroundStyle}
          editableRef={editableRef}
          cssSize={cssSize}
          handleContentChange={handleContentChange}
          isExpanded={isExpanded}
          toggleIsExpanded={toggleIsExpanded}
        />
      </ToolSectionColumns>

      {/* Section for code blocks */}
      <ToolSection icon="integration_instructions" title="Code Snippets">
        <CodeSnippets pixels={pixels} em={em} tailwindSize={tailwindSize} />
      </ToolSection>

      <ToolSection title="Go Deeper" icon="school">
        <GoDeeper
          linksData={[
            {
              url: 'https://www.w3schools.com/cssref/css_units.php',
              textValue: 'Explore CSS units at W3Schools',
            },
            {
              url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
              textValue: 'Learn more about CSS values and units at MDN',
            },
            {
              url: 'https://www.youtube.com/watch?v=N5wpD9Ov_To&ab_channel=KevinPowell',
              textValue: 'Are you using the right CSS units? With Kevin Powell',
            },
          ]}
        />
      </ToolSection>
    </ToolMain>
  );
}

export default UnitConverter;
