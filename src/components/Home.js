import React from 'react'
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
const Home = () => {
    return (
        <>
            <section id="welcome-section">
                <div className="container-sm">
                    <h3 className='text-center'>WELCOME BACK!</h3>
                    <h2 className='text-center'>ADMIN</h2>
                </div>


            </section>

            <div className="sidebar">
            <div className="logo-details">
                <div className="logo_name">EMPLOYEE</div>
                <i className='bx bx-menu' id="btn"></i>
            </div>
            <ul className="nav-list p-f">
                <li>
                    <Link to="/">
                        <i className="fa-solid fa-house"></i>
                        <span className="links_name">Home</span>
                    </Link>
                    <span className="tooltip">Home</span>
                </li>
                <li>
                    <Link to="/adduser">
                    <i className="fa-solid fa-plus"></i>
                        <span className="links_name">ADD EMPLOYEE</span>
                    </Link>                   
    
                    <span className="tooltip">ADD EMPLOYEE</span>
                </li>
                <li>
                    <a href="/">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <span className="links_name">SEARCH RECORDS</span>
                    </a>
                    <span className="tooltip">SEARCH RECORDS</span>
                </li>
                <li>
                    <a href="/">
                        <i className="fa-solid fa-file-pen"></i>
                        <span className="links_name">EDIT EMPLOYEE</span>
                    </a>
                    <span className="tooltip">EDIT EMPLOYEE</span>
                </li>
                <li>
                    <a href="/">
                        <i className='bx bx-user'></i>
                        <span className="links_name">Users</span>
                    </a>
                    <span className="tooltip">Users</span>
                </li>
                

                <li className="profile">
                    <Link to="/login">
                        <i className='bx bx-log-out' href="/"></i>
                    </Link>
                    <div className="profile-details">
                        {/* <img src="" alt="profileImg" /> */}
                        <div className="name_job">
                            <div className="name">Suraj</div>
                            <div className="job">ADMIN</div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        </>
    )
}

export default Home
