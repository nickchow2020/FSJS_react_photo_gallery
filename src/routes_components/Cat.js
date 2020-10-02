import React, { Component } from "react" ;
import {withRouter} from "react-router-dom";
import PhotowrapList from "../app_components/PhotowrapList";

class Cat extends Component{

    //initial it's default search key to empty string

    state = { 
        defKey : ""
    }
    
    // update initial searchKey value and call the FetchingDataFromFlickr method.
    componentDidMount = ()=>{
        const defKey = this.props.match.params.id;
        this.props.fetchCat(defKey)
        this.setState({
            defKey,
        })
    }

    // structure the photo urls

    theResultList = this.props.catURL.map((url,index) => { return <PhotowrapList urlV={url} key={index} />} )
    
    render(){
        
        return(
            <div className="photo-container">
                {/* display it's search key */}
                <h2>{this.state.defKey}</h2>
                <ul>
                    {
                        // display the photo urls
                        this.theResultList
                    }
                </ul>
            </div>
        )
    }
}

export default withRouter(Cat); // set up the Router History