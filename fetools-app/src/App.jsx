import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import UnitConverter from "./pages/UnitConverter";
import ColorPicker from "./pages/ColorPicker";
import CharacterFinder from "./pages/CharacterFinder";
import FontVisualizer from "./pages/FontVisualizer";
import Team from "./pages/Team";
import ErrorPage from "./pages/ErrorPage";
import "./index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />} errorElement={<ErrorPage />}>
      <Route index element={<Home />} />
      <Route path="unit-converter" element={<UnitConverter />} />
      <Route path="color-picker" element={<ColorPicker />} />
      <Route path="character-finder" element={<CharacterFinder />} />
      <Route path="font-visualizer" element={<FontVisualizer />} />
      <Route path="team" element={<Team />} />
    </Route>
  )
);

function App({ routes }) {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
