import { useEffect, useRef, useState } from 'react';
import {
  colorWithAlpha,
  createColorObj,
  getColorString,
  HslToRgb,
  isValidColor,
} from './ColorPickerUtils';

export default function ColorPickerInterface({
  className,
  colorData,
  setColorData,
  setInputOnFocus,
}) {
  const codesContainerRef = useRef();
  const [inputValues, setInputValues] = useState({
    hexColor: getColorString(colorData.color, 'hex'),
    rgb: HslToRgb(colorData.color),
    hsl: colorData.color,
    cmyk: RGBtoCMYK(HslToRgb(colorData.color)),
    alpha: colorData.alpha,
  });

  useEffect(() => {
    if (colorData.alpha < 1) {
      setInputValues({
        hexColor: colorWithAlpha(colorData.color, colorData.alpha),
        rgb: HslToRgb(colorData.color),
        hsl: colorData.color,
        cmyk: RGBtoCMYK(HslToRgb(colorData.color)),
        alpha: colorData.alpha,
      });
    } else {
      setInputValues({
        hexColor: getColorString(colorData.color, 'hex'),
        rgb: HslToRgb(colorData.color),
        hsl: { ...colorData.color },
        cmyk: RGBtoCMYK(HslToRgb(colorData.color)),
        alpha: colorData.alpha,
      });
    }
  }, [colorData]);

  useEffect(() => {
    codesContainerRef.current.querySelectorAll('input').forEach(input => {
      if (input.id === 'hex') {
        input.value = inputValues.hexColor;
      } else if (input.id === 'r') {
        input.value = inputValues.rgb.r;
      } else if (input.id === 'g') {
        input.value = inputValues.rgb.g;
      } else if (input.id === 'b') {
        input.value = inputValues.rgb.b;
      } else if (input.id === 'h') {
        input.value = parseInt(inputValues.hsl.h);
      } else if (input.id === 's') {
        input.value = Math.floor(parseFloat(inputValues.hsl.s) * 100);
      } else if (input.id === 'l') {
        input.value = Math.floor(parseFloat(inputValues.hsl.l) * 100);
      } else if (input.id === 'c') {
        input.value = inputValues.cmyk.c;
      } else if (input.id === 'm') {
        input.value = inputValues.cmyk.m;
      } else if (input.id === 'y') {
        input.value = inputValues.cmyk.y;
      } else if (input.id === 'k') {
        input.value = inputValues.cmyk.k;
      } else if (input.id === 'a') {
        input.value = `${parseFloat(inputValues.alpha * 100).toFixed(0)}%`;
      }
    });
  }, [inputValues]);

  return (
    <>
      <div id="color-picker-interface" className={className}>
        <ul
          ref={codesContainerRef}
          id="codes-container"
          className="flex flex-col mt-2 gap-y-7 w-full"
        >
          <li className="flex flex-col">
            <span className="block font-bold">HEX</span>
            <input
              id="hex"
              type="text"
              maxLength={9}
              placeholder={inputValues.hexColor}
              defaultValue={inputValues.hexColor}
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              className="h-10 text-sm font-medium text-center text-gray-700 uppercase border-2 rounded 
              outline-none focus-visible:outline-[#7F40BF]"
            ></input>
          </li>
          <li id="rgb" className="flex flex-col">
            <span className="block font-bold">RGB</span>
            <div className="flex flex-1">
              <div className="relative w-1/4">
                <span className="absolute block font-bold left-5 top-2 w-fit z-20">
                  R
                </span>
                <input
                  id="r"
                  type="text"
                  maxLength={3}
                  placeholder={inputValues.rgb.r}
                  defaultValue={inputValues.rgb.r}
                  onChange={handleOnChange}
                  onBlur={handleOnBlur}
                  className="w-full h-10 text-sm font-medium text-center text-gray-500 border-l-2 border-r-2 rounded-l outline-none border-y-2 focus-visible:outline-[#7F40BF] focus-visible:absolute focus-visible:z-10"
                ></input>
              </div>

              <div className="relative w-1/4">
                <span className="absolute block font-bold left-5 top-2 w-fit z-20">
                  G
                </span>
                <input
                  id="g"
                  type="text"
                  maxLength={3}
                  placeholder={inputValues.rgb.g}
                  defaultValue={inputValues.rgb.g}
                  onChange={handleOnChange}
                  onBlur={handleOnBlur}
                  className="w-full h-10 text-sm font-medium text-center text-gray-500 border-r-2 outline-none border-y-2 focus-visible:outline-[#7F40BF] focus-visible:absolute focus-visible:z-10"
                ></input>
              </div>

              <div className="relative w-1/4">
                <span className="absolute block font-bold left-5 top-2 w-fit z-20">
                  B
                </span>
                <input
                  id="b"
                  type="text"
                  maxLength={3}
                  placeholder={inputValues.rgb.b}
                  defaultValue={inputValues.rgb.b}
                  onChange={handleOnChange}
                  onBlur={handleOnBlur}
                  className="w-full h-10 text-sm font-medium text-center text-gray-500 border-r-2 outline-none border-y-2 focus-visible:outline-[#7F40BF] focus-visible:absolute focus-visible:z-10"
                ></input>
              </div>

              <div className="relative w-1/4">
                <span className="absolute block font-bold left-5 top-2 w-fit z-20">
                  A
                </span>
                <input
                  id="a"
                  type="text"
                  maxLength={4}
                  placeholder={`${inputValues.alpha * 100}%`}
                  onChange={handleOnChange}
                  onBlur={handleOnBlur}
                  defaultValue={`${inputValues.alpha * 100}%`}
                  className="w-full h-10 text-sm font-medium text-center text-gray-500 border-r-2 rounded-r outline-none border-y-2 focus-visible:outline-[#7F40BF] focus-visible:absolute focus-visible:z-10"
                ></input>
              </div>
            </div>
          </li>
          <li id="hsl" className="flex flex-col">
            <span className="block font-bold">HSL</span>
            <div className="flex flex-1">
              <div className="relative w-1/4">
                <span className="absolute block font-bold left-5 top-2 w-fit z-20">
                  H
                </span>
                <input
                  id="h"
                  type="text"
                  maxLength={3}
                  placeholder={parseFloat(inputValues.hsl.h).toFixed(0)}
                  defaultValue={parseInt(inputValues.hsl.h)}
                  onChange={handleOnChange}
                  onBlur={handleOnBlur}
                  className="w-full h-10 text-sm font-medium text-center text-gray-500 border-l-2 border-r-2 rounded-l outline-none border-y-2 focus-visible:outline-[#7F40BF] focus-visible:absolute focus-visible:z-10"
                ></input>
              </div>

              <div className="relative w-1/4">
                <span className="absolute block font-bold left-5 top-2 w-fit z-20">
                  S
                </span>
                <input
                  id="s"
                  type="text"
                  maxLength={3}
                  placeholder={inputValues.hsl.s}
                  defaultValue={inputValues.hsl.s}
                  onChange={handleOnChange}
                  onBlur={handleOnBlur}
                  className="w-full h-10 text-sm font-medium text-center text-gray-500 border-r-2 outline-none border-y-2 focus-visible:outline-[#7F40BF] focus-visible:absolute focus-visible:z-10"
                ></input>
              </div>

              <div className="relative w-1/4">
                <span className="absolute block font-bold left-5 top-2 w-fit z-20">
                  L
                </span>
                <input
                  id="l"
                  type="text"
                  maxLength={3}
                  placeholder={inputValues.hsl.l}
                  defaultValue={inputValues.hsl.l}
                  onChange={handleOnChange}
                  onBlur={handleOnBlur}
                  className="w-full h-10 text-sm font-medium text-center text-gray-500 border-r-2 outline-none border-y-2 focus-visible:outline-[#7F40BF] focus-visible:absolute focus-visible:z-10"
                ></input>
              </div>

              <div className="relative w-1/4">
                <span className="absolute block font-bold left-5 top-2 w-fit z-20">
                  A
                </span>
                <input
                  id="a"
                  type="text"
                  maxLength={4}
                  placeholder={`${inputValues.alpha * 100}%`}
                  onChange={handleOnChange}
                  onBlur={handleOnBlur}
                  defaultValue={`${inputValues.alpha * 100}%`}
                  className="w-full h-10 text-sm font-medium text-center text-gray-500 border-r-2 rounded-r outline-none border-y-2 focus-visible:outline-[#7F40BF] focus-visible:absolute focus-visible:z-10"
                ></input>
              </div>
            </div>
          </li>
          <li id="cmyk" className="flex flex-col">
            <span className="block font-bold">CMYK</span>
            <div className="flex flex-1">
              <div className="relative w-1/4">
                <span className="absolute block font-bold left-5 top-2 w-fit z-20">
                  C
                </span>
                <input
                  id="c"
                  type="text"
                  maxLength={3}
                  placeholder={inputValues.cmyk.c}
                  defaultValue={inputValues.cmyk.y}
                  onChange={handleOnChange}
                  onBlur={handleOnBlur}
                  className="w-full h-10 text-sm font-medium text-center text-gray-500 border-l-2 border-r-2 rounded-l outline-none border-y-2 focus-visible:outline-[#7F40BF] focus-visible:absolute focus-visible:z-10"
                ></input>
              </div>

              <div className="relative w-1/4">
                <span className="absolute block font-bold left-5 top-2 w-fit z-20">
                  M
                </span>
                <input
                  id="m"
                  type="text"
                  maxLength={3}
                  placeholder={inputValues.cmyk.m}
                  defaultValue={inputValues.cmyk.m}
                  onChange={handleOnChange}
                  onBlur={handleOnBlur}
                  className="w-full h-10 text-sm font-medium text-center text-gray-500 border-r-2 outline-none border-y-2 focus-visible:outline-[#7F40BF] focus-visible:absolute focus-visible:z-10"
                ></input>
              </div>

              <div className="relative w-1/4">
                <span className="absolute block font-bold left-5 top-2 w-fit z-20">
                  Y
                </span>
                <input
                  id="y"
                  type="text"
                  maxLength={3}
                  placeholder={inputValues.cmyk.y}
                  defaultValue={inputValues.cmyk.y}
                  onChange={handleOnChange}
                  onBlur={handleOnBlur}
                  className="w-full h-10 text-sm font-medium text-center text-gray-500 border-r-2 outline-none border-y-2 focus-visible:outline-[#7F40BF] focus-visible:absolute focus-visible:z-10" 
                ></input>
              </div>

              <div className="relative w-1/4">
                <span className="absolute block font-bold left-5 top-2 w-fit z-20">
                  K
                </span>
                <input
                  id="k"
                  type="text"
                  maxLength={4}
                  placeholder={inputValues.cmyk.k}
                  defaultValue={inputValues.cmyk.k}
                  onChange={handleOnChange}
                  onBlur={handleOnBlur}
                  className="w-full h-10 text-sm font-medium text-center text-gray-500 border-r-2 rounded-r outline-none border-y-2 focus-visible:outline-[#7F40BF] focus-visible:absolute focus-visible:z-10"
                ></input>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );

  function handleOnChange(e) {
    let value = e.target.value;

    if (e.target.id === 'hex') {
      if (isValidColor(e.target.value)) {
        setInputValues({ ...inputValues, hexColor: e.target.value });
      }
    } else if (
      e.target.id === 'r' ||
      e.target.id === 'g' ||
      e.target.id === 'b'
    ) {
      if (value > 255) {
        value = 255;
      } else if (value < 0) {
        value = 0;
      }
      const newRgb = { ...inputValues.rgb, [e.target.id]: value };

      if (isValidColor(getColorString(newRgb, 'rgb'))) {
        setInputValues({ ...inputValues, rgb: newRgb });
      }
    } else if (
      e.target.id === 'h' ||
      e.target.id === 's' ||
      e.target.id === 'l'
    ) {
      parseInt(e.target.value);

      if (e.target.id === 'h') {
        if (value > 360) {
          value = 360;
        } else if (value < 0) {
          value = 0;
        }
      } else {
        if (value > 100) {
          value = 100;
        } else if (value < 0 || isNaN(value)) {
          value = 0;
        }
        value = parseFloat(value / 100).toFixed(2);
      }

      const newHsl = { ...inputValues.hsl, [e.target.id]: value };

      if (isValidColor(getColorString(newHsl, 'hsl'))) {
        setInputValues({ ...inputValues, hsl: newHsl });
      }
    } else if (
      e.target.id === 'c' ||
      e.target.id === 'm' ||
      e.target.id === 'y' ||
      e.target.id === 'k'
    ) {
      if (value > 100) {
        value = 100;
      } else if (value < 0 || isNaN(value)) {
        value = 0;
      }

      const newCmyk = { ...inputValues.cmyk, [e.target.id]: value };
      const newRgb = { ...inputValues.rgb, ...CMYKtoRgb(newCmyk) };

      if (isValidColor(getColorString(newRgb, 'rgb'))) {
        setInputValues({ ...inputValues, cmyk: newCmyk });
      }
    } else if (e.target.id === 'a') {
      let value = e.target.value;
      if (value > 100) {
        value = 100;
      } else if (value < 0) {
        value = 0;
      } else if(value === '' || isNaN(value)){
        value = 0
      }
    }
    setInputOnFocus(true);
  }

  function handleOnBlur(e) {
    if (e.target.id === 'hex') {
      setColorData(createColorObj(inputValues.hexColor));
    } else if (
      e.target.id === 'r' ||
      e.target.id === 'g' ||
      e.target.id === 'b'
    ) {
      setColorData(createColorObj(inputValues.rgb));
    } else if (
      e.target.id === 'h' ||
      e.target.id === 's' ||
      e.target.id === 'l'
    ) {
      setColorData(createColorObj(inputValues.hsl));
    } else if (
      e.target.id === 'c' ||
      e.target.id === 'm' ||
      e.target.id === 'y' ||
      e.target.id === 'k'
    ) {
      setColorData(CMYKtoRgb(inputValues.cmyk));
    } else if (e.target.id === 'a') {
      let value = parseInt(e.target.value.replace('%',''));

      if (value > 100) {
        value = 100;
      } else if(isNaN(value)){
        value = 0
      }

      setInputValues({
        ...inputValues,
        hexColor: colorWithAlpha(inputValues.hexColor, value / 100),
        alpha: value / 100,
      });

      colorData.alpha = value / 100;

      setColorData({ ...colorData });
    }
  }

  function RGBtoCMYK(rgbColor) {
    const R = rgbColor.r / 255,
      G = rgbColor.g / 255,
      B = rgbColor.b / 255,
      K = 1 - Math.max(R, G, B);

    let C = ((1 - R - K) / (1 - K)) * 100,
      M = ((1 - G - K) / (1 - K)) * 100,
      Y = ((1 - B - K) / (1 - K)) * 100;

    if (isNaN(C)) {
      C = 0;
    }
    if (isNaN(M)) {
      M = 0;
    }
    if (isNaN(Y)) {
      Y = 0;
    }

    return {
      c: parseInt(C.toFixed(0)),
      m: parseInt(M.toFixed(0)),
      y: parseInt(Y.toFixed(0)),
      k: parseInt((K * 100).toFixed(0)),
    };
  }

  function CMYKtoRgb(CMYK) {
    const C = CMYK.c / 100,
      M = CMYK.m / 100,
      Y = CMYK.y / 100,
      K = CMYK.k / 100,
      R = 255 * (1 - C) * (1 - K),
      G = 255 * (1 - M) * (1 - K),
      B = 255 * (1 - Y) * (1 - K);

    const newRgb = createColorObj({
      ...inputValues.rgb,
      r: parseInt(R.toFixed(0)),
      g: parseInt(G.toFixed(0)),
      b: parseInt(B.toFixed(0)),
    });

    return newRgb;
  }
}
