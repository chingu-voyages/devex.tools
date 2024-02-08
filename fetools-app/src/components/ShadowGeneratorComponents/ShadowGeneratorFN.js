import { getRandomColor } from "../ColorGradientComponents/ColorGradientUtils";

const colorChanger = (event, setShadowsStyles, ShadowsStyles, ActiveShadow, addSharp = true) => {
  const regexColorHexadecimal = /^(?:#)?(?:[0-9a-fA-F]{3}){1,2}$/;
  // console.log("hola desde el input de color xd", event.target.value);
  let color = event.target.value;
  
  let newState = [...ShadowsStyles];

  if (toString(color)[0] === "#") {
    newState[ActiveShadow].shadowColor = color;
    console.log("entro en el if")
    regexColorHexadecimal.test(color) ? setShadowsStyles(newState) : "";
  } else {
    addSharp ? color = "#" + color : ""
    newState[ActiveShadow].shadowColor = color;
    console.log("entro en el else", color)
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
        id: numOfShadows + 1,
        shadowColor: randomColor,
        opacity: 30,
        horizontalOffset: ShadowsStyles[ActiveShadow].horizontalOffset * -1,
        verticalOffset: ShadowsStyles[ActiveShadow].verticalOffset * -1,
        spread: 5,
        blur: 10,
        inset: false,
      },
    ];

    setShadowsStyles(newState);
    setActiveShadow(numOfShadows);
    setNumOfShadows(numOfShadows + 1);
  }
};

const switchShadow = (e, setActiveShadow, idx) => {
  let newState = Number(idx);
  setActiveShadow(newState);
};

export {
  colorChanger,
  opacityChanger,
  shadowPropertyValue,
  newShadow,
  switchShadow,
};
