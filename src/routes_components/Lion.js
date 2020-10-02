import React, { Component } from "react" ;
import {withRouter} from "react-router-dom";
import PhotowrapList from "../app_components/PhotowrapList";

class Lion extends Component{

    //initial it's default search key to empty string
    state = { 
        defKey : ""
    }

    // update initial searchKey value and call the FetchingDataFromFlickr method.
    componentDidMount = ()=>{
        const defKey = this.props.match.params.id;
        this.props.fetchLion(defKey)
        this.setState({
            defKey
        })
    }

    // structure the photo urls
    theResultList = this.props.lionURL.map((url,index) =>  <PhotowrapList urlV={url} key={index} /> )


    render(){
        
        return(
            <div className="photo-container">
                {/* display it's search key */}
                <h2>{this.state.defKey}</h2>
                <ul>
                    {// display the photo urls
                        this.theResultList
                    }
                </ul>
            </div>
        )
    }
}

export default withRouter(Lion); // set up the Router History