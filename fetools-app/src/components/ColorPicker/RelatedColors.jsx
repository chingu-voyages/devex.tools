import { useEffect, useRef } from 'react';
import {
  createAnalogous,
  createComplimentary,
  createMonochromatic,
  createTriadic,
  getColorString,
} from './ColorPickerUtils';
import CopyButton from '../CopyButton';
import EyeDropButton from './EyeDropButton';
import HoverOptions from '../ToolsLayout/HoverOptions';

export default function RelatedColors({ 
  colorData, 
  setColorData, 
  createColorObj,
  toastState 
}) {
  useEffect(() => {}, [colorData]);

  const parentContainer = useRef(null);

  return (
    <div ref={parentContainer}>
      <h2 className="pb-1 text-base">Tints & Shades (Monochromatic)</h2>
      <div
      id="monochromatic-colors"
      className="
      flex h-max pb-10
      max-lg:flex-wrap
      max-lg:gap-y-[10px]
      lg:gap-x-2">
        {monochromaticPreview()}
      </div>

      <div
        id="other-colors"
        className="flex flex-wrap justify-center flex-1 gap-x-6 md:justify-between gap-y-12 max-sm:flex-col"
      >
        <div>
          <h2 className="pb-1 text-base">Analogic</h2>
          <div
            id="analogous-colors"
            className="grid w-64 h-64 grid-cols-2 grid-rows-2 gap-x-3 gap-y-3
            sm:max-w-64 
            max-sm:w-full">
            {analogicPreview()}
          </div>
        </div>
        <div>
          <h2 className="pb-1 text-base">Complimentary</h2>
          <div
            id="analogous-colors"
            className="grid w-64 h-64 grid-cols-2 grid-rows-2 gap-x-3 gap-y-3 max-sm:w-full"
          >
            {complimentaryPreview()}
          </div>
        </div>
        <div>
          <h2 className="pb-1 text-base">Triadic</h2>
          <div
            id="analogous-colors"
            className="grid w-64 h-64 grid-cols-2 grid-rows-2 gap-x-3 gap-y-3 max-sm:w-full"
          >
            {traidicPreview()}
          </div>
        </div>
      </div>
    </div>
  );

  function monochromaticPreview() {
    const colors = createMonochromatic(colorData.color);

    const previews = colors.map((color, idx) => {     
      return (
        <div
          id={`mono-${idx}`}
          key={`mono-${idx}`}
          style={{ backgroundColor: color }}
          data-color={color}
          className={`
            relative h-24 flex-1 min-w-16 max-w-50 md:w-20 
            ${idx === 0 ? 'lg:rounded-bl-lg' : ''}
            ${idx === 5 ? 'sm:max-lg:rounded-tr-lg' : ''}
            ${idx === 2 ? 'max-sm:rounded-tr-lg' : ''}
            ${idx === 6 ? 'sm:max-lg:rounded-bl-lg' : ''}
            ${idx === 9 ? 'max-sm:rounded-bl-lg' : ''}
            ${idx === 10 ? 'max-sm:rounded-br-lg sm:max-lg:rounded-br-lg lg:rounded-r-lg' : ''}
            `}
        >
          <HoverOptions
            className={`
            absolute right-0 flex flex-col w-full h-full py-4 text-white  lg:px-1
            ${idx === 0 ? 'lg:rounded-bl-lg ' : ''}
            ${idx === 2 ? 'max-sm:rounded-tr-lg' : ''}
            ${idx === 5 ? 'sm:max-lg:rounded-tr-lg' : ''}
            ${idx === 6 ? 'sm:max-lg:rounded-bl-lg' : ''}
            ${idx === 9 ? 'max-sm:rounded-bl-lg' : ''}
            ${idx === 10 ? 'max-sm:rounded-br-lg sm:max-lg:rounded-br-lg lg:rounded-r-lg' : ''}
            `}
            heading={color}
            headingClassName={'font-medium uppercase m-auto text-center'}
            buttonsContainerClassName={'max-xl:mx-6'}
            buttons={[
              <EyeDropButton
              key={`button-${idx}`}
              title={'New Color Set'}
              content={''}
              setStateVar={()=>setColorData(createColorObj(color))}
              newValue={color}
              toastState={toastState}
              />,
              <CopyButton 
              key={`button-${idx}`} 
              onCopy={() => color} 
              toastState={toastState} />
            ]}
          />
        </div>
      );
    });

    function SubGrid({children, position}){
      
      switch (position) {
        case 0:
          return(
          <div className='
          flex 
          max-sm:basis-full max-sm:gap-x-[10px]
          sm:gap-x-[10px] sm:basis-1/2 sm:max-lg:pr-[5px]
          lg:gap-x-2 lg:flex-1'>
            {children}
          </div>
          )
        case 1:
          return(
          <div className='
          flex 
          max-sm:basis-full max-sm:gap-x-[10px]
          sm:gap-x-[10px] sm:basis-1/2 sm:max-lg:pl-[5px]
          lg:gap-x-2 lg:flex-1'>
            {children}
          </div>
          )
        case 2:
          return(
          <div className='
          flex 
          max-sm:basis-full max-sm:gap-x-[10px]
          sm:gap-x-[10px] sm:basis-7/12 sm:max-lg:pr-[5px]
          lg:gap-x-2 lg:flex-1 '>
            {children}
          </div>
          )
        case 3:
          return(
          <div className='
          flex 
          max-sm:basis-full max-sm:gap-x-[10px]
          sm:gap-x-[10px] sm:basis-5/12 sm:max-lg:pl-[5px]
          lg:gap-x-2 lg:flex-2'>
            {children}
          </div>
          )
        default:
          break;
      }
    }

    return (
    <>
    <SubGrid position={0}>
      {previews[0]}
      {previews[1]}
      {previews[2]}
    </SubGrid>
    <SubGrid position={1}>
      {previews[3]}
      {previews[4]}
      {previews[5]}
    </SubGrid>
    <SubGrid position={2}>
      {previews[6]}
      {previews[7]}
      {previews[8]}
    </SubGrid>
    <SubGrid position={3}>
      {previews[9]}
      {previews[10]}
    </SubGrid>
    </>);
  }

  function analogicPreview() {
    const colors = createAnalogous(colorData.color);

    const previews = colors.map((color, idx) => {
      return (
        <div
          key={`analogic-${idx}`}
          style={{ backgroundColor: color }}
          data-color={color}
          className={`relative ${
            idx === 0 ? 'rounded-tr-lg' : 'rounded-br-lg'
          }`}
        >
          <HoverOptions
            className={`
            absolute right-0 flex flex-col w-full h-full py-8 text-white px-7
            ${
              idx === 0 ? 'rounded-tr-lg' : 'rounded-br-lg'
            }
            `}
            heading={color}
            headingClassName={'font-medium uppercase max-sm:text-center'}
            buttons={[
              <EyeDropButton
              key={`button-${idx}`}
              title={'New Color Set'}
              content={''}
              setStateVar={()=>setColorData(createColorObj(color))}
              newValue={color}
              toastState={toastState}
              />,
              <CopyButton 
              key={`button-${idx}`} 
              onCopy={() => color} 
              toastState={toastState} />
            ]}
            buttonsClassName={'text-center'}
          />
        </div>
      );
    });

    return (
      <>
        <div
          style={{ backgroundColor: getColorString(colorData.color, 'hex') }}
          className="row-span-2 rounded-bl-lg max-sm:w-full"
        ></div>
        {previews}
      </>
    );
  }

  function complimentaryPreview() {
    const complimentaryColor = createComplimentary(colorData.color);

    return (
      <>
        <div
          style={{ backgroundColor: getColorString(colorData.color, 'hex') }}
          className="row-span-2 rounded-bl-lg"
        ></div>
        <div
          style={{ backgroundColor: complimentaryColor }}
          data-color={complimentaryColor}
          className="relative row-span-2 rounded-r-lg"
        >
          <HoverOptions
            className={`
            absolute right-0 flex flex-col w-full h-full text-white lg:px-1`}
            heading={complimentaryColor}
            headingClassName={'font-medium uppercase m-auto text-center'}
            buttonsContainerClassName={'max-xl:mx-6'}
            buttons={[
              <EyeDropButton
              key={`button-complimentaryColor`}
              title={'New Color Set'}
              content={''}
              setStateVar={()=>setColorData(createColorObj(complimentaryColor))}
              newValue={complimentaryColor}
              toastState={toastState}
              />,
              <CopyButton 
              key={`button-complimentaryColor`} 
              onCopy={() => complimentaryColor} 
              toastState={toastState} />
            ]}
          />
          <span
          id="hover-options"
          className={`
          absolute right-0 flex flex-col w-full h-full py-24 text-white px-7 rounded-r-lg
          `}>
            <div>
              <p className="font-medium uppercase max-sm:text-center">{complimentaryColor}</p>
            </div>
            <div className="flex">
              <span className="flex-1 block text-2xl text-center max-sm:text-center">
              <EyeDropButton
              title={'New Color Set'}
              content={''}
              setStateVar={()=>setColorData(createColorObj(complimentaryColor))}
              newValue={complimentaryColor}
              toastState={toastState}
              />
              </span>
              <span className="flex-1 block text-2xl text-left leading-0 max-sm:text-center">
                <CopyButton onCopy={() => complimentaryColor} toastState={toastState} />
              </span>
            </div>
          </span>
        </div>
      </>
    );
  }

  function traidicPreview() {
    const colors = createTriadic(colorData.color);

    const previews = colors.map((color, idx) => {
      return (
        <div
          key={`analogic-${idx}`}
          style={{ backgroundColor: color }}
          data-color={color}
          className={`relative ${
            idx === 0 ? 'rounded-tr-lg' : 'rounded-br-lg'
          }`}
        >
          <span
          id="hover-options"
          className={`
          absolute right-0 flex flex-col w-full h-full py-8 text-white px-7
          ${
            idx === 0 ? 'rounded-tr-lg' : 'rounded-br-lg'
          }
          `}>
            <div>
              <p className="font-medium uppercase max-sm:text-center">{color}</p>
            </div>
            <div className="flex">
              <span className="flex-1 block text-2xl text-center max-sm:text-center">
              <EyeDropButton
              title={'New Color Set'}
              content={''}
              setStateVar={()=>setColorData(createColorObj(color))}
              newValue={color}
              toastState={toastState}
              />
              </span>
              <span className="flex-1 block text-2xl text-left leading-0 max-sm:text-center">
                <CopyButton onCopy={() => color} toastState={toastState} />
              </span>
            </div>
          </span>
        </div>
      );
    });

    return (
      <>
        <div
          style={{ backgroundColor: getColorString(colorData.color, 'hex') }}
          className="row-span-2 rounded-bl-lg"
        ></div>
        {previews}
      </>
    );
  }
}
