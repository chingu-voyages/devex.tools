import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import UnitConverter from './pages/UnitConverter';
import ColorPicker from './pages/ColorPicker';
import CharacterFinder from './pages/CharacterFinder';
import FontVisualizer from './pages/FontVisualizer'
import Team from './pages/Team'
import App from './App';

export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App/>} errorElement={<ErrorPage/>}>
        <Route index element={<Home/>} />
        <Route path="unit-converter" element={<UnitConverter/>} />
        <Route path="color-picker" element={<ColorPicker/>} />
        <Route path="character-finder" element={<CharacterFinder/>} />
        <Route path="font-visualizer" element={<FontVisualizer/>} />
        <Route path="team" element={<Team/>} />
      </Route>
    )
)