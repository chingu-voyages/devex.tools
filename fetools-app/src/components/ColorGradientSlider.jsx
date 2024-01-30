import { useState, useEffect, useRef } from "react"

export default function ColorGradientSlider({
    colorsArr, 
    handleSetColorsArr,
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

        for(let i=0; i<2; i++){
            
            knobsArr.push(
                <label key={`label-${i}`}
                className="flex-1 w-full h-max absolute">
                        <input id={`${i}`}
                        data-color={colorsArr[i]}
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
            const colorObj = gradientColors.find(({color})=>color===currentColor)
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
        
        const colors = colorsArr.map(({color,value}) => (`${color} ${value}%`));

        colorsArr.sort(({value: color1Value},{value: color2Value})=> color1Value - color2Value)

        console.log(colors)

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

        const trackRect = evt.target.getBoundingClientRect()
        const evtX = evt.clientX

        const currentX = parseInt(( (evtX - trackRect.x) / trackRect.width ) * 100)

        if(currentX<=50){
            const thumbValuesArr = thumbArr.filter(thumb=>thumb.value<=50)
    
        } else{
            const thumbValuesArr = thumbArr.filter(thumb=>thumb.value>50)
        }



    }

    function getNeihboringKnobs(){

    }
}