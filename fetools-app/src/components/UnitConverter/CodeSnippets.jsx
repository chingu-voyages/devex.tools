import CodeBlock from "../CodeBlock";
import TabSwitcher from "../TabSwitcher";

export default function CodeSnippets({ pixels, em, tailwindSize, toastState }) {
  const remToTailwindFontSizeMap = {
    0.75: "text-xs",
    0.875: "text-sm",
    1: "text-base",
    1.125: "text-lg",
    1.25: "text-xl",
    1.5: "text-2xl",
    1.875: "text-3xl",
    2.25: "text-4xl",
    3: "text-5xl",
    3.75: "text-6xl",
    4.5: "text-7xl",
    6: "text-8xl",
    8: "text-9xl",
    // Add other mappings as needed
  };

  //All Code Samples
  const CodeSamples = {
    px: [
      { title: "Font Size", code: `font-size: ${pixels}px;` },
      { title: "Height", code: `height: ${pixels}px;` },
      { title: "Width", code: `width: ${pixels}px;` },
      { title: "Margin", code: `margin: ${pixels}px;` },
      { title: "Padding", code: `padding: ${pixels}px;` },
      { title: "Gap", code: `gap: ${pixels}px;` },
      { title: "Border Width", code: `border-width: ${pixels}px;` },
      {
        title: "Position",
        code: `top: ${pixels}px;\nright: ${pixels}px;\nbottom: ${pixels}px;\nleft: ${pixels}px;`,
      },
    ],
    rem: [
      { title: "Font Size", code: `font-size: ${em}rem;` },
      { title: "Height", code: `height: ${em}rem;` },
      { title: "Width", code: `width: ${em}rem;` },
      { title: "Margin", code: `margin: ${em}rem;` },
      { title: "Padding", code: `padding: ${em}rem;` },
      { title: "Gap", code: `gap: ${em}rem;` },
      { title: "Border Width", code: `border-width: ${em}rem;` },
      {
        title: "Position",
        code: `top: ${em}rem;\nright: ${em}rem;\nbottom: ${em}rem;\nleft: ${em}rem;`,
      },
    ],
    em: [
      { title: "Font Size", code: `font-size: ${em}em;` },
      { title: "Height", code: `height: ${em}em;` },
      { title: "Width", code: `width: ${em}em;` },
      { title: "Margin", code: `margin: ${em}em;` },
      { title: "Padding", code: `padding: ${em}em;` },
      { title: "Gap", code: `gap: ${em}em;` },
      { title: "Border Width", code: `border-width: ${em}em;` },
      {
        title: "Position",
        code: `top: ${em}rem;\nright: ${em}rem;\nbottom: ${em}em;\nleft: ${em}rem;`,
      },
    ],
    tailwind: [
      {
        title: "Font Size",
        code: remToTailwindFontSizeMap[em]
          ? remToTailwindFontSizeMap[em]
          : `text-[${parseFloat(em).toFixed(3)}rem]`,
      },
      { title: "Height", code: `h-${tailwindSize}` },
      { title: "Width", code: `w-${tailwindSize}` },
      { title: "Margin", code: `m-${tailwindSize}` },
      { title: "Padding", code: `p-${tailwindSize}` },
      { title: "Gap", code: `gap-${tailwindSize}` },
      { title: "Border Width", code: `border-${tailwindSize}` },
      {
        title: "Position",
        code: `top-${tailwindSize}\nright-${tailwindSize}\nbottom-${tailwindSize}\nleft-${tailwindSize}`,
      },
    ],
    NaN: [
      { title: "Font Size", code: "font-size: --" },
      { title: "Height", code: "height: --" },
      { title: "Width", code: "width: --" },
      { title: "Margin", code: "margin: --" },
      { title: "Padding", code: "padding: --" },
      { title: "Gap", code: "gap: --" },
      { title: "Border Width", code: "border-width: --" },
      {
        title: "Position",
        code: `top: --\nright: --\nbottom: --\nleft: --`,
      },
    ],
    NaNtailwind: [
      { title: "Font Size", code: `text-` },
      { title: "Height", code: `h-` },
      { title: "Width", code: `w-` },
      { title: "Margin", code: `m-` },
      { title: "Padding", code: `p-` },
      { title: "Gap", code: `gap-` },
      { title: "Border Width", code: `border-` },
      {
        title: "Position",
        code: `top-\nright-\nbottom-\nleft-`,
      },
    ],
  };

  const tabButtons = ["Rem", "Em", "Px", "Tailwind"];

  //TabSwitcher Content

  const tabContents = [
    <div
      key="tab-rem"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {isNaN(pixels)
        ? CodeSamples["NaN"].map((sample, index) => (
            <CodeBlock
              key={`${sample.title}-${index}`}
              title={sample.title}
              code={sample.code}
              toastState={toastState}
            />
          ))
        : CodeSamples["rem"].map((sample, index) => (
            <CodeBlock
              key={`${sample.title}-${index}`}
              title={sample.title}
              code={sample.code}
              toastState={toastState}
            />
          ))}
    </div>,

    <div key="tab-em" className="grid grid-cols-4 gap-4">
      {isNaN(em)
        ? CodeSamples["NaN"].map((sample, index) => (
            <CodeBlock
              key={`${sample.title}-${index}`}
              title={sample.title}
              code={sample.code}
              toastState={toastState}
            />
          ))
        : CodeSamples["em"].map((sample, index) => (
            <CodeBlock
              key={`${sample.title}-${index}`}
              title={sample.title}
              code={sample.code}
              toastState={toastState}
            />
          ))}
    </div>,

    <div key="tab-px" className="grid grid-cols-4 gap-4">
      {isNaN(pixels)
        ? CodeSamples["NaN"].map((sample, index) => (
            <CodeBlock
              key={`${sample.title}-${index}`}
              title={sample.title}
              code={sample.code}
              toastState={toastState}
            />
          ))
        : CodeSamples["px"].map((sample, index) => (
            <CodeBlock
              key={`${sample.title}-${index}`}
              title={sample.title}
              code={sample.code}
              toastState={toastState}
            />
          ))}
    </div>,

    <div key="tab-tailwind" className="grid grid-cols-4 gap-4">
      {isNaN(pixels)
        ? CodeSamples["NaNtailwind"].map((sample, index) => (
            <CodeBlock
              key={`${sample.title}-${index}`}
              title={sample.title}
              code={sample.code}
              lang="tailwind"
              toastState={toastState}
            />
          ))
        : CodeSamples["tailwind"].map((sample, index) => (
            <CodeBlock
              key={`${sample.title}-${index}`}
              title={sample.title}
              code={sample.code}
              lang="tailwind"
              toastState={toastState}
            />
          ))}
    </div>,
  ];

  return <TabSwitcher buttons={tabButtons}>{tabContents}</TabSwitcher>;
}
