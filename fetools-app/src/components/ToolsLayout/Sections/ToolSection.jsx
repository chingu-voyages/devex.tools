import Pane from "./ToolPane";

export default function ToolSection({
    title,
    children,
    icon,
    iconType,
    className,
}) {
    return (
        <section className={`container px-5 sm:px-8 ${className}`}>
            <Pane title={title} icon={icon} iconType={iconType}>
                {children}
            </Pane>
        </section>
    );
}
