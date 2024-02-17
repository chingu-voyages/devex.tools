import { handleEditCells, getCellStyle } from "./TableGeneratorFN";

export const TableGenerator = ({ tableConfig, setTableConfig }) => {
  return (
    <table
      style={{}}
      className={`w-full overflow-auto ${
        tableConfig.collapse ? "border-collapse" : "border-separate"
      }`}
    >
      {tableConfig.dimensions.map((row, idxRow) => (
        <tr key={idxRow}>
          {row.map((col, idxCols) => {
            const isHeaderRow = idxRow === 0;

            return (
              <td
                style={getCellStyle(idxRow, tableConfig)}
                className="min-h-8 min-w-[172px] border-black"
                key={idxCols}
              >
                <input
                  id={`${idxRow}-${idxCols}`}
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
  );
};
