import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ColorPickerTool from '../components/ColorPicker/ColorPickerTool';
import ColorPickerInterface from '../components/ColorPicker/ColorPickerInterface';
import RelatedColors from '../components/ColorPicker/RelatedColors';
import Bookmark from '../components/ToolsLayout/Bookmark';
import Toast from '../components/Toast';
import GoDeeper from '../components/ToolsLayout/GoDeeper';
import ToolHeading from '../components/ToolsLayout/ToolHeading';
import ToolMain from '../components/ToolsLayout/ToolMain';
import EyeDropButton from '../components/ColorPicker/EyeDropButton';
import CopyButton from '../components/CopyButton';
import {
  ToolPane,
  ToolSection,
  ToolSectionColumns,
} from '../components/ToolsLayout/Sections';

import { createColorObj, getColorString } from '../components/ColorPicker/ColorPickerUtils';
import {createBookmark, checkForLocalStorage, compareItems} from '../components/ToolsLayout/BookmarkUtils';
import useExpander from '../hooks/useExpander';
import useToastState from '../hooks/useToastState';

export default function ColorPicker() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [inputOnFocus, setInputOnFocus] = useState(false);
  const [colorData, setColorData] = useState(
    createColorObj(searchParams.get('color')) || createColorObj()
  );
  
  const [bookmarkLength, setBookmarkLength] = useState(checkForLocalStorage('colors').length)
  const [isExpanded, toggleIsExpanded] = useExpander();
  
  const toastState = useToastState();

    console.log(compareItems(getColorString(colorData.color, 'hex'), 'colors', 'color'))

    useEffect(()=>{
      if(!searchParams.get('color')){
        handleQuery(getColorString(colorData.color, 'hex'))
      }

      if(getColorString(colorData.color, 'hex') !== `#${searchParams.get('color')}` && searchParams.get('color') ){
        setColorData(createColorObj(searchParams.get('color')))
      }
    },[searchParams])

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
          bookmarkCallback={()=>createBookmark(
            'colors', 
            {color: getColorString(colorData.color, 'hex')}, 
            'color',
            null,
            bookmarkLength, 
            setBookmarkLength)}
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

      <ToolSection title="Your Collection" icon="bookmarks">
        <Bookmark 
        pageName={'colors'} 
        getStyleFromBookmark={[
          {styleProperty: 'backgroundColor', bookmarkProperty: 'color'}
        ]}
        addStyle={{width: '120px', height: '96px'}}
        deleteProperty={'color'}
        setBookmarkLength={setBookmarkLength}
        bookmarkHoverElement={bookmarkHoverElement}
        childProperty={'color'}>
        </Bookmark>
      </ToolSection>

      <GoDeeper linksData={[
          {
            url: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_Colors_and_Luminance',
            textValue: 'MDN Web Docs: Understanding Colors and Luminance'
          },
          {
            url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors/Applying_color',
            textValue: 'MDN Web Docs: Applying color to HTML elements using CSS'
          },
          {
            url: 'https://www.youtube.com/watch?v=YeI6Wqn4I78',
            textValue: 'Color theory basics: use the color wheel & color harmonies to choose colors that work well together'
          }
      ]}/>
      <Toast toastState={toastState} />
    </ToolMain>
  );

  function handleQuery(color) {
    color = color.slice(1);
    setSearchParams({ color });
  }

  function bookmarkHoverElement(color, editMode){
    return(
    <span
    id="hover-options"
    className={`
    absolute flex flex-col px-4 pt-4 w-full h-full text-white text-center 
    rounded-md rounded-tl-none
    ${editMode?'hidden':''}
    `}>
      <div>
        <p className="font-medium uppercase">{color}</p>
      </div>
      <div className="flex">
        <span className="flex-1 block text-2xl text-center pointer-events-auto">
          <EyeDropButton
            title={'New Color Set'}
            content={''}
            setStateVar={()=>setColorData(createColorObj(color))}
            newValue={color}
            toastState={toastState}
          />
        </span>
        <span className="flex-1 block text-2xl text-center leading-0 pointer-events-auto">
          <CopyButton onCopy={() => color} toastState={toastState} />
        </span>
      </div>
    </span>
    )
  }
}
