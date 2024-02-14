import Pane from './ToolPane';

export default function PageSection({ title, children, icon, className }) {
  return (
    <section className={`container px-5 sm:px-8 ${className}`}>
      <Pane title={title} icon={icon}>
        {children}
      </Pane>
    </section>
  );
}
