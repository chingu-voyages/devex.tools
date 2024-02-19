import { useState } from 'react';
import { Link } from 'react-router-dom';
import { appName } from '../../data';

import closeIcon from '../../assets/x-solid.svg';
import logo from '../../assets/devexToolsLogo.svg';

import Nav from './Nav';
import MobileMenu from './MobileMenu';

export default function Header() {
  const [click, setClick] = useState(false);

  return (
    <header className="border-b-8 border-accent flex w-full">
      <div className="flex justify-between items-center px-8 py-5 sm:pb-0 lg:pb-6 lg:px-16 w-full flex-row sm:flex-col gap-5 lg:flex-row">
        <Link
          to="/"
          onClick={() => handleState(true)}
          className="logo
                flex-2 block font-bold text-3xl leading-none min-w-fit cursor-pointer self-center"
        >
          <img src={logo} alt="Devex Tools logo" />
        </Link>
        <Nav />
        <div id="button-container">{updateMenuContextIcon(click)}</div>
      </div>
      <div className="relative">
        <MobileMenu isClicked={click} handleState={handleState} />
      </div>
    </header>
  );

  function updateMenuContextIcon(isClicked) {
    if (!isClicked) {
      return (
        <span
          className="material-symbols-rounded text-4xl font-normal cursor-pointer sm:hidden"
          onClick={() => setClick(!click)}
        >
          menu
        </span>
      );
    } else {
      return (
        <span
          className="material-symbols-rounded text-4xl font-normal cursor-pointer sm:hidden"
          onClick={() => setClick(!click)}
        >
          close
        </span>
      );
    }
  }

  function handleState(click) {
    setClick(!click);
  }
}
