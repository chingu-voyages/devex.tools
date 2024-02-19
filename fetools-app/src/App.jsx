import { Outlet } from "react-router-dom";
import Header from "./components/PageLayout/Header";
import Footer from "./components/PageLayout/Footer";

import "./index.css";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
