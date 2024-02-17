import TextField from "../TextField";
import EditableInput from "../EditableInput";
import { ToolPane } from "../ToolsLayout/Sections/";

export default function Calculator({
  em,
  handleEmChange,
  pixels,
  handlePixelChange,
  tailwindSize,
  handleTailwindChange,
  onTailwindBlur,
  basePixelSize,
  handleBasePixelSizeChange,
}) {
  return (
    <ToolPane title="Calculator" icon="calculate">
      {/*Input Boxes*/}
      <div className="flex flex-col gap-10 items-center">
        <div className="flex gap-4 items-center">
          <TextField
            title="REM/EM"
            value={em}
            unit="rem"
            onValueChange={handleEmChange}
          />

          <span class="material-symbols-rounded">autorenew</span>

          <TextField
            title="Pixels"
            value={pixels}
            unit="px"
            onValueChange={handlePixelChange}
          />

          <span class="material-symbols-rounded">autorenew</span>

          <TextField
            title="Tailwind Size"
            value={tailwindSize}
            onValueChange={handleTailwindChange}
            inputType="text"
            onBlur={onTailwindBlur}
          />
        </div>

        <div className="flex items-center justify-center">
          <EditableInput
            label="Base Size"
            value={basePixelSize}
            unit="px"
            type="number"
            onChange={handleBasePixelSizeChange}
          />
        </div>
      </div>
    </ToolPane>
  );
}
