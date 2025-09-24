import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Persona from './components/Persona';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/persona" element={<Persona />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
