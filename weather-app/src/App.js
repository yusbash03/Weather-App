import logo from './logo.svg';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { TextField } from '@mui/material';
import './App.css';
import Favorites from './Components/Favorites';
import Home from './Pages/Home';
import {Routes, Route, Link} from 'react-router-dom'
import CityDetail from './Pages/CityDetail';

function App() {
  return (
    // <Favorites/>
  //  <Home />
   <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/citydetail' element={<CityDetail />} />
   </Routes>
   
  );
}

export default App;
