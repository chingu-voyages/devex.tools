import tinycolor from "tinycolor2";

const generateMultidimensionalArray = (rows, columns) => {
  const multidimensionalArray = [];
  for (let i = 1; i <= rows; i++) {
    const row = [];
    for (let j = 1; j <= columns; j++) {
      row.push(i === 1 ? `header ${j}` : "Cell");
    }
    multidimensionalArray.push(row);
  }

  return multidimensionalArray;
};

const handleOptions = (
  value,
  prop,
  tableConfig,
  setTableConfig,
  baseSize = 16,
  uniToConver = "px",
  textAlign = ""
) => {
  let valueToChange;

  switch (prop) {
    case "borderStyle":
      value;
      break;
    case "collapse":
      value = Boolean(value);
      break;
    default:
      value = Number(value);
      break;
  }

  uniToConver !== "px"
    ? (value = convertToPx(value, uniToConver, baseSize))
    : "";

  if (prop === "Rows") {
    valueToChange = generateMultidimensionalArray(
      value,
      tableConfig.dimensions[0].length
    );

    setTableConfig({ ...tableConfig, dimensions: valueToChange });
  } else if (prop === "Cols") {
    valueToChange = generateMultidimensionalArray(
      tableConfig.dimensions.length,
      value
    );
    setTableConfig({ ...tableConfig, dimensions: valueToChange });
  } else {
    setTableConfig({
      ...tableConfig,
      [prop]: textAlign !== "" ? textAlign : value,
    });
  }
};

const hanldeColorOptions = (value, tableConfig, setTableConfig, prop) => {
  const regexColorHexadecimal = /^(?:#)?(?:[0-9a-fA-F]{3}){1,2}$/;
  let color = tinycolor(value).toHexString();

  if (color[0] === "#") {
    regexColorHexadecimal.test(color) &&
      setTableConfig({ ...tableConfig, [prop]: color });
  } else {
    color = "#" + color;
    regexColorHexadecimal.test(color) &&
      setTableConfig({ ...tableConfig, [prop]: color });
  }
};

const handleEditCells = (id, tableConfig, setTableConfig, value) => {
  let cellIds = id.split("-");
  let newArray = [...tableConfig.dimensions];
  newArray[cellIds[0]][cellIds[1]] = value;

  setTableConfig({ ...tableConfig, dimensions: newArray });
};

const convertToPx = (value, unit, baseSize = 16) => {
  switch (unit) {
    case "em":
      return value * baseSize; 
    case "rem":
      return value * baseSize; 
    case "%":
      return (value / 100) * baseSize; 
  }
};


const getCellStyle = (idxRow,tableConfig) => {
  const isHeaderRow = idxRow === 0;

  return {
    paddingTop: `${tableConfig.verticalCellPading}px`,
    paddingBottom: `${tableConfig.verticalCellPading}px`, 
    paddingLeft: `${tableConfig.horizontalCellPading}px`,
    paddingRight: `${tableConfig.horizontalCellPading}px`,
    borderWidth: tableConfig.borderWidth,
    borderStyle: tableConfig.borderStyle,
    borderColor: tableConfig.borderColor,
    background: isHeaderRow ? tableConfig.headerBg : tableConfig.bgColor,
    color: isHeaderRow ? tableConfig.headerText : tableConfig.textColor,
    fontWeight: isHeaderRow && 'bold',
  };
};


const generateTableCode = (dimensions) => {
  let html = '<table>\n';

  for (let i = 0; i < dimensions.length; i++) {
    html += '  <tr>\n';
    for (let j = 0; j < dimensions[i].length; j++) {
      html += `    <td>${dimensions[i][j]}</td>\n`;
    }
    html += '  </tr>\n';
  }

  html += '</table>';

  return html;
}

export {
  generateMultidimensionalArray,
  handleOptions,
  hanldeColorOptions,
  handleEditCells,
  getCellStyle,
  generateTableCode
};
