import React, { Component } from "react"
import {withRouter,NavLink} from "react-router-dom";
class Nav extends Component {
    render(){
        return(
            <nav className="main-nav">
                <ul>
                    <li><NavLink to="/defcat/cat">Cats</NavLink></li>
                    <li><NavLink to="/defdog/dog">Dogs</NavLink></li>
                    <li><NavLink to="/deflion/lion">Lion</NavLink></li>
                </ul>
            </nav>
        )
    }
}

export default withRouter(Nav)