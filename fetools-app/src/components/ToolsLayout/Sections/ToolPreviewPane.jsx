export default function ToolPreviewPane({
  children,
  isExpanded,
  toggleIsExpanded,
  expandedLayoutClasses,
  columnLayoutClasses,
}) {
  const internalExpandedLayoutClasses =
    'lg:border lg:rounded-r-lg lg:rounded-bl-lg';

  return (
    <section
      className={`relative items-center justify-center w-full overflow-auto max-lg:border group center min-h-64 max-lg:rounded-r-lg max-lg:rounded-bl-lg
      ${isExpanded ? internalExpandedLayoutClasses : ''}
      ${isExpanded ? expandedLayoutClasses : columnLayoutClasses}
      `}
    >
      <span
        onClick={toggleIsExpanded}
        className="absolute opacity-0 cursor-pointer select-none z-99 material-symbols-rounded top-4 right-4 max-lg:hidden group-hover:opacity-50"
      >
        {!isExpanded ? 'expand_content' : 'collapse_content'}
      </span>
      {children}
    </section>
  );
}
