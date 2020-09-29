import React, { Component } from "react"
import {withRouter,NavLink} from "react-router-dom";
class Nav extends Component {
    render(){
        return(
            <nav className="main-nav">
                <ul>
                    <li><NavLink to="/buttonSearch/cats">Cats</NavLink></li>
                    <li><NavLink to="/buttonSearch/dogs">Dogs</NavLink></li>
                    <li><NavLink to="/buttonSearch/computers">Computers</NavLink></li>
                </ul>
            </nav>
        )
    }
}

export default withRouter(Nav)