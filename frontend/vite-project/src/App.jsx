import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/home';

import PredictPage from './predicts/predictspage';
import Header from './componenets/header';
import Footer from './componenets/footer';
import About from './pages/about';
import Contact from './pages/contact';



function App() {

  return (
    <>

 
    
      <Router>

        <Header/>

       
        
        <Routes>
        
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/predict-page/*" element={<PredictPage />} />
          <Route path="/contact" element={<Contact />} />
          
        </Routes>

        <Footer/>
      </Router>


     
    </>
  )
}

export default App