import { getRandomColor} from "../ColorGradientComponents/ColorGradientUtils"
import tinycolor from "tinycolor2"

export function createColorObj(newColor, newHue){

    let currentColor = tinycolor(getRandomColor().colorStr).toHsl()

    if(newColor!==null){
      currentColor = tinycolor(newColor).toHsl()
    }

    const color = currentColor
    const hue = getHue()

    const colorObj = {
      color: color, 
      hue: hue,
      alpha: tinycolor(color).getAlpha()
    }

    colorObj.color.a = 1

    if(newHue){
      updateHueInColor()
    }

    return colorObj

    function getHue(){
      const hueHsl = {...color}
      hueHsl.s = 1
      hueHsl.l = 0.5
      hueHsl.a = 1
      return hueHsl
    }

    function updateHueInColor(){
      const originalColor = color
      originalColor.h = newHue.h

      colorObj.color = originalColor
      colorObj.hue = newHue
    }

}

export function RgbToHsl(rgb){
  return tinycolor(rgb).toHsl()
}

export function HslToRgb(hsl){
  return tinycolor(hsl).toRgb()
}

export function HexToHsl(hex){
  return tinycolor(hex).toHsl()
}

export function getColorString(color, type){
  if(type === 'hsl'){
    return tinycolor(color).toHslString()
  } else if (type === 'hex'){
    return tinycolor(color).toHexString()
  } else if (type === 'rgb'){
    return tinycolor(color).toRgbString()
  }
  
}

export function isValidColor(color){
  return tinycolor(color).isValid()
}

export function colorWithAlpha(color, alpha){
  return tinycolor(color).setAlpha(alpha).toHex8String()
}

export function createMonochromatic(currentColor){

  const colors = tinycolor(currentColor).monochromatic(11);

  const colorsHsl = colors.map((color)=> color.toHsl());

  colorsHsl.sort((a,b)=> b.l-a.l)

  return colorsHsl.map(color=>tinycolor(color).toHexString())
}

export function createAnalogous(currentColor){

  const colors = tinycolor(currentColor).analogous(3,2);

  return colors.filter((color,idx)=>idx===0?false:true).map(color=>color.toHexString())
}

export function createComplimentary(currentColor){

  const colors = tinycolor(currentColor).splitcomplement();

  return colors[1].toHexString()
}

export function createTriadic(currentColor){

  const colors = tinycolor(currentColor).triad();

  return colors.filter((color,idx)=>idx===0?false:true).map(color=>color.toHexString())
}