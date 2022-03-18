import React from 'react'
import { Route, Routes } from 'react-router-dom';
import NavBar from '../NavBar/NavBar'
import style from './App.module.css'
import Home from '../Home/Home'
import TvShows from '../TvShows/TvShows'
import Movies from '../Movies/Movies'
import People from '../People/People'
import Register from '../Register/Register'
import Network from '../Network/Network'
import SignIn from './../SignIn/SignIn';
export default function App() {
  return (
    <div>
      <NavBar />
      <div className="container">
      <Routes>
        <Route path=''   element={<Home/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/movies' element={<Movies/>} />
        <Route path='/tvshows' element={<TvShows/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/people' element={<People/>} />
        <Route path='/network' element={<Network/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/signin' element={<SignIn/>} />
      </Routes>
      </div>
    </div>
  )
}
