import { FaLink } from 'react-icons/fa6';
import { ToolSection } from './Sections';

export default function GoDeeper({ linksData }) {
  const anchorElements = array =>
    array.map(({ url, textValue }, idx) => (
      <li key={`GoLink-${idx}`}>
        <div className="flex items-center gap-2">
          <FaLink />
          <a
            href={url}
            className="font-bold underline underline-offset-4 text-md"
          >
            {textValue}
          </a>
        </div>
      </li>
    ));

  return (
    <ToolSection title="Go Deeper" icon="school">
      <aside className="flex flex-col flex-1 gap-5 p-3 ">
        <ul className="flex flex-col gap-3 list-none list-inside">
          {anchorElements(linksData)}
        </ul>
      </aside>
    </ToolSection>
  );
}
