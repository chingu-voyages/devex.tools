import { Link } from 'react-router-dom';

import logo from '../../assets/devexToolsLogo.svg';
import Nav from './Nav';

export default function Header() {
  return (
    <header className="flex w-full border-b-8 border-accent">
      <div className="flex w-full flex-row items-center justify-between gap-x-16 gap-y-5 px-8 py-5 md:flex-col md:pb-0 xl:flex-row xl:px-16 xl:py-6">
        <Link
          to="/"
          className="logo flex-2 block min-w-fit cursor-pointer self-center text-3xl font-bold leading-none"
        >
          <img src={logo} alt="Devex Tools logo" />
        </Link>
        <Nav />
      </div>
    </header>
  );
}
