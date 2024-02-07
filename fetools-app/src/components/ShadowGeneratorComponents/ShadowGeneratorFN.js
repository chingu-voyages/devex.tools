import { getRandomColor } from "../ColorGradientComponents/ColorGradientUtils";
import tinycolor from "tinycolor2";

const generateCssRule = (ShadowsStyles) => {
  let color;
  return ShadowsStyles.map(
    ({
      inset,
      horizontalOffset,
      verticalOffset,
      blur,
      spread,
      shadowColor,
      opacity,
      units,
    }) => {
      color = tinycolor(shadowColor).setAlpha(opacity / 100);
      horizontalOffset = horizontalOffset + units.horizontalOffset;
      verticalOffset = verticalOffset + units.verticalOffset;
      blur = blur + units.blur;
      spread = spread + units.spread;

      return `${
        inset ? "inset" : ""
      } ${horizontalOffset} ${verticalOffset} ${blur} ${spread} ${color.toString()}`;
    }
  );
};

const colorChanger = (
  event,
  setShadowsStyles,
  ShadowsStyles,
  ActiveShadow,
  addSharp = true
) => {
  const regexColorHexadecimal = /^(?:#)?(?:[0-9a-fA-F]{3}){1,2}$/;

  let color = event.target.value;
  let newState = [...ShadowsStyles];

  if (color[0] === "#") {
    newState[ActiveShadow].shadowColor = color;

    regexColorHexadecimal.test(color) ? setShadowsStyles(newState) : "";
  } else {
    addSharp ? (color = "#" + color) : "";
    newState[ActiveShadow].shadowColor = color;
    regexColorHexadecimal.test(color) ? setShadowsStyles(newState) : "";
  }
};

const opacityChanger = (e, setShadowsStyles, ShadowsStyles, ActiveShadow) => {
  let opacityValue = e.target.value;
  let newState = [...ShadowsStyles];
  newState[ActiveShadow].opacity = opacityValue;

  setShadowsStyles(newState);
};

const shadowPropertyValue = (
  e,
  setShadowsStyles,
  ShadowsStyles,
  prop,
  ActiveShadow
) => {
  let newState = [...ShadowsStyles];

  newState[ActiveShadow][prop] =
    prop === "inset" ? e.target.checked : Number(e.target.value);

  setShadowsStyles(newState);
};

const newShadow = (
  setNumOfShadows,
  numOfShadows,
  setShadowsStyles,
  ShadowsStyles,
  setActiveShadow,
  ActiveShadow
) => {
  if (ShadowsStyles.length <= 5) {
    let randomColor = getRandomColor().colorStr;

    let newState = [
      ...ShadowsStyles,
      {
        id: numOfShadows,
        shadowColor: randomColor,
        opacity: 30,
        horizontalOffset: ShadowsStyles[ActiveShadow].horizontalOffset * -1,
        verticalOffset: ShadowsStyles[ActiveShadow].verticalOffset * -1,
        spread: 5,
        blur: 10,
        inset: false,
        units: {
          horizontalOffset: "px",
          verticalOffset: "px",
          spread: "px",
          blur: "px",
        },
      },
    ];

    setShadowsStyles(newState);
    setActiveShadow(numOfShadows);
    setNumOfShadows(numOfShadows + 1);
  }
};

const removeShadow = (
  setShadowsStyles,
  ShadowsStyles,
  ActiveShadow,
  setActiveShadow,
  numOfShadows,
  setNumOfShadows,
  setRemoveShadow
) => {
  if (ShadowsStyles.length > 1) {
    const newState = ShadowsStyles.filter((obj) => obj.id !== ActiveShadow);
    setShadowsStyles(newState);
    setNumOfShadows(numOfShadows - 1);
    setActiveShadow(ActiveShadow === 0 ? 0 : ActiveShadow - 1 );
  

    
  }

  setRemoveShadow(true);
};

const switchShadow = (e, setActiveShadow, idx) => {
  let newState = Number(idx);
  setActiveShadow(newState);
};

const unitChanger = (
  e,
  prop,
  setShadowsStyles,
  ShadowsStyles,
  ActiveShadow,
  ActiveUnit,
  setActiveUnit
) => {
  let newState = [...ShadowsStyles];
  let value = ShadowsStyles[ActiveShadow][prop];

  let UnitConverted = unitConverterShadow(
    value,
    ActiveUnit,
    e.target.value,
    16
  );
  setActiveUnit(e.target.value);
  newState[ActiveShadow][prop] = UnitConverted;
  newState[ActiveShadow].units[prop] = e.target.value;
  setShadowsStyles(newState);
};

const unitConverterShadow = (value, originalUnit, unitToConvert, baseSize) => {
  switch (originalUnit) {
    case "px":
      if (unitToConvert === "em") {
        return value / baseSize;
      } else if (unitToConvert === "rem") {
        return value / baseSize;
      }
      break;
    case "em":
      if (unitToConvert === "px") {
        return value * baseSize;
      } else if (unitToConvert === "rem") {
        return value / baseSize;
      }
      break;
    case "rem":
      if (unitToConvert === "px") {
        return value * baseSize;
      } else if (unitToConvert === "em") {
        return value * baseSize;
      }
      break;
  }
};

const updateId = (ShadowsStyles, setShadowsStyles, setRemoveShadow) => {
  const nuevosEstilos = ShadowsStyles.map((style, index) => {
    const nuevoEstilo = { ...style };

    nuevoEstilo.id = index;
    return nuevoEstilo;
  });

  setShadowsStyles(nuevosEstilos);
  setRemoveShadow(false);
};

export {
  generateCssRule,
  colorChanger,
  opacityChanger,
  shadowPropertyValue,
  newShadow,
  switchShadow,
  removeShadow,
  unitChanger,
  updateId,
};
