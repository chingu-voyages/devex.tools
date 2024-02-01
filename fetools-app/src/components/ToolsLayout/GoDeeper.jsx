export default function GoDeeper({ linksData }) {
  const anchorElements = (array) =>
    array.map(({ url, textValue }, idx) => (
      <li key={`GoLink-${idx}`}>
        <a
          href={url}
          className="underline underline-offset-4 text-md font-bold"
        >
          {textValue}
        </a>
      </li>
    ));

  return (
    <aside
      className="flex flex-col flex-1 gap-5 
        sm:p-12 lg:px-48 lg:pt-8 lg:pb-10"
    >
      <h2 className="font-bold text-3xl leading-none">Go Deeper...</h2>
      <ul className="flex flex-col gap-3 list-none list-inside">
        {anchorElements(linksData)}
      </ul>
    </aside>
  );
}
