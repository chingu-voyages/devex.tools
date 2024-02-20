import { useState, useRef, useEffect } from 'react';

import {
  getRandomColor,
  getHexString,
  isValidHexColor,
  getRgb,
} from '../components/ColorGradient/ColorGradientUtils';

import useToastState from '../hooks/useToastState';
import useExpander from '../hooks/useExpander';
import {createBookmark, checkForLocalStorage} from '../components/ToolsLayout/BookmarkUtils';

import ColorGradientSlider from '../components/ColorGradient/ColorGradientSlider';
import ToolHeading from '../components/ToolsLayout/ToolHeading';
import ColorGradientInterface from '../components/ColorGradient/ColorGradientInterface';
import CodeBlock from '../components/CodeBlock';
import GoDeeper from '../components/ToolsLayout/GoDeeper';
import Toast from '../components/Toast';
import {
  ToolPane,
  ToolPreviewPane,
  ToolSection,
  ToolSectionColumns,
} from '../components/ToolsLayout/Sections';

import ToolMain from '../components/ToolsLayout/ToolMain';
import TabSwitcher from '../components/TabSwitcher';
import Bookmark from '../components/ToolsLayout/Bookmark';
import EyeDropButton from '../components/ColorPicker/EyeDropButton';
import CopyButton from '../components/CopyButton';

