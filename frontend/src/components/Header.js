import React from "react";
import {Link} from "react-router-dom";

export default function Header() {
    return(
        <div className="container">
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link to="/" className="nav-link">Categories</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/vehicles" className="nav-link">Vehicles</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}