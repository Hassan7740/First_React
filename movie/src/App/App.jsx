import React, { useState , useEffect, Children } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import style from './App.module.css';
import Home from '../Home/Home';
import TvShows from '../TvShows/TvShows';
import Movies from '../Movies/Movies';
import People from '../People/People';
import Register from '../Register/Register';
import Network from '../Network/Network';
import SignIn from './../SignIn/SignIn';
import jwtDecode from 'jwt-decode';


export default function App() {

  let  [userData, setUserData] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    
  if(localStorage.getItem('token')){
    getUserData();
  }

  }, [])
  

  function getUserData() {
    const data = jwtDecode(localStorage.getItem('token'));
    console.log(data); 
    setUserData(data);
  }

  function SignOut (){
    localStorage.removeItem('token');
    setUserData(null);
    navigate('signin');
  }

  function ProtectedRoute ({children}){
    if(localStorage.getItem('token') == null){
     return <Navigate to='/Signin'/>;
    }
    else {
      return children;
    }
  }

  return (
    <div>
      <NavBar SignOut={SignOut} userData={userData} />
      <div className="container">
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>} />
          <Route path='/movies' element={<ProtectedRoute><Movies/></ProtectedRoute>} />
          <Route path='/tvshows' element={<ProtectedRoute><TvShows/></ProtectedRoute>} />
          <Route path='/register' element={<ProtectedRoute><Register/></ProtectedRoute>} />
          <Route path='/people' element={<ProtectedRoute><People/></ProtectedRoute>} />
          <Route path='/network' element={<ProtectedRoute><Network/></ProtectedRoute>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/signin' element={<SignIn getUserData={getUserData} />} />
        </Routes>
      </div>
    </div>
  )
}
