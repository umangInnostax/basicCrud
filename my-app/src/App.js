import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './components/home/Home';
import { AddInfo } from './components/addInfo/AddInfo';
import { EditInfo } from './components/editInfo/EditInfo';
import { useEffect, useState } from 'react';
import { initialUsers } from './store/slice/userSlice';
import { useDispatch } from 'react-redux';

function App() {

  const [user, setUser] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('http://localhost:8080/practiceCrud/getInfo')
        .then(response => response.json())
        .then(json =>{
          dispatch(initialUsers(json));
        })
        .catch(error => console.error(error));
  })
  
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
