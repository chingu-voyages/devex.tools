import { Link } from 'react-router-dom';

export default function MobileMenu({ isClicked, handleState }) {
  return (
    <div
      id="mobile-menu"
      className={`
    absolute block w-screen flex-1 top-20 right-0 bg-white z-50 absolute max-sm:${
      isClicked ? '' : 'hidden'
    } sm:hidden
    `}
    >
      <nav>
        <ul className="flex flex-col h-full text-center border-1 border-gray-200 shadow-md font-bold">
          <li className="w-full p-4 border border-gray-200 w-full">
            <Link to="/units" onClick={() => handleState(isClicked)}>
              Units
            </Link>
          </li>
          <li className="w-full p-4 border border-gray-200 w-full">
            <Link to="/colors" onClick={() => handleState(isClicked)}>
              Colors
            </Link>
          </li>
          <li className="w-full p-4 border border-gray-200 w-full">
            <Link to="/characters" onClick={() => handleState(isClicked)}>
              Characters
            </Link>
          </li>
          <li className="w-full p-4 border border-gray-200 w-full">
            <Link to="/fonts" onClick={() => handleState(isClicked)}>
              Fonts
            </Link>
          </li>
          <li className="w-full p-4 border border-gray-200 w-full">
            <Link to="/gradients" onClick={() => handleState(isClicked)}>
              Gradients
            </Link>
          </li>
          <li className="w-full p-4 border border-gray-200 w-full">
            <Link to="/shadows" onClick={() => handleState(isClicked)}>
              Shadows
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
