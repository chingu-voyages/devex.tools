import Pane from './ToolPane';

export default function PageSection({
  title,
  children,
  icon,
  iconMode,
  className,
}) {
  return (
    <section className={`container px-5 sm:px-8 ${className}`}>
      <Pane title={title} icon={icon} iconMode={iconMode}>
        {children}
      </Pane>
    </section>
  );
}
