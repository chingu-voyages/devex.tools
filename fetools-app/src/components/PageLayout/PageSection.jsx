export default function PageSection({
  title = 'Section Title',
  children = <p>Place your content here.</p>,
  icon = 'pageless',
  className = '',
}) {
  const sectionClasses = `container p-8 ${className}`;

  return (
    <section className={sectionClasses}>
      <div className="pane relative rounded-lg border border-gray-200 px-12 pt-9 pb-10">
        <header>
          <h2 className="flex gap-3 items-center">
            <span className="material-symbols-rounded text-4xl w-9">
              {icon}
            </span>
            {title}
          </h2>
        </header>
        {children}
        <div className="content-['{tune}'] absolute right-3 bottom-[-15.5px] flex text-neutral-200 bg-white text-center px-1">
          &#x7b;
          <span className="material-symbols-rounded text-lg text-[#B6B6B6] px-1 w-[1.625rem]">
            tune
          </span>
          &#x7d;
        </div>
      </div>
    </section>
  );
}
