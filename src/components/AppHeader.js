import React from "react"
import { NavLink} from "react-router-dom";
import './AppHeader.css'
import logo from './logo512.png'

function AppHeader(){
    return(
        <div className="app-header">
            <img className="logo" src={logo} alt="react-logo"></img>
            <NavLink to="/">
                <h2 className="header">Best Card Games</h2>
            </NavLink>
            <NavLink to="/new-item">
                <div className="newItem"><span className="material-icons md-48">add</span></div>
            </NavLink>
        </div>
    )
}

export default AppHeader
