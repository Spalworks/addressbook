import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Pagenotfound from './pages/Pagenotfound';
import AddUser from './pages/AddUser';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={ <Home /> } />
          <Route path='/adduser' element={<AddUser />} />
          <Route path="/edit-user/:id" element={<AddUser />} />
          <Route path='*' element={<Pagenotfound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
