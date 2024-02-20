import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../Icon";

const pages = [
  { to: "/colors", icon: "colorize", text: "Colors", title: "Color Picker" },
  {
    to: "/gradients",
    icon: "gradient",
    text: "Gradients",
    title: "Gradient Maker",
  },
  {
    to: "/shadows",
    icon: "ev_shadow",
    text: "Shadows",
    title: "Shadow Generator",
  },
  {
    to: "/characters",
    icon: "Ampersand",
    text: "Characters",
    title: "Character Finder",
    iconType: "svg",
  },
  { to: "/tables", icon: "table", text: "Tables", title: "Table Generator" },
  {
    to: "/units",
    icon: "sync",
    text: "Units",
    title: "Unit Converter",
    className: "rotate-90",
  },
  { to: "/fonts", icon: "format_size", text: "Fonts", title: "Font Viewer" },
];

const Links = pages.map(({ to, icon, iconType, text, className }) => (
  <li key={to} className="border-gray-200 max-md:w-full max-md:border">
    <Link to={to} className="max-md:p-4">
      <Icon
        name={icon}
        type={iconType ? iconType : "material"}
        className={className ? className : ""}
      />{" "}
      {text}
    </Link>
  </li>
));

export default function Nav() {
  const [isExpanded, setIsExpanded] = useState(false);
  const path = useLocation().pathname;

  useEffect(() => {
    // Set page title based on current route.
    const currentToolTitle = pages.find((page) => page.to === path).title;
    document.title = `${currentToolTitle} ▸ devex.tools`;
  }, [path]);

  useEffect(() => {
    // Close mobile menu on click.
    const clickListener = (e) =>
      e.target.closest(".hamburger") === null && setIsExpanded(false);

    // Close mobile menu on ESC keypress.
    const escListener = (e) => e.key === "Escape" && setIsExpanded(false);

    document.addEventListener("click", clickListener);
    document.addEventListener("keydown", escListener);

    return () => {
      document.removeEventListener("click", clickListener);
      document.removeEventListener("keydown", escListener);
    };
  }, []);

  return (
    <div>
      <nav
        className={`flex w-full justify-center gap-0 bg-white max-md:absolute max-md:right-0 max-md:top-20 max-md:z-50 md:pb-4 xl:pb-0 xl:justify-end ${
          isExpanded ? "" : "max-md:hidden"
        }`}
      >
        <ul className="max-md:border-1 max-md:w-screen flex h-full flex-wrap items-center justify-center gap-x-4 font-bold max-md:flex-col max-md:border-gray-200 max-md:text-center max-md:shadow-md sm:w-full sm:justify-center lg:gap-8 xl:justify-end [&>li>a]:flex [&>li>a]:gap-2 [&_.icon]:text-accent">
          {Links}
        </ul>
      </nav>
      <Icon
        name={isExpanded ? `close` : `menu`}
        size="40"
        className="hamburger cursor-pointer select-none md:hidden"
        onClick={() => setIsExpanded((prev) => !prev)}
      />
    </div>
  );
}
