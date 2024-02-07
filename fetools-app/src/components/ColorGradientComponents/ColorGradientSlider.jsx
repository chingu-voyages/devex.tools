import { useState, useEffect, useRef } from "react"

export default function ColorGradientSlider({
    inputValue,
    setColorsArr,
    updateCSSValues,
    handleSetCurrentKnob,
    handleSetInputValue,
    gradientColors,
    setGradientColors,
    generateGradientRule
}){

    const [activeIndex, setActiveIndex] = useState(0)
   
    const trackRef = useRef()
    const sliderContainerRef = useRef()

    useEffect(() => {
        createThumbColorRule()
        updateHandleValuesOnGradientState()
        updateCSSValues('.gradient', 'background', generateGradientRule(gradientColors));
        updateCSSValues('.gradientSlider', 'background', generateGradientRule(gradientColors, '90', true));
    }, [gradientColors]);

    return(
    <>
        <div ref={sliderContainerRef}  id="slider-container" className="flex flex-col flex-1 p-8 rounded-md">
            <div 
            className="wrap gradientSlider flex flex-col relative w-full h-5 justify-center">
                {createHandles()}
            </div>
        </div>
    </>
    )
 
    function createHandles(){
        const knobsArr = []
        for(let i=0; i<gradientColors.length; i++){
            
            knobsArr.push(
                <label key={`label-${i}`}
                className="flex-1 w-full h-max absolute">
                        <input id={`${i}`}
                        data-color={gradientColors[i].colorStr}
                        type="range" min='0' max='100' step='1' 
                        defaultValue={`${gradientColors[i].value}`}
                        onChange={handleOnChange}
                        onFocus={handleOnFocus}
                        onTouchStart={handleOnFocus}
                        className={`thumb slider absolute ${activeIndex===i?'isActive z-10':''}`}></input>
                </label>
            )
        }

        return(
            <>
                <span id="track-handler"
                ref={trackRef} 
                onClick={addThumb}
                className="block absolute w-full h-full"></span>
            {knobsArr}
            </>
        )

    }

    function handleSetActiveIndex(index){
        setActiveIndex(index)
    }

    function handleOnChange(evt){
        
        const currentThumb = evt.target;
        const currentValue = parseInt(currentThumb.value);
   
        updateGradientValues()
        handleSetInputValue({
            ...inputValue,
            color: currentThumb.dataset.color, 
            position: currentValue,
            type: inputValue.type
        })


        function updateGradientValues(){

            gradientColors[currentThumb.id].value = currentValue

            setGradientColors([...gradientColors])
        }

    }

    function handleOnFocus(evt){

        const currentThumb = evt.target;
        const thumbElements = document.querySelectorAll('.thumb')

        thumbElements.forEach(thumb=>{
            thumb.classList.remove('isActive', 'z-10')
        })

        currentThumb.classList.add('isActive', 'z-10')
    
        handleSetInputValue({
            color: currentThumb.dataset.color,
            position: currentThumb.value,
            rotation: inputValue.rotation,
            type: inputValue.type
        })

        handleSetActiveIndex(currentThumb.id)
        handleSetCurrentKnob(currentThumb)

    }

    function createThumbColorRule(){
        const wrapElement = sliderContainerRef.current.getElementsByClassName('wrap')[0]

        const inputElements = wrapElement.querySelectorAll('.thumb')

        inputElements.forEach((input,idx) => {
            wrapElement.style.setProperty(`--thumb-color-${idx}`, input.dataset.color)
        })
    }

    function addThumb(evt){
        const thumbArr = [...sliderContainerRef.current.querySelectorAll('.thumb')]

        const trackRect = evt.target.getBoundingClientRect()
        const evtX = evt.clientX
        const currentX = parseInt(( (evtX - trackRect.x) / trackRect.width ) * 100)

        const closestThumbs = findThumbs()

        const colors = getColorObjects(closestThumbs)
        const newColor = newColorObject(colors);

        const newGradientArr = checkIndicesForNewKnob(closestThumbs)
        const updatedColors = newGradientArr.map(({r,g,b,colorStr})=>({r,g,b,colorStr}))
        const gradientRule = generateGradientRule(newGradientArr)

        setColorsArr(updatedColors)
        setGradientColors(newGradientArr)
        updateCSSValues('.gradient', 'background', gradientRule);

        function checkIndicesForNewKnob(closestThumbs){

            let newGradientArr = null;

            if(closestThumbs.length===1){
                const nextIndex = gradientColors.findIndex(({colorStr})=>colorStr===closestThumbs[0].dataset.color);

                if(nextIndex===0){
                    newGradientArr = [
                        ...gradientColors.slice(nextIndex),
                        newColor
                    ];
                } else{
                    newGradientArr = [
                        ...gradientColors.slice(0),
                        newColor
                    ];
                }   
                
                return newGradientArr;
            }else{
   
                newGradientArr = [
                    ...gradientColors,
                    newColor
                ]

                return newGradientArr
            }
        }

        function getColorObjects(closestThumbs){

            if(closestThumbs.length===1){
                const colors = gradientColors.filter(({colorStr})=>(
                    colorStr===closestThumbs[0].dataset.color
                ))

                delete colors[0].value

                return colors
            } else{
                const color1 = gradientColors[closestThumbs[0].id]
                const color2 = gradientColors[closestThumbs[1].id]

                delete color1.value
                delete color2.value

                return [color1, color2]
            }
        }

        function newColorObject(colors){
            
            if(colors.length===1){
                return ({...colors[0], value: currentX})
            } else{
                const newR = Math.floor(colors[0].r + (colors[1].r - colors[0].r) * .5);
                const newG = Math.floor(colors[0].g + (colors[1].g - colors[0].g) * .5);
                const newB = Math.floor(colors[0].b + (colors[1].b - colors[0].b) * .5);
                return {r: newR, g: newG, b: newB, colorStr: `rgba(${newR}, ${newG}, ${newB}, 1)`, value: currentX}
            }
        }

        function findThumbs(){
            const thumbArrDescending = [...thumbArr]
            const thumbArrAscending = [...thumbArr]
    
            thumbArrAscending.sort(({value: a}, {value: b})=> a-b)
            thumbArrDescending.sort(({value: a}, {value: b})=> b-a)

            const nextGreatestThumb = thumbArrAscending.find(({value})=>value>currentX)
            const nextLowestThumb = thumbArrDescending.find(({value})=>value<currentX)

            if(nextLowestThumb===undefined){
                return [nextGreatestThumb]
            } else if(nextGreatestThumb===undefined){
                return [nextLowestThumb]
            } else{
                return [nextLowestThumb, nextGreatestThumb]
            }
        }

    }

    function updateHandleValuesOnGradientState(){
        const thumbs = sliderContainerRef.current.querySelectorAll('.thumb')

        thumbs.forEach((thumb,idx)=>{
            gradientColors[idx].value = thumb.value
        })
    }

}