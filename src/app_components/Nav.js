import React, { Component } from "react"

class Nav extends Component {
    render(){
        return(
            <nav class="main-nav">
                <ul>
                    <li><a href='#'>Cats</a></li>
                    <li><a href='#'>Dogs</a></li>
                    <li><a href='#'>Computers</a></li>
                </ul>
            </nav>
        )
    }
}

export default Nav