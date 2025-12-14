import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/home';

import PredictPage from './predicts/predictspage';



function App() {

  return (
    <>

 
    
      <Router>

       
        
        <Routes>
        
          <Route path="/" element={<Home/>} />
          
          <Route path="/predict-page/*" element={<PredictPage />} />
          
        </Routes>
      </Router>


     
    </>
  )
}

export default App