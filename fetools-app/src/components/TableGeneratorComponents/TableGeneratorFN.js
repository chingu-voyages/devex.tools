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
    case "textAlign":
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

const getCellStyle = (idxRow, idxCol, tableConfig) => {
  const isHeaderRow = idxRow === 0;
  const isBottom = idxRow === tableConfig.dimensions.length - 1;
  const isRight = idxCol === tableConfig.dimensions[0].length - 1;
  const isLeft = idxCol === 0;

  return {
    paddingTop: `${tableConfig.verticalCellPading}${tableConfig.units.verticalCellPading}`,
    paddingBottom: `${tableConfig.verticalCellPading}${tableConfig.units.verticalCellPading} `,
    paddingLeft: `${tableConfig.horizontalCellPading}${tableConfig.units.horizontalCellPading}`,
    paddingRight: `${tableConfig.horizontalCellPading}${tableConfig.units.horizontalCellPading}`,
    borderTop: `${tableConfig.borderWidth}${tableConfig.units.borderWidth} ${
      !isHeaderRow ? tableConfig.borderStyle : "none"
    } ${tableConfig.borderColor}`,
    borderBottom: `${tableConfig.borderWidth}${tableConfig.units.borderWidth} ${
      !isBottom ? tableConfig.borderStyle : "none"
    } ${tableConfig.borderColor}`,
    borderLeft: `${tableConfig.borderWidth}${tableConfig.units.borderWidth} ${
      !isLeft ? tableConfig.borderStyle : "none"
    } ${tableConfig.borderColor}`,
    borderRight: `${tableConfig.borderWidth}${tableConfig.units.borderWidth} ${
      !isRight ? tableConfig.borderStyle : "none"
    } ${tableConfig.borderColor}`,
    background: isHeaderRow ? tableConfig.headerBg : tableConfig.bgColor,
    color: isHeaderRow ? tableConfig.headerText : tableConfig.textColor,
    fontWeight: isHeaderRow && "bold",
    width: tableConfig.units.tableWidth === "px"? tableConfig.tableWidth / tableConfig.dimensions[0].length : (tableConfig.tableWidth * 16) / tableConfig.dimensions[0].length   ,
  };
};

const unitChangerTable = (e, propUnit, setTableConfig, tableConfig) => {
  let newState = {
    ...tableConfig,
    units: {
      ...tableConfig.units,
      [propUnit]: e.target.innerText,
    },
  };

  setTableConfig(newState);
};

