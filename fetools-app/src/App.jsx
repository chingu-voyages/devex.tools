import { Outlet } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster"
import Header from './components/PageLayout/Header';
import Footer from './components/PageLayout/Footer';

import './index.css'
import './pages/ColorGradient.css'

function App(){
  return(
  <>
    <Header/>
    <Outlet/>
    <Toaster/>
    <Footer/>
  </>);
}

export default App