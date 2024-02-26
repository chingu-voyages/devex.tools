import { ToolSection } from "./Sections";
import Icon from "../Icon";

export default function GoDeeper({ linksData }) {
  // Add icons to links
  linksData = linksData.map((link) => {
    return {
      icon: link.url.includes("youtube") ? "live_tv" : "Link",
      iconType: link.url.includes("youtube") ? "material" : "svg",
      ...link,
    };
  });
  const anchorElements = (array) =>
    array.map(({ url, textValue, icon, iconType }, idx) => (
      <li key={`GoLink-${idx}`}>
        <div className="flex items-start gap-2">
          <div className="pt-1">
            <Icon name={icon} type={iconType} size="18" />
          </div>
          <a
            href={url}
            className="text-md font-bold underline underline-offset-4"
          >
            {textValue}
          </a>
        </div>
      </li>
    ));

  return (
    <ToolSection title="Go Deeper" icon="school">
      <aside className="flex flex-1 flex-col gap-5 p-3">
        <ul className="flex list-inside list-none flex-col gap-3">
          {anchorElements(linksData)}
        </ul>
      </aside>
    </ToolSection>
  );
}
