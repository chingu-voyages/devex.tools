import tinycolor from "tinycolor2";

export function getRandomColor() {
  const rNum = (Math.random() * 255).toFixed(0);
  const gNum = (Math.random() * 255).toFixed(0);
  const bNum = (Math.random() * 255).toFixed(0);
  const colorObj = {
    r: parseInt(rNum),
    g: parseInt(gNum),
    b: parseInt(bNum),
    colorStr: `rgba(${rNum}, ${gNum}, ${bNum}, 1)`,
  };

  return colorObj;
}

export function getHexString(color) {
  const currentColorHex = tinycolor(color).toHexString();
  return currentColorHex;
}

export function getHslString(color) {
  const currentColorHsl = tinycolor(color).toHslString();
  return currentColorHsl;
}

export function getRgb(color) {
  const currentRgbString = tinycolor(color).toRgbString();
  const currentRgb = tinycolor(color).toRgb();
  return {...currentRgb, colorStr: currentRgbString };
}

export function isValidHexColor(color) {
  return tinycolor(color).isValid();
}