export default function ColorGradient() {
  const containerRef = useRef();

  const [colorsArr, setColorsArr] = useState([
    getRandomColor(),
    getRandomColor(),
  ]);

  const [gradientColors, setGradientColors] = useState([
    {
      ...colorsArr[0],
      value: 0,
    },
    {
      ...colorsArr[1],
      value: 100,
    },
  ]);

  const [currentKnob, setCurrentKnob] = useState(false);

  const [inputValue, setInputValue] = useState({
    color: getHexString(gradientColors[0].colorStr),
    position: gradientColors[0].value,
    rotation: 25,
    type: 'linear'
  });

  const [codeBlockRules, setCodeBlockRules] = useState({
    background: `background: ${generateGradientRule(colorsArr)}`
  });

  const [isExpanded, toggleIsExpanded] = useExpander();
  const [bookmarkLength, setBookmarkLength] = useState(checkForLocalStorage().length)
  const toastState = useToastState();

  useEffect(() => {
    if (!currentKnob) {
      setCurrentKnob(containerRef.current.querySelector('.isActive'));
    }
  }, [currentKnob]);

  useEffect(() => {
    const gradientRuleSlider = generateGradientRule(gradientColors, 90, true);
    const gradientRule = generateGradientRule(gradientColors);

    updateCSSValues('.gradientSlider', 'background', gradientRuleSlider);
    updateCSSValues('.gradient', 'background', gradientRule);
    setCodeBlockRules({ ...codeBlockRules, background: `background: ${getCssCode()}` });
  }, [inputValue, gradientColors]);

  return (
    <>
      <ToolMain>
        <ToolHeading
          title="Gradient Maker"
          tagline="Use this tool to create gradients for any project!"
          icon="gradient"
        ></ToolHeading>

        <ToolSectionColumns
          isExpanded={isExpanded}
          reverse={false}
          ref={containerRef}
        >
          <ToolPreviewPane
            isExpanded={isExpanded}
            toggleIsExpanded={toggleIsExpanded}
          >
            <div
              id="show-gradient"
              className="gradient h-[360px] w-full min-h-64"
            ></div>
          </ToolPreviewPane>

          <ToolPane
          className="h-[360px]"           
          title="Options"
          icon="gradient"
          isPrimary={true}
          bookmarkCallback={()=>{createBookmark(
          'gradients', 
          {colorGradient: {
            style: document.querySelector('.gradient').style.getPropertyValue('background'),
            colors: gradientColors
          }}, 
          'colorGradient',
          ['style'],
          bookmarkLength, 
          setBookmarkLength)}}
          shareCallback={() => {}}>
            <ColorGradientSlider
            colorsArr={colorsArr}
            setColorsArr={setColorsArr}
            inputValue={inputValue}
            updateCSSValues={updateCSSValues}
            handleColorChange={handleColorChange}
            handleSetCurrentKnob={handleSetCurrentKnob}
            handleSetInputValue={handleSetInputValue}
            generateGradientRule={generateGradientRule}
            gradientColors={gradientColors}
            setGradientColors={setGradientColors}
            onClickRandom={onClickRandom}
            />
            <ColorGradientInterface
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleColorInputChange={handleColorInputChange}
            handlePositionInputChange={handlePositionInputChange}
            handleRotationInputChange={handleRotationInputChange}
            updateValuesOnBlur={updateValuesOnBlur}
            gradientColors={gradientColors}
            generateGradientRule={generateGradientRule}
            updateCSSValues={updateCSSValues}
            onClickRandom={onClickRandom}
            />
          </ToolPane>
        </ToolSectionColumns>

        <ToolSection icon="integration_instructions" title="Code Snippets">
          <TabSwitcher buttons={['CSS', 'Tailwind']}>
            <CodeBlock
              toastState={toastState}
              title={'CSS'}
              code={codeBlockRules.background}
              lang='css'
            />
            <CodeBlock
              toastState={toastState}
              title={'CSS'}
              code={'Tailwind'}
              unit={codeBlockRules.background}
            />
          </TabSwitcher>
        </ToolSection>

        <ToolSection title="Your Collection" icon="bookmarks">
        <Bookmark 
        pageName={'gradients'} 
        getStyleFromBookmark={[{
          styleProperty: 'background', 
          bookmarkProperty: 'colorGradient', 
          bookmarkSubProperty: 'style'}]}
        addStyle={{width: '120px', height: '96px'}}
        deleteProperty={'colorGradient'}
        className={`
        flex flex-wrap justify-start
        min-[395px]:gap-x-5 max-[440px]:justify-between 
        max-[550px]:justify-items-center
        sm:justify-start gap-y-5
        `}
        childClassName={`rounded-md rounded-tl-none min-w-[100px] max-w-[120px]`}
        setBookmarkLength={setBookmarkLength}
        bookmarkHoverElement={bookmarkHoverElement}
        childProperty={'colorGradient'}
        childSubProperty='style'
        >
        </Bookmark>
      </ToolSection>

        <GoDeeper
          linksData={[{ url: '#', textValue: 'Not a link available yet' }]}
        ></GoDeeper>

        <Toast toastState={toastState} />
      </ToolMain>
    </>
  );

  function handleSetCurrentKnob(knob) {
    setCurrentKnob(knob);
  }

  function handleColorInputChange(evt) {
    const newColor = evt.target.value;

    setInputValue({ ...inputValue, color: newColor }); // Update input value

    if (isValidHexColor(newColor)) {
      handleColorChange(newColor); // Pass the new color to the parent component
    }
  }

  function handleColorChange(newColor) {
    // Assuming updatedColors is an array with two color values
    const newColorsArr = [...colorsArr];
    const newGradientColors = [...gradientColors];

    if (!currentKnob) {
      newColorsArr[0] = getRgb(newColor);
      newGradientColors[0] = { ...newColorsArr[0], value: 0 };

      setColorsArr(newColorsArr);
      setGradientColors(newGradientColors);
      return;
    }

    newColorsArr[currentKnob.id] = getRgb(newColor); // Update the color at the current knob index
    newGradientColors[currentKnob.id] = {
      ...newColorsArr[currentKnob.id],
      value: currentKnob.value,
    }; // Update the color at the current knob index
    setColorsArr(newColorsArr);
    setGradientColors(newGradientColors);
  }

  function handlePositionInputChange(evt) {
    const newValue = parseInt(evt.target.value);

    currentKnob.value = newValue;
    gradientColors[0].value = newValue;
    inputValue.position = newValue;

    setGradientColors([...gradientColors]);
  }

  function handleRotationInputChange(evt) {
    inputValue.rotation = parseInt(evt.target.value);

    setInputValue({ ...inputValue, rotation: parseInt(evt.target.value) });
  }

  function handleSetInputValue(newValues) {
    setInputValue({
      color: getHexString(newValues.color),
      position: newValues.position,
      rotation: newValues.rotation,
      type: newValues.type,
    });
  }

  function updateValuesOnBlur() {
    setInputValue({ ...inputValue });
  }

  function generateGradientRule(colorsArr, newRotation = null, isSlider) {
    const rotationValue = newRotation || parseInt(inputValue.rotation) * 3.6;
    const type = inputValue.type;

    const sortedColors = [...colorsArr];
    sortedColors.sort(
      ({ value: color1Value }, { value: color2Value }) =>
        color1Value - color2Value
    );

    const newColorObject = sortedColors.map(({ r, g, b, colorStr }) => ({
      r,
      g,
      b,
      colorStr,
    }));

    const isColorsArrSimilarToSorted = colorsArr.every(
      ({ colorStr }, idx) => colorStr === newColorObject[idx].colorStr
    );

    if (!isColorsArrSimilarToSorted) {
      setColorsArr(
        sortedColors.map(({ r, g, b, colorStr }) => ({ r, g, b, colorStr }))
      );
    }

    const colors = sortedColors.map(
      ({ colorStr, value }) => `${colorStr} ${value}%`
    );

    if(type==='radial' && !isSlider){
      const gradientRule = `${type}-gradient(${colors.join(', ')})`;
      return gradientRule;
    }

    const gradientRule = `linear-gradient(${rotationValue}deg, ${colors.join(
      ', '
    )})`;

    return gradientRule;
  }

  function updateCSSValues(cssClassName, propertyName, newValue) {
    const element = containerRef.current.querySelector(cssClassName);

    element.style[propertyName] = newValue;
  }

  function onClickRandom() {
    const newColorArr = [getRandomColor(), getRandomColor()];
    setColorsArr(newColorArr);
    setGradientColors([
      {
        ...newColorArr[0],
        value: 0,
      },
      {
        ...newColorArr[1],
        value: 100,
      },
    ]);
  }

  function getCssCode() {
    const currentStyle =
      containerRef.current.querySelector('.gradient').style.background;

    return currentStyle;
  }

  function bookmarkHoverElement(newStyle, editMode){
    return(
    <span
    id="hover-options"
    className={`
    absolute flex flex-col px-6 pt-8 w-full h-full text-white text-center 
    rounded-md rounded-tl-none
    ${editMode?'hidden':''}
    `}>
      <div className="flex">
        <span className="flex-1 block text-2xl text-center">
        <EyeDropButton
            title={'New Gradient Set'}
            content={''}
            setStateVar={()=>{
              const bookmark = checkForLocalStorage('gradients').find(({colorGradient})=>colorGradient.style===newStyle)
              const newGradient = bookmark.colorGradient.colors.map((colorObj,idx)=>{
                return {...colorObj, value: (bookmark/bookmark.length)*idx}
              })
              setColorsArr(bookmark.colorGradient.colors)
              setGradientColors(newGradient)
            }}
            newValue={newStyle}
            toastState={toastState}
          />
        </span>
        <span className="flex-1 block text-2xl text-left leading-0">
          <CopyButton onCopy={() => newStyle} toastState={toastState} />
        </span>
      </div>
    </span>
    )
  }
}