const generateTableCode = (tableConfig, tailwind = false) => {
  let borderStyle;

  switch (tableConfig.borderStyle) {
    case "solid":
      borderStyle = "border-solid";
      break;
    case "none":
      borderStyle = "border-none";
      break;

    case "dashed":
      borderStyle = "border-dashed";
      break;

    case "dotted":
      borderStyle = "border-dotted";
      break;

    case "dashed double none":
      borderStyle = "border-double";
      break;

    default:
      borderStyle = "border-solid";
      break;
  }

  let html;

  if (tailwind) {
    html = `<div class="overflow-hidden border-[${
      tableConfig.borderWidth
    }px] ${borderStyle} border-[${tableConfig.borderColor}] rounded-[${
      tableConfig.borderRounding
    }px]">\n <table class="w-[${tableConfig.tableWidth}px] bg-[${
      tableConfig.bgColor
    }] ${
      tableConfig.collapse ? "border-collapse" : "border-separate"
    } border-[${tableConfig.borderWidth}px] ${borderStyle} border-[${
      tableConfig.borderColor
    }] text-[${tableConfig.textColor}] text-${tableConfig.textAlign} " >\n `;

    html += `  <thead class="text-[${tableConfig.headerText}] bg-[${tableConfig.headerBg}]" >\n`;
    html += `    <tr class="py-[${tableConfig.verticalCellPading}px] px-[${tableConfig.horizontalCellPading}px] " >\n`;
    for (let i = 0; i < tableConfig.dimensions[0].length; i++) {
      html += `      <th class=" py-[${tableConfig.verticalCellPading}px] w-[${
        tableConfig.tableWidth / tableConfig.dimensions[0].length
      }px] px-[${tableConfig.horizontalCellPading}px]  border-[${
        tableConfig.borderWidth
      }px] ${borderStyle} border-[${tableConfig.borderColor}]" >${
        tableConfig.dimensions[0][i]
      }</th>\n`;
    }
    html += "    </tr>\n";
    html += "  </thead>\n";

    html += "  <tbody>\n";
    for (let i = 1; i < tableConfig.dimensions.length; i++) {
      html += `    <tr>\n`;
      for (let j = 0; j < tableConfig.dimensions[i].length; j++) {
        html += `      <td class=" w-[${
          tableConfig.tableWidth / tableConfig.dimensions[0].length
        }px] border-[${tableConfig.borderWidth}px] ${borderStyle} border-[${
          tableConfig.borderColor
        }] py-[${tableConfig.verticalCellPading}px] px-[${
          tableConfig.horizontalCellPading
        }px]"> ${tableConfig.dimensions[i][j]}</td>\n`;
      }
      html += "    </tr>\n";
    }
    html += "  </tbody>\n";

    html += "</table>\n </div> ";
  }

  // styles for the css
  else {
    html = `
    <!-- CSS: Place in the document's head. -->
  <style>

  .tableContainer{
    overflow: hidden;
    border: ${tableConfig.borderWidth}px ${tableConfig.borderStyle} ${
      tableConfig.borderColor
    };
    border-radius: ${tableConfig.borderRounding}px;
    width: ${tableConfig.tableWidth}px;
  }
  
  table.GeneratedTable {
    background-color: ${tableConfig.bgColor};
    border-collapse: ${tableConfig.collapse ? "collapse" : "separate"};
    border: ${tableConfig.borderWidth}px ${tableConfig.borderStyle} ${
      tableConfig.borderColor
    };
    color: ${tableConfig.textColor};
    padding: ${tableConfig.verticalCellPading}px ${
      tableConfig.horizontalCellPading
    }px;
    text-align: ${tableConfig.textAlign};
  }
  
  table.GeneratedTable td, table.GeneratedTable th {
    border: ${tableConfig.borderWidth}px ${tableConfig.borderStyle} ${
      tableConfig.borderColor
    };
    padding: ${tableConfig.verticalCellPading}px ${
      tableConfig.horizontalCellPading
    }px;
    width: ${tableConfig.tableWidth / tableConfig.dimensions[0].length}px;
    text-align: ${tableConfig.textAlign}; 
  }
  
  table.GeneratedTable thead {
    background-color: ${tableConfig.headerBg};
    color: ${tableConfig.headerText}
  }
  </style>
  
  <!-- HTML: Place in the document's body where your table should appear. --> 
    
  <div class="tableContainer" >\n   <table class="GeneratedTable" >\n`;

    html += "     <thead>\n";
    html += "         <tr>\n";
    for (let i = 0; i < tableConfig.dimensions[0].length; i++) {
      html += `           <th>${tableConfig.dimensions[0][i]}</th>\n`;
    }
    html += "         </tr>\n";
    html += "     </thead>\n";
    html += "     <tbody>\n";
    for (let i = 1; i < tableConfig.dimensions.length; i++) {
      html += "         <tr>\n";
      for (let j = 0; j < tableConfig.dimensions[i].length; j++) {
        html += `           <td>${tableConfig.dimensions[i][j]}</td>\n`;
      }
      html += "        </tr>\n";
    }
    html += "     </tbody>\n";

    html += `   </table>\n </div> `;
  }

  return html;
};

export {
  generateMultidimensionalArray,
  handleOptions,
  hanldeColorOptions,
  handleEditCells,
  getCellStyle,
  generateTableCode,
  unitChangerTable
};
