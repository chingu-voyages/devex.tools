import { useState } from 'react';
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
import {createBookmark, checkForLocalStorage} from '../components/ToolsLayout/BookmarkUtils';

import useExpander from '../hooks/useExpander';
import useToastState from '../hooks/useToastState';

export default function ColorPicker() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [inputOnFocus, setInputOnFocus] = useState(false);
  const [colorData, setColorData] = useState(
    createColorObj(searchParams.get('color')) || createColorObj()
  );

  const toastState = useToastState();

  const [bookmarkLength, setBookmarkLength] = useState(checkForLocalStorage('colors').length)
  const [isExpanded, toggleIsExpanded] = useExpander();

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
          setColorData={setColorData}
        />
      </ToolSection>

      <ToolSection title="Your Collection" icon="bookmarks">
        <Bookmark 
        pageName={'colors'} 
        getStyleFromBookmark={[{styleProperty: 'backgroundColor', bookmarkProperty: 'color'}]}
        addStyle={{width: '120px', height: '96px'}}
        deleteProperty={'color'}
        className={`
        flex flex-wrap justify-start
        min-[395px]:gap-x-5 max-[440px]:justify-between 
        max-[550px]:justify-items-center
        sm:justify-start gap-y-5
        `}
        childClassName={`rounded-md rounded-tl-none min-w-[100px] max-w-[120px]
        `}
        setBookmarkLength={setBookmarkLength}
        bookmarkChildren={bookmarkChildren}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        childProperty={'color'}>
        </Bookmark>
      </ToolSection>

      <GoDeeper linksData={[]}></GoDeeper>
      <Toast toastState={toastState} />
    </ToolMain>
  );

  function handleQuery(color) {
    color = color.slice(1);
    setSearchParams({ color });
  }

  function bookmarkChildren(color){
    return(
    <span
    id="hover-options"
    className={`absolute flex flex-col mt-10 px-9 pb-4 w-full h-min text-white hidden pointer-events-none`
    }>
      <div className=''>
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
        <span className="flex-1 block text-2xl text-left leading-0 pointer-events-auto">
          <CopyButton onCopy={() => color} toastState={toastState} />
        </span>
      </div>
    </span>
    )
  }

  function onMouseEnter(e){
    const hoverOptions = e.target.querySelector('#hover-options');
    if (!hoverOptions) {
      return;
    }
    if (hoverOptions && hoverOptions.id === 'hover-options') {
      hoverOptions.classList.remove('hidden');
      return;
    }
  }

  function onMouseLeave(e){
    const hoverOptions = e.target.querySelector('#hover-options');
    if (!hoverOptions) {
      return;
    }
    if (hoverOptions && hoverOptions.id === 'hover-options') {
      hoverOptions.classList.add('hidden');
      return;
    }
  }
}
