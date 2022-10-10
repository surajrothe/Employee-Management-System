import React from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './components/Login';
// import Navbar from './components/Navbar';
import Home from './components/Home';
import AddEmployee from './components/AddEmployee';
import Emplogin from './components/Emplogin';
import Emphome from './components/Emphome';

function App() {
  return (
    <>
      <Router>
        {/* <div className="container"> */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/Emplogin' element={<Emplogin />} />
            <Route path='/Emphome' element={<Emphome />} />
            <Route path='/adduser' element={<AddEmployee />} />
          </Routes>
        {/* </div> */}
      </Router>
    </>
  );
}

export default App;
