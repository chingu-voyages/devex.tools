import { forwardRef } from "react";

const ToolSectionColumns = forwardRef(function ToolSectionColumns(props, ref){

  const {
    children,
    isExpanded = false,
    reverse = true,
  } = props

  const columnLayoutClasses = `${
    reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
  } lg:gap-0 lg:border lg:border-gray-200 lg:[&>*]:w-1/2 lg:[&>.pane]:border-none lg:rounded-r-lg`;
  const expandedLayoutClasses = '';

  return (
  <section ref={ref} className="section-columns m-auto px-4 sm:px-8 lg:max-w-[1144px] w-full">
    <div
      className={`
        section-columns-wrapper flex w-full flex-col items-stretch justify-stretch gap-16 rounded-bl-lg 
        ${isExpanded ? expandedLayoutClasses : columnLayoutClasses}
      `}
    >
      {children}
    </div>
  </section>
  );
})

export default ToolSectionColumns

