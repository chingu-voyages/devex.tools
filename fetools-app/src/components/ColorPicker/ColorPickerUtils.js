import { getRandomColor} from "../ColorGradientComponents/ColorGradientUtils"
import tinycolor from "tinycolor2"

export function createColorObj(newColor){

    let currentColor = getRandomColor().colorStr

    if(newColor!==null){
      currentColor = tinycolor(newColor).toRgbString()
    }

    const color = currentColor
    const hue = getHue()

    return {color: color, hue: hue}

    function getHue(){
      const hsl = new tinycolor(color).toHsl()
      hsl.s = 1
      hsl.l = 0.5
      return tinycolor(hsl).toRgbString()
    }

}