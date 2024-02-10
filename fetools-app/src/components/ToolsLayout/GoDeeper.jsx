export default function GoDeeper({ linksData }) {
  const anchorElements = (array) =>
    array.map(({ url, textValue }, idx) => (
      <li key={`GoLink-${idx}`}>
        <div className="flex items-center">
          <span className="material-symbols-rounded text-4xl">link</span>
          <a
            href={url}
            className="underline underline-offset-4 text-md font-bold"
          >
            {textValue}
          </a>
        </div>
      </li>
    ));

  return (
    <aside
      className="flex flex-col flex-1 gap-5 p-3
        "
    >
      <ul className="flex flex-col gap-3 list-none list-inside">
        {anchorElements(linksData)}
      </ul>
    </aside>
  );
}
