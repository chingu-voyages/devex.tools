import React from "react"
import {HexColorPicker, HexColorInput} from "react-colorful"
import tinycolor from "tinycolor2"

function ColorPicker() {

    const [color, setColor] = React.useState("#aabbcc")

    return (
      <main className="m-10">
        <p className="font-mono text-6xl">Color Picker Page</p>
        <div className="saturation mt-4 flex flex-row w-full justify-center">
          <div className="w-52 h-52" style={{backgroundColor: color}}></div>
          <HexColorPicker color={color} onChange={setColor}/>
        </div>
        <div className="inputs flex flex-row justify-evenly">
          <div className="hex-input flex flex-col w-40 text-center">
            <label htmlFor="hex">HEX</label>
            <HexColorInput 
              id="hex" 
              prefixed={true} 
              color={color} 
              onChange={setColor}
              className="text-center"
            />
          </div>
          <div className="rgb-input border-black flex flex-row">
            <div className="r-input border-2 border-black align-middle border-r-0">
              <label htmlFor="r">R</label>
              <input id="r" className="border-none"></input>
            </div>
            <div className="g-input border-2 border-black align-middle">
              <label htmlFor="g">G</label>
              <input id="g" className="border-none"></input>
            </div>
            <div className="b-input border-2 border-black align-middle">
              <label htmlFor="b">B</label>
              <input id="b" className="border-none"></input>
            </div>
          </div>
        </div>
      </main>
    )
}
  
export default ColorPicker