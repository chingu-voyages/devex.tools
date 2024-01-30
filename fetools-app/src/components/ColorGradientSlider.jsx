import { useState, useEffect, useRef } from "react"
import tinycolor from "tinycolor2"

export default function ColorGradientSlider({
    colorsArr, 
    handleSetColorsArr,
    updateCSSValues,
    handleSetCurrentKnob,
    handleSetInputValue,
    handleSetCurrentRange,
    currentRange,
    gradientColors,
    setGradientColors
}){

    const [activeIndex, setActiveIndex] = useState(0)
   
    const sliderParentRef = useRef()

    useEffect(() => {
        const gradientRule = generateGradientRule(gradientColors);
        updateCSSValues('.gradient', 'background', gradientRule);
    }, [gradientColors]);

    return(
    <>
        <div id="slider-container" className="flex flex-col flex-1 p-8 rounded-md">
            <div ref={sliderParentRef} 
            className="wrap gradient flex flex-col relative w-full h-5 justify-center">
                {createHandles()}
            </div>
        </div>
    </>
    )
 
    function createHandles(){
        const knobsArr = []

        for(let i=0; i<2; i++){
            
            knobsArr.push(
                <label key={`label-${i}`}
                className="flex-1 w-full h-max absolute">
                        <input id={`${i}`}
                        data-color={colorsArr[i]}
                        data-starting-value={currentRange[i]}
                        type="range" min='0' max='100' step='1' 
                        defaultValue={`${currentRange[i]}`}
                        onChange={handleOnChange}
                        onFocus={handleOnFocus}
                        onTouchStart={handleOnFocus}
                        className={`thumb slider absolute ${activeIndex===i?'isActive z-10':''}`}></input>
                </label>
            )
        }

        return(
            <>{knobsArr}</>
        )

    }

    function handleSetActiveIndex(index){
        setActiveIndex(index)
    }

    function handleOnChange(evt){
        
        const currentThumb = evt.target;
        const currentColor = currentThumb.dataset.color;
        const currentValue = parseInt(currentThumb.value);


        const siblingsArr = [...getNeighboringSiblings(currentThumb)];

//        checkForCrossing([currentThumb, ...siblingsArr])
        updateRange()   
        updateGradientValues()

        function updateGradientValues(){
            const colorObj = gradientColors.find(({color})=>color===currentColor)
            const colorIndex = gradientColors.indexOf(colorObj)
            
            gradientColors[colorIndex].value = parseInt(currentThumb.value)
            
            setGradientColors([...gradientColors])
            generateGradientRule([...gradientColors])
        }

        function updateRange(){

            const MAX_RANGE = Math.max(...siblingsArr.map(knob=>parseInt(knob.value)))
            const MIN_RANGE = Math.min(...siblingsArr.map(knob=>parseInt(knob.value)))

            if(MAX_RANGE===MIN_RANGE){
                if(MAX_RANGE>currentValue){
                    handleSetCurrentRange([MAX_RANGE])
                } else if(MIN_RANGE<currentValue){
                    handleSetCurrentRange([MIN_RANGE])
                }
                return
            } 

            handleSetCurrentRange([MIN_RANGE, currentValue, MAX_RANGE])
        }
    }

    function handleOnFocus(evt){

        const currentThumb = evt.target;
        const thumbElements = document.querySelectorAll('.thumb')

        thumbElements.forEach(thumb=>{
            thumb.classList.remove('isActive', 'z-10')
        })

        currentThumb.classList.add('isActive', 'z-10')
    
        const siblingsArr = getNeighboringSiblings(currentThumb)
        const range = getRange([...siblingsArr])

        console.log(range)
        handleSetInputValue('color', currentThumb.dataset.color)
        handleSetActiveIndex(currentThumb.id)
        handleSetCurrentKnob(currentThumb)
        handleSetCurrentRange(range)
    }

    function generateGradientRule(colorsArr) {
        
        const colors = colorsArr.map(({color,value}) => (`${color} ${value}%`));
        
        const gradientRule = `linear-gradient(90deg, ${colors.join(', ')})`;

        return gradientRule;
    }
 
    function getNeighboringSiblings(currentThumb){
        const siblingsArr = []            
        
        const nextSibling = currentThumb.parentElement.nextElementSibling
        const previousSibling = currentThumb.parentElement.previousElementSibling
        
        if(nextSibling){siblingsArr.push(nextSibling.children[0])}
        
        if(previousSibling){siblingsArr.push(previousSibling.children[0])}

        return siblingsArr
    }

    function getRange(adjacentKnobs){
        const valuesArr = adjacentKnobs.map(knob=>parseInt(knob.value))

        const MAX = Math.max(...valuesArr)
        const MIN = Math.min(...valuesArr)

        if(MAX===MIN){
            return [MAX]
        }

        return [MIN, MAX]
    }

}


/*
        function checkForCrossing(adjacentKnobs){

            const currentStartingValue = parseInt(currentThumb.dataset.startingValue)
            const currentColorObj = gradientColors.find(({color})=>color===currentColor)
            const currentColorIndex = gradientColors.indexOf(currentColorObj)

            const knobPositions = siblingsArr.map(knob=>parseInt(knob.value))

            console.log(knobPositions)

            const MAX_RANGE = Math.max(...currentRange)
            const MIN_RANGE = Math.min(...currentRange)
            
            const MAX_KNOBS = Math.max(...knobPositions)>currentValue?Math.max(...knobPositions):currentValue
            const MIN_KNOBS = Math.max(...knobPositions)<currentValue?Math.min(...knobPositions):currentValue

            console.log(currentValue, MAX_KNOBS, MIN_KNOBS, currentStartingValue)

            if(currentValue > MAX_RANGE && 
                currentValue === MAX_KNOBS)
            {
                
                console.log('max if')
                currentThumb.dataset.startingValue = MAX_KNOBS

                const crossingKnob = adjacentKnobs.find(knob=>(
                    parseInt(knob.value)<currentValue&&knob!==currentThumb
                ))                

                console.log(crossingKnob)
                const crossingColorObj = gradientColors.find(({color})=>color===crossingKnob.dataset.color)
                const crossingColorIndex = gradientColors.indexOf(crossingColorObj)
                
                if(gradientColors[currentThumb.id].color === currentColor){
                    gradientColors[currentColorIndex].color = crossingKnob.dataset.color
                    gradientColors[crossingColorIndex].color = currentColor
    
                    generateGradientRule([...gradientColors])
                    setGradientColors([...gradientColors])
                }

                if(currentValue < parseInt(crossingKnob)){
                    gradientColors[currentColorIndex].color = crossingKnob.dataset.color
                    gradientColors[crossingColorIndex].color = currentColor
    
                    generateGradientRule([...gradientColors])
                    setGradientColors([...gradientColors])
                }
            } else if(currentValue < MIN_RANGE && 
                currentValue === MIN_KNOBS)
            {

                console.log('min if')

                currentThumb.dataset.startingValue = MIN_RANGE

                const crossingKnob = adjacentKnobs.find(knob=>(
                    parseInt(knob.value)>currentValue&&knob!==currentThumb
                ))                

                console.log(crossingKnob)
                const crossingColorObj = gradientColors.find(({color})=>color===crossingKnob.dataset.color)
                const crossingColorIndex = gradientColors.indexOf(crossingColorObj)
                
                if(gradientColors[currentThumb.id].color === currentColor){
                    gradientColors[currentColorIndex].color = crossingKnob.dataset.color
                    gradientColors[crossingColorIndex].color = currentColor
    
                    generateGradientRule([...gradientColors])
                    setGradientColors([...gradientColors])
                }
            }


        }
*/ 