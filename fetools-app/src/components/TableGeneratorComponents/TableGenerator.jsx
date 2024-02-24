import { handleEditCells, getCellStyle } from "./TableGeneratorFN";
export const TableGenerator = ({ tableConfig, setTableConfig }) => {
 
  
 
  return (
    <div>
      <div
        className={`overflow-hidden `}
        style={{
          borderRadius:`${tableConfig.borderRounding}px`,
          width: `${tableConfig.tableWidth}px`,
          border: `${tableConfig.borderWidth}px ${tableConfig.borderStyle} ${tableConfig.borderColor}`,
          
        }}
      >
        <table className={`${tableConfig.collapse ?"border-collapse" : "border-separate"}`} >
          <thead>
            <tr>
              {tableConfig.dimensions[0].map((col, idxCols) => (
                <th
                  key={idxCols}
                  style={getCellStyle(0, idxCols, tableConfig)} 
                  className="min-h-8 border-black"
                >
                  <input
                      id={`${0}-${idxCols}`}
                      onChange={(e) =>
                        handleEditCells(
                          e.target.id,
                          tableConfig,
                          setTableConfig,
                          e.target.value
                        )
                      }
                      className="w-full outline-none"
                      type="text"
                      value={col}
                      style={{background: tableConfig.headerBg, textAlign:tableConfig.textAlign }}
                  
                    />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableConfig.dimensions.slice(1).map((row, idxRow) => (
              <tr key={idxRow + 1}>
                {row.map((col, idxCols) => (
                  <td
                    style={getCellStyle(idxRow + 1, idxCols, tableConfig)}
                    className="min-h-8 border-black"
                    key={idxCols}
                  >
                    <input
                      id={`${idxRow + 1}-${idxCols}`}
                      onChange={(e) =>
                        handleEditCells(
                          e.target.id,
                          tableConfig,
                          setTableConfig,
                          e.target.value
                        )
                      }
                      className="w-full outline-none"
                      type="text"
                      value={col}
                      style={{
                        background: tableConfig.bgColor,
                        textAlign: tableConfig.textAlign,
                      }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
