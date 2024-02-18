import { handleEditCells, getCellStyle } from './TableGeneratorFN';

export const TableGenerator = ({ tableConfig, setTableConfig }) => {
  return (
    <div>
      <div
        className={`overflow-hidden`}
        style={{
          borderRadius: `${tableConfig.borderRounding}px`,
          width: `${tableConfig.tableWidth}px`,
          border: `${tableConfig.borderWidth}px ${tableConfig.borderStyle} ${tableConfig.borderColor}`,
        }}
      >
        <table>
          {tableConfig.dimensions.map((row, idxRow) => (
            <tr key={idxRow}>
              {row.map((col, idxCols) => {
                const isHeaderRow = idxRow === 0;

                return (
                  <td
                    style={getCellStyle(idxRow, tableConfig)}
                    className="min-h-8 border-black"
                    key={idxCols}
                  >
                    <input
                      id={`${idxRow}-${idxCols}`}
                      onChange={e =>
                        handleEditCells(
                          e.target.id,
                          tableConfig,
                          setTableConfig,
                          e.target.value
                        )
                      }
                      className="w-full outline-none"
                      type="text"
                      value={tableConfig.dimensions[idxRow][idxCols]}
                      style={{
                        background: isHeaderRow
                          ? tableConfig.headerBg
                          : tableConfig.bgColor,
                        textAlign: tableConfig.textAlign,
                      }}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};
