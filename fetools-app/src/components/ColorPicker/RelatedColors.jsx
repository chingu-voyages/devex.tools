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

export default function RelatedColors({ colorData, setColorData, timerRef, setToastContent, setOpenToast }) {
  useEffect(() => {}, [colorData]);

  const parentContainer = useRef(null)

  return (
    <div ref={parentContainer}>
      <h2 className="pb-1 text-base">Tints & Shades (Monochromatic)</h2>
      <div
        id="monochromatic-colors"
        className="grid grid-cols-11 grid-rows-1 gap-x-[10px] pb-10"
      >
        {monochromaticPreview()}
      </div>

      <div
        id="other-colors"
        className="flex flex-wrap justify-center flex-1 gap-6 md:justify-between gap-y-12"
      >
        <div>
          <h2 className="pb-1 text-base">Analogic</h2>
          <div
            id="analogous-colors"
            className="grid w-64 h-64 grid-cols-2 grid-rows-2 max-w-64 gap-x-3 gap-y-3"
          >
            {analogicPreview()}
          </div>
        </div>
        <div>
          <h2 className="pb-1 text-base">Complimentary</h2>
          <div
            id="analogous-colors"
            className="grid w-64 h-64 grid-cols-2 grid-rows-2 gap-x-3 gap-y-3"
          >
            {complimentaryPreview()}
          </div>
        </div>
        <div>
          <h2 className="pb-1 text-base">Triadic</h2>
          <div
            id="analogous-colors"
            className="grid w-64 h-64 grid-cols-2 grid-rows-2 gap-x-3 gap-y-3"
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
          onMouseEnter={(e)=>{
            if(!e.target.children[0]){return}
            e.target.children[0].classList.remove('hidden')
          }}
          onMouseLeave={(e)=>{
            if(!e.target.children[0]){return}
            e.target.children[0].classList.add('hidden')
          }}
          className={`
            relative h-24 
            ${idx === 0 ? 'lg:rounded-bl-lg' : ''}
            ${idx === 10 ? 'lg:rounded-r-lg' : ''}
            `}
        >
          <span className="absolute text-white right-2 top-1 hidden">
            <CopyButton 
            onCopy={()=>color} 
            timerRef={timerRef} 
            setOpenToast={setOpenToast}
            setToastContent={setToastContent}/>
          </span>


        </div>
      );
    });

    return <>{previews}</>;
  }

  function analogicPreview() {
    const colors = createAnalogous(colorData.color);

    const previews = colors.map((color, idx) => {
      return (
        <div
        key={`analogic-${idx}`}
        onMouseEnter={(e)=>{
          const hoverOptions = e.target.querySelector('#hover-options')
          if(!hoverOptions){
            return
          }
          if(hoverOptions && hoverOptions.id === 'hover-options'){
            hoverOptions.classList.remove('hidden')
            return
          }
        }}
        onMouseLeave={(e)=>{
          const hoverOptions = e.target.querySelector('#hover-options') || e.target
          if(!hoverOptions){
            return
          }
          if(hoverOptions && hoverOptions.id === 'hover-options'){
            hoverOptions.classList.add('hidden')
            return
          }
        }}
        style={{ backgroundColor: color }}
        data-color={color}
        className={`relative ${idx === 0 ? 'rounded-tr-lg' : 'rounded-br-lg'}`}>
          <span id='hover-options' className="absolute w-full h-full px-7 py-8 flex flex-col text-white right-0 hidden">
            <div>
              <p className='font-medium'>{color}</p>
            </div>
            <div className='flex'>
              <span className='block flex-1 text-2xl text-center'>
                <EyeDropButton
                setColorData={setColorData}
                newColor={color}
                timerRef={timerRef} 
                setOpenToast={setOpenToast}
                setToastContent={setToastContent}/>
              </span>
              <span className='block flex-1 text-left text-2xl leading-0'>              
                <CopyButton 
                onCopy={()=>color} 
                timerRef={timerRef} 
                setOpenToast={setOpenToast}
                setToastContent={setToastContent}/>
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
          onMouseEnter={(e)=>{
            const hoverOptions = e.target.querySelector('#hover-options')
            if(!hoverOptions){
              return
            }
            if(hoverOptions && hoverOptions.id === 'hover-options'){
              hoverOptions.classList.remove('hidden')
              return
            }
          }}
          onMouseLeave={(e)=>{
            const hoverOptions = e.target.querySelector('#hover-options') || e.target
            if(!hoverOptions){
              return
            }
            if(hoverOptions && hoverOptions.id === 'hover-options'){
              hoverOptions.classList.add('hidden')
              return
            }
          }}
          onBlur={(e)=>{
            const hoverOptions = e.target.querySelector('#hover-options') || e.target
            if(!hoverOptions){
              return
            }
            if(hoverOptions && hoverOptions.id === 'hover-options'){
              hoverOptions.classList.add('hidden')
              return
            }
          }}
          className="relative row-span-2 rounded-r-lg"
        >
          <span id='hover-options' className="absolute w-full h-full px-7 py-24 flex flex-col text-white right-0 hidden">
            <div>
              <p className='font-medium'>{complimentaryColor}</p>
            </div>
            <div className='flex'>
              <span className='block flex-1 text-2xl text-center'>
                <EyeDropButton
                setColorData={setColorData}
                newColor={complimentaryColor}
                timerRef={timerRef} 
                setOpenToast={setOpenToast}
                setToastContent={setToastContent}/>
              </span>
              <span className='block flex-1 text-left text-2xl leading-0'>              
                <CopyButton 
                onCopy={()=>complimentaryColor} 
                timerRef={timerRef} 
                setOpenToast={setOpenToast}
                setToastContent={setToastContent}/>
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
          onMouseEnter={(e)=>{
            const hoverOptions = e.target.querySelector('#hover-options')
            if(!hoverOptions){
              return
            }
            if(hoverOptions && hoverOptions.id === 'hover-options'){
              hoverOptions.classList.remove('hidden')
              return
            }
          }}
          onMouseLeave={(e)=>{
            const hoverOptions = e.target.querySelector('#hover-options') || e.target
            if(!hoverOptions){
              return
            }
            if(hoverOptions && hoverOptions.id === 'hover-options'){
              hoverOptions.classList.add('hidden')
              return
            }
          }}
          className={`relative ${idx === 0 ? 'rounded-tr-lg' : 'rounded-br-lg'}`}
        >
          <span id='hover-options' className="absolute w-full h-full px-7 py-8 flex flex-col text-white right-0 hidden">
            <div>
              <p className='font-medium'>{color}</p>
            </div>
            <div className='flex'>
              <span className='block flex-1 text-2xl text-center'>
                <EyeDropButton
                setColorData={setColorData}
                newColor={color}
                timerRef={timerRef} 
                setOpenToast={setOpenToast}
                setToastContent={setToastContent}/>
              </span>
              <span className='block flex-1 text-left text-2xl leading-0'>              
                <CopyButton 
                onCopy={()=>color} 
                timerRef={timerRef} 
                setOpenToast={setOpenToast}
                setToastContent={setToastContent}/>
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
