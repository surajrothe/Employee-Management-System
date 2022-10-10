import React from 'react'
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    // let location = useLocation();
    
    return (
        <div className="sidebar">
            <div className="logo-details">
                <div className="logo_name">EMPLOYEE</div>
                <i className='bx bx-menu' id="btn"></i>
            </div>
            <ul className="nav-list p-f">
                <li>
                    <Link to="/Emphome">
                        <i className="fa-solid fa-house"></i>
                        <span className="links_name">Home</span>
                    </Link>
                    <span className="tooltip">Home</span>
                </li>
                <li>
                    <Link to="/Addtask">
                    <i className="fa-solid fa-plus"></i>
                        <span className="links_name">ADD TASK</span>
                    </Link>                   
    
                    <span className="tooltip">ADD TASK</span>
                </li>
                <li>
                    <a href="/">
                        <i className='bx bx-user'></i>
                        <span className="links_name">Profile</span>
                    </a>
                    <span className="tooltip">Profile</span>
                </li>
                

                <li className="profile">
                    <Link to="/Emplogin">
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

    )
}

export default Navbar
