export default function ToolHeading({
  icon = 'pageless',
  iconRotate = false,
  title = 'Tool Title',
  tagline = 'Tool Tagline',
}) {
  return (
    <header className="w-full lg:max-w-[1144px] m-auto pt-12 px-4 sm:px-8 flex gap-4 sm:gap-8">
      <div className="flex items-center self-center w-20 p-4 m-0 text-white rounded-r-lg rounded-bl-lg bg-accent">
        <span
          className={`material-symbols-rounded text-5xl p-0 m-0 ${
            iconRotate ? 'rotate-90' : ''
          }`}
        >
          {icon}
        </span>
      </div>
      <div>
        <h2 className="mb-0 font-bold leading-tight text-[4xl] sm:text-6xl lg:text-[5rem]">
          {title}
        </h2>
        <p className="pl-1 text-base text-gray-400">{tagline}</p>
      </div>
    </header>
  );
}
