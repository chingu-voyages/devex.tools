import {Link, Outlet} from 'react-router-dom';

function Header(){
    return(
        <div>
            <nav>
                <ul className="flex">
                    <li className="mr-6">
                        <Link to="/" className="text-blue-500 hover:text-blue-800">Home</Link>
                    </li>
                    <li className="mr-6">
                        <Link to="/unit-converter" className="text-blue-500 hover:text-blue-800">Unit Converter</Link>
                    </li>
                    <li className="mr-6">
                        <Link to="/color-picker" className="text-blue-500 hover:text-blue-800">Color Picker</Link>
                    </li>
                    <li className="mr-6">
                        <Link to="/character-finder" className="text-blue-500 hover:text-blue-800">Character Finder</Link>
                    </li>
                    <li className="mr-6">
                        <Link to="/font-visualizer" className="text-blue-500 hover:text-blue-800">Font Visualizer</Link>
                    </li>
                    <li className="mr-6">
                        <Link to="/team" className="text-blue-500 hover:text-blue-800">Team</Link>
                    </li>
                </ul>
            </nav>
            <Outlet/>
        </div>
    )
}

export default Header;