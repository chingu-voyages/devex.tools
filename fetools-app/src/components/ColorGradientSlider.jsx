export default function ColorGradientSlider({addKnob}){

    return(
    <>
        <div className="wrap flex flex-col relative overflow-hidden w-96 h-10 justify-center">
            <label className="flex-1 w-full h-min relative">
                <input id='thumb' className="slider" type="range" min='0' max='100' step='0.5' defaultValue='100' onChange={handleOnChange}></input>
            </label>
            <label className="flex-1 w-full absolute">
                <input id='thumb' className="slider absolute" type="range" min='0' max='100' defaultValue='0' onChange={handleOnChange}></input>
            </label>
        </div>
    </>
    )

    function handleOnChange(evt){
        console.log(evt.target.value)
    }


}