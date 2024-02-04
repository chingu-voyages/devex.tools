import { getRandomColor } from "../ColorGradientComponents/ColorGradientUtils"
import tinycolor from "tinycolor2"

export function createColorObj(newColor){
    const color = newColor || getRandomColor().colorStr
    const hue = getHue()

    return {color: color, hue: hue}

    function getHue(){
      const hsl = new tinycolor(color).toHsl()
      hsl.s = 1
      hsl.l = 0.5
      return tinycolor(hsl).toRgbString()
    }

}