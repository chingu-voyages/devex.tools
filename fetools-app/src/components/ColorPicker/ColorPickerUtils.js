import { getRandomColor} from "../ColorGradientComponents/ColorGradientUtils"
import tinycolor from "tinycolor2"

export function createColorObj(newColor, newHue){

    let currentColor = getRandomColor().colorStr

    if(newColor!==null){
      currentColor = tinycolor(newColor).toRgbString()
    }

    const color = currentColor
    const hue = getHue()

    const colorObj = {color: color, hue: hue}

    if(newHue){
      updateHueInColor()
    }

    return colorObj

    function getHue(){
      const hsl = new tinycolor(color).toHsl()
      hsl.s = 1
      hsl.l = 0.5
      return tinycolor(hsl).toRgbString()
    }

    function updateHueInColor(){
      const originalColor = tinycolor(color).toHsl()
      originalColor.h = newHue.h

      colorObj.color = tinycolor(originalColor).toRgbString()
      colorObj.hue = tinycolor(newHue).toRgbString()
    }

}

export function RgbToHsl(rgb){
  return tinycolor(rgb).toHsl()
}

export function HslToRgb(hsl){
  return tinycolor(hsl).toRgb()
}