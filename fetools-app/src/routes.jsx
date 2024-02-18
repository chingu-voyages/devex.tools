import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import UnitConverter from './pages/UnitConverter';
import ColorPicker from './pages/ColorPicker';
import CharacterFinder from './pages/CharacterFinder';
import FontViewer from './pages/FontViewer';
import ShadowCreator from './pages/ShadowCreator';
import Tables from './pages/Tables';
import ColorGradient from './pages/ColorGradient';
import App from './App';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route index element={<Home />} />
      <Route path="units" element={<UnitConverter />} />
      <Route path="colors" element={<ColorPicker />} />
      <Route path="characters" element={<CharacterFinder />} />
      <Route path="fonts" element={<FontViewer />} />
      <Route path="shadows" element={<ShadowCreator />} />
      <Route path="tables" element={<Tables />} />
      <Route path="gradients" element={<ColorGradient />} />
    </Route>
  )
);
