import React from "react";
import { Link, useNavigate } from 'react-router-dom'
import './App.css'


const Nav = () => {
    const auth = localStorage.getItem('user')
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate("/signup")
    }

    return (
        <div>
            <nav>
                {auth ? < ul >
                    <li className="linkname" > <Link to="/">Products</Link></li>
                    <li className="linkname" > <Link to="/add">Add Products</Link></li>
                    {/* <li className="linkname" > <Link to="/update/:id">Update Products</Link></li> */}
                    <li className="linkname" > <Link to="/profile">{JSON.parse(auth).name}</Link></li>
                    <li className="linkname" ><Link to="/signup" onClick={logout}>Logout</Link></li>
                
                     </ul>
                    : <ul>
                        <li className="linkname" > <Link to="/Login">Login</Link></li>
                        <li className="linkname" ><Link to="/signup">Signup</Link></li>
                    </ul>
                }
            </nav>
        </div >
    )
}

export default Nav;