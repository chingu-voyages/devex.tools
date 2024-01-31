import { useState, useEffect, useRef } from "react"

export default function ColorGradientSlider({
    colorsArr,
    setColorsArr,
    updateCSSValues,
    handleSetCurrentKnob,
    handleSetInputValue,
    gradientColors,
    setGradientColors
}){

    const [activeIndex, setActiveIndex] = useState(0)
   
    const trackRef = useRef()
    const sliderContainerRef = useRef()

    useEffect(() => {
        const gradientRule = generateGradientRule(gradientColors);

        createThumbColorRule()
        updateCSSValues('.gradient', 'background', gradientRule);
    }, [gradientColors]);

    return(
    <>
        <div ref={sliderContainerRef}  id="slider-container" className="flex flex-col flex-1 p-8 rounded-md">
            <div 
            className="wrap gradient flex flex-col relative w-full h-5 justify-center">
                {createHandles()}
            </div>
        </div>
    </>
    )
 
    function createHandles(){
        const knobsArr = []

        for(let i=0; i<gradientColors.length; i++){
            
            if(i!==0 || i!==gradientColors.length-1){
                knobsArr.push(
                    <label key={`label-${i}`}
                    className="flex-1 w-full h-max absolute">
                            <input id={`${i}`}
                            data-color={gradientColors[i].colorStr}
                            type="range" min='0' max='100' step='1' 
                            value={`${gradientColors[i].value}`}
                            onChange={handleOnChange}
                            onFocus={handleOnFocus}
                            onTouchStart={handleOnFocus}
                            className={`thumb slider absolute ${activeIndex===i?'isActive z-10':''}`}></input>
                    </label>
                )
                continue
            }

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
                onClick={addHandle}
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
        const currentColor = currentThumb.dataset.color;
        const currentValue = parseInt(currentThumb.value);
   
        updateGradientValues()

        function updateGradientValues(){
            const colorObj = gradientColors.find(({colorStr})=>colorStr===currentColor)
            const colorIndex = gradientColors.indexOf(colorObj)
            
            gradientColors[colorIndex].value = currentValue
            
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
    
        handleSetInputValue('color', currentThumb.dataset.color)
        handleSetActiveIndex(currentThumb.id)
        handleSetCurrentKnob(currentThumb)
    }

    function generateGradientRule(colorsArr) {
        
        const sortedColors = [...colorsArr]
        sortedColors.sort(( {value: color1Value}, {value: color2Value} ) => color1Value - color2Value)

        const newColorObject = sortedColors.map(({r,g,b,colorStr})=>({r,g,b,colorStr}))

        const isColorsArrSimilarToSorted = colorsArr.every(({colorStr}, idx)=>(
            colorStr === newColorObject[idx].colorStr
        ))

        if(!isColorsArrSimilarToSorted){
            console.log(sortedColors.map(({r,g,b,colorStr})=>({r,g,b,colorStr})))

            setColorsArr(sortedColors.map(({r,g,b,colorStr})=>({r,g,b,colorStr})))
        }

        const colors = sortedColors.map(({colorStr,value}) => (`${colorStr} ${value}%`));
        const gradientRule = `linear-gradient(90deg, ${colors.join(', ')})`;

        return gradientRule;
    }
 
    function createThumbColorRule(){
        const wrapElement = sliderContainerRef.current.getElementsByClassName('wrap')[0]

        const inputElements = wrapElement.querySelectorAll('.thumb')

        inputElements.forEach((input,idx) => {
            wrapElement.style.setProperty(`--thumb-color-${idx}`, input.dataset.color)
        })
    }

    function addHandle(evt){
        const thumbArr = [...sliderContainerRef.current.querySelectorAll('.thumb')]

        const thumbArrDescending = [...thumbArr]
        const thumbArrAscending = [...thumbArr]

        thumbArrDescending.sort(({value: value1}, {value: value2})=> value2-value1)
        thumbArrAscending.sort(({value: value1}, {value: value2})=> value1-value2)

        const trackRect = evt.target.getBoundingClientRect()
        const evtX = evt.clientX

        const currentX = parseInt(( (evtX - trackRect.x) / trackRect.width ) * 100)

        const color1 = gradientColors.find(
            ({colorStr})=>colorStr===(thumbArrDescending.find(({value})=>value<currentX)).dataset.color
        )
        const color2 = gradientColors.find(
            ({colorStr})=>colorStr===(thumbArrAscending.find(({value})=>value>currentX)).dataset.color
        )
        
        console.log(color1, color2)

        const newColor = newColorObject(color1, color2);

        const lowestIndex = gradientColors.findIndex(({colorStr})=>colorStr===color2.colorStr);
        const greatestIndex = gradientColors.findIndex(({colorStr})=>colorStr===color1.colorStr);
        
        console.log(lowestIndex, greatestIndex)

        let newGradientArr = null;
        


        if(lowestIndex===0 && gradientColors.length === 2){
            console.log('first', newColor)
            newGradientArr = [
                gradientColors[0], 
                newColor, 
                ...gradientColors.slice(greatestIndex)
            ];
        } else if(lowestIndex > 0){
            console.log('second')
            newGradientArr = [
                ...gradientColors.slice(0, lowestIndex), 
                newColor, 
                ...gradientColors.slice(lowestIndex)
            ];
        }

        console.log(newGradientArr)

        const gradientRule = generateGradientRule(newGradientArr)
        setGradientColors(newGradientArr)   
        updateCSSValues('.gradient', 'background', gradientRule);

        function newColorObject(color1, color2=color1){
            
            const calculatePercentage = ()=>{
                if(currentX >= 50){
                    return (currentX/2)/100
                }
                return currentX/100
            }

            const percentage = calculatePercentage()
            console.log(percentage)

            const newR = Math.floor(color1.r + .5 * (color2.r - color1.r));
            const newG = Math.floor(color1.g + .5 * (color2.g - color1.g));
            const newB = Math.floor(color1.b + .5 * (color2.b - color1.b));

            return {r: newR, g: newG, b: newB, colorStr: `rgba(${newR}, ${newG}, ${newB}, 1)`, value: currentX}
        }

        function findThumb(){
            const thumbArrDescending = [...thumbArr]
            const thumbArrAscending = [...thumbArr]
    

            const thumb1 = thumbArrDescending.find(({value})=>value<currentX)
            const thumb2 = thumbArrAscending.find(({value})=>value>currentX)
        }

    }
}