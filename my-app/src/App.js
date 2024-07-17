import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './components/home/Home';
import { AddInfo } from './components/addInfo/AddInfo';
import { EditInfo } from './components/editInfo/EditInfo';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState([]);
  return(
    <BrowserRouter> 
      <Routes>
        <Route path='/' element={<Home setUser={setUser}/>}/>
        <Route path='/addNewUser' element={<AddInfo/>}/>
        <Route path='/editUser' element={<EditInfo user = {user}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
