import React, { Component } from "react";
import {withRouter} from "react-router-dom";
import PhotowrapList from "../app_components/PhotowrapList";
import PhotowrapNotFount from "../app_components/PhotowrapNotFount";

class FormSearch extends Component{

    render(){
        return(
            <div className="photo-container">
                {/* Display the loading indicator when the loading is false */}
                <h2>{this.props.loading ? this.props.searchKey : 'Loading...' }</h2>
                <ul>
                    { 
                        // if the search state array not eqaul to 0 display the photo else show the Result not found page
                        this.props.searchURL.length !== 0 
                        ? this.props.searchURL.map((url,index)=> <PhotowrapList urlV={url} key={index} />)
                        : <PhotowrapNotFount />
                    }
                </ul>
            </div>
        )
    }
}

export default withRouter(FormSearch);