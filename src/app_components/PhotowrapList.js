import React, { Component } from "react"

class PhotowrapList extends Component{
    render(){
        return(
            <li>
                <img src={this.props.urlV} alt="image_from_Flickr" />
            </li>
        )
    }
}

export default PhotowrapList