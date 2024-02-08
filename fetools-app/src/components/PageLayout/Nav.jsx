import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav className="max-sm:hidden flex w-full justify-center lg:justify-end">
      <ul className="flex justify-center lg:justify-end font-bold gap-12 h-full items-center">
        <li>
          <Link to="/characters">Characters</Link>
        </li>
        <li>
          <Link to="/colors">Colors</Link>
        </li>
        <li>
          <Link to="/fonts">Fonts</Link>
        </li>
        <li>
          <Link to="/gradients">Gradients</Link>
        </li>
        <li>
          <Link to="/shadows">Shadows</Link>
        </li>
        <li>
          <Link to="/units">Units</Link>
        </li>
      </ul>
    </nav>
  );
}
