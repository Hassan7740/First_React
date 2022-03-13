import React from 'react'
import { Link } from 'react-router-dom'
import style from './NavBar.module.css'

export default function NavBar() {
  return (
    <div >
      <nav className={`navbar navbar-expand-lg navbar-dark ${style.bgColor}` }>
        <div className="container">
          <Link className="navbar-brand" to='/home'>NOXE</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to='/home' >Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/movies">Movies</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/tvshows">TvShows</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="people">People</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="network">Network</Link>
              </li>
            </ul>
            <form className="d-flex align-items-center">
              <input className={`form-control  ${style.myform} me-2`} type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  )
}
