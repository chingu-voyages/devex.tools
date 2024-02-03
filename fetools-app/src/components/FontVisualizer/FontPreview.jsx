import React from "react";

const FontPreview = ({
  font,
  backgroundColor,
  handleFontChange,
  handleColorChange,
  handleBackgroundColorChange,
  handleLetterSpacingChange,
  handleLineHeightChange,
  handleFontSizeChange,
}) => {
  const fontFamilies = [
    "Arial",
    "Sans-serif",
    "Courier New",
    "Times New Roman",
    "Verdana",
    "Georgia",
    "Impact",
  ];

  const fontStyles = ["normal", "italic"];
  const fontWeights = ["normal", "bold", "bolder", "lighter"];
  const textTransformations = ["none", "capitalize", "uppercase", "lowercase"];
  const textAligns = ["left", "center", "right"];

  return (
    <div className="font-preview-container p-6 text-black">
      <div className="flex">
        <div className="font-preview flex-shrink p-4 flex flex-col items-start gap-4 sm:gap-16 flex-1">
          <h1 className="text-2xl font-bold mb-4">Font Preview</h1>

          {/* Font Name */}
          <div className="flex gap-4 max-md:flex-wrap w-full">
            <div className="flex-grow flex flex-col px-5 ">
              <div className="text-neutral-400 text-base font-bold">
                Font Name:
              </div>
              <div className="flex-grow border border-[color:var(--Design-Document-Outlines,#999)] flex justify-between gap-5 mt-1 pl-4 pr-1.5 py-3 border-solid">
                <div className="text-neutral-400 text-base">Name</div>
                <select
                  value={font.name}
                  onChange={(e) => handleFontChange("name", e.target.value)}
                  className="mt-1 p-1 flex-grow"
                >
                  {fontFamilies.map((family) => (
                    <option key={family} value={family}>
                      {family}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Font Color */}
          <div className="flex gap-4 max-md:flex-wrap w-full">
            <div className="flex-grow flex flex-col px-5">
              <div className="text-neutral-400 text-base font-bold">
                Font Color:
              </div>
              <div className="border border-[color:var(--Design-Document-Outlines,#999)] flex justify-between gap-5 mt-1 pl-4 pr-1.5 py-3 border-solid">
                <div className="text-neutral-400 text-base">Color</div>
                <input
                  type="color"
                  value={font.color}
                  onChange={handleColorChange}
                  className="mt-1 p-1"
                  id="fontColor"
                  name="fontColor"
                  style={{
                    backgroundColor: font.color,
                  }}
                />
                <span className="ml-2">{font.color}</span>
              </div>
            </div>

            {/* Background Color */}
            <div className="flex-grow flex flex-col px-5">
              <div className="text-neutral-400 text-base font-bold">
                Background Color:
              </div>
              <div className="border border-[color:var(--Design-Document-Outlines,#999)] flex justify-between gap-5 mt-1 pl-4 pr-1.5 py-3 border-solid">
                <div className="text-neutral-400 text-base">Color</div>
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={handleBackgroundColorChange}
                  className="mt-1 p-1"
                  id="backgroundColor"
                  name="backgroundColor"
                  style={{
                    backgroundColor: backgroundColor,
                  }}
                />
                <span className="ml-2">{backgroundColor}</span>
              </div>
            </div>
          </div>

          {/* Font Size */}
          <div className="flex grow basis-[0%] flex-col px-5 py-3.5 w-full">
            <div className="text-neutral-400 text-base font-bold ">
              Font Size: <span className="font-black">{font.fontSize}em</span>
            </div>
            <div className="flex justify-center items-center mt-1.5 px-16 py-0.5">
              <input
                type="range"
                value={font.fontSize}
                min={-10}
                max={10}
                step={0.01}
                onChange={(e) =>
                  handleFontSizeChange(parseFloat(e.target.value))
                }
                className="flex-1 w-full"
              />
              <div className="stroke-[1px] flex w-3 shrink-0 h-3 flex-col ml-5 rounded-[50%]" />
            </div>
          </div>

          {/* Font Style */}
          <div className="flex gap-4 max-md:flex-wrap w-full">
            <div className="flex-grow flex flex-col px-5">
              <div className="text-neutral-400 text-base font-bold">
                Font Style:
              </div>
              <div className="border border-[color:var(--Design-Document-Outlines,#999)] flex justify-between gap-5 mt-1 pl-4 pr-1.5 py-3 border-solid">
                <div className="text-neutral-400 text-base">Style</div>
                <select
                  value={font.style}
                  onChange={(e) => handleFontChange("style", e.target.value)}
                  className="mt-1 p-1"
                >
                  {fontStyles.map((style) => (
                    <option key={style} value={style}>
                      {style}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Font Weight */}
            <div className="flex-grow flex flex-col px-5">
              <div className="text-neutral-400 text-base font-bold">
                Font Weight:
              </div>
              <div className="border border-[color:var(--Design-Document-Outlines,#999)] flex justify-between gap-5 mt-1 pl-4 pr-1.5 py-3 border-solid">
                <div className="text-neutral-400 text-base">Weight</div>
                <select
                  value={font.weight}
                  onChange={(e) => handleFontChange("weight", e.target.value)}
                  className="mt-1 p-1"
                >
                  {fontWeights.map((weight) => (
                    <option key={weight} value={weight}>
                      {weight}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Font Variant */}
          <div className="flex gap-4 max-md:flex-wrap w-full">
            <div className="flex-grow flex flex-col px-5">
              <div className="text-neutral-400 text-base font-bold">
                Font Variant:
              </div>
              <div className="border border-[color:var(--Design-Document-Outlines,#999)] flex justify-between gap-5 mt-1 pl-4 pr-1.5 py-3 border-solid">
                <div className="text-neutral-400 text-base">Style</div>
                <select
                  value={font.textTransform}
                  onChange={(e) =>
                    handleFontChange("textTransform", e.target.value)
                  }
                  className="mt-1 p-1"
                >
                  {textTransformations.map((variant) => (
                    <option key={variant} value={variant}>
                      {variant}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Text Align */}
            <div className="flex-grow flex flex-col px-5">
              <div className="text-neutral-400 text-base font-bold">
                Text Align:
              </div>
              <div className="border border-[color:var(--Design-Document-Outlines,#999)] flex justify-between gap-5 mt-1 pl-4 pr-1.5 py-3 border-solid">
                <div className="text-neutral-400 text-base">Alignment</div>
                <select
                  value={font.textAlign}
                  onChange={(e) =>
                    handleFontChange("textAlign", e.target.value)
                  }
                  className="mt-1 p-1"
                >
                  {textAligns.map((align) => (
                    <option key={align} value={align}>
                      {align}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Letter Spacing */}
          <div className="flex gap-4 max-md:flex-wrap ">
            <div className="flex-grow flex flex-col px-5 py-3.5">
              <div className="text-neutral-400 text-base font-bold">
                Letter Spacing:{" "}
                <span className="font-black">{font.letterSpacing}</span>
              </div>
              <div className="flex justify-center items-center mt-1.5 px-16 py-0.5">
                <input
                  type="range"
                  value={String(parseInt(font.letterSpacing))}
                  min={-10}
                  max={10}
                  step={1}
                  onChange={handleLetterSpacingChange}
                  className="flex-1 "
                />
                <div className="stroke-[1px] flex w-3 shrink-0 h-3 flex-col ml-5 rounded-[50%]" />
              </div>
            </div>

            {/* Line Height */}
            <div className="flex-grow flex flex-col px-5 py-3.5">
              <div className="text-neutral-400 text-base font-bold">
                Line Height:{" "}
                <span className="font-black">{font.lineHeight}</span>
              </div>
              <div className="flex justify-center items-center mt-1.5 px-16 py-0.5">
                <input
                  type="range"
                  value={String(parseInt(font.lineHeight))}
                  min={0}
                  max={10}
                  step={0.1}
                  onChange={handleLineHeightChange}
                  className="flex-1"
                />
                <div className="stroke-[1px] flex w-3 shrink-0 h-3 flex-col ml-5 rounded-[50%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FontPreview;
